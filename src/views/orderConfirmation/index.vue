<template>
    <div class="orderConfirmation">
        <div class="top-desc clearfix">
            <div style="margin-bottom: 20px;font-size: 16px;">收货地址</div>
            <div class="address-box" v-if="addressList1.length!=0">
                <el-collapse accordion>
                    <div style="overflow: hidden;">
                        <div :class="item.isDefault==1?'address-item active':'address-item'" v-for="(item, index) in addressList1" :key="index" @click="checkedAddress(item)">
                            <div class="li-top address-msg">{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.address}}</div>
                            <div class="address-msg"><span style="margin-right: 20px;">{{item.name}}</span>{{item.mobile}}</div>
                            <el-button type="text" @click.stop="modify_address(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, item.isDefault)">修改</el-button>
                        </div>
                    </div>
                    <el-collapse-item>
                        <template slot="title"></template>
                        <div class="address-item" @click="checkedAddress(item)" :class="item.isDefault==1?'address-item active':'address-item'" v-for="(item, index) in addressList2" :key="index">
                            <div class="li-top address-msg">{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.address}}</div>
                            <div class="address-msg"><span style="margin-right: 20px;">{{item.name}}</span>{{item.mobile}}</div>
                            <el-button type="text" @click.stop="modify_address(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, item.isDefault)">修改</el-button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <el-button type="primary" icon="el-icon-plus" @click="add_addressShow('ruleForm')">新增地址</el-button>
            
            <div style="margin-bottom: 20px;font-size: 16px;margin-top: 20px;">确认送货清单</div>
            <el-table :data="checkedSkuData" border style="width: 100%">
                <el-table-column label="商品" width="400">
                    <template slot-scope="scope">
                        <div style="float: left;">
                            <img :src="scope.row.imgUrl" alt="" style="width: 50px;">
                        </div>
                        <div style="float: left;width: calc(100% - 60px);font-size: 12px;margin-left: 10px;">
                            <div>商品名称：{{scope.row.name}}</div>
                            <div>规格：{{scope.row.gram}} 克</div>
                            <el-tag type="info" size="mini" v-for='(item,index) in scope.row.labelList' :key="index" style="margin-right: 6px;">{{item.name}}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单价">
                    <template slot-scope="scope">
                        <div>¥{{scope.row.price}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="数量">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.quantity" :min="1" size="mini" @change="changeNumber"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="加工费" width="120">
                    <template slot-scope="scope">
                        ¥{{scope.row.discountProcessCostAAA}}
                    </template>
                </el-table-column>
            </el-table>
            <div style="padding: 20px 0;line-height: 40px;">
                <div>
                    配送方式：
                    <el-select size="mini" v-model="kdvalue" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
                </div>
                <div>配送时间：工作日、双休日与节假日均可送货</div>
                <!-- <div style="overflow: hidden;">
                    <span style="float: left;">运费</span>
                    <div style="float: right;">
                        <span>不含运费</span>
                        <span>￥20.00</span>
                    </div>
                </div> -->
                <div>
                    <div style="text-align: right;">
                        <span>{{totalBuyNumbers}} 件商品, </span>
                        <span>商品总额：¥{{totalPrices}}</span>
                    </div>
                    <div style="text-align: right;">运费：¥{{freight}}</div>
                    <div style="text-align: right;">优惠/抵扣：0</div>
                </div>
            </div>
        </div>
        <div class="settlement">
            <div class="settlement-box">
                <el-card class="box-card" shadow="never">
                    <div class="settlement-box-cenyent">
                        <div class="jiesuan-right">
                            <div style="display: inline-block;text-align: right;">
                                <div style="line-height: initial;">
                                    <span>应付总额：</span>
                                    <span class="total">¥{{amountPayable}}</span>
                                </div>
                                <div style="line-height: initial;">寄送至： {{subAddress}}</div>
                                <div style="line-height: initial;">收货人：{{subConsignee}} {{subPhone}}</div>
                            </div>
                            <div class="settlement-btn" @click="buy">去结算</div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>

        <!-- 添加地址 -->
        <el-dialog title="添加地址" :visible.sync="add_addressVisible" width="600px" center>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" :readonly='modify'></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="ruleForm.mobile" :readonly='modify'></el-input>
                </el-form-item>
                <el-form-item label="省市县" required>
                    <el-col :span="6">
                        <el-form-item prop="valueProvince">
                            <el-select v-model="ruleForm.valueProvince" placeholder="请选择省" @change="changeProvince">
                                <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                    <el-col :span="6">
                        <el-form-item prop="valueCity">
                            <el-select v-model="ruleForm.valueCity" placeholder="请选择市" @change="changeCity">
                                <el-option v-for="item in cityOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1" style="text-align: center;">-</el-col>
                    <el-col :span="6">
                        <el-form-item prop="valueOrigin">
                            <el-select v-model="ruleForm.valueOrigin" placeholder="请选择区" @change="changeOrigin">
                                <el-option v-for="item in originOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-if='!modify' @click="add_address_submitForm('ruleForm')">立即添加</el-button>
                    <el-button type="primary" v-if='modify' @click="modify_address_submitForm('ruleForm')">立即修改</el-button>
                    <el-button @click="add_address_resetForm('ruleForm')" v-if='!modify'>重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getToken, setToken, removeToken, getCookie, setCookie, removeCookie } from '@/utils/auth'
