<template>
  <div class="confirmOrder-wrap">
    <app-header headTitle="确认订单2/2"></app-header>
    <div class="confirmOrder-con" :class="{'iphoneTop':isI}">
      <section class="common-sec">
        <div class="item-mid">
          <h2 class="title">联系人信息</h2>
          <div class="linkman-info">
            <div class="row">
              <span class="title-name">姓名</span>
              <span class="des"><input type="text" v-model="userInfo.customerName"></span>
            </div>
            <div class="row">
              <span class="title-name">手机号</span>
              <span class="des"><input type="number" v-model="userInfo.mobile" pattern="[0-9]*"></span>
            </div>
            <div class="row">
              <span class="title-name">邮箱</span>
              <span class="des"><input type="text" v-model="userInfo.email" placeholder="邮箱用于接收出游通知书等信息"></span>
            </div>
          </div>
        </div>
      </section>
      <section class="common-sec tourist-info">
        <div class="item-mid">
          <h2 class="title">出游人信息<span class="passagers">{{touistParams.adultCount}}成人 {{touistParams.childCount}}儿童</span><i class="i-user" @click="goToAddTouist()"></i></h2>
          <div class="linkman-info" :class="{'havePassages':showInfo}">  <!--  -->
            <div class="row" v-for="(item,index) in touistList" :key="index">
              <span class="title-name">{{item.name}}</span>
              <span class="des" v-if = "item.info">
                                <p class="name"><span class="txt" @click="goToAddTouist(item.info)">{{item.info.travellerName}}<span class="driver" v-show="item.info.isDriver == 1"></span></span><span class="btn" :class="{'set': item.info.isDriver == '0' }" v-show="item.info.isAdult ==1" @click="setDriver(item)">{{item.info.isDriver == 1?'取消设置':'设置为司机'}}</span></p>
                                <p class="card" @click="goToAddTouist(item.info)">{{item.info.credentialsType == '90130001'?'身份证':'护照'}}：{{item.info.credentialsNo | handleCode(item.info.credentialsType)}}</p>
                            </span>
            </div>
          </div>
        </div>
      </section>
      <section class="common-sec invoice" v-show="false">
        <div class="item-mid">
          <div class="row">
            <span class="title-name">发票信息</span>
            <span class="des">不需要<i class="i-arr-r"></i></span>
          </div>
        </div>
      </section>
      <section class="common-sec agreement">
        <ul class="item-list">
          <li>
            <i class="i-radio" @click="toggleProtocol" :class="{'checked':checked}"></i>
            <div class="right">
              <div class="first">
                <span class="name">同意预订须知 和 <a @click="viewContract">合同协议</a></span>
              </div>
              <p class="des">协议在资源确认且支付后生效。扣款说明：根据您的支付方式进行订单全款扣除预授权预订，如果订单不确定将解决预授权或全额退款至您的支付账户。订单是否生效以房车生活家最终通知为准。</p>
            </div>
          </li>
        </ul>
      </section>
      <fee-detail :msg="btnTxt" @goToNext = "confirmOrder" @fn='getData' :canNotClick = "canNotClick" ref="feeDetail"></fee-detail>
      <div class="popupAlert" v-show="alertShow">
        <div class="shadowLayer" @click="alertShow=false"></div>
        <div class="alerTip">
          <h2 class="title">产品已售罄</h2>
          <p>您手慢了，已被人抢先预定了</p>
          <div class="btn" @click="alertShow=false">关闭</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import {C} from "@/common/connect";
    import feeDetail from '@/components/common/feedetail';
    import { Toast,Indicator } from 'mint-ui';
    import * as pubMethods from '@/common/utils';
    export default {
        data(){
            return{
                isI: /iphone/i.test(navigator.userAgent),
                showCoupon:false,//优惠券弹窗
                btnTxt:"立即支付",//按钮文字
                userInfo:{  //联系人信息
                    customerName:"",
                    mobile:"",
                    email:""
                },
                userInfoC :false,
                touistParams:{
                    adultCount:'',
                    childCount:''
                }, //出游人信息
                msg:'',//提示信息
                canNotClick:false,
                checked:true, // 同意预定须知默认勾选
                alertShow:false,//提示弹窗
                touistList:[],
                traveller:[], //添加的出游人信息
                travellerList:null,
                showInfo:false, //展示添加的出游人信息
                usertoken:'',
                isAndroid:/(Android)/i.test(navigator.userAgent),
                isiOS:/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
                //上一个订单的下单人信息
                //判断当时是否正在 保存订单中，如果是，则禁止连续保存多次订单
                onsaving:false,
                //判断是否正在请求下单接口
                onsub:false
            }
        },
        components: {
            feeDetail
        },
        filters: {
            //加密身份证,Passport
            handleCode:function(val,type){
                if(type == '90130001')
                {
                    return val.substring(0,3)+'***********'+val.slice(-4);
                }else if(type == '90130002'){
                    return val;
                }
            },
            //姓名超出处理，最多6个汉字，12个英文
            // handleName(val){
            //     if()
            // }
        },
        methods:{
            getData(data){
              pubMethods.setStore('totalprice',data);
            },
            //校验联系人信息
            checkUserInfo(){
                if(!this.userInfo.customerName.trim()){
                    this.msg = '请完善联系人姓名'
                    return false;
                }
                if(!this.userInfo.mobile.trim()){
                    this.msg = '请完善联系人手机号'
                    return false;
                }else if(!pubMethods.isMobile(this.userInfo.mobile)){
                    this.msg = '请填写正确的手机号码'
                    return false;
                }
                if(!this.userInfo.mobile.trim()){
                    this.msg = '请完善联系人邮箱'
                    return false;
                }else if(!pubMethods.isEmail(this.userInfo.email)){
                    this.msg = '请填写正确的邮箱'
                    return false;
                }

                let no = 0,adultSum = 0, childSum= 0;
                this.touistList.forEach(item=>{
                    if(item.info){
                        no++;
                        item.info.isAdult == 1?adultSum++:childSum++;
                    }
                })
                if(!no){
                    this.msg = '请完善出游人信息';
                    return false;
                }
                if(adultSum != this.touistParams.adultCount){
                    this.msg = '请完善成人信息，确保和出游人数一致';
                    return false;
                }
                if(childSum != this.touistParams.childCount){
                    this.msg = '请完善儿童信息，确保和出游人数一致';
                    return false;
                }
                return true;
            },
            //勾选切换
            toggleProtocol(){
                this.checked = !this.checked;
                this.checked?this.canNotClick = false:this.canNotClick=true;
            },
            //提交订单前的校验
            check()
            {
                if(!this.checked){
                    return false;
                }
                //校验联系人信息
                if(!this.checkUserInfo()){
                    Toast({
                        message: this.msg,
                        position: 'middle',
                        duration: 2000
                    });
                    return false;
                }

                //获取设置的司机总数
                let sumDriverNum = 0;
                this.touistParams.traveller = [];
                this.touistList.forEach(item=>{
                    if(item.info){
                        item.info.isDriver == 1? sumDriverNum+=1:'';
                        this.touistParams.traveller.push(item.info)
                    }
                });
                if(sumDriverNum != this.touistParams.vehicle.length){
                    Toast({
                        message: '司机数与车辆数不一致，请调整出游人中的司机数量或车辆资源',
                        position: 'middle',
                        duration: 2000
                    });
                    return false;
                }

                //删除出游人信息json id
                for(let item of this.touistParams.traveller){
                    delete item['id'];
                }
                return true;
            },
            // 提交订单
            confirmOrder()
            {
                if(this.check() == true)
                {
                    this.subOrder();
                }

            },
            subOrder:function()
            {
                if(this.onsaving == true)
                {
                    return;
                }
                if(this.onsub == true)
                {
                    return;
                }
                this.onsub = true;
                let obj = Object.assign(this.touistParams,{
                    "contactName": this.userInfo.customerName,
                    "contactEmail": this.userInfo.email,
                    "contactMobile": this.userInfo.mobile,
                    "orderSource": this.isAndroid?80500002:(this.isiOS?80500003:'')
                });


                C.postApi(`rv-rental-order-service/${C.version}/orders`,obj,{
                    headers: {
                        'usertoken': this.usertoken
                    }
                }).then(data=>{
                    this.onsub = false;
                    if( data.code =='0042001' || data.code == '0042002')
                    {

                        Toast({
                            message: data.msg,
                            duration: 2000
                        });
                        window.location.href= 'https://apptest.rv2go.cn/rental-wechat/login.html?wxOpenId='+this.usertoken+'&backurl='+encodeURIComponent(window.location.href);


                    }
                    else if(data.code == "21000"){//产品已售罄
                        this.alertShow = true;
                    }
                    else if(data.code == '0')
                    {
                        let orderCode = data.data.orderCode;
                        pubMethods.setStore('orderCode',orderCode);
                        this.onsaving = true;
                        this.$LS.callCheckStand({
                            "ordercode":orderCode
                        });
                    }


                });

            },
            //跳转到添加出游人界面
            goToAddTouist(item){
                /* this.traveller =
                 {
                     "travellerName":"钱依依",
                     "credentialsType":"90130001", //90130001,身份证  90130002，护照
                     "nation":"中国",
                     "credentialsNo":"123456789898989",
                     "validityDate":"有效期",
                     "mobile":"13245678901",
                     "isAdult":"1", //是否成人：1是 0否
                     "gender":"1" ,//性别：1男 0女
                     "isDriver":"0"
                 }*/
                pubMethods.setStore('touistInfo',{
                    'item':item,
                    'childCount':this.touistParams.childCount,
                    'adultCount':this.touistParams.adultCount,
                    'travellerList':this.travellerList
                });
                pubMethods.setStore('touistInfo_stamp',new Date().getTime());
                this.$router.push({path: '/addvisitors'});
            },
            //获取出游人列表
            getTouistList(){
                let adultSum = 0,childrenSum = 0;
                this.touistList = [];
                while (adultSum<this.touistParams.adultCount) {
                    adultSum ++;
                    this.touistList.push({
                        'name':'成人'+ adultSum
                    })
                }
                if(this.touistParams.childCount){
                    while (childrenSum<this.touistParams.childCount) {
                        childrenSum ++;
                        this.touistList.push({
                            'name':'儿童'+ childrenSum
                        })
                    }
                }
            },
            //更新出游人信息
            updateTouistInfo(){
                let _this = this,length = this.traveller.length,i=0;
                // console.log(this.traveller,'this.traveller');
                this.traveller.forEach((val,index) => {
                    for(let item of _this.touistList){
                        if(!item.info){
                            if(val.isAdult == 1 && item.name.indexOf('成人')>-1){ //成人
                                _this.$set(item,'info', val);
                                break;
                            }else if(val.isAdult == 0 && item.name.indexOf('儿童')>-1){ //儿童
                                _this.$set(item,'info', val);
                                break;
                            }
                        }
                    }
                    if(!this.showInfo){
                        this.showInfo =true;
                    }
                })
            },
            //设为司机
            setDriver(item){
                item.info.isDriver = item.info.isDriver == 0 ? 1:0;
                this.travellerList.forEach(el=>{
                    if(el.id == item.info.id){
                        el.isDriver =  item.info.isDriver;
                    }
                })
                pubMethods.setStore('travellerList',this.travellerList);
                // if(this.$MD.base.online === false){
                //     pubMethods.setStore('travellerList',this.travellerList);
                // }
            },
            //查看合同协议
            viewContract(){
              window.location.href='contract.html#/'+0;
                // this.$LS.openView(this,{
                //     path:'/contract',
                //     name:'contract',
                //     params: [{
                //         type: 0
                //     }]
                // });
            },
            getDefaultUser(){
                if(this.userInfoC == false)
                {
                    C.getApi(`rv-rental-order-service/${C.version}/orders/userInfo`,{},{
                        headers: {
                            'usertoken': this.usertoken
                        }
                    }).then(data=>{
                        if( data.code =='0042001' || data.code == '0042002')
                        {
                            Toast({
                                message: data.msg,
                                duration: 2000
                            });
                            // if (this.$MD.base.online === true)
                            // {
                            //     this.$LS.callLogin();
                            //     this.$LS.tokenInvalid();
                            // }

                        }
                        else{

                            if(this.userInfo.customerName =='' && this.userInfo.email =='' && this.userInfo.mobile =='')
                            {
                                this.userInfo = data.data;
                                this.userInfoC = true;
                            }
                        }
                    });
                }

            }
        },
        created()
        {     
          let touistParams = pubMethods.getStore('touistParams');
          this.usertoken = pubMethods.getStore('wxOpenId');
        },
        activated()
        {
            this.touistParams= pubMethods.getStore('touistParams');
            this.getTouistList();
            this.$refs.feeDetail.calcFeeDetail(this.touistParams);
            // console.log(this.touistParams,'this.touistParams');
            pubMethods.removeStore('touistInfo')
             let person = pubMethods.getStore('travellerList');
             if(person){
                  this.showInfo = false;
                  this.traveller = person;
                  this.travellerList = person;
                  this.updateTouistInfo();
             }

        },
        deactivated(){
        }
    };
