<template>
    <div class="goldShopDetail-container">
        <div class="top-desc clearfix">
            <div class="left">
                <div class="img_one">
                    <pic-zoom :url="checkde_img" :scale="2"></pic-zoom>
                </div>
                <!-- <el-carousel type="card" arrow="always" :loop="false" :initial-index="1" indicator-position="none" :autoplay="false">
                    <el-carousel-item v-for="(items, index) in detail.pictureList" :key="index">
                        <div class="div2">
                            <img :src="items" class="headImgStyle" style="width: 100px;">
                        </div>
                    </el-carousel-item>
                </el-carousel> -->
                <div class="img-list">
                    <img v-for='(item, index) in detail.pictureList' :key="index" :src="item" :alt="item" :class="checkde_img_index==index?'img-list-img active':'img-list-img'" @mouseenter="change(item, index)">
                </div>
            </div>
            <div class="right">
            <div class="name clearfix">
                <div class="name-left">
                    <h4 v-if="detail.name" v-text='detail.name'></h4>
                    <p>
                        <span v-if="detail.title" v-text='detail.title'></span>
                    </p>
                </div>
            </div>
            <dl class="tb-prop tm-sale-prop tm-clear" style="padding-top: 8px;">
                <div style="overflow:hidden;overflow: hidden;width: 50%;float: left;">
                    <dt class="tb-metatit">价格</dt>
                    <dd style="width: auto;margin-top: 2px;">
                        <div style="float: left;">
                            <span style="color: #f00;font-size: 18px;font-weight: 600;"> ￥ {{checkedSkuData.price}}</span>
                        </div>
                    </dd>
                </div>
                <div style="overflow:hidden;overflow: hidden;width: 50%;float: left;">
                    <dd style="width: auto;margin-top: 2px;">
                        <div style="float: left;">
                            <span style="text-decoration: line-through;color: #838383;font-size: 14px;">市场价 ￥ {{checkedSkuData.marketPrice}}</span>
                        </div>
                    </dd>
                </div>
            </dl>
            <dl class="tb-prop tm-sale-prop tm-clear">
                <dt class="tb-metatit">黄金克重</dt>
                <dd>
                    <div style="line-height: 32px;font-size: 16px;color: #666;">{{checkedSkuData.gram}} 克</div>
                </dd>
            </dl>
            <dl class="tb-prop tm-sale-prop tm-clear">
                <dt class="tb-metatit">选择规格</dt>
                <dd>
                    <ul data-property="套餐类型" class="tm-clear J_TSaleProp">
                        <li v-for='(item, index) in detail.skuList' :key="index" @click='item.stock!=0 ? skuItemClick(index,item) : ""'>
                            <a href="javascript:void(0)" :class="item.stock!=0?(skuItemIndex==index?'skuItem active':'skuItem'):'skuItem no-dro'">
                                <span data-spm-anchor-id="a220o.1000855.0.i11.70947fefACt5Nt">{{item.gram | gram}}克</span>
                            </a>
                        </li>
                    </ul>
                </dd>
            </dl>
            <dl class="tb-prop tm-sale-prop tm-clear">
                <dt class="tb-metatit">加工费</dt>
                <dd>
                    <div style="line-height: 32px;font-size: 14px;color: #666;">{{detail.processName}} 
                        <el-tooltip placement="right" effect="light">
                            <div slot="content" style="line-height: 24px;">模板名称：{{detail.processName}}<br/>商品类型：{{detail.type==1 ? "金条" : "金饰" }}<br/>加工费：{{detail.processCost}}元/克<br/>折扣：{{detail.discount}}</div>
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </div>
                </dd>
            </dl>
            <dl class="tb-prop tm-sale-prop tm-clear">
                <dt class="tb-metatit">数量</dt>
                <dd class="number" >
                    <input type="text" class="inputNum" v-model="buyNumber" @keyup="numberKeyup($event,checkedSkuData.id)">
                    <span class="numberSpanBox">
                        <span class="u-arrow u-arrow-up" @click="up(checkedSkuData.id)" style="margin-bottom: 3px;"><i style="margin-top: 4px;transform: rotate(-45deg);"></i></span>
                        <span class="u-arrow u-arrow-down" @click="down(checkedSkuData.id)"><i style="margin-bottom: 4px;transform: rotate(135deg);"></i></span>
                    </span>
                    <span style="color: #878787;vertical-align: middle;margin-left: 5px;">件</span>
                    <span style="margin-left: 20px;vertical-align: middle;">库存:{{checkedSkuData.stock}} 件</span>
                </dd>
            </dl>
            <div class="tb-action">
                <a href="javascript:void(0)" @click='addCart' class="addCart">加入购物车</a>
                <a href="javascript:void(0)" @click='buy' class="buy">立即购买</a>
            </div>
            <div class="label clearfix">
                <label v-for="(item, index) in detail.labelList" :key="index"><img :src="item.url" alt="">{{item.name}}</label>
            </div>
            </div>
        </div>
        <div class="bottom-detail">
            <div style="font-size: 18px;border-bottom: 1px solid #f1f1f1;">
                <span style="padding: 10px 0;display: inline-block;color:rgb(187, 141, 72); margin: 0 10px;cursor: pointer;" @click="goAnchor('#zz');">商品详情</span>
                <span style="padding: 10px 0;display: inline-block;color:rgb(187, 141, 72);margin: 0 10px;cursor: pointer;" @click="goAnchor('#aa');">保养提示</span>
                <span style="padding: 10px 0;display: inline-block;color:rgb(187, 141, 72);margin: 0 10px;cursor: pointer;" @click="goAnchor('#ss');">购买须知</span>
            </div>
            <div id="zz" class="detail-msg">
                <h2>基本参数</h2>
                <div class="detail-msg-div">
                    <span>品牌：{{detail.brandName}}</span>
                    <span>分类：{{detail.categoryName}}</span>
                    <span>是否限购：{{detail.isQuota==0?'不限购':detail.isQuota==1?'限购'+detail.quotaNum+'件':'限购'+detail.quotaWeight+'克'}}</span>
                </div>
                <div class="detail-msg-div">
                    <span>品质：{{detail.quality}}</span>
                    <!-- <span>每件克重：{{detail.brandName}}</span> -->
                    <span>克重范围：{{detail.minGram}}克~{{detail.maxGram}}克</span>
                    <span>限购时间：{{detail.isPrompt==0?'不限时间':detail.startPrompt+'-'+detail.endPrompt}}</span>
                </div>
                <div class="part1-detail" v-for="(item, index) in detail.imgList" :key="index">
                    <img :src="item" alt="">
                </div>
            </div>
            <div id="aa">
                <h2>保养提示</h2>
                <div class="part3-detail">{{detail.hint}}</div>
            </div>
            <div id="ss">
                <h2>购买须知</h2>
                <div class="part4-detail">{{detail.notice}}</div>
            </div>
        </div>
        <div class="fixd">
            <router-link :to="'/contactUs'"><div class="fankui">意见反馈</div></router-link>
            <!-- 回到顶部 -->
            <el-backtop :bottom="100" :visibility-height='500' class="backtop"></el-backtop>
        </div>
    </div>
