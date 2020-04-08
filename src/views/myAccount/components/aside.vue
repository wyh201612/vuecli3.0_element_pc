<template>
    <div class="main-aside">
        <div class="main_aside_title">
            <div class="main_aside_title_content">
                <h2>我的账户</h2>
                <h3>MY ACCOUNT</h3>
            </div>
        </div>
        <ul>
            <li>
                <div class="text">
                    <router-link :to="'/myAccount/accountIinfo'">
                        <span :class="pathUrl=='/myAccount/accountIinfo'?'nav-select':''">账户信息</span>
                    </router-link>
                </div>
            </li>
            <li>
                <div class="text">
                    <router-link :to="'/myAccount/myOrderList'">
                        <span :class="pathUrl=='/myAccount/myOrderList'?'nav-select':''">我的订单</span>
                    </router-link>
                </div>
            </li>
            <li>
                <div class="text">
                    <router-link :to="'/myAccount/myBank'">
                        <span :class="pathUrl=='/myAccount/myBank'?'nav-select':''">我的银行卡</span>
                    </router-link>
                </div>
            </li>
            <li>
                <div class="text">
                    <router-link :to="'/myAccount/myAddress'">
                        <span :class="pathUrl=='/myAccount/myAddress'?'nav-select':''">我的地址</span>
                    </router-link>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
          pathUrl: this.$route.path
      }
    },
    computed: {
        path() {
          return this.$route.path;
        }
    },
    watch: {
        path(val){
            console.log(val)
            this.pathUrl = val;
        }
    },
    created() {

    },
    mounted() {

    },
    destroyed() {

    },
    methods: {

    }
  }

</script>

<style lang="scss" scoped>
    .main-aside {
        height: 100%;
        background-color: #fff;
        border-right: 1px solid #eeeeee;
        .main_aside_title {
            width: 260px;
            height: 131px;
            background-image: linear-gradient(135deg, #efc590 0%, #bb8d48 100%);
            position: relative;
            top: 0;
            text-align: center;
            .main_aside_title_content {
                width: 120px;
                height: 54px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-60px,-27px);
                h2 {
                    margin: 0;
                    height: 28px;
                    font-family: PingFangSC-Medium;
                    font-size: 20px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                }
                h3 {
                    margin: 0;
                    height: 17px;
                    font-family: Arial-ItalicMT;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #ffffff;
                }
            }
        }
        ul {
            list-style: none;
            height: calc(100% - 131px);
            padding: 0;
            li .text {
                background-color: #fff;
                padding: 20px 0;
                border-bottom: 1px solid #eeeeee;
                span {
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-size: 16px;
                    display: block;
                    cursor: pointer;
                }
            }
            .nav-select {
                border-left: 4px #bb8d48 solid;
                color: #bb8d48;
            }
        }
    }
</style>
