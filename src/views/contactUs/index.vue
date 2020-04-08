<template>
  <div class="contactUs-container">
    <div class="main">
        <div class="container clearfix">
            <div class="item">
                <div class="title">
                <span>客服服务</span>
                </div>
                <div class="centent1" style="overflow: hidden;">
                    <div class="item-box">
                        <div class="item-box-left">
                            <img src="../../assets/images/kefu.png" alt="" class="kefu">
                        </div>
                        <div class="item-box-right">
                            <span class="title-bold1">客服热线</span>
                            <span class="title-s">专业客服语音通话</span>
                            <span class="title-s">为您解决遇到的问题</span>
                            <span class="title-bold2">15258842755</span>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item-box-left">
                            <img src="../../assets/images/footer_erweima_image.png" alt="" class="kefu">
                        </div>
                        <div class="item-box-right">
                            <span class="title-bold1">INGHONG黄金 </span>
                            <span class="title-bold1">官方微信订阅号</span>
                            <span class="title-s" style="margin-top: 26px;">获取新品资讯，福利发放，商品优惠信息</span>
                        </div>
                    </div>
                </div>
                <div class="centent2" style="overflow: hidden;">
                    <div class="item-box">
                        <div class="item-box-right">
                            <div class="title-bold1">您的专属客服</div>
                            <div class="title-s">专业客服在线对话</div>
                            <div class="title-s">为您解决遇到的问题</div>
                            <div class="btn">立即咨询</div>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item-box-right">
                            <div class="title-bold1">您的专属客服</div>
                            <div class="title-s">您的意见帮助</div>
                            <div class="title-s">我们不断开进</div>
                            <div class="btn">立即反馈</div>
                        </div>
                    </div>
                    <div class="item-box">
                        <div class="item-box-right">
                            <div class="title-bold1">退换货</div>
                            <div class="title-s">如果遇到产品质量问题</div>
                            <div class="title-s">退换货请拨打客服热线</div>
                            <div class="kefuphone">15258842755</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item" style="margin-top: 42px;">
                <div class="title">
                    <span>联系我们</span>
                </div>
                <div class="centent3" style="overflow: hidden;">
                    <div class="map-title">欢迎来到INGHONG黄金商城。</div>
                    <div class="map-title">如需联系INGHONG黄金进行品牌、市场、流量、黄金资源合作请发邮件给我们哦！</div>
                    <div class="map-box">
                        <div id="map"></div>
                        <div class="mapMsg">
                            <div class="mapMsg_title">杭州应弘科技有限公司</div>
                            <div class="mapMsg_hezuo"><img src="../../assets/images/e-mall.png" alt=""> INGHONG市场商务合作</div>
                            <div class="mapMsg_w">BD@mayihuangjin.com</div>
                            <div class="mapMsg_address1"><img src="../../assets/images/address.png" alt=""> INGHONG总部地址</div>
                            <div class="mapMsg_address">浙江省杭州市拱墅区复地壹中心写字楼A幢5楼、6楼</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import { MP } from '@/baidu-map.js'
    export default {
        name: 'contactUs',
        components: {},
        data() {
        return {
            active: 1
        }
        },
        watch: {

        },
        created() {

        },
        mounted() {
            this.$nextTick(()=>{
                const _this = this
                MP().then(BMap => {
                    _this.initMap()
                })
            })
        },
        destroyed() {

        },
        methods: {
            initMap() {
                var map = new BMap.Map("map");  // 创建地图实例
                var point = new BMap.Point(120.115219,30.32567);
                map.enableScrollWheelZoom(true);
                map.centerAndZoom(point, 18);
                var myIcon = new BMap.Icon(require("../../assets/images/location-icon.png"), new BMap.Size(63,63),//可视区域
                {
                    imageOffset:new BMap.Size(0,0), // 图片相对视窗的偏移
                    imageSize: new BMap.Size(63,63) // 引用图片实际大小
                });
                var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
                map.addOverlay(marker2);              // 将标注添加到地图中
            }
        }
    }

</script>

