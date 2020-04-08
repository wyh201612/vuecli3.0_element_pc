<template>
    <div class="main-content myBank">
        <div class="title">
            <el-divider direction="vertical" style="background-color: #bb8d48;"></el-divider>我的银行卡
        </div>
        <div class="bank_centent">
            <div class="band_bank_befor">
                <div class="tip">
                    <div>绑定的银行卡主要是满足您日常的大额订单交易；</div>
                    <div>并且，如果发生有大额度退货退款情况的，绑定的银行卡也将作为您的默认收款账户</div>
                    <div style="color: #b9730a;">绑定银行卡可以获得金豆+30哦</div>
                </div>
                <div class="title_">你还没有添加任银行账户信息，请填写：</div>
                <div class="form">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="选择银行" prop="bank">
                            <el-select v-model="ruleForm.bank" placeholder="请选择银行" class="bank_se">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="银行卡号" prop="bankCard">
                            <el-input v-model="ruleForm.bankCard" placeholder="输入银行卡号"></el-input>
                        </el-form-item>
                        <el-form-item label="预留手机号" prop="phone">
                            <el-input v-model="ruleForm.phone" maxlength="11" placeholder="输入预留手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="短信验证码" prop="code">
                            <el-input v-model="ruleForm.code" placeholder="输入短信验证码" class="code_input"></el-input>
                            <el-button type="primary">获取验证码</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">确定绑卡</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="band_bank_after" style="display: none;">
                <el-card class="box-card">
                    <div class="bank_top">
                        <div>
                            <img src="../../assets/images/guo_icon.png" alt="" class="bank_icon">
                            <span class="bank_name">建设银行</span>
                        </div>
                        <div class="xiane">
                            <div>单笔限额20万元</div>
                            <div>单日限额50万元</div>
                        </div>
                    </div>
                    <div class="bank_number">************6415</div>
                </el-card>
                <div class="tishi">
                    <div class="titlew">更换银行卡</div>
                    <div>为了确保您的账户资产安全，暂时不支持直接更换银行卡号，</div>
                    <div>若有这方面的需求，请先<el-button type="text">联系客服</el-button> 寻求帮助</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getToken, setToken, removeToken, getCookie, setCookie, removeCookie } from '@/utils/auth'
    import { mapState } from 'vuex'
    export default {
        name: 'myBank',
        components: {
        },
        data() {
            return {
                ruleForm: {
                    region: '',
                    bank: '',
                    phone: '',
                    code: ''
                },
                rules: {
                    bank: [
                        { required: true, message: '请选择银行', trigger: 'blur' }
                    ],
                    bankCard: [
                        { required: true, message: '请输入银行卡号', trigger: 'change' }
                    ],
                    phone: [
                        { required: true, message: '请输入预留手机号', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入短信验证码', trigger: 'blur' }
                    ],
                }
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
        },
        destroyed() {

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .myBank{
        .title{
            height: 60px;
            line-height: 60px;
            color: rgb(185, 115, 10);
        }
        .bank_centent{
            padding: 0 140px;
            .tip {
                background: #f7f7f7;
                padding: 20px 40px;
                font-size: 14px;
                line-height: 26px;
            }
            .title_ {
                font-size: 14px;
                margin: 30px 0;
            }
            .form {
                padding: 0 250px 0 0;
                .bank_se{
                    width: 100%;
                }
                .code_input {
                    width: 152px;
                }
            }
            .bank_top {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                .bank_icon {
                    vertical-align: middle;
                    width: 60px;
                    margin-right: 10px;
                }
                .bank_name {
                    font-weight: 600;
                }
            }
            .band_bank_after {
                padding: 0 110px;
                .xiane {
                    line-height: 32px;
                    font-size: 14px;
                }
                .tishi {
                    font-size: 14px;
                    line-height: 26px;
                    margin-top: 50px;
                    .titlew {
                        font-weight: 600;
                    }
                }
            }
            .bank_number {
                text-align: center;
                font-size: 32px;
                margin: 40px 0 20px 0;
            }
        }
    }
</style>
