<template>
  <div class="orderdetail_con thead">
    <!-- 旅行订单-->
      <div id="jsheader" class="theader" ref="theaderTop" v-bind:class="{theader01:status01,theader02:status02,theader03:status03,theader04:status04,iphoneTop:isI }">
    <!-- 模态框 -->
        <div class="torder">
            <div class="imgback" @click="back"><img src="../assets/images/i_return_white.png" alt=""></div>
            <p>旅行订单</p>
            <div class="imgicus" @click="gotoCustomer" ><img src="../assets/images/i_cus.png" alt=""></div>
        </div>
        <div class="ofinish">
            <p class="ofish">
                <span class="status" v-if="status02"><img src="../assets/images/order_status02.png" alt=""></span>
                <span class="status" v-if="status01"><img src="../assets/images/order_status01.png" alt=""></span>
                <span class="status" v-if="status03"><img src="../assets/images/order_status03.png" alt=""></span>
                <span class="status" v-if="status04"><img src="../assets/images/order_status04.png" alt=""></span>
                
                <span>订单{{ this.orderStatusName }}</span>
            </p>

            <div class="pcount">
                <div class="text">
                    <div>
                      <span v-if="status04">恭喜您，订单已支付成功</span>
                      <div class="countdown" v-if="status02">
                       <span>支付倒计时：</span>

                        <div class="time" :class="{'isIphone':isI}">
                          <span class="nums">{{countDownMinute1}}<i></i></span>
                          <span class="nums">{{countDownMinute2}}<i></i></span>
                          <span>:</span>
                          <span class="nums">{{countDownSecond1}}<i></i></span>
                          <span class="nums">{{countDownSecond2}}<i></i></span>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="pmoney" @click="showDetail">
                    <span class="pay">{{paymentTxt}}</span>
                    <span class="price">
                       <span class="unite">￥</span>
                       <span class="money">{{ fee.travelComboAmt }}</span>
                    </span>
                    <img src="../assets/images/i_arr_money.png" />
                </div>

                </div>
        </div>
        <!-- <p class="process" v-if="status03">已成功发起退款流程，请耐心等待</p> -->
        <div class="line-header" v-show="lineShow"></div>
        <div v-if="status03">
           <!-- 订单已取消 展示 -->
            <p class="process" v-if="cancelTxt">{{cancelTxt}}</p>
        </div>
        <div>
          <div class="btn btn1" v-if="status01 || status03" @click="backHome"><span>再次预订</span></div>
          <div class="btn btn2" v-if="status04" @click="showButton"><span>取消订单</span></div>
          </div>
          <div class="btn btn3" v-if="status02"><span @click="showBtn">取消订单</span><span @click="payOrder">立即支付</span></div>


      </div>
      <!-- 订单模态框 -->
  
    <div class="popupAlert" v-show="alertShow">
      <div class="shadowLayer" @click="alertShow=false"></div>
      <div class="alerTip">
        <p>订单将会取消，是否取消订单？</p>
        <div class="butto" @click="alertShow=false">
          <span class="btnt">我再想想</span>
          <span class="btnd" @click="confirmCancel()">确定取消</span>
        </div>
      </div>
    </div>
    
    <div class="popupAlert" v-show="alerHide">
      <div class="shadowLayer" @click="alerHide=false"></div>
      <div class="alerTip alerTips">
        <p class="pop">取消政策</p>
        <p class="word">1､出行前2日取消订单解除合同，需支付40%的违约金（占订单总费用40%）；<br>
          2､出行当日取消订单解除合同，需支付100%的违约金（占 订 单 总 费 用 100%）。</p>
        <div class="butto" @click="alerHide=false">
          <span class="btnt">返回</span>
          <span class="btnd" @click="confirmCancel()">确定取消</span>
        </div>
      </div>
    </div>
    
      <div class="model" v-show="showHide" @click="showHide=false">
          <div class="mframe-detail" v-show="showHide">
              <div class="word">—— 费用明细 ——</div>
              <ul class="mframe">
                  <li><span class="totalprice">套餐总价</span><span class="tprice">￥{{ fee.totalAmt }}</span></li>
                  <!-- <li><span class="totalprice">租车意外险</span><span class="tprice">￥{{ fee.insuranceAmt }}</span></li>
                  <li><span class="totalprice">折扣优惠</span><span class="tprice">-￥{{ fee.couponDiscAmt }}</span></li> -->
                  <hr/>
                  <li class="fullamount"><span>全额：</span><span class="tprice fprice">￥{{ fee.travelComboAmt }}</span></li>
                  <li class="delete" @click="showHide=false"><img src="../assets/images/money-close.png" alt=""></li>
              </ul>
          </div>
      </div>

      <div class="tbody" v-bind:style="{marginTop:tbodyTop+'px'}" v-bind:class="{iphoneTop:isI}"  >

  <!-- 订单编号 -->
    <div class="order">
      <p class="onumber" >订单编号: <span>{{this.orderCode}}</span></p>
      <h3 @click="gotoDetail"> {{this.productName}} </h3>
      <div class="txt">
        <p>出发时间<span>&nbsp;&nbsp; {{ this.city.startDate }}</span></p>
        <p>出行人员<span>&nbsp;&nbsp; {{ this.people.adultCount }}成人</span> <span>{{ this.people.childCount }}儿童</span></p>
      </div>
    </div>

  <!-- 资源信息 -->
      <div class="omesg">
        <h4>预订资源信息</h4>
        <ul class="umesg">
          <li class="cmesgli">
            <div class="start">
              <div class="city">
                <span class="sgo">出发</span>
                <span class="place">{{ this.city.departCity }}</span>
              </div>
              <div class="sdate">{{ this.city.startDate }}</div>
            </div>
            <div class="sday"> <div class="daycount" style="border: 1px solid #C8C8C8;">共{{ this.city.days }}天<span class="lineLeft"></span> <span class="lineRight"></span></div> </div>
            <div class="start end">
              <div class="city">
                <span class="sgo">返回</span>
                <span class="place">{{ this.city.arriveCity }}</span>
              </div>
              <div class="sdate">{{ this.city.endDate }}</div>
            </div>
          </li>
          <li class="cmesgli carcount">
            <ul class="cardetail">
              <li class="car">车辆</li>
              <li v-for="(item,$index) in this.vehicle" :key="item.id">
                <!-- <span>上汽大通</span>
                <span>RV80</span> -->
                <span>{{ item.vehicleName }}</span>
                <span>*{{ item.count }}</span>
              </li>
            </ul>
          </li>
          <li class="cmesgli chotal" v-show="hasHotel">
            <ul class="cardetail">
              <li>
                <span class="car">酒店</span>
                <span>房间数</span>
                <span>* {{ this.hotelCount }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  <!-- 联系人 -->
      <div class="people">
        <h4>联系人信息</h4>
        <ul>
          <li class="peoplemsg cline">
            <div class="peoname">姓名</div>
            <div class="pname">{{ this.contact.contactName }}</div>
          </li>
          <li class="peoplemsg">
            <div class="peoname">手机号</div>
            <div class="pname">{{ this.contact.contactMobile}}</div>
          </li>
          <li class="peoplemsg">
            <div class="peoname">邮箱</div>
            <div class="pname">{{ this.contact.contactEmail}}</div>
          </li>
        </ul>
      </div>
  <!-- 出游人 -->
      <div class="people">
        <h4>出游人信息 <span>({{this.traveller.length}}人)</span></h4>
        <ul>
          <li class="peoplemsg cline peocmsg" v-for="(item,$index) in this.traveller" :key="item.id">
            <div class="outpeople outpeo">
              <div class="pename">姓名</div>
              <div class="pname">{{ item.travellerName}}</div> 
              <span class="driver" v-show="item.isDriver == '1' ? true:false " ><img src="../assets/images/driver@3x.png" alt=""></span>
            </div>
            <div class="outpeople outpeo">
              <div>
                <div class="pename" v-show="item.credentiaisType == '90130001'">身份证号</div>
                <div class="pename" v-show="item.credentiaisType != '90130001'">护照号</div>
              </div>
              <div class="pname">{{ item.credentiaisNo | handleCode(item.credentiaisType)}}</div>
            </div>
          </li>
        </ul>
      </div>
  <!-- 保险信息 -->
      <!-- <div class="people">
        <h4>保险信息</h4>
        <ul>
          <li class="insurance" v-for="(item,$index) in this.insurance" :key="item.id">
            <div class="information">
              <span class="informationl">{{ item.insuranceName }}</span>
              <span class="informationr">{{ item.count }}份</span>
            </div>
            <p>{{ item.insuranceRemark }}</p>
          </li>
        </ul>
      </div> -->

      <div class="people">
          <h4>取消政策</h4> 
          <ul class="contract">
            <li>当您在行程前解除合同，会扣除必要的费用。</li>
            <li>扣除标准如下：</li>
            <li>1､出行前2日取消订单解除合同，需支付40%的违约金（占订单总费用40%）；</li>
            <li>2､出行当日取消订单解除合同，需支付100%的违约金（占 订 单 总 费 用 100%）；</li> 
          </ul> 
      </div>
    </div>
  </div>
</template>

<script>
// import HeaderDetail from "../../components/orderDetail/orderheader"
import {C} from "@/common/connect";
import {
    Indicator,
    Toast
} from 'mint-ui';
export default {
  name: 'orderDetail',
  data () {
    return {
      isI: /iphone/i.test(navigator.userAgent),
      isIX:/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375),
        //当前用户ID
      usertoken:'',
    //  from:'',
      countDownMinute:'',
      countDownMinute1:'',// 分钟十位
      countDownMinute2:'',// 分钟个位
      countDownSecond:'',
      countDownSecond1:'',// 秒钟十位
      countDownSecond2:'',// 秒钟个位
      timeSecodes:'',
      timeSecode:'',
      timer:null,
      status01:false, //已完成
      status02:false, //待支付
      status03:false, //已取消
      status04:false, //已支付
      paymentTxt:'',//支付文字说明
      cancelTxt:'',//已取消文字说明
      tbodyTop:'',
      cancelTop:0,
      orderStatusName:'',
      orderstatus:'',
      orderCode:'',
      couponDiscAmt:'',
      people:{
        adultCount:'',
        childCount:''
      },
      city:{
        departCity:"",
        arriveCity:"",
        days:"",
        endDate:"",
        startDate:''
      },
      contact:{
        contactEmail:'',
        contactMobile:'',
        contactName:''
      },
      fee:{
        totalAmt:'',
        couponDiscAmt:'',
        insuranceAmt:'',
        travelComboAmt:0
      },
      hotel:[
        {
        count:'',
        resourceName:''
        }
      ],    
      traveller:[
        {
        travellerName:'',
        credentiaisNo:'',
        // credentiaisTypeName:'',
        credentiaisType:'',
        isDriver: '1'
        }
      ],
      insurance:[
        {
        count:'',
        insuranceName:'',
        insuranceRemark:''
        }
      ],
      vehicle:[
        {
          count:'',
          vehicleName:''
        }
      ],
      showHide:false,
      alertShow:false,//弹窗提示
      alerHide:false,
      submitTime:'',
      reqPrepayEndTime:'',
      //产品名称
       productName:'',
       productCode:'',
       productId:'',
       hasHotel:true,
       hotelCount:1,
       //头部白线条
       lineShow:true,
    }
  },
  filters:{
      //加密身份证,Passport
      handleCode:function(val,type){
          if(type == '90130001')
          {
              return val.substring(0,3)+'***********'+val.slice(-4);
          }
          else if(type == '90130002')
          {
              return val;
          }
      }
  },
  created() {
    this.orderCode = this.$route.params.orderCode;
    console.log(this.orderCode,'this.orderCode');
    this.usertoken = 'c9c5def4-a3ca-42ca-b355-a9a52a5cd3e5';
    console.log(this.usertoken,'this.usertoken');
    //this.from = this.$route.params.from;
    this._myinit();
  },
  // components:{
  //   HeaderDetail
  // },
  methods:{
      _myinit()
      {
          if (C.online === true)
          {
              // this.$LS.setStatusBar('light');
              // this.$LS.login();
              // this.$MD.g.packingStand('login', (res) => {
              //     if(typeof(res) == 'string'){
              //         res = JSON.parse(res);
              //     }
              //     if(res.code =='0')
              //     {
              //         if(typeof(res.returnValue) == 'string')
              //         {
              //             res.returnValue = JSON.parse(res.returnValue);
              //         }
              //         this.usertoken = res.returnValue.userToken;
              //     }
              //     this.goPath();
              // });
          }
          else
          {
              // this.usertoken = C.userToken;
              this.goPath();// 页面数据渲染，获取订单详情
          }

      },
      back() {
          //C.callOrderList();
      },
      gotoCustomer()
      {
          //C.callCustTravel();
      },
      // 跳转到产品详情
      gotoDetail: function() {
        window.location.href='travelproduct.html#/'+this.productCode+'/'+this.productId;
        // this.$LS.openView(this, {
        //     path: '/travelProduct',
        //     name: 'travelProduct',
        //     params: [{productId: this.productCode},{id: this.productId}],
        // });
      },
      //返回APP首页
      backHome()
      {
          // this.$LS.openView(this, {
          //     path: '/travelList',
          //     name: 'travelList',
          //     params: [{featureWordsId: 0}],
          // });
      },
      //支付订单
      payOrder()
      {
          // this.$LS.callCheckStand({
          //     "ordercode":this.orderCode
          // });
      },
      //确认取消
      openConfirm:function()
      {
          this.alertShow = true;
      },
      confirmCancel:function()
      {
          C.patchApi('rv-rental-order-service/'+C.version +'/orders/cancel/'+this.orderCode,
              {
              },
              {
                  headers: {
                      'usertoken': this.usertoken
                  }
              }).then(data => {
              Toast({
                  message: '取消成功',
                  duration: 2000
              });
              setTimeout(()=>{
                  window.location.reload();
              },1000);

          });
      },
    //取消订单
    cancelOrder:function(){
          if(this.usertoken == '')
          {
              Toast({
                  message: '用户未登录，或token过期',
                  duration: 2000
              });
              return;
          }
          else
          {
              this.openConfirm();
              return;

          }

    },
    goPath:function(){
       C.getApi('rv-rental-order-service/'+C.version +'/orders/'+this.orderCode,{},{
           headers: {
               'usertoken': 'c9c5def4-a3ca-42ca-b355-a9a52a5cd3e5'//this.usertoken
           }
        }).then((data)=>{
              console.log(data,'data');
               if( data.code =='0042001' || data.code == '0042002')
               {
                   Toast({
                       message: data.msg,
                       duration: 2000
                   });
                  //  if (this.$MD.base.online === true)
                  //  {
                  //      this.$LS.tokenInvalid();
                  //  }

               }
               else
               {
                   {
                       this.city = { ...data.data };
                       this.orderCode = data.data.orderCode;
                       this.people = { ...data.data };
                       this.contact = { ...data.data };
                       this.fee = { ...data.data.fee };
                       this.hotel = data.data.hotel;
                       this.traveller = data.data.traveller;
                       this.insurance = data.data.insurance;
                       this.vehicle = data.data.vehicle;
                       this.orderStatusName = data.data.orderStatusName;
                       this.submitTime = data.data.submitTime;
                       this.reqPrepayEndTime = data.data.reqPrepayEndTime;
                       this.productName = data.data.productName;
                       this.productCode = data.data.productCode;
                       this.productId = data.data.productId;
                       this.hotelCount = data.data.hotelCount;
                       if(this.hotelCount < 1){
                         this.hasHotel = false
                       }
                   }
                    let orderStatus = data.data.orderStatus,
                        paymentStatus = data.data.paymentStatus,
                        refundStatus = data.data.refundStatus;
                  
                  console.log(orderStatus,paymentStatus,refundStatus)
                  if(orderStatus == "90100006"){
                       this.orderStatusName = "已完成",
                       this.status01 = true;
                       this.paymentTxt = '已付款:';
                   }else if(orderStatus == "90100007"){
                        this.status03 = true;
                        this.orderStatusName = "已取消";
                        this.refreshHeader();
                        if(paymentStatus == '90120003'){ //已付款
                          this.paymentTxt = '已付款:';
                          // 退款状态 1：已成功发起退款流程:80700004              refundStatus
                          // 退款状态 2：退款审核中:80700001                     refundStatus
                          // 退款状态 3：退款审核失败:80700003                    refundStatus
                          // 退款状态 4：退款成功（已退款至原支付账户） 80700002    refundStatus
                          switch(refundStatus){
                            case 80700004:this.cancelTxt = '已成功发起退款流程，请耐心等待'; 
                                          break;
                            case 80700001:this.cancelTxt = '退款审核中，如审核成功将在30天内退回至原账户'; 
                                          break;
                            case 80700003:this.cancelTxt = '退款审核失败，请点击右上角联系客服'; 
                                          break;
                            case 80700002:this.cancelTxt = '退款成功，已退款至原付款账户'; 
                                          break;
                          }
                          console.log(this.cancelTxt)
                        }else if(paymentStatus == '90120001'){ //待支付
                          this.paymentTxt = '需付款:';
                          this.cancelTxt = '点击再次预订重新下单'; 
                        }
                        
                   }else{
                       if(paymentStatus == '90120003'){ //已付款
                          this.orderStatusName = "已支付，等待出发"
                         this.lineShow = false;
                         this.status04 = true;
                          this.paymentTxt = '已付款:';
                       }else if(paymentStatus == '90120001'){ //待支付
                          this.orderStatusName = "待支付";
                          this.status02 = true;
                          this.paymentTxt = '需付款:';
                          this.lineShow = false;
                       }else{
                         this.lineShow = true;
                       }
                   }
                   this.antitime();
               }
            });
        },
        refreshHeader:function()
          {
              setTimeout(()=>{
                  let theaderTop= this.$refs.theaderTop;
                  if(this.isI)
                  {
                      if(this.isIX)
                      {
                          this.tbodyTop = theaderTop.offsetHeight-24;
                      }
                      else{
                          this.tbodyTop = theaderTop.offsetHeight-8;
                      }

                  }
                  else{
                      this.tbodyTop = theaderTop.offsetHeight+10;
                  }

                  console.log(this.tbodyTop);
              },300);
          },
        //  let Action = ,
         antitime: function (){
              var _this=this;
              var now = Date.parse(new Date());
              // todo 取submitTime
              var dateTime =Date.parse(this.reqPrepayEndTime.replace(/-/g,'/'));
              var timeMile=dateTime;
              _this.timeSecode = timeMile/1000 - now/1000;
             // 做 倒计时操作
            // _this.timeSecode = 1800 - _this.timeSecodes;

             _this.timer = setInterval(() =>
             {
                 if (_this.timeSecode > 0 )
                 {
                     _this.timeSecode--;
                     _this.countDownMinute = parseInt(_this.timeSecode/60);

                     if(this.countDownMinute<10){
                         _this.countDownMinute1='0';
                         _this.countDownMinute2=this.countDownMinute;
                     }else{
                         _this.countDownMinute1=parseInt(this.countDownMinute/10);
                         _this.countDownMinute2=this.countDownMinute%10;
                     }
                     _this.countDownSecond = parseInt(_this.timeSecode % 60);
                     if(_this.countDownSecond<10){
                         _this.countDownSecond1='0';
                         _this.countDownSecond2=_this.countDownSecond;
                     }else{
                         _this.countDownSecond1=parseInt(_this.countDownSecond/10);
                         _this.countDownSecond2=_this.countDownSecond%10;
                     }
                 }
                 else
                 {
                     _this.countDownMinute1='0';
                     _this.countDownMinute2='0';

                     _this.countDownSecond1='0';
                     _this.countDownSecond2='0';
                     clearInterval(_this.timer);
                     _this.timer=null;
                 }
             }, 1000);
      },
      showDetail(){
            this.showHide = !this.showHide;
      },
      showBtn(){
            this.alertShow = !this.alertShow;
      },
      showButton(){
        if(this.status04){
          this.alerHide = !this.alerHide;
        }
      }
    }
  }