</script>
<style lang="scss" scoped>

  @import '../../../assets/scss/common';
  .confirmOrder-wrap{
    height: 100vh;
    position: relative;
  }
  .confirmOrder-con {
    padding-top: 48px;
    &.iphoneTop{
      padding-top:64px;
    }
  }
  .common-sec{
    .item-mid{
      padding:0;
      padding-left:4%;
    }
  }
  h2.title {
    @include pfm();
    font-size: 15px;
    line-height: 21px;
    padding-top: 15px;
  }
  .i-arr-r{
    @include icon-style(6px,10px,'i_arr_r.png');
    margin-left:10px;
  }
  .linkman-info{
    padding:4px 0 6px;
    .row {
      line-height:45px;
      border-bottom:1px solid #EAEAEA;
      .title-name{
        width:17.3%;
        color:$color6;
        @include pfr();
      }
      .des{
        width:82.7%;
        text-align: left;
        input{
          width:90%;
          padding:8px 0;
          line-height:25px;
          font-size:15px;
          outline: none;
          &::-webkit-input-placeholder { /* WebKit browsers */
            color:$colord1;
          }
          &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:$colord1;
          }
          &::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:$colord1;
          }
          &:-ms-input-placeholder { /* Internet Explorer 10+ */
            color:$colord1;
          }
        }

      }
      &:last-child {
        border:0;
      }
    }
  }
  .invoice{
    line-height:50px;
    .item-mid {
      padding:0 4%;
    }
    .row {
      .des{
        color:$color9;
        font-size:13px;
      }
    }
  }
  .tourist-info{
    .title {
      padding:18px 4% 0 0;
      .passagers{
        font-size: 14px;
        color:$color6;
        padding-left:16px;
      }
      .i-user{
        @include icon-style(16px,16px,'i_add_person.png');
        float:right;
      }
    }
    .row{
      .des {
        padding-right:4%;
      }
    }
    .havePassages {
      padding:0 auto;
      .row{
        padding-top:15px;
        .title-name{
          line-height:22px;
          vertical-align: top;
        }
        .des{
          text-align:left;
          vertical-align: top;
          padding-bottom:6px;
          .name {
            line-height:22px;
            font-size: 17px;
            .txt {max-width:70%;display:inline-block;line-height:22px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
          }
          .card{
            padding-top:7px;
            font-size: 11px;
            line-height:16px;
            color:$color6;
          }
          .driver {
            @include icon-style(37px,14px,'i_driver.png');
            margin:-2px 0 0 10px;
          }
          .btn {
            // padding:0 10px;
            width: 66px;
            text-align: center;
            float: right;
            line-height:22px;
            font-size: 11px;
            color: #B0B0B0;
            border:1px solid #EBEBEB;
            @include borderRadius(5px);
            &.set {
              color: #00C892;
              border-color:#00C892;
            }
          }
        }

      }
    }
  }
  .agreement{
    padding-bottom:75px;
    .item-list{
      overflow: hidden;
      background:$colorf;
      padding:16px 4% 18px;
      .right{
        width:94%;
        float:right;
        .name {
          line-height:18px;
          font-size:13px;
          color:$color6;
          a {
            text-decoration: underline;
            // color:$colorf780;
            color: #00C892;
          }
        }
        .des {
          padding-top:9px;
          font-size: 12px;
          line-height:17px;
          color:$color9;
        }
      }
    }
  }
  .i-radio{
    @include icon-style(13px,13px,'i_radio.png');
    &.checked {
      @include icon-checked-style('i_radio_checked.png');
    }
  }
  .popupAlert {
    .shadowLayer{
      z-index:113;
    }
    .alerTip {
      width:66%;
      left:17%;
      height:145px;
      position:fixed;
      top:50%;
      margin-top:-72px;
      z-index:114;
      text-align: center;
      background:$colorf;
      @include borderRadius(12px);
      .title {
        padding-top:23px;
      }
      p{
        font-size: 14px;
        color: $color6;
        margin:0 auto;
        line-height:24px;
        padding:10px 0 23px;
      }
      .btn{
        border-top:1px solid #e0e0e0;
        line-height:44px;
        font-size: 16px;
        color: #666666;
        letter-spacing: -0.38px;
      }
    }
  }
  .loadResources {
    width:15px;
    height:15px;
    -webkit-animation: load-resources-rotate 0.8s infinite linear;
    animation: load-resources-rotate 0.8s infinite linear;
    border: 0.106667rem solid transparent;
    border-radius: 50%;
  }

  @-webkit-keyframes load-resources-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load-resources-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .confirmOrder-con.iphoneTop {
      padding-top:88px;
    }
    .confirmOrder-con {
      padding-bottom:34px !important;
    }
    .common-sec.agreement{
      padding-bottom: 200px;
    }
  }
</style>