import qs from 'qs'
var appData = require('@/utils/area.json');
export default {
    name: 'orderConfirmation',
    components: {

    },
    data() {
        return {
            kdvalue: '顺丰快递',
            options: [{
            value: '1',
            label: '顺丰快递'
            }, ],
            detail: {},
            addressList1: {},
            addressList2: {},
            addressId: '', // 所选地址id
            subAddress: '', // 提交时的地址
            subConsignee: '', // 提交时的联系人
            subPhone: '', // 提交时的联系方式
            provinceList: [], // 省列表
            cityList: [], // 市列表
            originList: [], // 区列表
            cityOptions: [], // 市下拉框数据
            originOptions: [], // 区下拉框数据
            add_addressVisible: false, // 控制添加地址
            modify: false, // 控制修改地址时输入框不能输入
            isDefault: 0,
            ruleForm: {
                name: '',
                mobile: '',
                valueProvince: '', // 所选的省
                valueCity: '', // 所选的市
                valueOrigin: '', // 所选的区
                address: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                valueProvince: [
                    { required: true, message: '请选择省', trigger: 'change' }
                ],
                valueCity: [
                    { required: true, message: '请选择市', trigger: 'change' }
                ],
                valueOrigin: [
                    { required: true, message: '请选择县', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ]
            },
            discountProcessCost: "", // 运费
            freight: "", // 运费
            coupon: "", // y优惠券折扣
            totalPrices: "", // 总额
            totalBuyNumbers: "", // 总件
            amountPayable: "", // 应付金额
            isDisabled: false, // 控制收货地址输入框是否可以输入
            checkedSkuData: [], // 选中商品的数据
            skuItemIndex: 0,
            orderId: '' // 支付返回的订单id
        }
    },
    computed: {
        
    },
    created() {
        
    },
    filters: {
        
    },
    mounted() {
        let _this = this;
        _this.get_address();
        _this._getJsonData();
        var postData = _this.getRequest();
        if(postData.isCart == 'false') { // 直接购物
            console.log('直接购物')
            _this.freight = postData.freight;
            _this.checkedSkuData.push(JSON.parse(decodeURI(decodeURI(this.$route.query.checkedSkuData))));
            _this.totalPrice();
            _this.totalBuyNumber();
        } else { // 购物车进来
            console.log('购物车进来')
            _this.freight = postData.freight;
            _this.checkedSkuData = JSON.parse(decodeURI(decodeURI(this.$route.query.checkedSkuData)));
            _this.totalPrice();
            _this.totalBuyNumber();
        }
    },
    methods: {
        // 计算总额
        totalPrice() {
            let price = 0;
            this.checkedSkuData.map((item) => {
                // 加工费：数量*克重*加工费折扣
                item.discountProcessCostAAA = this.accMul(item.quantity,item.gram) * item.discountProcessCost;
                // 商品总价：数量*价格+加工费
                price += this.accMul(item.quantity,item.price) + item.discountProcessCostAAA;
            })
            // 商品总价
            this.totalPrices = price.toFixed(2);
            // 应付金额(包含加工费)+运费-折扣
            this.amountPayable = Number(this.totalPrices + this.freight - 0);
        },
        // 计算总件数
        totalBuyNumber() {
            let number = 0;
            this.checkedSkuData.map((item) => {
                number += item.quantity;
            })
            this.totalBuyNumbers = number;
        },
        // 改变数量
        changeNumber(currentValue, oldValue) {
            this.totalPrice();
            this.totalBuyNumber();
        },
        // 打开添加地址弹窗
        add_addressShow(formName) {
            this.add_addressVisible = true;
            this.modify = false;
            this.isDefault = 0;
            this.ruleForm = {}
        },
        // 提交添加地址信息
        add_address_submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.add_address();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置地址信息
        add_address_resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        /* 添加地址接口地址：  member/address/add
        * 输入参数：
        * userId string 否  用户id
        * name string 是  用户姓名
        * mobile string 是  手机号
        * province string 是  省code
        * city string 是  市code
        * area string 是  区code
        * address string 是  详细地址
        * isDefault int 否  是否默认 */
        async add_address() {
            let _this = this;
            let params = {
                name: _this.ruleForm.name,
                mobile: _this.ruleForm.mobile,
                province: _this.ruleForm.valueProvince,
                city: _this.ruleForm.valueCity,
                area: _this.ruleForm.valueOrigin,
                address: _this.ruleForm.address,
                isDefault: ''
            }
            _this.GLOBAL.isShowLoading = true;
            await _this.$api.add_address(qs.stringify(params),getCookie('accessToken'))
            _this.$message({
                message: '添加成功',
                type: 'success'
            });
            await _this.get_address();
            _this.add_addressVisible = false;
        },
        // 修改弹窗显示
        modify_address(id, name, mobile, province, city, area, address, isDefault) {
            console.log(id, name, mobile, province, city, area, address, isDefault);
            this.modify = true;
            this.addressId = id;
            this.ruleForm.name = name;
            this.ruleForm.mobile = mobile;
            this.ruleForm.valueProvince = province;
            this.ruleForm.valueCity = city;
            this.ruleForm.valueOrigin = area;
            this.ruleForm.address = address;
            this.isDefault = isDefault;
            this.changeProvince(province);
            this.changeCity(city);
            this.add_addressVisible = true;
        },
        // 修改提交操作
        modify_address_submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                console.log(this.addressId, this.ruleForm.name, this.ruleForm.mobile, this.ruleForm.valueProvince, this.ruleForm.valueCity, this.ruleForm.valueOrigin, this.ruleForm.address, this.isDefault)
                if (valid) {
                    this.update_address(this.addressId, this.ruleForm.name, this.ruleForm.mobile, this.ruleForm.valueProvince, this.ruleForm.valueCity, this.ruleForm.valueOrigin, this.ruleForm.address, this.isDefault);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 选择省
        changeProvince(val) {
            this.provinceList.forEach((province, index) => {
                if (val.toString() === this.provinceList[index].value) {
                    this.ruleForm.valueProvince = this.provinceList[index].value;
                    this.cityOptions = this.provinceList[index].children;
                    this.ruleForm.valueCity = this.provinceList[index].children[0].value;
                    this.originOptions = this.provinceList[index].children[0].children;
                    this.ruleForm.valueOrigin = this.provinceList[index].children[0].children[0].value;
                }
            })
        },
        // 选择市
        changeCity(val) {
            this.cityList.forEach((city, index) => {
                if (val.toString() === this.cityList[index].value) {
                    this.ruleForm.valueCity = this.cityList[index].value;
                    this.originOptions = this.cityList[index].children;
                    this.ruleForm.valueOrigin = this.cityList[index].children[0].value;
                }
            })
        },
        // 选择区
        changeOrigin(val) {
            this.ruleForm.valueOrigin = val;
            this.$forceUpdate();
        },
        // 获取省市县
        _getJsonData() {
            let _this = this;
            let res = appData;
            _this.provinceList = [];
            _this.cityList = [];
            _this.originList = [];
            res.forEach((item) => {
                if (item.value.match(/0000$/)) {
                    _this.provinceList.push({
                        value: item.value,
                        label: item.name,
                        children: []
                    })
                } else if (item.value.match(/00$/)) {
                    _this.cityList.push({
                        value: item.value,
                        label: item.name,
                        children: []
                    })
                } else {
                    _this.originList.push({
                        value: item.value,
                        label: item.name
                    })
                }
            })
            for (let index in _this.provinceList) {
                for (let index1 in _this.cityList) {
                    if (_this.provinceList[index].value.slice(0, 2) === _this.cityList[index1].value.slice(0, 2)) {
                        _this.provinceList[index].children.push(_this.cityList[index1])
                    }
                }
            }
            for(let item1 in _this.cityList) {
                for(let item2 in _this.originList) {
                    if (_this.originList[item2].value.slice(0, 4) === _this.cityList[item1].value.slice(0, 4)) {
                        _this.cityList[item1].children.push(_this.originList[item2])
                    }
                }
            }
        },
        // 选择地址
        checkedAddress(items) {
            this.addressList1.map((item) => {
                if(item.id == items.id) {
                    item.isDefault=1;
                    this.addressId = items.id;
                    this.subAddress = items.provinceName + items.cityName + items.areaName + items.address;
                    this.subConsignee = items.name;
                    this.subPhone = items.mobile;
                } else {
                    item.isDefault=0;
                }
            })
            this.addressList2.map((item) => {
                if(item.id==items.id) {
                    item.isDefault=1;
                    this.addressId = items.id;
                    this.subAddress = items.provinceName + items.cityName + items.areaName + items.address;
                    this.subConsignee = items.name;
                    this.subPhone = items.mobile;
                } else {
                    item.isDefault=0;
                }
            })
            console.log(this.addressId)
        },
        // 购买
        buy() {
            console.log(this.checkedSkuData)
            let _this = this;
            if(_this.addressList1.length==0) {
                _this.$message.error('请添加地址！');
                return false;
            } else {
                //[{"skuId":3,"quantity":2},{"skuId":2,"quantity":3}]；skuId：字面意义；quantity：数量
                let arr = [];
                let obj = {}
                _this.checkedSkuData.map((item) => {
                    obj = {
                        'skuId': '',
                        'quantity': ''
                    }
                    if(_this.getRequest().isCart == 'false') { // 直接下单
                        obj.skuId = item.id;
                    } else { // 购物车下单
                        obj.skuId = item.skuId;
                    }
                    obj.quantity = item.quantity;
                    arr.push(obj)
                })
                console.log(arr)
                _this.mallPay(JSON.stringify(arr),_this.addressId,'');
            }
        },
        /* 接口地址：  member/address/update
        * id long 是  收货地址id
        * userId string 否  用户id
        * name string 是  用户姓名
        * mobile string 是  手机号
        * province string 是  省code
        * city string 是  市code
        * area string 是  区code
        * address string 是  详细地址
        * isDefault int 是  是否默认 0：否 1：是 */
        async update_address(id, name, mobile, valueProvince, valueCity, valueOrigin, address, isDefault) {
            let _this = this;
            let params = {
                id: id,
                name: name,
                mobile: mobile,
                province: valueProvince,
                city: valueCity,
                area: valueOrigin,
                address: address,
                isDefault: isDefault
            }
            _this.GLOBAL.isShowLoading = true;
            await _this.$api.update_address(qs.stringify(params),getCookie('accessToken'))
            _this.$message({
                message: '修改成功',
                type: 'success'
            });
            _this.add_addressVisible = false;
            _this.get_address();
        },
        // * 获取地址接口地址： member/address/list
        async get_address() {
            let _this = this;
            _this.GLOBAL.isShowLoading = true;
            let data = await _this.$api.get_address('',getCookie('accessToken'))
            data.map((item) => {
                if(item.isDefault == 1) {
                    _this.addressId = item.id;
                    _this.subAddress = item.provinceName + item.cityName + item.areaName + item.address;
                    _this.subConsignee = item.name;
                    _this.subPhone = item.mobile;
                }
            })
            _this.addressList1 = data.slice(0, 4);
            _this.addressList2 = data.slice(4);
        },

        // 支付addressId:收货地址id,couponId:满减券ID
        async mallPay(goodsInfo,addressId,couponId) {
            let _this = this;
            let param = {
                goodsInfo: goodsInfo,
                addressId: addressId, //收货地址id
                source: '7', //订单来源 1:ios 2:android 3:H5 4:微信小程序 5:第三方平台 6:其他 7:PC
                couponId: couponId, //满减券ID
                payMode: '4' //支付模式 2支付宝 3无卡 4云闪付
            }
            _this.GLOBAL.isShowLoading = true;
            let data = await _this.$api.pay(qs.stringify(param),getCookie('accessToken'))
            console.log(data)
            _this.orderId = data.orderId;
            window.open(data.payData);
            _this.$confirm('将前往订单详情页', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                showClose: false,
                type: 'info',
                center: true,
                closeOnClickModal: false,
            }).then(() => {
                _this.$router.push({path: '/orderDetail', query: {orderId: data.orderId}})
            });
        },
        // 乘法函数，用来得到精确的乘法结果
        //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
        //调用：accMul(arg1,arg2)
        //返回值：arg1乘以arg2的精确结果
        accMul(arg1,arg2) {
            var m=0,s1=arg1.toString(),s2=arg2.toString();
            try{m+=s1.split(".")[1].length}catch(e){}
            try{m+=s2.split(".")[1].length}catch(e){}
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
        },
        // url中传递参数时参数包含中文获取、
        getRequest() {
            var url = decodeURI(decodeURI(location.search)); //获取url中"?"符后的字串，使用了两次decodeRUI解码
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
                return theRequest;
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    .el-collapse {
        border: none !important;
    }

    .el-collapse-item__header {
        width: 50px;
        margin-left: calc(100% - 50px);
        margin-top: -90px;
        height: 90px !important;
        line-height: inherit !important;
        border: none !important;
        margin-bottom: 10px;
    }
    .el-collapse-item__content {
        overflow: hidden;
    }
    .orderConfirmation {
        font-size: 14px;
        padding-top: 38px;
        background-color: #f7f7f7;
    }
    .orderConfirmation .top-desc {
        margin: 0 auto;
        padding: 20px;
        width: 1160px;
        background-color: #fff;
    }

    .address-box {
        margin-bottom: 10px;
    }

    .address-item {
        width: 252px;
        padding: 10px 10px 0px 10px;
        border: 1px solid #999;
        cursor: pointer;
        float: left;
        margin-right: 10px;
        color: #999;
    }

    .address-item.active {
        border: 1px solid #f00;
        color: #333;
    }

    .address-msg {
        word-wrap: break-word;
        word-break: normal;
    }


    .settlement {
        background-color: #fff;
        padding: 20px 0;
        overflow: hidden;
        margin-top: 50px;
    }

    .settlement .settlement-box {
        margin: 0 auto 0;
        width: 1200px;
    }

    .settlement .settlement-box .settlement-box-cenyent {
        overflow: hidden;
        height: 70px;
        
    }

    .box-card {
        border: none !important;
    }

    .box-card .el-card__body {
        padding: 0;
    }

    .jiesuan-right {
        float: right;
    }

    .jiesuan-right span {
        font-size: 14px;
    }

    .jiesuan-right .settlement-btn {
        display: inline-block;
        width: 180px;
        line-height: 70px;
        background-image: linear-gradient(135deg, rgb(239, 197, 144) 0%, rgb(187, 141, 72) 100%);
        color: #fff;
        text-align: center;
        margin-left: 20px;
        cursor: pointer;
        float: right;
    }

    .jiesuan-right span.total,
    .jiesuan-right span.totalNumber {
        color: #f00;
        font-size: 24px;
    }
</style>
