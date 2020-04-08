<template>
    <div class="main-content accountIinfo">
        <div class="title">
            <el-divider direction="vertical" style="background-color: #bb8d48;"></el-divider>账户基本信息
        </div>
        <div class="info_centent">
            <div class="info_centent_top">
                <div class="info_centent_top_left">
                    <div class="avatar">
                        <img src="../../assets/images/guo_icon.png" alt="">
                    </div>
                    <div class="phone">
                        <span>{{loginName | changePhone(loginName)}}</span>
                    </div>
                </div>
                <div class="info_centent_top_right">
                    <div class="info">
                        <span>66</span>
                        <span>金豆</span>
                    </div>
                    <div class="info">
                        <span>6</span>
                        <span>优惠券</span>
                    </div>
                    <div class="info">
                        <span>0</span>
                        <span>待付款</span>
                    </div>
                </div>
            </div>
            <div class="info_centent_authbank">
                <div class="auth_item">
                    <div class="icon">
                        <img src="../../assets/images/guo_icon.png" alt="">
                    </div>
                    <div class="auth_msg1">
                        <div class="auth_title">实名认证</div>
                        <div>为了确保交易主体的合法权益，请先完成实名认证</div>
                    </div>
                    <div class="auth_msg2">
                        <span>未认证，</span>
                        <!-- <span>认证审核中</span> -->
                        <el-button type="text">立即认证</el-button>
                    </div>
                </div>
                <div class="auth_item">
                    <div class="icon">
                        <img src="../../assets/images/guo_icon.png" alt="">
                    </div>
                    <div class="auth_msg1">
                        <div class="auth_title">绑定银行卡</div>
                        <div>绑定银行卡便于大额交易，和作为接受退款的银行卡号绑卡成功可获得+30金豆</div>
                    </div>
                    <div class="auth_msg2">
                        <!-- <span>未认证，</span><el-button type="text">立即绑卡</el-button> -->
                        <img src="../../assets/images/guo_icon.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getToken, setToken, removeToken, getCookie, setCookie, removeCookie } from '@/utils/auth'
    import { mapState } from 'vuex'
    export default {
        name: 'accountIinfo',
        components: {
        },
        data() {
            return {
                userInfo: {}
            }
        },
        computed: {
            ...mapState({
                accessToken: state => state.user.accessToken,
                mobile: state => state.user.mobile,
                loginName: state => state.user.loginName
            }),
        },
        watch: {

        },
        created() {

        },
        mounted() {
            this.getUserAccount();
        },
        destroyed() {

        },
        methods: {
            // 获取用户信息
            async getUserAccount() {
                this.GLOBAL.isShowLoading = true;
                let data = await this.$api.getUserInfo('',getCookie('accessToken'));
                this.userInfo = data;
            },
        }
    }

</script>

<style lang="scss" scoped>
    .accountIinfo{
        .title{
            height: 60px;
            line-height: 60px;
            color: rgb(185, 115, 10);
        }
        .info_centent {
            overflow: hidden;
            .info_centent_top {
                margin-bottom: 20px;
                border: 1px solid #f1f1f1;
                overflow: hidden;
                .info_centent_top_left {
                    float: left;
                    overflow: hidden;
                    width: 30%;
                    border-right: 1px solid #f1f1f1;
                    padding: 50px 20px;
                    .avatar {
                        width: 60px;
                        height: 60px;
                        float: left;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 100%;
                        }
                    }
                    .phone {
                        float: left;
                        margin-left: 20px;
                        font-size: 22px;
                        span {
                            display: block;
                            margin: 10px 0;
                        }
                    }
                }
                .info_centent_top_right {
                    float: left;
                    overflow: hidden;
                    width: 70%;
                    padding: 55px 0;
                    .info {
                        width: 32%;
                        text-align: center;
                        line-height: 24px;
                        float: left;
                        span{
                            display: block;
                        }
                    }
                }
            }
            .info_centent_authbank {
                padding: 20px;
                overflow: hidden;
                .auth_item {
                    overflow: hidden;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    font-size: 14px;
                    margin-bottom: 30px;
                    .icon {
                        width: 60px;
                        height: 60px;
                        float: left;
                        margin-right: 20px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 100%;
                        }
                    }
                    .auth_msg1 {
                        float: left;
                        line-height: 30px;
                        flex: 2;
                        .auth_title {
                            font-weight: 600;
                        }
                    }
                    .auth_msg2 {
                        float: left;
                        flex: 1;
                        margin-left: 80px;
                        img {
                            width: 60px;
                            height: 60px;
                            border-radius: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
