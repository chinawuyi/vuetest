<template>
  <div class="confirmOrder-wrap">
    <header>
        <a onClick="javascript:history.back(-1);" class="back"></a>
        <span>预订须知</span>
    </header>
    <div class="confirmOrder-con">
        <div class="article">
          <p>
            1､在保证服务标准及不减少旅游景点的前提下，我社保留对游览次序进行调整的权利。<br>
            2､建议游客自愿购买旅游人身意外险及航空保险。（购买保险的客人，如在当地发生费用，请把当地医院盖章的诊断证明书、用药请单、病例、医药费收据一并带回，以便理赔；单证不全者，保险公司不予理赔）。<br>
            3､18岁以下未成年人需要至少一名家长或者成年旅客全程陪同。<br>
            4､出团通知书，最晚于出团前1天发送。若能提前确定，我们将会第一时间通知。为了不耽误您的行程，请您严格按照《出团通知书》要求，按规定时间到达指定地点。<br>
            5､70周岁以上老年人预订出游，须提供三级甲等以上的医院开具的《健康证明》并签署免责声明，并且本人需充分考虑自身健康状况能够完成本次旅游活动，谨慎出游，建议要有亲友陪同出游，如因旅游者自身身体原因引发疾病或其他损害由旅游者本人承担相关责任，敬请谅解。<br>
            6､为了确保旅游顺利出行，防止旅途中发生人身意外伤害事故，请旅游者在出行前做一次必要的身体检查，游客必须保证自身身体健康良好的前提下，参加旅行社安排的旅游行程，不得欺骗隐瞒，若因游客身体不适而发生任何意外，旅行社不承担责任。<br>
            7､不可抗力是指不能预见、不能避免并不能克服的客观情况。不可抗力、意外事件等不可归责于旅行社的客观原因包括但不限于，恶劣天气、自然灾害、战争、罢工、骚乱、飞机故障、航班保护、恐怖事件、政府行为、公共卫生事件等，造成旅游行程安排的交通服务延误、景区临时关闭、宾馆饭店临时被征用、出境管制、边境关闭、目的地入境政策临时变更、我国政府机构发布橙色及以上旅游预警信息等，均会导致旅游目的无法实现，旅行社不承担违约责任。<br>
            8､游客在旅游过程中应尊重旅游地风土人情和民族习俗，维护环境卫生、公共秩序，保护生态环境和文物古迹，尊重他人，以礼待人。<br>
            9､出门前请带好有效证件（如身份证等），并告知家人出游计划，保持通讯畅通，以便随时联系。
          </p>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        isI: /iphone/i.test(navigator.userAgent)
      }
    },
    methods: {
        // back() {
        //     this.$LS.backView(this, {});
        // }
    },
  };
</script>
<style lang="scss" scoped>
  .confirmOrder-con {
    background:#F5F5F5;
    padding-top: 48px;
    &.iphoneTop{
      padding-top:64px;
    }
  }
  
  .confirmOrder-wrap /deep/ .title{
    font-weight: 700;
  }
  
  .article{
    font-family:"PingFangSC-Regular", "Helvetica Neue", "Roboto", sans-serif;
    background-color: #fff;
    padding: 20px 15px 40px 15px;
    p{
      font-size: 13px;
      line-height: 20px;
      text-align: justify;
      color: #999999;
    }
  }
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        padding: 11.5px 15px 8.5px 15px;
        background: #fff;
        overflow: hidden;
        text-align: center;
        &.headerI {
            padding-top: 30.5px;
            height: 64px;
        }
        .back {
            float: left;
            margin-top: 3.5px;
            width: 10px;
            height: 18px;
            background: url('../assets/images/back.png');
            background-size: 10px 18px;
        }
        span {
            display: inline-block;
            height: 25px;
            font-size: 18px;
            font-weight: 600;
            padding-right: 22.4px;
            color: #333;
            letter-spacing: 0.8px;
        }
    }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .confirmOrder-con.iphoneTop {
      padding-top:88px;
    }
    .confirmOrder-con {
      padding-bottom:34px !important;
    }
  }
</style>