</script>


<style scoped lang="scss">
    .orderdetail_con {
        .iphoneTop{
            padding-top: 18px;
        }
    }
// 模态框
/* 费用明细 */
    .model{
        z-index: 666;
        width: 100%;
        height: 100%;
        background-color:#000000;
        opacity:0.85;
        top:0px;left:0px;bottom:0px;right:0px;
        position: fixed;
    }
    .mframe-detail{
        width: 100%;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
    }
    .word{
        width: 100%;
        height: 55px;
        line-height: 55px;
        font-size:18px;
        color: #fff;
        text-align: center;
    }
    .mframe{
        overflow: hidden;
    }
    .mframe li{
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 15px;
    }
    // .mframe li span{
    //     color: #fff;
    // }
    .mframe li .totalprice{
        padding-left: 30px;
        float: left;
        color: #fff;
    }
   
    .mframe li .tprice{
        padding-right: 30px;
        float: right;
        font-size: 16px;
        color: #FE9132;
    }
    .mframe li .fprice{
      font-size: 22px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
    }
    hr{
        background: #FFFFFF;
        opacity: 0.5;
        margin: 20px 30px 24px 30px;
    }
    ul .fullamount{
        text-align: right;
        font-size: 20px;
    }
    ul .fullamount span:first-child{
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #FFFFFF;
      letter-spacing: -0.48px;
    }
    .delete {
        position: relative;
        padding-top: 102px;
        height: 100%;
    }
    .delete img{
        width: 30px;
        height: 30px;
        position: absolute;
        left: 50%;
        bottom: 0;
        margin-left: -15px;
        display: block;
    }

  // 按钮模态框
      .popupAlert {
          z-index: 666;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          position: fixed;
        .shadowLayer {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .4);
            z-index: 111;
        }
        .alerTip {
            width:68%;
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
                font-size: 15px;
                width:100%;
                color: #333333;
                margin:0 auto;
                line-height:21px;
                text-align: center;
                padding:42px 13px 0 13px;
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
                line-height:44px;
                letter-spacing: -0.38px;
                .btnt{
                    width: 50%;
                    font-size: 16px;
                    height: 45px;
                    color: #666666;
                    float: left;
                    text-align: center;
                }
                .btnd{
                    width: 50%;
                    font-size: 16px;
                    height: 45px;
                    color: #666666;
                    display: inline-block;
                    text-align: center;
                    background-color:  #00C892;
                    color: #fff;
                }
            }
        }
        .alerTips{
          height:190px;
        }
    }



