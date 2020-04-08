<template>
  <div class="app-wrapper">
    <div class="header" :style="pathUrl=='/goldShopDetail'?'':'position: fixed'">
      <div class="head_top">
          <div class="main_head">
              <div class="main_head_title">
                  <span>服务时间：</span>
                  <span>(9：00-17：00)</span>
                  <span class="top-icon wx">
                      <div class="wx-qrcode">
                          <img src="../assets/images/footer_erweima_image.png">
                      </div>
                  </span>
                  <!-- <span class="top-icon wb">
                      <div class="wb-qrcode">
                          <img src="../images/qq-qrcode.png">
                      </div>
                  </span> -->
                  <div class="title_head_login">
                      <span class="hello">
                        <span>您好，</span>
                        <span style="color: #bb8d48;" v-if="accessToken=='' || accessToken==null || accessToken==undefined">欢迎来到黄金商城！</span>
                        <span style="color: #bb8d48;" v-else-if="loginName">{{loginName | changePhone(loginName)}}</span>
                      </span>
                      
                      <router-link :to="'/myAccount/myOrderList'" class="mayOrder">我的订单</router-link>
                      <router-link :to="'/cart'" class="cart"><el-badge class="item" :value="totalBuyNumbers">我的购物车</el-badge></router-link>
                      <router-link :to="'/news'" class="news"><el-badge is-dot class="item"><i class="el-icon-bell"></i></el-badge></router-link>
                      <span class="login-once" @click="login" v-if="accessToken=='' || accessToken==null || accessToken==undefined">立即登录</span>
                      <span class="login-once" @click="outLogin" v-else>退出</span>
                      <!-- <span style=" display:block; height: 8px; width: 1px; margin-right:18px;">|</span> -->
                      <el-divider direction="vertical"></el-divider>
                      <router-link :to="'/downloadApp'">
                        <span class="app_phone_icon">
                          <svg-icon icon-class="phone"></svg-icon>应弘黄金APP
                          <!-- <img src="../assets/images/top_shouji_icon.png" alt=""> -->
                          <div class="app_qrcode"></div>
                        </span>
                      </router-link>
                  </div>
              </div>
              <div class="clear"></div>
          </div>
      </div>
      <div class="header_tab">
        <section class="main_box">
            <div class="logo" style="float: left;" @click="toIndex">
                <img src="../assets/images/top_logo_image.png" alt="">
            </div>
            <ul class="page_menu">
                <li>
                    <router-link :to="'/index'"><a href="javascript:void(0)" :class="pathUrl=='/index'?'activeTitle':''">首页</a></router-link>
                    <span class="active" v-if="pathUrl=='/index'"></span>
                </li>
                <li><router-link :to="'/goldShop'"><a href="javascript:void(0)" :class="pathUrl=='/goldShop'?'activeTitle':''">黄金商城</a></router-link><span class="active" v-if="pathUrl=='/goldShop'"></span></li>
                <li><router-link :to="'/aboutUs'"><a href="javascript:void(0)" :class="pathUrl=='/aboutUs'?'activeTitle':''">品牌故事</a></router-link><span class="active" v-if="pathUrl=='/aboutUs'"></span></li>
                <li><router-link :to="'/myAccount/accountIinfo'"><a href="javascript:void(0)" :class="match('myAccount')?'activeTitle':''">我的账户</a></router-link><span class="active" v-if="match('myAccount')"></span></li>
            </ul>
        </section>
    </div>
    </div>
    <div class="main-container" :style="pathUrl=='/goldShopDetail'?'':'margin-top: 135px;'">
      <app-main @getCartFn='cartListFn' />
    </div>
    <footer class="footer">
      <div class="footer_content clearfix">
          <div class="about_us">
              <router-link :to="'/aboutUs'">
                <h3>品牌故事</h3>
              </router-link>
              <router-link :to="'/contactUs'">
                <h4>联系我们</h4>
              </router-link>
          </div>
          <div class="hotline">
              <h5>服务时间：工作日9：00-17：00</h5>
              <h5>在线邮箱：bd@mayihuangjin.com</h5>
          </div>
          <div class="footer_code">
              <div class="footer_code_wx">
                  <img src="../assets/images/footer_erweima_image.png" alt="">
                  <p>关注微信公众号</p>
              </div>
              <div class="footer_code_app">
                  <img src="../assets/images/apperweima.png" alt="">
                  <p>扫描下载APP</p>
              </div>
          </div>
      </div>
      <div class="footer_info">
          <p> 杭州应弘科技有限公司Copyright ©2018 黄金商城 <a target="_blank" href="http://www.beianbeian.com/beianxinxi/ca098459d9ffd58cb92bfd2f4b570dc6.html" style="color:#fff;">浙ICP备20004545号-1</a></p>
          <!-- <p style="margin-top: 5px;">
              <img src="../images/guo_icon.png" alt="" style="vertical-align: middle;"> <a target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010402004070"
              style="color: #fff;vertical-align: middle;">浙公网安备 33010402004070号</router-link>
          </p> -->
      </div>
  </footer>
  </div>
