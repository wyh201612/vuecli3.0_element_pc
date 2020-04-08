<template>
    <div class="cart">
        <div v-if="tableData.length!=0">
            <div class="cart-content">
                <div class="title">
                    <h2>全部商品</h2>
                    <span>{{totalBuyNumbers}}</span>件
                </div>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="商品" width="400px">
                        <template slot-scope="scope">
                            <div>
                                <div style="float: left;margin-right: 10px;"><img :src="scope.row.imgUrl" alt="" style="width: 50px;height: 50px;"></div>
                                <div style="float: left;width: calc(100% - 60px);">
                                    <div>商品名称: {{scope.row.name}}</div>
                                    <div><span style="margin-right: 10px;">品牌: {{scope.row.goodsInfo.brandName}}</span><span>分类: {{scope.row.goodsInfo.categoryName}}</span></div>
                                    <div><span style="margin-right: 10px;">品质: {{scope.row.goodsInfo.quality}}</span><span>克重: {{scope.row.gram}}</span></div>
                                    <div style="margin-top: 6px;"><el-tag type="info" size="mini" v-for="(item, index) in scope.row.goodsInfo.labelList" :key="index">{{item.name}}</el-tag></div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价" width="120px">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.price}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.quantity" @change="changeNumber(scope.row.id)" size="mini" :min="1"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="加工费" width="80px">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.discountProcessCostAAA}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="小计">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.subtotal}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="removeOne(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="settlement">
                <div class="settlement-box">
                    <el-card class="box-card" shadow="never">
                        <div class="settlement-box-cenyent">
                            <div class="jiesuan-left">
                                <el-checkbox v-model="checkedAll" @change="toggleSelectionAll([tableData])" style='margin-right: 10px;'>全选</el-checkbox>
                                <el-button type="text" @click="removeCheckedGoods()">删除选中的商品</el-button>
                                <el-button type="text" @click="clearCart()">清理购物车</el-button>
                            </div>
                            <div class="jiesuan-right">
                                <span style="margin-right: 20px;">已选 <span class="totalNumber">{{checkedNumbers}}</span> 件商品</span>
                                <span>总价：</span>
                                <span class="total">￥{{checkedPrices}}</span>
                                <div @click="settlement">去结算</div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
        <!-- 购物车为空 -->
        <div class="cart-content no-goods" v-else>
            <h2>你的购物车什么东西都没有</h2>
            <el-button type="danger" @click="goMall">去逛逛</el-button>
        </div>
    </div>
</template>

<script>
import { getToken, setToken, removeToken, getCookie, setCookie, removeCookie } from '@/utils/auth'
import qs from 'qs'

