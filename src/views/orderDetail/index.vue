<template>
    <div style="overflow: hidden;">
        <div class="orderDetail">
            <div style="padding: 20px 10px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/myAccount/myOrderList' }">我的订单</el-breadcrumb-item>
                    <el-breadcrumb-item>订单详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div style="padding: 20px;">
                <el-card class="box-card">
                    <div class="card-left" style="width: 30%;text-align: center;float: left;color: #606266;">
                        <div style="margin: 10px 0;">订单号: {{orderInfo.serial}}</div>
                        <!-- 1:待支付,2:订单关闭,3:支付成功-待发货,4:已发货-待收货,5:确认收货-已完成 -->
                        订单状态: <span style="margin-bottom: 10px;" :class="orderInfo.status==1?'danger':orderInfo.status==2?'info':orderInfo.status==3?'warning':orderInfo.status==4?'primary':'success'">{{orderInfo.status==1?'待支付':orderInfo.status==2?'订单关闭':orderInfo.status==3?'待发货':orderInfo.status==4?'待收货':orderInfo.status==5?'已完成':''}}</span>
                    </div>
                    <div class="card-right" style="width: 65%;float: left;padding-left: 4%;color: #606266;border-left: 1px solid #909399;">
                        <div style="margin: 10px 0;">提交时间：{{orderInfo.addTime}}</div>
                        <div style="margin-bottom: 10px;">
                            <span>买家：{{orderInfo.userName}}</span>
                            <span style="margin-left: 135px;">联系电话：{{orderInfo.userName}}</span>
                        </div>
                        <div style="margin-bottom: 10px;">收货地址：{{orderInfo.address}}</div>
                    </div>
                </el-card>
            </div>
            <div style="padding: 20px;">
                <el-card class="box-card">
                    <div class="card-left" :style="orderInfo.status==4||orderInfo.status==5?'width: 40%;float: left;color: #606266;border-right: 1px solid #909399;':'width: 40%;float: left;color: #606266;'">
                        <div style="margin: 10px 0;font-weight: 600;">订单信息</div>
                        <!-- <div style="margin-bottom: 10px;">支付方式： {{orderInfo.expressFee}}</div> -->
                        <!-- <div style="margin-bottom: 10px;">交易号：{{orderInfo.expressFee}}</div> -->
                        <div style="margin-bottom: 10px;">成交时间：{{orderInfo.expressFee}}</div>
                        <div style="margin-bottom: 10px;">付款时间：{{orderInfo.payTime}}</div>
                        <div style="margin-bottom: 10px;">取消时间：{{orderInfo.closeTime}}</div>
                        <!-- <div style="margin-bottom: 10px;">取消原因：{{orderInfo.expressFee}}</div> -->
                    </div>
                    <div class="card-right" style="width: 55%;float: left;padding-left: 4%;color: #606266;" v-if='orderInfo.status==4||orderInfo.status==5'>
                        <div style="margin: 10px 0;font-weight: 600;">配送信息</div>
                        <div style="margin: 10px 0;">配送方式： 顺丰快递</div>
                        <div style="margin: 10px 0;">运费： ¥{{orderInfo.expressFee}}</div>
                        <div style="margin: 10px 0;">发货时间：{{orderInfo.sendTime}}</div>
                    </div>
                </el-card>
            </div>
            <div style="padding: 20px;">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column label="商品" width="360">
                        <template slot-scope="scope">
                            <div v-for='(item,index) in scope.row.itemList' :key="index" style="overflow: hidden;">
                                <div style="float: left;">
                                    <img :src="item.imgUrl" alt="" style="width: 50px;">
                                </div>
                                <div style="float: left;width: calc(100% - 60px);font-size: 12px;margin-left: 10px;">
                                    <div>商品名称：{{item.goodsName}}</div>
                                    <div>克重：{{item.gram}} 克</div>
                                    <div>数量：X{{item.num}} 件</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价">
                        <template slot-scope="scope">
                            <div v-for='(item,index) in scope.row.itemList' :key="index" style="overflow: hidden;">
                                <div>￥{{item.goodsPrice}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="加工费">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.processCost}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="运费">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.expressFee}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="总金额">
                        <template slot-scope="scope">
                            <div>￥{{scope.row.money}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { getToken, setToken, removeToken, getCookie, setCookie, removeCookie } from '@/utils/auth'
export default {
    name: 'orderDetail',
    components: {

     },
    data() {
        return {
            orderInfo: {},
            tableData: [{
                'itemList':[],
                'money':'',
                'expressFee':'',
                'processCost':''
            }],
            status: '',
        }
    },
    computed: {
        
    },
    created() {
        
    },
    mounted() {
        this.getOrderStatus()
    },
    methods: {
        // 获取订单状态
        async getOrderStatus() {
            let _this = this;
            _this.GLOBAL.isShowLoading = true;
            let primary = {
                orderId: _this.$route.query.orderId
            }
            let data = await _this.$api.getOrderDetail_queryOrderStatus(primary,getCookie('accessToken'));
            _this.status = data.status;
            _this.getOrderDetail();
        },
        // 获取订单详情
        async getOrderDetail() {
            let _this = this;
            let data = await _this.$api.getOrderDetail('',getCookie('accessToken'),_this.$route.query.orderId);
            _this.orderInfo = data;
            _this.tableData[0].money = data.money;
            _this.tableData[0].expressFee = data.expressFee;
            _this.tableData[0].processCost = data.processCost;
            _this.tableData[0].itemList = data.itemList;
        }
    },
}
</script>

<style lang="scss" scoped>
    .content {
        position: relative;
        top: 95px;
        background-color: #f7f7f7;
        padding-top: 40px;
    }

    .orderDetail {
        width: 1200px;
        margin: 40px auto;
        background-color: #ffffff;
    }

    .el-card__body {
        overflow: hidden;
    }

    .success {
        color: #67C23A;
    }

    .warning  {
        color: #E6A23C;
    }

    .danger {
        color: #F56C6C;
    }

    .info {
        color: #909399;
    }

    .primary {
        color: #409EFF;
    }
</style>