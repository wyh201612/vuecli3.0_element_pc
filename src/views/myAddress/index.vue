<template>
    <div class="main-content">
        <el-card class="box-card" shadow="hover" style="margin-bottom: 20px;" v-for='(item, index) in addressList' :key="index">
            <div :class="item.isDefault==1?'address-box':''" style="position: relative;font-size: 14px;">
                <span class="el-icon-close"
                    style="position: absolute;top: 0;right: 0;cursor: pointer;" @click='del_address(item.id, item.isDefault)'></span>
                <div style="margin-bottom: 10px;">
                    <span style="min-width: 120px;display: inline-block;">收件人姓名: {{item.name}}</span>
                    <span style="margin-left: 30px;">{{item.mobile | changePhone(item.mobile)}}</span>
                </div>
                <div>
                    <span class="el-icon-location" :style="item.isDefault==1?'color: #409EFF':''"></span>
                    <span style="margin-right: 40px;">{{item.provinceName+item.cityName+item.areaName+item.address}}</span>
                    <el-button type="text" style="padding: 0;" v-if='item.isDefault==0' @click='update_address(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, 1)'>设置为默认</el-button>
                    <el-button type="text" style="padding: 0;" @click='modify_address(item.id, item.name, item.mobile, item.province, item.city, item.area, item.address, item.isDefault)'>修改地址</el-button>
                </div>
            </div>
        </el-card>
        <el-button type="primary" icon="el-icon-plus" @click='add_addressShow("ruleForm")'>添加地址</el-button>

        <!-- 添加地址 -->
        <el-dialog title="添加地址" :visible.sync="add_addressVisible" width="600px" center>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" :readonly='modify'></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="ruleForm.mobile" :readonly='modify' maxlength="11"></el-input>
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
        name: 'myAddress',
        components: {
        },
        data() {
            return {
                provinceList: [], // 省列表
                cityList: [], // 市列表
                originList: [], // 区列表
                cityOptions: [], // 市下拉框数据
                originOptions: [], // 区下拉框数据
                add_addressVisible: false, // 控制添加地址弹窗显示
                addressList: {}, // 地址列表
                modify: false, // 控制修改地址时输入框不能输入
                isDefault: 0,
                address_id: '', // 修改地址时候才有的id
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
                }
            }
        },
        watch: {

        },
        mounted() {
            this._getJsonData();
            this.get_address();
        },
        methods: {
            // 打开添加地址弹窗
            add_addressShow(formName) {
                this.add_addressVisible = true;
                this.modify = false;
                this.isDefault = 0;
                this.address_id = '';
                this.ruleForm = {};
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
            // 修改弹窗显示
            modify_address(id, name, mobile, province, city, area, address, isDefault) {
                console.log(id, name, mobile, province, city, area, address, isDefault);
                this.modify = true;
                this.address_id = id;
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
                    console.log(this.address_id, this.ruleForm.name, this.ruleForm.mobile, this.ruleForm.valueProvince, this.ruleForm.valueCity, this.ruleForm.valueOrigin, this.ruleForm.address, this.isDefault)
                    if (valid) {
                        this.update_address(this.address_id, this.ruleForm.name, this.ruleForm.mobile, this.ruleForm.valueProvince, this.ruleForm.valueCity, this.ruleForm.valueOrigin, this.ruleForm.address, this.isDefault);
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
                        console.log(this.cityList[index].children[0].value)
                    }
                })
            },
            // 选择区
            changeOrigin(val) {
                console.log(val)
                // this.originList.forEach((city, index) => {
                //     if (val.toString() === this.originList[index].value) {
                //         console.log(val)
                //         this.ruleForm.valueOrigin = val;
                //         // this.ruleForm.valueCity = this.cityList[index].value;
                //         // this.originOptions = this.cityList[index].children;
                //         // this.ruleForm.valueOrigin = this.cityList[index].children[0].value;
                //     }
                // })
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
            // * 获取地址接口地址： member/address/list
            async get_address() {
                let _this = this;
                this.GLOBAL.isShowLoading = true;
                let data = await _this.$api.get_address('',getCookie('accessToken'))
                _this.addressList = data;
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
            /* 接口地址：  member/address/delete/{id}
             * id long 是  收货地址id */
            async del_address(id,isDefault) {
                let _this = this;
                if(isDefault==1) {
                    _this.$message({
                        message: '默认地址不可删除',
                        type: 'error'
                    });
                    return false;
                }
                _this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.del_address_fn(id);
                })
            },
            async del_address_fn(id) {
                this.GLOBAL.isShowLoading = true;
                await this.$api.del_address('',getCookie('accessToken'),id);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.get_address();
            },
        }
    }

</script>

<style lang="scss" scoped>
    
.address-box::before {
    content: '';
    font-size: 12px;
    width: 0px;
    height: 0px;
    border-top: 40px solid transparent;
    border-left: 50px solid #bb8d48;
    position: absolute;
    bottom: -20px;
    left: -20px;
}

.address-box::after {
    content: '默认';
    font-size: 12px;
    color: #fff;
    height: 0px;
    position: absolute;
    bottom: 0;
    left: -16px;
}
</style>