/* 头部 */
#jsheader{
  margin-bottom: 10px;
}
.num{
  position: relative;
  i{
    display: block;
    width: 10px;
    height: 1px;
    content: '';
    background-color: #FF9E00 ;
    position: absolute;
    bottom:7.5px;
  }
}
  .thead{
    width: 100%;
    height: 100%;
    background-color:#eee;
    display: flex;
  }
 .theader{
  //  padding-top: 13.5px;
   overflow: hidden;
   //position: fixed;
   position: fixed;
   flex: 1;
   top: 0;
   left: 0;
   width: 100%;
   z-index: 666;
    span{
    color: #fff;
    }
    .torder{
    margin-top: 13.5px;
    width: 100%;
    position: relative;
    height: 19px;
    line-height: 19px;
    overflow: hidden;
    p{
      text-align: center;
      font-size: 17px;
      color: #fff;
      margin: 0 18px;
      padding:0 15px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
    }
    .imgback img{
      width: 10px;
      height: 18px;
      float: left;
      margin-left: 15px;
    }
    .imgicus img{
      width: 18px;
      height: 15px;
      position: absolute;
      top: 3px;
      right: 15px;
    }
  }
  .ofinish{
    width: 100%;
    // height: 75px;

    .ofish{
      width: 100%;
      height: 33px;
      line-height: 33px;
      text-align: center;
      margin-top: 7px; 
      .status img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
        vertical-align: middle;
        margin-bottom: 3px;
      }
      span{
        font-size: 20px;
        font-family: PingFangSC-Medium;
        font-weight: 600;
      }
    }
  }
    .line-header{
      width: 92%;
      height: 1px;
      background-color: #EAEAEA;
      margin: 0 auto;
    }
    .process{
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      // border-top: 1px solid #EAEAEA;
    }
 }
  .theader01{
    background-color: #02D08B;
  }
    .theader02{
    background-color: #FF9E00;
  }
  .theader03{
    background-color: #B7B5B2; 
  }
  .theader04{
    background-color: #02D08B;
  }

  .tbody{
    height: 100%;
      margin-top:183px;
    // padding-top: 1px;
  }
 .pcount{
     width: 100%;
    height: 28px;
    line-height: 28px;
    display: inline-block;
    margin-bottom:6px;
 }
 .text{
    color: #fff;
    font-size: 13px;
    width: 50%;
    height: 28px;
    line-height: 28px;
    float: left;
    padding-left: 15px;
    }
 .text .pay{
     float: right;
 }
 .countdown span{
   float: left;
 }
