<template>
    <div class="payResult">
        <div class='content' style="overflow: hidden;height: auto;text-align: center;padding: 80px 0;">
            <i class="el-icon-circle-check success" v-if='status=="TRADE_SUCCESS"' style="font-size: 120px;"></i>
            <i class="el-icon-warning warning" v-else style="font-size: 120px;"></i>
            <div style="font-size: 24px;padding: 20px 0;" v-if='status=="TRADE_SUCCESS"'>订单支付成功</div>
            <div style="font-size: 24px;padding: 20px 0;" v-else>订单支付完成</div>
            <!-- <div style="font-size: 14px;padding: 10px 0;">（订单号：123232323232323）</div> -->
            <div style="font-size: 14px;padding: 10px 0;">实付金额：<span class="danger" style="font-size: 22px;">¥{{buyerPayAmount}}</span></div>
            <div style="padding: 20px 0;">
                <el-button @click='goGoodsList'>继续购物</el-button>
                <el-button @click='goMyOrder'>我的订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'payResult',
    components: {

    },
    data() {
        return {
            status: '',
            buyerPayAmount: '',
        }
    },
    computed: {
        
    },
    filters: {
        
    },
    created() {
        
    },
    mounted() {
        this.status = window.location.href.split("status=")[1];
        var bbb = window.location.href.split("buyerPayAmount=")[1];
        var ccc= bbb.split("&")[0];
        this.buyerPayAmount = this.regFenToYuan(ccc)
        this.$message({
            message: '恭喜您，购物成功获得金豆 +20',
            type: 'success'
        });
        console.log(this.status)
        console.log(bbb)
        console.log(this.regFenToYuan(this.buyerPayAmount))
    },
    methods: {
        // 分转化为元 - 正则解决精度
        regFenToYuan(fen){
            var num = fen;
            num=fen*0.01;
            num+='';
            var reg = num.indexOf('.') >-1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
            num=num.replace(reg,'$1');
            num = this.toDecimal2(num)
            return num
        },
        // 强制保留2位小数，如：2，会在2后面补上00.即2.00
        toDecimal2(x){
            var f = parseFloat(x);
            if (isNaN(f)) {
                return false;
            }
            var f = Math.round(x * 100) / 100;
            var s = f.toString();
            var rs = s.indexOf('.');
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + 2) {
                s += '0';
            }
            return s;
        },
        goGoodsList() {
            this.$router.push({path: "/goldShop"})
        },
        goMyOrder() {
            this.$router.push({path: "/myAccount/myOrderList"})
        },
    },
}
</script>

<style lang="scss" scoped>
.payResult {
    width: 1200px;
    margin: 40px auto;
    background-color: #ffffff;
}
.content {
    padding-top: 40px;
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