export default {
    name: 'cart',
    components: {

    },
    data() {
        return {
            checkedAll: false,
            tableData: [],
            totalBuyNumbers: '', // 商品总共件数
            checkedPrices: 0, // 选中的商品金额
            checkedNumbers: 0, // 选中的商品件数
            multipleSelection: [] // 选中的商品
        }
    },
    computed: {
        
    },
    filters: {
        gram(value) {
            let realVal = '';
            if (!isNaN(value) && value !== '') {
                // 截取当前数据到小数点后两位
                realVal = value.toFixed(3);
            } else {
                realVal = '--';
            }
            return realVal;
        }
    },
    created() {
        
    },
    mounted() {
        this.cartListFn();
        // this.checkedTotalPrice()
    },
    methods: {
        /* 购物车列表 
        * skuId long 是  商品规格ID
        * quantity int 是  加入数量*/
        async cartListFn() {
            this.GLOBAL.isShowLoading = true;
            let data = await this.$api.cartList('',getCookie('accessToken'));
            data.map((item)=> {
                item['discountProcessCostAAA'] = Number(this.accMul(item.quantity,item.gram) * item.goodsInfo.discountProcessCost);
                item['discountProcessCost'] = Number(item.goodsInfo.discountProcessCost);
                item['subtotal'] = Number(this.accMul(item.quantity,item.price) + item.discountProcessCostAAA);
                item['labelList'] = item.goodsInfo.labelList;
            })
            this.tableData = data;
            // 让table表格的复选框默认选中的函数
            this.$nextTick(()=>{
                this.tableData.map((item) => {
                    this.$refs.multipleTable.toggleRowSelection(item,true);
                });
            })
            this.totalBuyNumber()
        },
        /* 购物车列表数量修改
         * method： POST
         * 接口地址：  mall/shopping/trolley/quantity
         * 输入参数：
         * recordId long 是  购物车记录ID
         * quantity int 是  期望更改后的数量*/
        async cartListQuantity(recordId,quantity) {
            this.GLOBAL.isShowLoading = false;
            let params = {
                recordId: recordId,
                quantity: quantity
            }
            await this.$api.cartListQuantity(qs.stringify(params),getCookie('accessToken'));
            await this.cartListFn();
            await this.$eventHub.$emit("addCart");
        },
        /* 购物车列表删除 输入参数：
        * recordId array 是  购物车记录的id的long类型的数组 */
        async removeOne(recordId) {
            this.GLOBAL.isShowLoading = true;
            let params = {
                recordId: recordId
            }
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removecartListFn(params)
            }).catch(() => {
            });
        },
        // 删除选中的商品
        async removeCheckedGoods() {
            let arr = [];
            let recordId = '';
            this.multipleSelection.map((item) => {
                arr.push(item.id)
            })
            recordId = arr.join(',');
            recordId.substring(0, recordId.lastIndexOf(','));
            console.log('删除选中的商品的id：',recordId)
            this.GLOBAL.isShowLoading = true;
            let params = {
                recordId: recordId
            }
            this.$confirm('此操作将永久删除选中的商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removecartListFn(params)
            }).catch(() => {
            });
        },
        // 清空购物车
        async clearCart() {
            let arr = [];
            let recordId = '';
            this.tableData.map((item) => {
                arr.push(item.id)
            })
            recordId = arr.join(',');
            recordId.substring(0, recordId.lastIndexOf(','));
            console.log('清空购物车的id：',recordId)
            this.GLOBAL.isShowLoading = true;
            let params = {
                recordId: recordId
            }
            this.$confirm('此操作将永久删除购物车, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removecartListFn(params)
            }).catch(() => {
            });
        },
        async removecartListFn(params) {
            await this.$api.removecartList(qs.stringify(params),getCookie('accessToken'));
            await this.cartListFn();
            await this.$message({
                type: 'success',
                message: '删除成功!'
            });
            await this.$eventHub.$emit("addCart");
        },
        // 计算选择总额和数量
        checkedTotalPrice() {
            let checkedTotalPrice = 0;
            let checkedTotalNumber = 0;
            if(this.multipleSelection.length==0) { // 如果存放商品的参数长度为0时，件数为0，金额为0 ，否则计算除金额和件数
                this.checkedPrices = 0;
                this.checkedNumbers = 0;
            } else {
                this.multipleSelection.map((item) => {
                    checkedTotalPrice += Number(this.accMul(item.quantity,item.price) + item.discountProcessCostAAA);
                    checkedTotalNumber += Number(item.quantity);
                })
                this.checkedPrices = checkedTotalPrice.toFixed(2);
                this.checkedNumbers = checkedTotalNumber;
            }
        },
        // 计算总件数
        totalBuyNumber() {
            let number = 0;
            this.tableData.map((item) => {
                number += Number(item.quantity);
            })
            this.totalBuyNumbers = number;
        },
        // 改变数量
        changeNumber(id) {
            console.log(id)
            this.tableData.map((item)=>{
                if(id==item.id) {
                    item['discountProcessCostAAA'] = Number(item.goodsInfo.discountProcessCost) * item.quantity * item.gram;
                    item['subtotal'] = Number(this.accMul(item.quantity,item.price) + item.discountProcessCostAAA);
                    this.cartListQuantity(id,item.quantity);
                }
            })
            this.checkedTotalPrice();
            this.totalBuyNumber();
        },
        // 单个选择操作 当选择项发生变化时会触发该事件
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
            if(this.multipleSelection.length>=this.tableData.length) {
                this.checkedAll = true;
            } else {
                this.checkedAll = false;
            }
            this.checkedTotalPrice();
            this.totalBuyNumber();
        },
        // 全选操作
        toggleSelectionAll(rows) {
            console.log(rows)
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleAllSelection();
                });
                this.checkedTotalPrice();
                this.totalBuyNumber();
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        // 购买
        settlement() {
            console.log(this.checkedNumbers,this.multipleSelection)
            let _this = this;
            if(getCookie('accessToken') && getCookie('accessToken') != 'null' && getCookie('accessToken') != 'undefined') {
                if(_this.multipleSelection.length==0) {
                    _this.$message({
                        message: '请选择商品',
                        type: 'warning'
                    });
                } else {
                    console.log(_this.multipleSelection)
                    this.$router.push({path: '/orderConfirmation',query: {freight: _this.multipleSelection[0].freight,isCart: 'true',checkedSkuData: encodeURI(JSON.stringify(_this.multipleSelection))}})
                }
            } else {
                _this.$router.push({path: '/login' ,query: {url:location.hostname}})
            }
        },
        // 乘法函数，用来得到精确的乘法结果
        //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
        //调用：accMul(arg1,arg2)
        //返回值：arg1乘以arg2的精确结果
        accMul(arg1, arg2) {
            var m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length
            } catch (e) {}
            try {
                m += s2.split(".")[1].length
            } catch (e) {}
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
        },
        goMall() {
            this.$router.push({path: '/goldShop'})
        }
    },
}
</script>

<style lang="scss" scoped>
    .cart {
        padding: 40px 0 0;
        background-color: #f7f7f7;
    }

    .no-goods {
        text-align: center;
        margin-bottom: 40px !important;
    }

    .cart-content {
        margin: 0 auto;
        padding: 20px;
        width: 1160px;
        background-color: #fff;
    }

    .cart-content .title h2 {
        display: inline-block;
    }

    .cart-content .title span {
        color: #f00;
    }

    .el-tag {
        margin-right: 10px;
    }

    .settlement {
        background-color: #fff;
    }

    .settlement .settlement-box {
        margin-top: 20px;
        margin: 20px auto 0;
        width: 1200px;
    }

    .settlement .settlement-box .settlement-box-cenyent {
        overflow: hidden;
        height: 70px;
        line-height: 70px;
    }

    .box-card {
        border: none !important;
    }

    .box-card .el-card__body {
        padding: 0;
    }

    .jiesuan-left {
        float: left;
        padding: 0 20px;
    }

    .jiesuan-right {
        float: right;
    }

    .jiesuan-right span {
        font-size: 14px;
    }

    .jiesuan-right div {
        display: inline-block;
        width: 180px;
        background-image: linear-gradient(135deg, rgb(239, 197, 144) 0%, rgb(187, 141, 72) 100%);
        color: #fff;
        text-align: center;
        margin-left: 20px;
        cursor: pointer;
    }

    .jiesuan-right span.total,
    .jiesuan-right span.totalNumber {
        color: #f00;
    }
</style>