<template>
  <div class="dashboard-container">
    <div class="goods-banner"></div>
    <div class="shop">
        <h4>黄金金饰</h4>
        <p>海量精美好礼&nbsp;&nbsp;&nbsp;顺丰包邮</p>
        <ul class="shop-list clearfix">
            <li v-for="(item, index) in goodsList" :key="index">
                <router-link :to="{path:'/goldShopDetail',query: {id: item.id}}">
                    <p class="name">{{item.name}}</p>
                    <div class="img" :style="{'background-image': 'url('+item.imgUrl+')'}"></div>
                    <p class="price">￥{{item.minPrice}}<span class="under-line">￥{{item.minMarketPrice}}</span></p>
                </router-link>
            </li>
        </ul>
        <div class="bottom-tip clearfix">
            <div class="block">
                <img src="../../assets/images/sc_pinlei_image.png" alt="">
                <div>
                <p>品类齐全</p>
                <p>商品种类，应有尽有</p>
                </div>
            </div>
            <div class="block">
                <img src="../../assets/images/sc_kuaidi_image.png" alt="">
                <div>
                <p>快速配送</p>
                <p>闪电发货，极速送达</p>
                </div>
            </div>
            <div class="block">
                <img src="../../assets/images/sc_zhengpin_image.png" alt="">
                <div>
                <p>100%正品</p>
                <p>正规渠道，正品保证</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'goldShop',
    components: {

     },
    data() {
        return {
            goodsList: []
        }
    },
    computed: {
        
    },
    created() {
        
    },
    mounted() {
        this.getgoodsList();
    },
    methods: {
        async getgoodsList() {
            let params = {
                pageSize: 1000
            }
            this.GLOBAL.isShowLoading = true;
            let data = await this.$api.goodsList(params);
            this.goodsList = data.dataList;
        }
    },
}
</script>

<style lang="scss" scoped>
    .goods-banner {
        width: 100%;
        min-width: 1200px;
        height: 380px;
        background-image: url(../../assets/images/sc_banner_image.png);
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .shop {
        margin: 29px auto 0;
        width: 1200px;
        padding-bottom: 45px;
        h4 {
            font-size: 18px;
            line-height: 24px;
            color: #333333;
            font-weight: normal;
            margin: 0;
        }
        p {
            padding-top: 12px;
            font-size: 12px;
            line-height: 16px;
            color: #999999;
            margin: 0;
        }
        .shop-list {
            list-style: none;
            padding: 0;
            margin: 20px 0 0 0;
            li {
                float: left;
                padding: 20px;
                margin: 15px 13px;
                font-size: 12px;
                width: 280px;
                border-radius: 8px;
                background-color: #ffffff;
                border: solid 1px #ffffff;
                box-sizing: border-box;
                transition: all 0.3s;
                -ms-transition: all 0.3s;
                -moz-transition: all 0.3s;
                -webkit-transition: all 0.3s;
                -o-transition: all 0.3s;
                &:nth-of-type(4n+1) {
                    margin-left: 0;
                }
                &:nth-of-type(4n) {
                    margin-right: 0;
                }
                &:hover {
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
                .name {
                    padding-bottom: 20px;
                    font-size: 14px;
                    line-height: 20px;
                }
                .img {
                    margin-bottom: 16px;
                    width: 100%;
                    height: 148px;
                    background-size: contain;
                    background-position: center center;
                    background-repeat: no-repeat;
                }
                .price {
                    line-height: 20px;
                    font-size: 14px;
                    color: #ff0000;
                }
                .price span {
                    float: right;
                    color: #999999;
                    text-decoration: line-through;
                }
            }
        }
        .bottom-tip {
            margin-top: 50px;
            .block {
                float: left;
                padding: 37px 92px;
                background-color: #fff;
                margin-left: 58px;
                overflow: hidden;
                &:first-child {
                    margin-left: 0;
                }
                div {
                    overflow: hidden;
                }
                img {
                    float: left;
                    width: 35px;
                    margin-right: 15px;
                    margin-top: 26px;
                }
                p {
                    padding-top: 0;
                    font-size: 14px;
                    color: #999999;
                    line-height: 20px;
                }
            }
        }
    }
</style>