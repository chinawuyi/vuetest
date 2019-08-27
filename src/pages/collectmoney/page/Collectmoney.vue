<template>
  <div class="hello">
    <header class='head_top'>
        <div class="back_btn"  @click="back"><span class="back"></span></div>
        <p class="title">收银台</p>
    </header>
    <div class="mainBox">
      <p class="productName"> {{productName}} </p>
      <p class="orderCode">订单编号：<span class="code"> {{ordercode}} </span></p>
      <p class="date">出发日期：<span class="date_"> {{date}} </span></p>
      <div class="line"></div>
      <div class="payMoney">全款支付：<i>¥</i><span class="money"> {{money}} </span></div>
    </div>
    <div class="tips">请于<span class="payTime"> {{needpayfor}} </span> 前完成付款，确保订单提交成功</div>
    <ul class="pay_way">
      <li class="clearfix">
        <div class="left"><span class="icon"></span> <span class="txt">微信</span> </div>
        <div class="right" @click="checkChoose" :class="ischoosing?'active':''"></div>
      </li>
    </ul>
    <!-- 退出模态框 -->
    <div class="popupAlert" v-show="alertShow">
      <div class="shadowLayer" @click="alertShow=false"></div>
      <div class="alerTip">
        <p>您的订单在30分钟内未支付将被取消，是否退出支付?</p>
        <div class="butto" @click="alertShow=false">
          <span class="btnt" @click="leave()">确认离开</span>
          <span class="btnd" @click="continuepayment()">继续支付</span>
        </div>
      </div>
    </div>
    <!-- footer底部 -->
    <mt-button type="primary" @click="gotopayment()">立即支付</mt-button>
  </div>
</template>

