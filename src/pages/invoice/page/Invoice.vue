<template>
  <div class="hello">
      <header class='head_top'>
        <div class="back_btn"  @click="back"><span class="back"></span></div>
        <p class="title">填写发票</p>
      </header>
      <div class="tab">
        <div class="tab_tit">发票类型</div>
        <div class="options">
          <span class="needNot" :class="tabType===0?'active':''" @click="tabClick(0)">不需要</span>
          <span class="person" :class="tabType===1?'active':''" @click="tabClick(1)">个人</span>
          <span class="company" :class="tabType===2?'active':''" @click="tabClick(2)">公司</span>
        </div>
      </div>
      <ul class="mesitem">
        <li v-show="tabType===1 || tabType===2">
            <div class="box">
                <span class="left">开票项目</span>
                <span class="right"><input type="text" v-model="items" placeholder="请填写开票项目"></span>
            </div>
        </li>
        <li v-show="tabType===1 || tabType===2">
            <div class="box">
                <span class="left">开票金额</span>
                <span class="right"><input type="text" v-model="money" placeholder="请填写开票金额"></span>
            </div>
        </li>
        <li v-show="tabType===1 || tabType===2">
            <div class="box">
                <span class="left">发票抬头</span>
                <span class="right"><input type="text" v-model="tickets" placeholder="请填写发票抬头"></span>
            </div>
        </li>
        <li v-show="tabType===2">
            <div class="box">
                <span class="left">公司税号</span>
                <span class="right"><input type="text" v-model="num" placeholder="请填写公司税号"></span>
            </div>
        </li>
        <li v-show="tabType===1 || tabType===2">
            <div class="box">
              <span class="left">收件人</span>
              <span class="right"><input type="text" v-model="receiver" placeholder="请填写收件人"></span>
            </div>
        </li>
        <li v-show="tabType===1 || tabType===2">
            <div class="box">
                <span class="left">手机号码</span>
                <span class="right"><input type="text" v-model="phone" pattern="[0-9]*" placeholder="请填写手机号码"></span>
            </div>
        </li>
        <li v-show="tabType===1 || tabType===2">
            <div class="box">
                <span class="left">寄送地址</span>
                <span class="right"><input type="text" v-model="address" placeholder="请填写寄送地址"></span>
            </div>
        </li>
      </ul>
      <div class="tips">根据最新增值税管理办法，如需企业抬头发票，请填写有效税号信息。</div>
      <div class="remind">
        <div class="remind_tit"><span class="icon"></span> 房车生活家提醒：</div>
        <div class="remind_mes">
          <p>1、下单成功后，您可以在房车生活家手机APP下单时，填写发票抬头信息及配送地址，来索取发票。</p>
          <p>2、发票会在返程3天后开具并邮寄给您。</p>
        </div>
      </div>
      <!-- <footer><button>提交</button></footer> -->
      <!-- footer底部 -->
      <footer>
        <mt-button type="primary" @click="submitMes">提交</mt-button>
      </footer>
  </div>
</template>

