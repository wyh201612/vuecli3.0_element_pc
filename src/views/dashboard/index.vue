<template>
  <div class="dashboard-container">
    <div>
        <el-carousel :interval="5000" arrow="never" height='380px'>
            <el-carousel-item v-for="item in 2" :key="item">
                <img src="../../assets/images/banner_image.png" alt="">
            </el-carousel-item>
        </el-carousel>
        <div class="login_box">
            <!-- 未登录 -->
            <div class="login_content" v-if="!accessToken">
                <h2>实时金价(元/克)</h2>
                <h3 class="font1">{{goldPrice}}</h3>
                <h4>参考上海黄金交易所金价实时变动</h4>
                <router-link :to="'/login'"><div class="login_button">已有账号？立即登录</div></router-link>
            </div>
            <!-- 已登录 -->
            <div class="login_after" v-if="accessToken">
                <div class="phone">您好，{{loginName | changePhone(loginName)}}</div>
                <h2>实时金价(元/克)</h2>
                <h3 class="font1">{{goldPrice}}</h3>
                <router-link :to="'/myAccount/accountIinfo'"><div class="login_button">个人中心</div></router-link>
            </div>
        </div>
    </div>
    <div class="app_code_box">
        <div class="app_code_tab clearfix">
            <div class="tab_info gold">
                <img src="../../assets/images/main_baok_image.png" alt="">
                <div class="tab_info_text ">
                    <h2>热门推荐</h2>
                    <h3>优雅金饰，时尚精致</h3>
                </div>
            </div>
            <div class="tab_info safe">
                <img src="../../assets/images/main_anquan_image.png" alt="">
                <div class="tab_info_text ">
                    <h2>安全保证</h2>
                    <h3>多重安全保障，零风险</h3>
                </div>
            </div>
            <div class="tab_info quality">
                <img src="../../assets/images/main_pinzhi_image.png" alt="">
                <div class="tab_info_text ">
                    <h2>品质卓越</h2>
                    <h3>权威机构认证，品质优良</h3>
                </div>
            </div>
            <!-- <div class="tab_info app_code">
                <img src="./images/apperweima.png" alt="">
                <div class="tab_info_text ">
                    <h2>黄金商城APP</h2>
                    <h3>黄金商城，百倍放心</h3>
                    <a href="./html/app.html">
                        <h4>查看详情</h4>
                    </a>
                </div>
            </div> -->
        </div>
    </div>
    <aside class="main">
        <div class="goods clearfix">
            <div class="goods_left">
                <router-link :to="'goldShop'"><div class="goods_left_content"></div></router-link>
            </div>
            <!-- {path:'/index',query: {name: id}} -->
            <div class="goods_list">
                <router-link v-for="(item, index) in goodsList" :key="index" :to="{path:'/goldShopDetail',query: {id: item.id}}" class='goods_info'>
                    {{item.name}}
                    <img :src="item.imgUrl">
                    <span class="selling_price">¥{{item.sellingPrice}}</span>
                    <span class="market_price">¥{{item.marketPrice}}</span>
                </router-link>
            </div>
        </div>
        <div class="partners">合作伙伴</div>
        <ul class="cooperate">
            <li><img src="../../assets/images/main_hezuo_jilin_image.png"></li>
            <li><img src="../../assets/images/main_hezuo_ykjh_image.png"></li>
            <li><img src="../../assets/images/main_hezuo_lvshi_image.png"></li>
            <li><img src="../../assets/images/main_hezuo_zhejiangdaxue_image.png"></li>
        </ul>
        <ul class="cooperate">
            <li><img src="../../assets/images/main_hezuo_yibao_image.png"></li>
            <li><img src="../../assets/images/main_hezuo_eqianbao_image.png"></li>
            <li><img src="../../assets/images/main_hezuo_aliyun_image.png"></li>
            <li><img src="../../assets/images/main_hezuo_wangyiyun_image.png"></li>
        </ul>
    </aside>
    <div class="fixd">
        <router-link :to="'/myAccount/accountIinfo'">
            <div class="fankui">
                <div class="icon" style="border-top: none;">应弘会员</div>
                <div class="fankui-s vip">应弘会员</div>
            </div>
        </router-link>
        <router-link :to="'/cart'">
            <div class="fankui">
                <div class="icon">购物袋</div>
                <div class="fankui-s cart">购物袋</div>
            </div>
        </router-link>
        <router-link :to="'/contactUs'">
            <div class="fankui">
                <div class="icon">联系客服</div>
                <div class="fankui-s contactCustomerService">联系客服</div>
            </div>
        </router-link>
        <router-link :to="'/downloadApp'">
            <div class="fankui">
                <div class="icon">下载APP</div>
                <div class="fankui-s download_app">
                    <div>去APP上探索你</div>
                    <div>查找的商品和福利</div>
                    <img src="../../assets/images/apperweima.png" alt="">
                </div>
            </div>
        </router-link>
        <div class="fff"></div>
        <!-- 回到顶部 -->
        <el-backtop :bottom="100" :visibility-height='500' class="backtop"></el-backtop>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Home',
    components: {

     },
    data() {
        return {
            goodsList: []
        }
    },
    computed: {
        ...mapState({
            sidebar: state => state.app.sidebar,
            device: state => state.app.device,
            showSettings: state => state.settings.showSettings,
            needTagsView: state => state.settings.tagsView,
            fixedHeader: state => state.settings.fixedHeader,
            accessToken: state => state.user.accessToken,
            mobile: state => state.user.mobile,
            loginName: state => state.user.loginName,
            goldPrice: state => state.user.goldPrice
        }),
    },
    created() {
        
    },
    mounted() {
       this.getgoodsList()
    },
    methods: {
        async getgoodsList(order_id,province,city,area,consignee,phone,address) {
            this.GLOBAL.isShowLoading = true;
            let data = await this.$api.goodsList();
            this.goodsList = data.dataList;
            this.goodsList = this.goodsList.slice(0, 3);
        }
    },
}
</script>