</template>

<script>
import { userOnline } from '@/api/user'
import { getToken, setToken, removeToken, getCookie, setCookie, removeCookie } from '@/utils/auth'
import qs from 'qs'
import { AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState,mapMutations } from 'vuex'

export default {
    name: 'Layout',
    data() {
      return {
        pathUrl: this.$route.path,
        newsaccessToken: this.$store.getters.accessToken,
        cartList: {},
        totalBuyNumbers: ''
      }
    },
    filters: {
    },
    components: {
        AppMain
    },
    mixins: [ResizeMixin],
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
            mobile: state => state.user.mobile
        }),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        },
        path() {
          return this.$route.path;
        },
        token() {
          return this.$store.getters.accessToken;
        }
    },
    created() {
      // 监听加入购物车
      this.$eventHub.$on("addCart", this.cartListFn);
    },
    mounted() {
      let _this = this;
      _this.getCurrentGoldPrice()
      if(_this.newsaccessToken && _this.newsaccessToken !='' && _this.newsaccessToken != 'null' && _this.newsaccessToken != 'undefined') {
        _this.cartListFn();
      }
      setInterval(function(){
        _this.getCurrentGoldPrice()
      },10000)
    },
    watch: {
      path(val){
        this.pathUrl = val;
        if(this.newsaccessToken && this.newsaccessToken!='' && this.newsaccessToken != 'null' && this.newsaccessToken != 'undefined') {
          this.cartListFn();
        }
      },
      token(val){
        this.newsaccessToken = val;
        this.onLine(val);
      }
    },
    methods: {
      ...mapMutations({
        SET_GOLDPRICE: 'user/SET_GOLDPRICE'
      }),
      getCurrentGoldPrice() {
        let _this = this;
        _this.GLOBAL.isShowLoading = false;
        let goldPrice = _this.$api.getCurrentGoldPrice('');
        goldPrice = Promise.resolve(goldPrice)
        goldPrice.then(function (result) {
          _this.SET_GOLDPRICE(result)
        })
      },
      match: function (obj) {
        if (this.$route.path.indexOf(obj) != "-1") {
          return true;
        } else {
          return false;
        }
      },
      outLogin() {
        this.$store.dispatch('user/logout').then(() => {
          this.$message({
              message: '登出成功！',
              type: 'success'
          });
          this.loading = false
          location.reload() // 为了重新实例化vue-router对象 避免bug
        }).catch(() => {
            this.loading = false
        })
      },
      toIndex() {
        this.$router.push({ path: '/index' })
      },
      login() {
        this.$router.push({ path: '/login' ,query: {url:location.hostname}})
      },
      onLine(accessToken) {
        if(!accessToken || accessToken=='' || accessToken == 'null' || accessToken != 'undefined'){
            this.$router.push({ path: '/login' ,query: {url:location.hostname}})
        } else {
            var timer = setInterval(function(){
              let data = {
                accessToken: accessToken
              }
              userOnline(qs.stringify(data)).then(res => {
                console.log(res)
                if(res.code==200) {
                } else {
                  setCookie('userId','')
                  setCookie('accessToken','')
                  setCookie('loginName','')
                  setCookie('mobile','')
                  setCookie('userId','')
                  this.$router.push({ path: '/login' })
                  clearInterval(timer);
                }
              })
            },10000)
        }
      },
      /* skuId long 是  商品规格ID
        * quantity int 是  加入数量*/
      async cartListFn() {
        this.GLOBAL.isShowLoading = true;
        let data = await this.$api.cartList('',getCookie('accessToken'));
        let number = 0;
        data.map((item) => {
            number += Number(item.quantity);
        })
        this.totalBuyNumbers = number;
        this.cartList = data;
      }
    },
    distroyed: function() {
        this.$eventHub.$off('addCart')
    }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
  }
  .header {
    width: 100%;
    top: 0;
    height: 135px;
    z-index: 1000;
    .head_top {
      width: 100%;
      height: 35px;
      background-color: #fff;
      position: relative;
      top: 0;
      left: 0;
      margin: 0 auto;
      border-bottom: 1px dashed #eeeeee;
      .main_head {
        width: 1200px;
        height: 34px;
        line-height: 34px;
        margin: 0 auto;
        .main_head_title {
          width: 1200px;
          line-height: 34px;
          height: 34px;
          font-size: 12px;
          span {
            color: #999;
          }
          .mayOrder {
            margin: 0 0 0 20px;
            color: #999;
            &:hover {
              color: #bb8d48;
            }
          }
          .news {
            margin: 0 0 0 20px;
            i {
              color: #999;
              font-size: 20px;
              vertical-align: middle;
            }
            .el-badge__content.is-fixed.is-dot {
                top: 10px;
            }
            &:hover i{
              color: #bb8d48;
            }
          }
          .cart {
            margin: 0 0 0 20px;
            color: #bb8d48;
          }
          .top-icon {
            height: 18px;
            background: url(../assets/images/footer_erweima_image.png) no-repeat;
            margin-top: 10px;
            cursor: pointer;
            position: relative;
          }
          .wx {
            width: 22px;
            background-position: 0 -24px;
            background: url(../assets/images/top_weixin_icon.png) no-repeat;
            background-size: 100% 100%;
            margin-left: 10px;
            &:hover {
              background: url('../assets/images/top_gl_weixin_image.png') no-repeat;
            }
            &:hover .wx-qrcode {
              display: block;
            }
            .wx-qrcode {
              position: absolute;
              width: 140px;
              height: 140px;
              left: -50px;
              top: 160%;
              border: 1px #ededed solid;
              display: none;
              background: #fff;
              z-index: 999;
              img {
                width: 120px;
                height: 120px;
                display: block;
                margin: 10px auto;
              }
            }
          }
          .wb {
            width: 16px;
            background: url('../assets/images/top_qq_icon.png') no-repeat;
            background-size: 100% 100%;
            margin-left: 10px;
            &:hover {
              background: url('../assets/images/top_gl_qq_image.png') no-repeat;
            }
            &:hover .wb-qrcode {
              display: block;
            }
            .wb-qrcode {
              position: absolute;
              width: 140px;
              height: 140px;
              left: -50px;
              top: 160%;
              border: 1px #ededed solid;
              display: none;
              background: #fff;
              z-index: 999;
            }
          }
          .title_head_login {
            float: right;
            .login-once {
              cursor: pointer;
              margin: 0 6px 0 18px;
              color: #0060ff;
              font-size: 12px;
              text-align: center;
            }
            .app_phone_icon {
              position: relative;
              top: 0;
              &:hover {
                color: #bb8d48;
              }
              &:hover .app_qrcode {
                display: block;
              }
              img {
                display: inline-block;
                width: 7px;
                height: 10px;
                margin-right: 6px;
              }
              .app_qrcode {
                position: absolute;
                width: 140px;
                height: 140px;
                left: -50px;
                top: 120%;
                border: 1px #ededed solid;
                display: none;
                background: #fff;
                z-index: 999;
                background-position: 0 -24px;
                background: url(../assets/images/apperweima.png) no-repeat;
                background-size: 100% 100%;
                margin-left: 10px;
                
              }
            }
          }
        }
      }
    }
    .header_tab {
      background-color: #ffffff;
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
      .main_box {
          width: 1200px;
          line-height: 100px;
          height: 100px;
          margin: 0 auto;
          position: relative;
          .logo {
            float: left;
            img{
                position: absolute;
              top: 50%;
              left: 0;
              height: 61px;
              margin-top: -30px;
              cursor: pointer;
            }
          }
          .page_menu {
              float: right;
              height: 100px;
              text-align: center;
              line-height: 100px;
              list-style: none;
              font-size: 16px;
              margin: 0;
              li {
                width: 64px;
                display: inline-block;
                margin-left: 45px;
                position: relative;
                a.activeTitle {
                    color: #bb8d48;
                }
                a {
                    width: 64px;
                    color: #333;
                    &:hover {
                    color: #bb8d48;
                  }
                }
                .active {
                  position: absolute;
                  bottom: 25px;
                  left: 22px;
                  width: 20px;
                  height: 2px;
                  background-color: #bb8d48;
              }
            }
          }
      }
    }
  }
  .main-container {
    
  }
  .footer {
    min-width: 1200px;
    background-color: #474d56;
    padding: 30px 0 10px 0;
    .footer_content {
      width: 1200px;
      margin: 0 auto;
      height: 135px;
      .about_us {
        width: 30%;
        float: left;
        h3 {
          height: 25px;
          font-family: PingFangSC-Medium;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
          margin-bottom: 15px;
        }
        h4 {
          line-height: 30px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #dddddd;
        }
      }
      .hotline {
        float: left;
        h5 {
          line-height: 30px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #dddddd;
        }
      }
      .footer_code {
        width: 20%;
        float: right;
        display: flex;
        display: -ms-flexbox;
        justify-content: space-between;
        font-size: 14px;
        color: #fff;
        text-align: center;
        .footer_code_wx img {
          width: 100px;
          height: 100px;
        }
        .footer_code_app img {
          width: 100px;
          height: 100px;
        }
        p {}
      }
    }
    .footer_info {
      line-height: 20px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      text-align: center;
      margin-top: 30px;
    }
  }
</style>