.countdown .time {
  width: 70px;
  height: 13px;
  float: left;
  margin-top: 6px;
  line-height: 18px;
  font-size: 13px;
}

  .countdown .time {
    span {
      float: left;
      width: 8.5px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      background-color: #fff;
      color: #ff9e00;
      text-align: center;
      border-radius: 2px;
      margin-left: 2px;
      padding-top: 0.1px;
      &.isIphone{
        padding-top: 1.3px;
      }
    }
    span:nth-child(3) {
      width: 10px;
      text-align: center;
      background-color: #ff9e00;
      color: #fff;
    }
  }
  .pmoney{
      float: right;
      height: 28px;
      line-height: 28px;
      padding-right: 15px;
      font-size:13px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      span{
        vertical-align: middle;
      }
      .price {
        line-height: 18px;
        .unite {
          // vertical-align: text-bottom;
        }
      }
      .money{
        font-size:20px;
      }
      img{
        width: 8px;
        height: 12px;
        margin-left: 5px;
        vertical-align: middle;
      }
  }
  .btn {
    width: 100%;
    height: 56px;
    line-height: 56px;
    background-color: #fff;
    text-align: center;
    span{
        padding: 4px 50px 5px 50px;
        border-radius: 5px;
        font-size: 15px;
        color: #666666;
      }
  }
  .btn1 span{
    border: 1px solid #FF8200;
    color: #FF8200 ;
  }
  .btn2 span{
    border:1px solid #D8D8D8;
  }
  .btn3 span:nth-child(odd){
    border:1px solid #D8D8D8;
    color: #666666;
  }
  .btn3 span:nth-child(even){
    border: 1px solid #FF8200;
    background-color: #FF8200;
    color: #fff;
    margin-left: 15px;
  }

 /* 订单 */
  .order{
    background-color: #fff;
    // margin-top: 10px;
    padding: 0 15px;
    padding-bottom: 14px;
      .onumber{
        text-align: right;
        line-height: 20px;
        font-size: 14px;
        padding: 10px 0;
        border-bottom: 1px solid #EAEAEA;
        span{
          font-family: PingFangSC-Medium;
          font-weight: 600;
        }
        }
      h3{
      padding:10px 34px 10px 0;
      font-size: 15px;
      font-weight: normal;
      line-height: 20px;
        font-family: PingFangSC-Medium;
        font-weight: 600;
    }
    .txt p{
      line-height: 20px;
      font-size: 14px;
      color: #999999;
      padding-bottom: 5px;
      // font-weight: 600;
      span{
        color: #222222;
        font-weight: 600;
      }
    }
  }