<script>
import {C} from "@/common/connect";
import { isWeixin } from "@/common/utils";
import {
    Indicator,
    Toast
} from 'mint-ui';
export default {
  name: "Invoice",
  data() {
    return {
      // 判断选中哪种类型 0 表示不需要开发票
      tabType:0,
      msg: "Welcome to Your Vue.js App SCSS",
      name: "我是Invoice",
      lxl:{
      //  a:""
      },
      items:'', //开票项目
      money:'',//开票金额
      tickets:'',//发票抬头
      num:'',//税号
      receiver:'',//收件人
      phone:'',//手机号码
      address:''//寄送地址

    };
  },
  created() {

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

    },
    // tab栏选择
    tabClick(i){
      if(i === 0){
        this.tabType = 0;
      }else if(i === 1){
        this.tabType = 1;
      }else if(i === 2){
        this.tabType = 2;
      }
    },
    // 提交信息
    submitMes(){
      if(this.tabType == 1 || this.tabType == 2){
          if(this.items === ''){
            Toast({
                 message: '请填写开票项目',
                 duration: 2000
             });
             return
          }
          if(this.money === ''){
            Toast({
                 message: '请填写开票金额',
                 duration: 2000
             });
             return
          }
          if(this.tickets === ''){
            Toast({
                 message: '请填写发票抬头',
                 duration: 2000
             });
             return
          }
          if(this.tabType == 2){
            if(this.num === ''){
              Toast({
                  message: '请填写公司税号',
                  duration: 2000
              });
              return
            }
          }
          if(this.receiver === ''){
            Toast({
                 message: '请填写收件人',
                 duration: 2000
             });
             return
          }
          if(this.phone === ''){
            Toast({
                 message: '请填写手机号码',
                 duration: 2000
             });
             return
          }
          let reg = /^1[0-9]{10}$/;
          this.checkResult = reg.test(this.phone);
          if (this.checkResult === false) {
              Toast('手机号格式错误')
              return
          }
          if(this.address === ''){
            Toast({
                 message: '请填写寄送地址',
                 duration: 2000
             });
             return
          }
      }
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
  width: 100%;
  height: 100vh;
  background: #F1F1F1;
}
input{
  border: none;
  outline: none;
}
input::-webkit-input-placeholder {
  /* WebKit browsers */
   color: #D1D1D1;
   font-size: 14px;
}
// 头部样式
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
// tab栏样式
.tab{
  width: 100%;
  height: 90px;
  margin-top: 48px;
  background-color: #fff;
  padding: 11.5px 0 0 15px;
  .tab_tit{
    font-size: 15px;
    font-weight: 600;
    color: #333333;
    line-height: 21px;
    margin-bottom: 12.5px;
  }
  .options{
    font-size: 15px;
    color: #999;
    width: 100%;
    height: 90px;
    span{
      display: inline-block;
      width: 72px;
      height: 28px;
      border: 1px solid #C8C8C8;
      border-radius: 5px;
      text-align: center;
      line-height: 28px;
      margin-right: 20px;
    }
  }
}
.active{
    color: #00C892;
    border: 1px solid #00C892!important;
}
.mesitem{
  width: 100%;
  margin-top: 8px;
  background-color: #fff;
  margin-bottom: 6px;
  li{
    width: 100%;
    padding: 0 4%;
    margin: 0;
    height: 45px;
    line-height: 45px;
    .box{
        width: 92%;
        border-bottom: 0.5px solid #EAEAEA;
        .left{
          margin-right: 30px;
          display: inline-block;
          width: 18%;
          font-size: 14px;
          color: #999999;
          line-height: 20px;
      }
      .right{
        font-size: 14px;
        color: #333;
      }
    }
  }
}
.tips{
  width: 92%;
  height: 43px;
  padding: 0 4%;
  line-height: 18px;
  padding-top: 7px;
  font-size: 13px;
  color: #FFAA31;
  background: #FFFEF6;
  margin-bottom: 15px;
}
.remind{
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  .remind_tit{
    font-size: 14px;
    color: #666666;
    line-height: 22.5px;
    .icon{
      display: inline-block;
      margin-right: 6px;
      width: 12px;
      height: 12px;
      background: url(../assets/images/icon-question.png);
      background-size: 12px 12px;

    }
  }
  .remind_mes{
    font-size: 12px;
    color: #999999;
    line-height: 18px;
  }
}
footer{
  width: 92%;
  padding: 0 4%;
  position: fixed;
  left: 0;
  bottom: 20px;
  .mint-button{
    width: 100%;
    height: 45px;
    background: #00C892;
    border-radius: 7px;
    font-size: 19px;
    border: none;
    color: #FFFFFF;
    text-align: center;
  }
  .mint-button:after {
    background-color: rgba(255, 255, 255, 0.01);
  }
}
</style>