<style lang="scss" scoped>
    .login_box {
        position: absolute;
        width: 1200px;
        top: 0;
        left: 50%;
        margin-left: -600px;
        z-index: 999;
    }

    .login_after {
        position: absolute;
        right: 0;
        top: 60px;
        width: 300px;
        background-color: #ffffff;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
        border-radius: 16px;
        opacity: 0.8;
        z-index: 999;
        text-align: center;
        padding: 24px 0 37px 0;
    }

    .login_after .phone {
        height: 25px;
        font-family: PingFangSC-Thin;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
    }

    .login_after h2 {
          margin: 0;
        font-family: PingFangSC-Light;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
        padding-top: 25px;
    }

    .login_after h3 {
          margin: 0;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff0000;
        line-height: 45px;
        padding: 0 0 20px 0;
    }

    .login_after h4 {
          margin: 0;
        font-family: PingFangSC-Light;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
        padding: 16px 0 24px 0;
    }

    .login_after .login_button {
        width: 240px;
        height: 50px;
        background-image: linear-gradient(135deg,
                #efc590 0%,
                #bb8d48 100%);
        border-radius: 100px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        margin: 0 auto;
        line-height: 50px;
    }

    .login_after .login_button a {
        color: #ffffff;
    }

      .login_content {
        position: absolute;
        right: 0;
        top: 60px;
        width: 300px;
        background-color: #ffffff;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
        border-radius: 16px;
        opacity: 0.8;
        z-index: 999;
        text-align: center;
        padding: 40px 0;
    }

    .login_content h2 {
        margin: 0;
        font-family: PingFangSC-Light;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
    }

    .login_content h3 {
        margin: 0;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ff0000;
        line-height: 45px;
    }

    .login_content h4 {
        margin: 0;
        font-family: PingFang_Regular;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #666666;
        padding: 16px 0 24px 0;
    }

    .login_content .login_button {
        width: 240px;
        height: 50px;
        background-image: linear-gradient(135deg,
                #efc590 0%,
                #bb8d48 100%);
        border-radius: 100px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        margin: 0 auto;
        line-height: 50px;
    }

    .login_content .login_button a {
        color: #ffffff;
    }

    // 悬浮菜单
    .fixd {
        position: fixed;
        background-color: #fff;
        width: 60px;
        z-index: 5;
        right: 0;
        bottom: 170px;
        box-shadow: 0 0 6px rgba(0,0,0,0.12);
        a {
            height: 100%;
            .fankui {
                position: relative;
                font-size: 12px;
                color: rgb(187, 141, 72);
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                // overflow: hidden;
                // &:hover {
                //     overflow: initial;
                // }
                &:hover .icon{
                    color: #fff;
                    background: #bb8d48;
                }
                .icon {
                    height: 60px;
                    line-height: 60px;
                    background: #fff;
                    border-top: 1px solid rgb(187, 141, 72);
                }
                &:hover .vip {
                    left: -60px;
                }
                &:hover .cart {
                    left: -60px;
                }
                &:hover .contactCustomerService {
                    left: -60px;
                }
                &:hover .download_app {
                    width: 130px;
                    height: auto;
                    left: -130px;
                    top: -130px;
                }
            }
            .fankui-s {
                z-index: -1;
                position: absolute;
                top: 0;
                left: 0;
                font-size: 12px;
                cursor: pointer;
                text-align: center;
                transition: all 0.3s;
            }
            .vip {
                width: 60px;
                height: 61px;
                line-height: 60px;
                color: #fff;
                background: #bb8d48;
            }
            .cart {
                width: 60px;
                height: 61px;
                line-height: 60px;
                color: #fff;
                background: #bb8d48;
            }
            .contactCustomerService {
                width: 60px;
                height: 61px;
                line-height: 60px;
                color: #fff;
                background: #bb8d48;
            }
            .download_app {
                width: 0;
                height: 60px;
                top: 0;
                padding: 10px;
                color: #bb8d48;
                background: #fff;
                overflow: hidden;
                div {
                    padding: 10px 0;
                }
                img {
                    width: 100px;
                    height: 100px;
                }
            }
        }
        .backtop {
            position: initial;
            width: 60px;
            height: 60px;
            border-radius: 0;
            box-shadow: none;
            color: rgb(187, 141, 72);
            border-top: 1px solid rgb(187, 141, 72);
            margin-top: 1px;
        }
    }
    .app_code_box {
        background-color: #fff;
        .app_code_tab {
            width: 1200px;
            margin: 0 auto;
            background-color: #fff;
            height: 140px;
            .tab_info {
                height: 140px;
                float: left;
                margin: 0 70px;
                padding: 30px 0;
                img {
                    display: inline-block;
                    vertical-align: middle;
                }
                .tab_info_text {
                    display: inline-block;
                    vertical-align: middle;
                    h2 {
                        font-family: PingFangSC-Regular;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #bb8d48;
                    }
                    h3 {
                        font-family: PingFangSC-Light;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #999999;
                        line-height: 28px;
                    }
                }
            }
            .gold img, .safe img, .quality img {
                width: 48px;
                height: 48px;
                margin-right: 20px;
            }
            .gold {
                margin: 0;
                margin-right: 20px;
            }
        }
    }
    .main {
        width: 1200px;
        margin: 0 auto;
        background-color: #f7f7f7;
        padding-top: 40px;
        padding-bottom: 18px;
        .goods {
            height: 320px;
            background-color: #fff;
            .goods_left {
                float: left;
                width: 240px;
                height: 320px;
                background: url(../../assets/images/main_jinshi_image.png) no-repeat;
                background-size: 100% 100%;
                position: relative;
                top: 0;
                left: 0;
                .goods_left_content {
                    position: absolute;
                    bottom: 18px;
                    left: 70px;
                    width: 100px;
                    height: 30px;
                }
            }
            .goods_list {
                width: 900px;
                padding: 30px;
                float: right;
                .goods_info {
                    width: 260px;
                    height: 260px;
                    float: left;
                    background-color: #fff;
                    border: solid 1px #eeeeee;
                    font-size: 16px;
                    padding: 20px;
                    border-radius: 8px;
                    box-sizing: border-box;
                    transition: all 0.3s;
                    -ms-transition: all 0.3s;
                    -moz-transition: all 0.3s;
                    -webkit-transition: all 0.3s;
                    -o-transition: all 0.3s;
                    &:nth-child(2) {
                        margin: 0 30px;
                    }
                    &:hover {
                        color: #bb8d48;
                        border: solid 1px #fff;
                        cursor: pointer;
                        transform: translate(0, -10px);
                        -webkit-transform: translate(0, -10px);
                        -moz-transform: translate(0, -10px);
                        -ms-transform: translate(0, -10px);
                        -o-transform: translate(0, -10px);
                        box-shadow: 0 0 5px #bb8d48;
                        -webkit-box-shadow: 0 0 5px #bb8d48;
                        -moz-box-shadow: 0 0 5px #bb8d48;
                        -ms-box-shadow: 0 0 5px #bb8d48;
                        -o-box-shadow: 0 0 5px #bb8d48;
                    }
                    img {
                        display: block;
                        width: 144px;
                        height: 144px;
                        margin: 0 auto;
                        margin-top: 20px;
                        border: none;
                    }
                    .selling_price {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #ff0000;
                        float: left;
                        margin-top: 15px;
                    }
                    .market_price {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #999999;
                        float: right;
                        margin-top: 15px;
                        text-decoration: line-through;
                    }
                }
            }
        }
        .partners {
            height: 24px;
            font-family: PingFangSC-Light;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 24px;
            letter-spacing: 0px;
            color: #333333;
            margin: 30px 0;
        }
        .cooperate {
            list-style: none;
            display: flex;
            display: -ms-flexbox;
            justify-content: space-between;
            img {
                width: 200px;
                height: 100px;
            }
        }
    }
</style>