/*预定资源信息 */
 .omesg{
  margin-top: 10px;
  background-color: #fff;
  font-size: 14px;
  padding: 0 15px;
  } 
  h4{
      padding:10px 48.5px 10px 0;
      font-size: 15px;
      font-weight: normal;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      span{
        font-weight: 600;
      }
  }
  .umesg .cmesgli{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 10px;
    border-bottom: 1px solid #EAEAEA; 
    .start {
      width: 82px;
      height: 100%;
      float: left;
    // margin-left: 10px;
      .city{
        padding-bottom: 10px;
        line-height: 17px;
        .sgo{
          display: inline-block;
          width: 24px;
          height: 14px;
          color: #fff;
          background-color: #02D08B; 
          border-radius: 4px;
          padding: 0 2px;
          font-size: 10px;
          text-align: left;
          letter-spacing: -0.24px;
          margin-top: 1.5px;
        } 

        .place{
          color: #999999;
          font-size: 12px;
          line-height: 17px;
          float: right;
        }
      }
      .sdate{
        width: 90px;
        margin-top: 10px;
      }   
    }
    .end{
      width: 82px;
      float: right;
      .car{
        color: #999;
      }
    }
    .sday{
      width: 25%;
      padding-top:33px;
      float: left;
      position: relative;
      left: 15%;
      .daycount{
        position: relative;
        width: 60px;
        line-height: 20px;
        height: 20px;
        border: 1px solid #c8c8c8;
        text-align: center;
        font-size: 12px;
        color: #9999;
        border-radius: 10px;
        position: relative;
        z-index: 1;
        span{
          position: absolute;
          width: 20px;
          height: 1px;
          z-index: 1;
          border: 0.5px solid #c8c8c8;
        }
        .lineLeft{
          top: 8px;
          left: -20px;
        }
        .lineRight{
          top: 8px;
          right: -20px;
        }
      }
      // .daycount::before{
      //   content: '';
      //   width: 15px;
      //   height: 1px;
      //   background: #9999;
      //   position: absolute;
      //   right: 50%;
      //   bottom: 50%;
      //   margin-right: 50%;
      // }
      // .daycount::after{
      //   content: '';
      //   width: 15px;
      //   height: 1px;
      //   background: #9999;
      //   position: absolute;
      //   left: 50%;
      //   bottom: 50%;
      //   margin-left: 50%;
      // }  
    }
  }
     .cmesgli:nth-child(3){
      border-bottom: none;
    }
  .cardetail li{
  text-align: right;
  line-height: 20px;
  padding-bottom: 5px;
  }
  .cardetail .car{
    color: #999;
    float: left;
  }