<script>
import {C} from "@/common/connect";
import { isWeixin } from "@/common/utils";
import * as pubMethods from '@/common/utils';
export default {
  name: "Collectmoney",
  data() {
    return {
      alertShow:false,//弹窗提示
      // 支付是否勾选 默认勾选
      ischoosing:true,
      msg: "Welcome to Your Vue.js App SCSS",
      name: "我是Collectmoney",
      lxl:{
      //  a:""
      },
      productName:'旅行产品名称旅行产品名称旅行产品名称旅行产品名称旅行产品名称',
      ordercode:'F001765341617',
      date:'2018.05.18',
      money:'13100',
      payfortime:'',
      needpayfor:'13:39'
    };
  },
  created() {
      // this.gotopayment();
      let productDetail = pubMethods.getStore('productDetail');
      let totalprice = pubMethods.getStore('totalprice');
      let orderCode = pubMethods.getStore('orderCode');
      console.log(orderCode,'orderCode');
      this.money = totalprice.data.totalAmt;
      // console.log(this.money,'this.money');
      this.productName = productDetail.productName;
      this.date = productDetail.tourDate;
      var now = new Date();
      // console.log(now.getHours(),':',now.getMinutes(),'now');
      // console.log(now.getTime(),'now.getTime()');
      var time = now.getTime() + 1000*60*30;
      // this.needpayfor = new Date(time).getHours()<10?'0'+new Date(time).getHours() :new Date(time).getHours()+ ':' + new Date(time).getMinutes()<10?'0'+new Date(time).getMinutes():new Date(time).getMinutes();
      this.needpayfor = new Date(time).getHours()+':'+new Date(time).getMinutes();
      // console.log(this.needpayfor);

      // C.getApi('rv-travel-mainpage/v1/featureWords',{},{
      //     headers: {
      //         'xxxxx': 'ddddd'
      //     }
      // }).then(data=>{
      //     //this.featureWords = data.data.resultList;
      //     console.log(data.data);
      //     console.log(this.featureWords);
      // });
  /* getInfo({
      cartkey: '39b813508b44e73a66bfddbb0563f91e',
      demandcartkey: '39b813508b44e73a66bfddbb0563f91e',
      provinceid: 1,
      province: 1,
      provincename: '上海',
      tradername: 'yw_app',
      trader: 'h5',
      closesignature: 'yes',
      signature_method: 'md5',
      timestamp: '1521771333651',
      signature: '****',
      siteid: 0
    }).then(data=>{
      console.log(data)
    })*/
  },
  methods:{
    // 返回上一页
    back(){
      this.alertShow = true;
    },
    // 确认离开
    leave(){
      window.location.href='./confirmorderstep2.html';
    },
    //继续支付
    continuepayment(){
      this.alertShow = false;
    },
    // 调支付接口
    gotopayment(){
      C.getApi('rv-rental-order-service/Payment/travelPayment', {
            'orderId': 'F36089700352',
             'wxOpenId':'oYelhwHv2o6OWR716WOP8AnRVVSQ'
        }, {}).then(data => {
            console.log(data,'data');
      });
    },
    checkChoose(){
      this.ischoosing = !this.ischoosing;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  // margin: 0 10px;
}
a {
  color: #42b983;
}
div{
  box-sizing: border-box;
}
*{
  margin: 0;
  padding: 0;
}
.hello{
  width: 100%;
  height: 100vh;
  background: #F1F1F1;
}
/*清除浮动*/
.clearfix:after , .clearfix:before {
    content: ".";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
}
.head_top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0 4%;
    width: 92%;
    height: 48px;
    border-bottom: 1Px solid #f1f1f1;
    background: #fff;

    &.head_i {
        border-bottom: 1px solid #f1f1f1;
        padding-top: 18px;
        height: 64px;
    }
    .title {
        width: 100%;
        text-align: center;
        font-size: 16px;
        line-height: 48px;
        color: #333;
        // @include pfr();
        font-family: PingFangSC-Medium;
        font-weight: 600;
    }
    .back_btn{
        width: 20px;
        height: 20px;
        float: left;
        margin-top: 15px;
        .back {
            float: left;
            width: 10px;
            height: 18px;
            background: url(../assets/images/back.png);
            background-size: 10px 18px;
            // @include bis('back.png');
         }
    }
}
.mainBox{
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  margin-top: 48px;
  padding: 15px;
  .productName{
    font-size: 16px;
    color: #333333;
    line-height: 22px;
    margin-bottom: 11px;
  }
  .orderCode{
    margin-bottom: 11px;
  }
  .orderCode,
  .date{
    font-size: 13px;
    line-height: 18px;
    color:#333;
  }
  .date{
    margin-bottom: 16.5px;
  }
  .line{
    width: 100%;
    border: 0.5px dashed #D8D8D8;
    margin-bottom: 13px;
  }
  .payMoney{
    font-size: 14px;
    color: #999999;
    letter-spacing: -0.34px;
  }
  i,
  .money{
    color: #FF7803;
  }
  i{
    font-size: 14px;
  }
  .money{
    font-size: 24px;
  }
}
.tips{
  width: 100%;
  height: 45px;
  font-size: 12px;
  text-align: center;
  color: #999999;
  line-height: 45px;
  background: #F1F1F1;
  .payTime{
    font-size: 12px;
    color: #101010;
  }
}
  .popupAlert {
      z-index: 666;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: fixed;
      background: rgba(51,51,51,0.30);
        .shadowLayer {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: rgba(51,51,51,0.30);
            z-index: 111;
        }
    .alerTip {
        box-sizing: border-box;
        width:65.3%;
        left:16%;
        height:145px;
        position:fixed;
        top:50%;
        margin-top:-82px;
        z-index:114;
        background: #fff;
        // background:$colorf;
        border-radius: 12px;
        // @include borderRadius(12px);
        text-align: center;
        overflow: hidden;
        p{
            box-sizing: border-box;
            font-size: 15px;
            width:100%;
            color: #333333;
            margin:0 auto;
            line-height:21px;
            text-align: center;
            padding:31px 20px 0 25px;
            font-family: PingFangSC-Medium;
            font-weight: 600;
        }
      .pop{
        padding: 0 13px 0 13px;
        margin-top: 20px;
        margin-bottom: 9px;
      }
      .word{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        text-align: justify;
        line-height: 17px;
        font-size: 12px;
        padding:0 15px;
        height: 100px;
      }
        .butto{
            position: absolute;
            left: 0;
            bottom: 0;
            border-top:1px solid #e0e0e0; 
            width: 100%;
            height: 45px;
            line-height:45px;
            letter-spacing: -0.38px;
            .btnt{
                width: 50%;
                font-size: 16px;
                height: 45px;
                // line-height: 45px;
                color: #666666;
                float: left;
                text-align: center;
            }
            .btnd{
                width: 50%;
                font-size: 16px;
                height: 45px;
                // line-height: 45px;
                color: #666666;
                display: inline-block;
                text-align: center;
                background-color: #00C892;
                color: #fff;
            }
        }
    }
    .alerTips{
      height:190px;
    }
}
.pay_way{
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 46px;
  li{
    box-sizing: border-box;
    width: 100%;
    line-height: 46px;
    height: 46px;
    padding: 0 15px;
    .left{
      float: left;
      .txt{
        font-size: 14px;
        color: #222222;
      }
      .icon{
        display: inline-block;
        vertical-align: text-bottom;
        width: 23px;
        height: 23px;
        margin-right: 10px;
        background: url(../assets/images/icon_wx.png) no-repeat;
        background-size: 27px 27px;
        margin-top: 12px;
      }
    }
    .right{
      margin-top: 15px;
      float: right;
      width: 18px;
      height: 18px;
      background: url(../assets/images/pay_nochoose.png);
      background-size: 18px 18px;
      &.active{
        background: url(../assets/images/pay_choosing.png);
        background-size: 18px 18px;
      }
    }
  }
}
.mint-button{
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 18px;
  border-radius: 0;
  width: 100%;
  height: 45px;
  background: #00C892;
}
</style>
