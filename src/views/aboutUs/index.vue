<template>
  <div class="aboutUs-container">
    <div class="main">
      <div class="container clearfix">
        <img src="../../assets/images/brandStory1.png" alt="" class="brandStory">
        <img src="../../assets/images/brandStory2.png" alt="" class="brandStory brandStory2">
        <div class="item">
          <div class="title">
            <span>品牌介绍</span>
          </div>
          <div class="item-item">
            <div class="sm-title">
              <span class="circular"></span>
              <span class="ss-title">我们是谁</span>
            </div>
            <div class="item-centent">
              <div>我们是来自美女星球的年轻INGHONG，是女性心中的救美天使，我们懂生活，懂时尚！</div>
              <div>我们全心全意为广大女性提供完美品质、极具性价比的黄金饰品，坚信黄金可以美出自信，美出高贵，美出典雅。</div>
              <div>我们追求极致的用户体验，让女性绽放自信之美是我们的职责和能力。</div>
              <div>我们愿一直陪伴在女性身边，传播自信与快乐。</div>
            </div>
          </div>
          <div class="item-item">
            <div class="sm-title">
              <span class="circular"></span>
              <span class="ss-title">INGHONG介绍</span>
            </div>
            <div class="item-centent">
              <div>“INGHONG”是杭州应弘科技有限公司旗下研发的互联网化黄金珠宝O2O电商+线下金店模式平台，为消费者提供黄金珠宝饰品的购买、回收及闲置黄金处理，并为线下黄金珠宝行业提供产业轻资产助力。通过黄金珠宝饰品O2O平台的形式，打造一个黄金新零售模式的“互联网+黄金商城”O2O电商平台。</div>
            </div>
          </div>
          <div class="item-item">
            <div class="sm-title">
              <span class="circular"></span>
              <span class="ss-title">成长发展</span>
            </div>
            <div class="item-centent">
              <div>我们很年轻，但是我们有拼劲！我们懂生活，我们懂时尚，我们更懂您的需要！别看我们现在很年轻，但是我们很努力，很扎实，我们将用自己的青春努力交出一份优异的成绩单。</div>
              <div>未来，路还很长，我们想为大家做得更多、更好，为“让女性自信之美绽放”的使命而奋斗不息！</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <span>品牌特色</span>
          </div>
          <div class="item-item">
            <div class="sm-title">
              <span class="ss-title">“自信美文化”</span>
            </div>
            <div class="item-centent">
              <div>女性应该是美的，不管你是青春年少，还是成熟干练，亦或风韵优雅，由内而外，都应该散发自信之美。</div>
              <div>在黄金的世界中，黄金的气质一直是高贵而典雅的，但谁说只有高贵典雅的人才能拥有它？</div>
              <div>只要你够自信，就能驾驭并赋予黄金新的生命力，并相互搭配出不一样的精彩。</div>
              <div>2020年，INGHONG黄金让你更更美，更自信！</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="title">
            <span>品牌理念</span>
          </div>
          <div class="item-item">
            <div class="last-box">
              <div class="sm-title">
                <span class="circular"></span>
                <span class="ss-title">INGHONG使命</span>
              </div>
              <div class="item-centent">
                <div>让女性自信之美绽放</div>
                <div>以黄金产业链助力中小企业发展进步</div>
              </div>
            </div>
            <div class="last-box" style="padding-left: 7%;width: 33%;">
              <div class="sm-title">
                <span class="circular"></span>
                <span class="ss-title">INGHONG价值观</span>
              </div>
              <div class="item-centent">
                <div class="span-box">
                  <span>真诚</span>
                  <span>创新</span>
                  <span>奋斗</span>
                  <span>服务</span>
                  <span>品质</span>
                </div>
              </div>
            </div>
            <div class="last-box" style="text-align: right;">
              <div class="sm-title">
                <span class="circular" style="float: inherit;vertical-align: top;"></span>
                <span class="ss-title" style="float: inherit;">INGHONG愿景</span>
              </div>
              <div class="item-centent">
                <div>互联网黄金产业NO1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'aboutUs',
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
  .aboutUs-container {
    overflow: hidden;
    background-color: #ffffff;

    .main {
      overflow: hidden;
      width: 1200px;
      margin: 40px auto;

      .container {
        margin: 0 auto;
        width: 980px;
        min-height: 500px;
        .brandStory {
          width: 100%;
          float: left;
        }
        .brandStory2 {
          margin-bottom: 43px;
        }
        .item {
          overflow: hidden;
          width: 100%;
          .title {
            color: #EC501F;
            font-size: 24px;
            span{
              padding-bottom: 14px;
              border-bottom: 2px solid;
              display: inline-block;
            }
          }
          .item-item {
            .sm-title {
              overflow: hidden;
              margin-top: 24px;
              margin-bottom: 20px;
              .circular{
                float: left;
                width: 6px;
                height: 6px;
                background: #EC501F;
                border-radius: 100%;
                display: inline-block;
                margin-top: 4px;
                margin-right: 6px;
              }
              .ss-title {
                float: left;
                color: #1B1B1B;
                font-weight: 600;
                font-size: 16px;
              }
            }
            .item-centent {
              font-size: 14px;
              line-height: 26px;
              font-weight:400;
              color: #1B1B1B;
              padding-bottom: 6px;
              &:last-child {
                margin-bottom: 44px;
              }
            }
            .last-box {
              float: left;
              width: 33%;
              height: 167px;
              span {
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }

</style>