/* 联系人信息 */
 .people{
  margin-top: 10px;
  background-color: #fff;
  font-size: 14px;
  padding: 0 15px;
 }
  .cline{
    border-top: 1px solid #EAEAEA;
  }
  .peoplemsg{
    width: 100%;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    .peoname{
      color: #666;
      font-size: 14px;
      width: 20%;
      text-align: left;
      float: left;
      // font-weight: 600;
    }
    .pname{
      float: left;
    }
  }

/* 出游人信息*/
    .pename{
      color: #666;
      font-size: 14px;
      width: 25%;
      text-align: left;
      float: left;
    }
  .outpeople{
    width: 100%;
    overflow: hidden;
      .driver{
      // background-color: #FFC700;
      // color: #fff;
      // font-size: 0.9px;
      margin-left: 10px;
      img{
        width: 37px;
        height: 14px;
        margin-top: 7px;
      }
    }
    .pname{
      color: #333;
    }
  }
  .outpeo {
    line-height: 30px;
  }
  .peocmsg{
    height: 100%;
    padding: 5px 0;
  }

/* 保险信息 */
  .insurance{
    color: #999;
    font-size: 12px;
    overflow: hidden;
    border-top: 1px solid #EAEAEA;
    span{
      width: 49%;
      color: #222222;
      font-size: 14px;
      font-weight: 600;
      line-height: 40px;
      display: inline-block;
    }
  }
  .informationl{
    text-align: left;
    margin: 0;
  }
  .informationr{
    text-align: right;
  }
  .insurance p{
    padding-bottom: 20px;
    line-height: 17px;
    color: #999999;
  }

  .contract{
    border-top: 1px solid #EAEAEA;
    padding-top:10px;
    padding-bottom: 20px;
    margin-bottom: 98px;
    color: #999999;
    font-size: 12px;
    line-height: 17px;
  }
  .contract li{
    color: #999999;
    line-height: 17px;
  }

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {

      .orderdetail_con {
          padding-bottom:34px !important;
          .iphoneTop {
              padding-top:34px;
          }
      }     
  }

</style>