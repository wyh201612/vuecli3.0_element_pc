<template>
    <div class="login-container">
        <div class="main-login">
            <div class="login-content">
                <div class="login-pic">
                    <div class="login-form">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <div class="title">
                                <span class="short-login title-selected pannel">手机快捷登录</span>
                            </div>
                            <el-form-item label="" prop="loginName" label-width='0'>
                                <el-input v-model="ruleForm.loginName" maxlength='11' placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="code" label-width='0'>
                                <el-input v-model="ruleForm.code" class="inp-sm" maxlength='6' placeholder="请输入验证码"></el-input>
                                <span class="getCode" v-if="!showCode" @click="getCode">{{codeText}}</span>
                                <span class="reset-button" v-if="showCode">{{countdown}}s</span>
                            </el-form-item>
                            <el-form-item label="" prop="checked" label-width='0' style="margin-bottom: 20px;overflow: hidden;">
                                <el-checkbox-group v-model="ruleForm.checked">
                                    <el-checkbox name="type">记住我</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <div class="submit" v-on:keyup.13.native="submitForm('ruleForm')" @click="submitForm('ruleForm')">立即登录</div>
                        </el-form>
                        <div class="tip">
                            温馨提示：未注册用户登录后即自动注册成功
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { verificationCodeCkeck, verificationCodeCreate, login, logout, getInfo,revise_login_password } from '@/api/user'
    import { getToken, setToken, removeToken, getCookie, setCookie, removeCookie } from '@/utils/auth'
    import qs from 'qs'
    export default {
        name: 'Login',
        components: {

        },
        data() {
            var validateLoginNames = (rule, value, callback) => {
                var regMobile = /^[1]\d{10}$/;
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else if(!regMobile.test(value)){
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };
            return {
                countdown: 60,
                time1:　null,
                codeText: '获取验证码',
                showCode: false,
                ruleForm: {
                    loginName: '',
                    code: '',
                    checked: false
                },
                rules: {
                    loginName: [
                        { validator: validateLoginNames, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        watch: {

        },
        created() {
            
        },
        mounted() {
            console.log(this.$route.query.url)
            var _this = this;
            document.onkeydown = function(e) {
                let key = window.event.keyCode;
                if (key == 13) {
                    _this.submitForm('ruleForm');
                }
            };
        },
        destroyed() {

        },
        methods: {
            async getCode(obj) {
                let _this = this;
                let data = {
                    loginType: "3", // 登陆类型 1：管理员 2：普通用户 3：会员用户
                    loginSource: 1, // 登陆客户端 1：pc
                    type: "6", // 类型 1：注册验证码 2：修改密码验证码 3：忘记密码验证码 4：验证身份验证码 5.管理员登陆 6快捷登陆
                    loginName: _this.ruleForm.loginName
                }
                var regMobile = /^[1]\d{10}$/;
                if (_this.countdown == 60) {
                    if (_this.ruleForm.loginName === '') {
                        _this.$message({
                            showClose: true,
                            message: '请输入手机号码',
                            type: 'error'
                        });
                        return false;
                    } else if(!regMobile.test(_this.ruleForm.loginName)){
                        _this.$message({
                            showClose: true,
                            message: '请输入正确的手机号码',
                            type: 'error'
                        });
                        return false;
                    }
                    verificationCodeCreate(qs.stringify(data)).then(res => {
                        console.log({res})
                        if (res.code == 200) {
                            _this.$message({
                                showClose: true,
                                message: '发送成功',
                                type: 'success'
                            });
                            //倒计时
                            _this.timer();
                        } else {
                            _this.$message({
                                showClose: true,
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                }
            },
            timer() {
                let _this = this;
                _this.time1 = setInterval(function () {
                    _this.setTime()
                }, 1000)
            },
            setTime() {
                let _this = this;
                if (_this.countdown <= 0) {
                    _this.showCode = false;
                    _this.countdown = 60;
                    setTimeout(function () {
                        _this.codeText = "重新获取";
                    }, 5000)
                    clearInterval(_this.time1);
                    return;
                } else {
                    _this.showCode = true;
                    _this.countdown--;
                }
            },
            submitForm(formName) {
                console.log(this.$route.query.redirect)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm)
                        this.loading = true
                        this.$store.dispatch('user/login', this.ruleForm)
                            .then(() => {
                            this.$message({
                                message: '登录成功！',
                                type: 'success'
                            });
                            if(this.$route.query.url == location.hostname) {
                                this.$router.go(-1)
                            } else {
                                this.$router.push({ path: '/myAccount/accountIinfo' })
                            }
                            this.loading = false
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }

</script>

<style lang="scss" scoped>
    .main-login {
        width: 100%;
        height: 500px;
        background: url(../../assets/images/login_banner_image.png) center;
        .login-pic {
            width: 1200px;
            position: relative;
            top: 0;
            left: 50%;
            margin-left: -600px;
            height: 500px;
        }
        .login-form {
            position: absolute;
            right: 0;
            top: 60px;
            width: 400px;
            height: 360px;
            background-color: #fff;
            box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
            border-radius: 6px;
            padding: 0 40px;
            .title {
                width: 100%;
                height: 80px;
                line-height: 80px;
                font-size: 16px;
                color: #333;
                text-align: center;
                .title-selected {
                    width: 100%;
                    font-weight: bold;
                    color: #666666;
                }
            }
            .inp-sm {
                border: 0;
                width: 222px;
                float: left;
                overflow: hidden;
            }
            .getCode {
                display: block;
                float: right;
                font-size: 12px;
                width: 98px;
                height: 36px;
                line-height: 36px;
                color: #ffffff;
                background-color: #bb8d48;
                cursor: pointer;
                padding: 0 5px 0 5px;
                text-align: center;
            }
            .reset-button {
                display: block;
                float: right;
                font-size: 12px;
                width: 98px;
                height: 36px;
                line-height: 36px;
                color: #ffffff;
                background-color: #dddddd;
                border: 1px #ddd solid;
                padding: 0 5px 0 5px;
                text-align: center;
            }
            .submit {
                width: 320px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                background-image: linear-gradient(135deg, #efc590 0%, #bb8d48 100%);
                border-radius: 100px;
                font-family: 'PingFangSC-Medium', 'Source Han Serif SC';
                font-size: 18px;
                color: #ffffff;
                cursor: pointer;
            }
        }
        .tip {
            margin-top: 20px;
            font-size: 12px;
            text-align: center;
            color: #cccccc;
        }
    }
</style>