</template>

<script>
import PicZoom  from '@/components/PicZoom'
import qs from 'qs'
import { getToken, setToken, removeToken, getCookie, setCookie, removeCookie } from '@/utils/auth'
export default {
    name: 'goldShopDetail',
    components: {
        PicZoom: PicZoom
    },
    data() {
        return {
            checkde_img: '',
            checkde_img_index: 0,
            detail: {},
            addressId: '',
            hasAddress: false,
            buyNumber: 1, // 购买数量
            checkedSkuData: {}, // 选中克重数据
            skuItemIndex: 0,
            orderId: '' // 支付返回的订单id
        }
    },
    computed: {
        
    },
    created() {
        
    },
    filters: {
        gram (value) {
            let realVal = '';
            if (!isNaN(value) && value!== '') {
                // 截取当前数据到小数点后两位
                realVal = value.toFixed(3);
            } else {
                realVal = '--';
            }
            return realVal;
        }
    },
    mounted() {
        console.log(this.$route.query.id)
        let id = this.$route.query.id;
        this.get_goodsDetail(id)
    },
    methods: {
        // 图片选择
        change(img,index) {
            this.checkde_img = img;
            this.checkde_img_index = index;
        },
        // 锚链接
        goAnchor(selector) {
            var anchor = this.$el.querySelector(selector);//获取元素
            if(anchor) {
                anchor.scrollIntoView(); //js的内置方法，可滚动视图位置至元素位置
            } 
        },
        // * 获取详情接口地址： member/address/list
        async get_goodsDetail(id) {
            let _this = this;
            _this.GLOBAL.isShowLoading = true;
            let data = await _this.$api.goodsDetail('',id)
            _this.detail = data;
            _this.checkde_img = data.pictureList[0];
            // 查询库存为0的时候，就去下一个数组数据
            let result = {};
            try {
              data.skuList.forEach((item, index) => {
                if (item.stock > 0) {
                  result = { index, ...item };
                  _this.skuItemIndex = index;
                  throw new Error(JSON.stringify(result));
                }
              });
            } catch (error) {}
            _this.checkedSkuData = result;
            // _this.checkedSkuData['totalprice'] = _this.accMul(_this.buyNumber,result.price);
            // _this.checkedSkuData['totalgram'] = _this.accMul(_this.buyNumber,result.gram);
            console.log('所选克重：',_this.checkedSkuData);
            _this.$nextTick(function () {
                
            })
        },
        // 下单购买
        buy() {
            console.log(this.buyNumber,this.checkedSkuData)
            let _this = this;
            if(getCookie('accessToken') && getCookie('accessToken') != 'null') {
                _this.checkedSkuData['imgUrl'] = _this.detail.imgUrl;
                _this.checkedSkuData['labelList'] = _this.detail.labelList;
                _this.checkedSkuData['name'] = _this.detail.name;
                _this.checkedSkuData['quantity'] = _this.buyNumber;
                _this.checkedSkuData['discount'] = _this.detail.discount;
                _this.checkedSkuData['processCost'] = _this.detail.processCost;
                _this.checkedSkuData['discountProcessCost'] = Number(_this.detail.discountProcessCost);
                _this.checkedSkuData['discountProcessCostAAA'] = '';
                console.log(_this.checkedSkuData)
                console.log(_this.detail.discountProcessCost)
                console.log(_this.buyNumber)
                console.log(_this.checkedSkuData.gram)
                this.$router.push({path: '/orderConfirmation',query: {freight: _this.detail.freight,isCart: 'false',checkedSkuData: encodeURI(JSON.stringify(_this.checkedSkuData))}})
            } else {
                this.$router.push({path: '/login' ,query: {url:location.hostname}})
            }
        },
        // 加入购物车
        addCart() {
            let _this = this;
            if(getCookie('accessToken') && getCookie('accessToken') != 'null') {
                _this.addCartFn();
            } else {
                _this.$router.push({path: '/login' ,query: {url:location.hostname}})
            }
        },
        /* skuId long 是  商品规格ID
        * quantity int 是  加入数量*/
        async addCartFn() {
            let data = {
                skuId: this.checkedSkuData.id,
                quantity: this.buyNumber
            }
            this.GLOBAL.isShowLoading = true;
            await this.$api.addCart(qs.stringify(data),getCookie('accessToken'));
            this.$eventHub.$emit("addCart");
            this.$message({
                message: '添加成功',
                type: 'success'
            });
        },
        // 选择sku选项
        skuItemClick(index,item) {
            this.skuItemIndex = index;
            this.checkedSkuData = { ...item };
            this.buyNumber = 1; // 每次切换数量变为1
        },
        // 数量输入
        numberKeyup(e,id) {
            let  flag = new RegExp("^[1-9]([0-9])*$").test(e.target.value); // 正整数
            if(e.target.value=='') { // 输入为空
                this.buyNumber = 1;
            } else { // 输入不为空
                if (!flag) { // 不是正整数，取整
                    this.buyNumber = parseInt(e.target.value);
                    if(this.buyNumber>=this.checkedSkuData.stock) { // 输入数量大于等于库存，就为库存数量
                        this.buyNumber = this.checkedSkuData.stock;
                    }
                } else { // 是正整数
                    if(this.buyNumber>=this.checkedSkuData.stock) { // 输入数量大于等于库存，就为库存数量
                        this.buyNumber = this.checkedSkuData.stock;
                    }
                }
            }
            // // 根据选中的sku里面的id和返回数据里面的id对比，一样取当前价格和克重
            // this.detail.skuList.map((item)=>{
            //     if(item.id==id) {
            //         this.checkedSkuData['totalprice'] = this.accMul(this.buyNumber,item.price);
            //         this.checkedSkuData['totalgram'] = this.accMul(this.buyNumber,item.gram);
            //     }
            // })
        },
        // 数量加
        up(id) {
            this.buyNumber++;
            if(this.buyNumber>=this.checkedSkuData.stock) { // 输入数量大于等于库存，就为库存数量
                this.buyNumber = this.checkedSkuData.stock;
            }
            // // 根据选中的sku里面的id和返回数据里面的id对比，一样取当前价格和克重
            // this.detail.skuList.map((item)=>{
            //     if(item.id==id) {
            //         this.checkedSkuData['totalprice'] = this.accMul(this.buyNumber,item.price);
            //         this.checkedSkuData['totalgram'] = this.accMul(this.buyNumber,item.gram);
            //     }
            // })
        },
        // 数量减
        down(id) {
            this.buyNumber--;
            if(this.buyNumber<=1) {
            this.buyNumber = 1;
            }
            // 根据选中的sku里面的id和返回数据里面的id对比，一样取当前价格和克重
            // this.detail.skuList.map((item)=>{
            //     if(item.id==id) {
            //         this.checkedSkuData['totalprice'] = this.accMul(this.buyNumber,item.price);
            //         this.checkedSkuData['totalgram'] = this.accMul(this.buyNumber,item.gram);
            //     }
            // })
        },
        // 乘法函数，用来得到精确的乘法结果
        //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
        //调用：accMul(arg1,arg2)
        //返回值：arg1乘以arg2的精确结果
        accMul(arg1,arg2){
            var m=0,s1=arg1.toString(),s2=arg2.toString();
            try{m+=s1.split(".")[1].length}catch(e){}
            try{m+=s2.split(".")[1].length}catch(e){}
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
        }
    },
}
</script>
<style lang="scss" scoped>
    .fixd {
        position: fixed;
        background-color: #fff;
        width: 60px;
        z-index: 5;
        right: 40px;
        bottom: 100px;
        box-shadow: 0 0 6px rgba(0,0,0,0.12);
        .fankui {
            height: 60px;
            line-height: 60px;
            font-size: 12px;
            color: rgb(187, 141, 72);
            text-align: center;
            cursor: pointer;
        }
        .backtop {
            position: initial;
            width: 60px;
            height: 60px;
            border-radius: 0;
            box-shadow: none;
            color: rgb(187, 141, 72);
            border-top: 1px solid rgb(187, 141, 72);
        }
    }
    .goldShopDetail-container {
        font-size: 14px;
        padding-top: 38px;
        padding-bottom: 50px;
    }
    .top-desc {
        margin: 0 auto;
        padding: 20px;
        width: 1200px;
        background-color: #fff;
    }
    .goldShopDetail-container .top-desc .left {
        width: 488px;
        float: left;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        .img_one {
            width: 350px;
            height: 350px;
            margin: 0 auto;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .img-list {
            overflow: hidden;
            margin-top: 10px;
            text-align: center;
            img {
                margin-right: 20px;
                width: 60px;
                height: 60px;
                cursor: pointer;
            }
            .active {
                border: 2px solid rgb(187, 141, 72);
            }
        }
    }
    .goldShopDetail-container .top-desc .right {
        float: left;
        margin-left: 40px;
        width: 632px;
        .name {
            padding-bottom: 24px;
            border-bottom: 1px solid #eeeeee;
             h4 {
                margin: 0;
                padding-top: 10px;
                padding-bottom: 10px;
                font-size: 22px;
                color: #333333;
                line-height: 22px;
                font-weight: normal;
            }
            p {
                font-size: 12px;
                color: #999999;
                line-height: 16px;
            }
        }
        .tb-prop {
            margin: 0;
            padding-bottom: 10px;
            overflow: hidden;
            .tb-metatit {
                color: #838383;
                text-align: left;
                float: left;
                width: 66px;
                margin-top: 6px;
            }
            ul {
                list-style: none;
                padding: 16px 0;
                margin: 0;
                border-bottom: 1px solid #eeeeee;
            }
            
        }
        .tm-sale-prop ul {
            padding: 0 !important;
            border-bottom: none !important;
            li {
                float: left;
                position: relative;
                margin: 0 4px 4px 0;
                line-height: 29px;
                vertical-align: middle;
                padding: 1px;
                a {
                    float: left;
                    background-color: #fff;
                    white-space: nowrap;
                    width: auto !important;
                    min-width: 10px;
                    padding: 0 9px;
                    text-align: center;
                    border: 1px solid #b8b7bd;
                    text-decoration: none;
                }

                a.active {
                    background-repeat: no-repeat;
                    background-position: 100% 17px;
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJUExURUxpcf8AN////7f4NBoAAAABdFJOUwBA5thmAAAAMUlEQVQI103MAQ4AMAQEQev/j66i6YrEXIKIX9jY2NjYyDmhZnlCo5rdyWvebfYDVAcSmABbA7WD+QAAAABJRU5ErkJggg==);
                    border: 1px solid #FF0036;
                }

                .no-dro {
                    cursor: no-drop !important;
                    color: #b8b7bd;
                }

                

            }
        }
    }
    .number .inputNum {
        font-size: 12px;
        padding: 3px 2px 0 3px;
        line-height: 26px;
        vertical-align: middle;
        margin: 0 6px 0 0;
        height: 26px;
        border: 1px solid #a7a6ac;
        width: 36px;
        background-position: -406px -41px;
        color: #666;
        outline: none;
    }

    .number .inputAddress {
        font-size: 12px;
        padding: 3px 2px 0 3px;
        line-height: 26px;
        vertical-align: middle;
        margin: 0;
        height: 26px;
        border: 1px solid #a7a6ac;
        width: 346px;
        background-position: -406px -41px;
        color: #666;
        outline: none;
    }

    .number .numberSpanBox {
        display: inline-block;
        vertical-align: middle;
    }

    .number .numberSpanBox .u-arrow {
        width: 16px;
        height: 12px;
        overflow: hidden;
        border: 1px solid #a7a6ab;
        display: block;
        font-family: tm-detail-font !important;
        line-height: 12px;
        font-size: 16px;
        cursor: pointer;
    }

    .top-desc .number .numberSpanBox .u-arrow.u-arrow-up i,
    .top-desc .number .numberSpanBox .u-arrow.u-arrow-down i {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-top: 1px solid #999;
        border-right: 1px solid #999;
        margin-left: 4px;
    }

    .tb-action .buy {
        display: inline-block;
        width: 200px;
        height: 50px;
        background-image: linear-gradient(135deg, rgb(239, 197, 144) 0%, rgb(187, 141, 72) 100%);
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        margin: 15px 0px 0px 36px;
        color: rgb(255, 255, 255);
    }

    .addCart {
        display: inline-block;
        width: 200px;
        height: 50px;
        background-image: linear-gradient(135deg, rgb(175, 6, 6) 0%, rgb(250, 146, 146) 100%);
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        margin: 15px 0px 0px 66px;
        color: rgb(255, 255, 255);
    }

    .label {
        padding-top: 20px;
    }

    .label label {
        float: left;
        display: block;
        width: 33%;
        color: #999999;
        line-height: 16px;
    }

    .label img {
        position: relative;
        top: 2px;
        margin-right: 6px;
        width: 15px;
    }
    
    .bottom-detail {
        width: 1200px;
        margin: 40px auto 0;
        padding: 30px 40px 35px;
        background-color: #fff;
    }

    .el-tabs__nav.is-top {
        transform: translateX(142%) !important;
    }

    .el-tabs__item.is-top {
        font-size: 18px;
    }

    .detail-msg {
        font-size: 14px;
        color: #666;
    }
    .detail-msg h2{
        margin-bottom: 12px;
    }
    .detail-msg .detail-msg-div{
        margin-bottom: 12px;
    }
    .detail-msg .detail-msg-div span{
        width: 18%;
        display: inline-block;
    }

    .bottom-detail .part1-detail {
        margin: 0 auto;
        width: 750px;
        text-align: center;
    }

    .bottom-detail .part1-detail img {
        max-width: 750px;
    }

    .bottom-detail .part2-detail p {
        margin-bottom: 24px;
        color: #666666;
        font-size: 14px;
        line-height: 16px;
    }

    .bottom-detail .part2-detail p:last-child {
        margin-bottom: 40px;
    }

    .bottom-detail .part2-detail span {
        color: #333;
    }

    .bottom-detail .part3-detail,
    .bottom-detail .part4-detail {
        margin-bottom: 40px;
        line-height: 28px;
        color: #666666;
        font-size: 14px;
        white-space: pre-wrap;
    }
</style>
