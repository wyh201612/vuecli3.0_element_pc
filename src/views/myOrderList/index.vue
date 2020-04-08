<template>
    <div class="main-content myOrderList">
        <div class="title">
            <el-divider direction="vertical" style="background-color: #bb8d48;"></el-divider>所有订单 {{total}}
        </div>
        <div style="padding: 0 0 20px 0;">
            <el-table ref="table" :data="tableData" border height="500" style="width: 100%;">
                <el-table-column label="订单编号" width="190">
                    <template slot-scope="scope">
                        <el-button type="text" @click='goOrderResult(scope.row.serial)'>{{scope.row.serial}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="商品" width="180">
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
                            <div>{{item.goodsPrice}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="money" label="订单总额"></el-table-column>
                <el-table-column prop="processCost" label="加工费" width="80"></el-table-column>
                <el-table-column prop="expressFee" label="运费" width="80"></el-table-column>
                <el-table-column prop="modifyTime" label="成交时间" width="100"></el-table-column>
                <el-table-column label="交易状态" width="100">
                    <template slot-scope="scope">
                        <!-- 1:待支付,2:订单关闭,3:支付成功-待发货,4:已发货-待收货,5:确认收货-已完成 -->
                        <div v-if="scope.row.status==1">
                            <el-tag type="danger">待付款</el-tag>
                        </div>
                        <div v-if="scope.row.status==2">
                            <el-tag type="info">订单关闭</el-tag>
                        </div>
                        <div v-if="scope.row.status==3">
                            <el-tag>待发货</el-tag>
                        </div>
                        <div v-if="scope.row.status==4">
                            <el-tag type="warning">待收货</el-tag>
                        </div>
                        <div v-if="scope.row.status==5">
                            <el-tag type="success">已完成</el-tag>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                style="text-align: center;padding-top: 20px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { getToken, setToken, removeToken, getCookie, setCookie, removeCookie } from '@/utils/auth'
    export default {
        name: 'myOrderList',
        components: {
        },
        data() {
            return {
                tableData: [], // 表格数据
                currentPage: 1,
                pageSize: 10,
                total: 0
            }
        },
        watch: {

        },
        mounted() {
            this.getOrderList(this.currentPage, this.pageSize);
        },
        methods: {
            /**
             * 接口名称： orderSearch
             * 接口用途： 商城订单查询(move)
             * method： GET
             * 接口地址：  all/new/order/search
             * orderType int 否  订单类型 1:商城订单 2:提金订单 3:换金订单
             * status int 否  订单状态 1:待支付,2:订单关闭,3:支付成功-待发货,4:已发货-待收货,5:确认收货-已完成
             * pageNum int 否  页数
             * pageSize int 否  pageSize
             */
            async getOrderList(pageNum, pageSize) {
                let params = {
                    pageNum: pageNum,
                    pageSize: pageSize
                }
                this.GLOBAL.isShowLoading = true;
                let data = await this.$api.getOrderList(params,getCookie('accessToken'));
                this.tableData = data.dataList;
                this.total = data.page.total;
            },
            // 每页多少条操作
            handleSizeChange(val) {
                this.pageSize = val;
                this.$refs.table.bodyWrapper.scrollTop =0;
                this.getOrderList(this.currentPage, this.pageSize);
            },
            // 分页操作
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$refs.table.bodyWrapper.scrollTop =0;
                this.getOrderList(this.currentPage, this.pageSize);
            },
            // 去订单详情
            goOrderResult(orderId) {
                this.$router.push({ path: '/orderDetail', query: {orderId: orderId}})
            }
        }
    }

</script>

<style lang="scss" scoped>
    .title{
        height: 60px;
        line-height: 60px;
        color: rgb(185, 115, 10);
    }
    .main-content-top {
        padding: 20px;
        border-bottom: 1px solid #eeeeee;
        font-size: 14px;
        .left {
            float: left;
            width: 270px;
            font-size: 14px;
            color: #666666;
            .user-name {
                font-size: 18px;
                color: #333333;
                margin: 10px 0 0 0;
            }
            span {
                display: block;
            }
        }
    }
</style>