<style lang="scss" scoped>
    .contactUs-container {
        overflow: hidden;
        background-color: #ffffff;
        .main {
            overflow: hidden;
            width: 1200px;
            margin: 0 auto;
            .container {
                margin: 0 auto;
                width: 1200px;
                min-height: 500px;
                background-color: #fff;
                .item {
                    overflow: hidden;
                }
                .title {
                    color: #EC501F;
                    font-size: 24px;
                    margin-top: 47px;
                    font-weight: bold;
                    span {
                        padding-bottom: 14px;
                        border-bottom: 2px solid;
                        display: inline-block;
                    }
                }
                .centent1 {
                    margin-top: 104px;
                    .item-box {
                        overflow: hidden;
                        float: left;
                        &:first-child {
                            margin-right: 187px;
                            margin-left: 206px;
                        }
                    }
                    .kefu {
                        width: 96px;
                        height: 96px;
                        vertical-align: top;
                    }
                    .title-bold1 {
                        font-size: 16px;
                        color: #1B1B1B;
                        margin-bottom: 7px;
                        font-weight: bold;
                    }
                    .title-s {
                        font-size: 14px;
                        color: #6E6E6E;
                        font-weight: 400;
                        line-height: 22px;
                    }
                    .title-bold2 {
                        font-size: 22px;
                        color: #EC501F;
                        margin-top: 16px;
                        font-weight: bold;
                    }
                    .item-box-left {
                        float: left;
                    }
                    .item-box-right {
                        float: left;
                        margin-left: 32px;
                        span {
                            display: block;
                        }
                    }
                }
                .centent2 {
                    margin-top: 114px;
                    .item-box {
                        float: left;
                        width: 32%;
                        .item-box-right {
                            text-align: center;
                            .title-bold1{
                                font-size:16px;
                                font-weight:bold;
                                color:rgba(27,27,27,1);
                                line-height:22px;
                                margin-bottom: 23px;
                            }
                            .title-s{
                                font-size:14px;
                                font-weight:400;
                                color:rgba(110,110,110,1);
                                line-height:22px;
                            }
                            .btn{
                                width:94px;
                                height:26px;
                                line-height: 26px;
                                background:rgba(204,204,204,1);
                                border-radius:8px;
                                font-size:14px;
                                margin: 18px auto 0;
                                text-align: center;
                                cursor: pointer;
                            }
                            .kefuphone{
                                font-size:14px;
                                font-family:PingFang SC;
                                font-weight:bold;
                                margin-top: 25px;
                                color:rgba(236,80,31,1);
                                line-height:22px;
                                text-align: center;
                            }
                        }
                    }
                }
                .centent3 {
                    font-size:14px;
                    font-family:PingFang SC;
                    font-weight:400;
                    color:rgba(110,110,110,1);
                    line-height:22px;
                    .map-title {
                        text-align: center;
                    }
                    .map-box {
                        position: relative;
                    }
                    #map {
                        height: 450px;
                        margin-top: 26px;
                        margin-bottom: 108px;
                    }
                }
            }
        }
    }

.mapMsg {
    width:300px;
    height:300px;
    background:rgba(255,255,255,1);
    opacity:0.8;
    border-radius:8px;
    position: absolute;
    z-index: 9;
    top: 76px;
    right: 106px;
    .mapMsg_title{
        font-size:20px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(236,80,31,1);
        line-height:22px;
        margin: 57px 0 40px 0;
        text-align: center;
    }
    .mapMsg_hezuo{
        font-size:16px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(27,27,27,1);
        line-height:22px;
        margin: 0 52px 0 49px;
        img{
            width: 14px;
            height: 14px;
        }
    }
    .mapMsg_w{
        font-size:14px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(27,27,27,1);
        line-height:22px;
        margin: 0 52px 0 68px;
    }
    .mapMsg_address1 {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(27,27,27,1);
        line-height:22px;
        margin: 22px 52px 0 49px;
        img{
            width: 14px;
            height: 14px;
        }
    }
    .mapMsg_address{
        font-size:14px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(27,27,27,1);
        line-height:22px;
        margin: 0 52px 0 68px;
    }
}
</style>
