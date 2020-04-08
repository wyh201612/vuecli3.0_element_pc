<template>
  <div class="downloadApp-container">
    <div class="main">
        <div class="nav">
            <div class="app_layout">
                <div class="app_content">
                    <div class="qr_code">
                        <img src="../../assets/images/apperweima.png" alt="">
                    </div>
                    <div class="download clearfix">
                        <a href="http://cdn.mayihuangjin.com/YinHongGold-V1.0.apk" target="_blank">
                            <div class="and_download">Android下载</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'downloadApp',
        components: {},
        data() {
            return {
                active: 1
            }
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
            
        }
    }

</script>

<style lang="scss" scoped>
    .downloadApp-container {
        overflow: hidden;
        background-color: #ffffff;
        .main {
            .nav{
                height: 580px;
                background: url(../../assets/images/login_banner_image.png) center no-repeat;
                position: relative;
                background-size: cover;
            }

            .app_layout{
                width:1200px;
                height: 580px;
                margin: 0 auto;
                position: relative;
                top: 0;
                left: 0;
            }

            .app_layout .app_content{
                width: 460px;
                position: absolute;
                right: 0;
                top: 286px;
            }
            .qr_code img{
                width: 150px;
                height: 150px;
            }

            .qr_code{
                float: left;
            }

            .download{
                width: 268px;
                float: right;
            }

            .ios_download{
                width: 268px;
                height: 68px;
                line-height: 68px;
                background-color: #810000;
                border-radius: 10px;
                margin-top: -5px;
            }
            .and_download{
                width: 268px;
                height: 68px;
                line-height: 68px;
                background-color: #810000;
                border-radius: 10px;
                margin-top: 24px;
            }
            .download a{
                font-size: 33.5px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 68px;
                letter-spacing: 0px;
                color: #ffffff;
                text-align: center;
            }
        }
    }

</style>
