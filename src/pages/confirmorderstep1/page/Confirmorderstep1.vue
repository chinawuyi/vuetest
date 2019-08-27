<template>
  <div class="confirmOrder-wrap">
    <app-header headTitle="确认订单1/2"></app-header>
    <div class="confirmOrder-con" :class="{'iphoneTop':isI}">
      <section class="common-sec">
        <div class="item-mid">
          <h2 class="title twoLine" style="  font-weight:700;">{{productInfo.productName}}</h2>
          <p class="date">出发日期：{{productInfo.tourDate}}</p>
          <div class="tourist">
            <h2 class="title">选择出游人数</h2>
            <div class="row">
              <div class="addMinusItem">
                <span class="name">成人</span>
                <span class="minus" @click="minusTourist(1)" :class="{'active':touistObj.adult>1&&touristBtnTxt =='确认'}"></span><span class="num">{{touistObj.adult}}</span><span class="add" @click="addTourist(1)" :class="{'active':touistObj.adult<maxAdult&&touristBtnTxt =='确认'}"></span>
              </div>
              <div class="addMinusItem">
                <span class="name">儿童</span>
                <span class="minus" @click="minusTourist(2)" :class="{'active':touistObj.children>0&&touristBtnTxt =='确认'}"></span><span class="num">{{touistObj.children}}</span><span class="add" @click="addTourist(2)" :class="{'active':touistObj.children<maxChildren&&touristBtnTxt =='确认'}"></span>
              </div>
              <button class="btn" @click="changeTourist" :class="{'active':touristBtnTxt == '确认'}">{{touristBtnTxt}}</button>
            </div>
          </div>
        </div>
      </section>
      <section class="common-sec resource">
        <div class="item-mid">
          <h2 class="title">请选择资源</h2>
          <div class="choose-car">
            <div class="type">
              <span class="car">车辆</span>
              <span class="personal">人数</span>
              <span class="carmodel">车型</span>
            </div>
            <ul class="carmodel-list">
              <li v-for="(item,index) in carListArr" :key="index">
                <span class="no">{{++index}}</span>
                <div class="passenger">
                  <div class="addMinusItem">
                    <span class="name">成人</span>
                    <span class="minus" @click="minusTourist(4,item)" :class="{'active':item.adult>1}"></span><span class="num">{{item.adult}}</span><span class="add" @click="addTourist(4,item)" :class="{'active':item.adult<item.maxPassagers - item.children}"></span>
                  </div>
                  <div class="addMinusItem">
                    <span class="name">儿童</span>
                    <span class="minus" @click="minusTourist(5,item)" :class="{'active':item.children>0}"></span><span class="num">{{item.children}}</span><span class="add" @click="addTourist(5,item)" :class="{'active':item.children<item.maxPassagers - item.adult}"></span>
                  </div>
                </div>
                <span class="carmodel-name" @click="showCarModel(item)"><span class="name">{{item.name}}</span><span class="i-arrow-d"></span></span>
                <ul class="carmodel-type" v-show="item.carCardShow">
                  <li v-for="list in carModelList" :key="list.id"><i class="i-radio" :class='{"checked":item.resourceId == list.resourceId}' @click="changeCarModel(list,item)"></i><span class="carname" @click="changeCarModel(list,item)">{{list.carModelName}}（ {{list.bearingLimit}}人/车 ）</span><span class="view" @click="goCarDetail(list.carModelId)">查看介绍</span></li>
                  <!-- <li><i class="i-radio"></i><span class="carname">B型 5座3卧（ 3人/车 ）</span><span class="view">查看介绍</span></li>
                  <li><i class="i-radio"></i><span class="carname">B型 5座3卧（ 3人/车 ）</span><span class="view">查看介绍</span></li> -->
                </ul>
              </li>
              <!-- <li>
                  <span class="no">2</span>
                  <div class="passenger">
                      <div class="addMinusItem">
                          <span class="name">成人</span>
                          <span class="minus"></span><span class="num">10</span><span class="add active"></span>
                      </div>
                      <div class="addMinusItem">
                          <span class="name">儿童</span>
                          <span class="minus active"></span><span class="num">10</span><span class="add"></span>
                      </div>
                  </div>
                  <span class="carmodel-name">B型 5座4卧<span class="i-arrow-d"></span></span>
              </li> -->
            </ul>
            <div class="ope-car">
              <div class="fl" @click="minusCar" :class="{'active': canMinusCar() && touristBtnTxt == '修改'}">减少车辆</div>
              <div class="fr" @click="addCar" :class="{'active':carListArr.length < maxCar && touristBtnTxt == '修改'}">添加车辆</div>
            </div>
          </div>
        </div>
      </section>
      <section class="common-sec hotel" v-if="hotelShow">
        <div class="item-mid">
          <div class="row">
            <span class="name">酒店</span>
            <div class="addMinusItem fr">
              <span class="name">房间</span>
              <span class="minus" @click="minusTourist(3)" :class="{'active':touistObj.roomNum>minRoom}"></span><span class="num">{{touistObj.roomNum}}</span><span class="add" @click="addTourist(3)" :class="{'active':touistObj.roomNum<maxRoom}"></span>
            </div>
            <!-- <span class="price">¥6780<i>/晚</i></span> -->
          </div>
        </div>
      </section>
      <section class="common-sec choose-list" v-show="false">
        <h2 class="title">选购保险</h2>
        <ul class="item-list">
          <li>
            <i class="i-checkbox"></i>
            <div class="right">
              <div class="first">
                <span class="name">意外险</span>
                <span class="price">￥50/人</span>
              </div>
              <p class="des">意外险描述意外险描述意外险描述意外险描述意外险描述意外险描述</p>
            </div>
          </li>
          <li>
            <i class="i-checkbox checked"></i>
            <div class="right">
              <div class="first">
                <span class="name">意外险</span>
                <span class="price">￥50/人</span>
              </div>
              <p class="des">意外险描述意外险描述意外险描述意外险描述意外险描述意外险描述</p>
            </div>
          </li>
        </ul>
      </section>
      <section class="common-sec coupon" v-show="false">
        <div class="item-mid">
          <h2 class="title">优惠折扣</h2>
          <div class="row">
            <span class="title-name">优惠券</span>
            <span class="des" @click="showCoupon=true">暂无可用优惠券<i class="i-arr-r"></i></span>
          </div>
        </div>
      </section>
      <section class="common-sec choose-list">
        <h2 class="title">支付方式</h2>
        <ul class="item-list">
          <li>
            <i class="i-radio checked"></i>
            <div class="right">
              <div class="first">
                <span class="name">全款支付</span>
              </div>
              <p class="des">用户需一次性在线全款支付整笔订单的金额</p>
            </div>
          </li>
        </ul>
      </section>
      <section class="common-sec rent-info">
        <div class="item-mid">
          <div class="row">
            <span class="icon"></span>
            <div class="explain">
              <p class="headline">取车必备:驾驶员身份证原件+驾驶证+本人信用卡</p>
              <p class="txt">驾驶证有效期至少超过本次租期的一个月以上<br/>信用卡可用额度10000元以上</p>
            </div>
          </div>
          <div class="row">
            <span class="icon icon02"></span>
            <div class="explain">
              <p class="headline">取消规则</p>
              <p class="txt">在取车前24小时内取消订单，我们将收取订单租金的30%作为违约金；超过取车时间则无法取消订单，未取车将会被收取全额预付租金，提前还车不退还剩余租金。</p>
            </div>
          </div>
          <div class="row">
            <span class="icon icon03"></span>
            <div class="explain">
              <p class="headline">押金预授权 </p>
              <p class="txt">须为驾驶人名下信用卡，可用额度不低于 10000 元还车时门店会从您信用卡中预授权冻结人民币 5000 元作为违章未处理的保证金</p>
            </div>
          </div>
          <div class="row">
            <span class="icon icon04"></span>
            <div class="explain">
              <p class="headline">车辆清洁费 </p>
              <p class="txt">按照取还车门店收费标准支付费用，范围100-250元／次</p>
            </div>
          </div>
          <div class="row">
            <span class="icon icon05"></span>
            <div class="explain">
              <p class="headline">租车流程</p>
              <p class="txt"><span class="rent-process"><img :src="'static/images/rent_process.png'" alt=""></span></p>
            </div>
          </div>
        </div>
      </section>
      <div class="coupon-wrap" v-show="showCoupon">
        <div class="shadowLayer" @click="showCoupon=false"></div>
        <section class="common-sec">
          <ul class="two-tab">
            <li class="active">可用优惠券(2)</li>
            <li>不可用优惠券(1)</li>
          </ul>
          <ul class="list">
            <li class="cashCoupon">
              <div class="word">
                <p class="discount"><span class="unit">¥</span>900</p>
                <p class="txt">满2000元可用</p>
              </div>
              <div class="explain">
                <p class="title"><span>现金券</span>海南春节专享</p>
                <p class="time">2017.11.15-2017.11.30</p>
              </div>
              <div class="radio">
                <i class="i-radio"></i>
              </div>
            </li>
            <li class="cashCoupon">
              <div class="word">
                <p class="discount"><span class="unit">¥</span>900</p>
              </div>
              <div class="explain">
                <p class="title"><span>现金券</span>海南春节专享</p>
                <p class="time">2017.11.15-2017.11.30</p>
              </div>
              <div class="radio">
                <i class="i-radio checked"></i>
              </div>
            </li>
            <li class="cashCoupon discountCoupon">
              <div class="word">
                <p class="discount"><span class="unit">¥</span>900</p>
              </div>
              <div class="explain">
                <p class="title"><span>折扣券</span>海南春节专享</p>
                <p class="time">2017.11.15-2017.11.30</p>
              </div>
              <div class="radio">
                <i class="i-radio checked"></i>
              </div>
            </li>
            <li class="cashCoupon discountCoupon">
              <div class="word">
                <p class="discount"><span class="unit">¥</span>900</p>
                <p class="txt">满2000元可用5天起租</p>
              </div>
              <div class="explain">
                <p class="title"><span>折扣券</span>海南春节专享</p>
                <p class="time">2017.11.15-2017.11.30</p>
              </div>
              <div class="radio">
                <i class="i-radio checked"></i>
              </div>
            </li>
            <li class="cashCoupon saleCoupon">
              <div class="word">
                <p class="discount"><span class="unit">¥</span>900</p>
                <p class="txt">满2000元可用5天起租</p>
              </div>
              <div class="explain">
                <p class="title"><span>折扣券</span>海南春节专享</p>
                <p class="time">2017.11.15-2017.11.30</p>
              </div>
              <div class="radio">
                <i class="i-radio checked"></i>
              </div>
            </li>
          </ul>
          <ul class="list" v-show="false">
            <li class="cashCoupon disabled">
              <div class="word">
                <p class="discount"><span class="unit">¥</span>900</p>
                <p class="txt">满2000元可用</p>
              </div>
              <div class="explain">
                <p class="title"><span>现金券</span>海南春节专享</p>
                <p class="time">2017.11.15-2017.11.30</p>
              </div>
              <div class="radio">
                <i class="i-radio"></i>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <fee-detail ref="feeDetail" :msg="btnTxt" linkUrl="confirmOrderStep2" @fn='getData' @goToNext="goToNext" :feeArr="feeArr"></fee-detail><!--  @showDetail="getFeeDetailParams" -->
      <div class="popupAlert" v-show="alertShow">
        <div class="shadowLayer" @click="alertShow=false"></div>
        <div class="alerTip">
          <p>当前选择的出游人数和所有车辆的总人数不一致，请修改</p>
          <div class="btn" @click="alertShow=false">确认</div>
        </div>
      </div>
      <section class="layerShadow" v-show="layerShow" @click="hideModel"></section>
    </div>
  </div>
</template>
<script>
    import {C} from "@/common/connect";
    import feeDetail from '@/components/common/feedetail'
    import * as pubMethods from '@/common/utils';
    export default {
        data(){
            return{
                isI: /iphone/i.test(navigator.userAgent),
                showCoupon:false,//优惠券弹窗
                btnTxt:"下一步",//费用按钮文字
                touristBtnTxt:"修改",//出游人按钮默认文字
                // 选择出游人数，成人数上限 20，儿童数上限 20；
                maxAdult:20, //最大成人数量
                maxChildren:20, //最大儿童数量
                maxRoom:0, //最大房间数为出游总人数
                minRoom:0, //最小房间数 Math.ceil(总人数/ singleRoomMaxNum )
                minCar:0, //最小车辆数
                maxCar:0, //最大车辆数
                touistObj:{
                    adult:8, //成人数量
                    children:4, //儿童数量
                    roomNum:0,//房间数量 房间数=向上取整（出游总人数/2）
                    touistSum:0 //出游总人数
                },
                productInfo:{
                    productId:0,
                    productCode:'',
                    tourDateId:'',
                    productName:'',
                    tourDate:''
                },//获取的产品信息
                carListArr:[],//车辆数资源
                carModelList:[],//可选房车数组
                singleRoomMaxNum:0,// 每个房间最大人数
                defaultCarObj:null,
                alertShow:false,//弹窗提示
                feeArr:null,//费用数组
                loadNum:2,//接口是否加载成功
                hotelShow:true,
                layerShow:false, //车型弹窗遮罩
                flag:true, //点击两秒内不可再次点击
            }
        },
        components: {
            feeDetail
        },
        filters:{
            formatDate(val,type){
                return val.replace(/-/g,type);
            }
        },
        methods:{
            timeOut(){
                if(this.flag){
                    this.flag = false;
                    return true;
                }else{
                    // console.log('flag',this.flag);
                    return false;
                }
            },
            //关闭车型弹窗
            hideModel(){
                this.carListArr.forEach((item) => {
                    item.carCardShow = false;
                })
                this.layerShow = false;
            },
            //checkbox选中
            checkBox(){

            },
            //修改出游人
            changeTourist(){
                if(this.touristBtnTxt == '修改'){
                    this.touristBtnTxt = '确认';
                }else{
                    this.touristBtnTxt = '修改';
                    this.loadCarList();
                    if(!this.loadNum){
                        this.getFeeDetailParams();
                    }
                }
            },
            //减少出游人数量
            minusTourist(type,item){
                if(this.timeOut()){
                    return false;
                }
                switch (type){
                    case 1: if(this.touristBtnTxt == '确认')
                    {
                        this.touistObj.adult>1?this.touistObj.adult--:'';
                    }
                        break;
                    case 2:
                        if(this.touristBtnTxt == '确认')
                        {
                            this.touistObj.children>0?this.touistObj.children--:'';
                        }
                        break;
                    case 3:
                        if(this.touistObj.roomNum>this.minRoom){
                            this.touistObj.roomNum--;
                            this.getFeeDetailParams();
                        }
                        break;
                    case 4:
                        if(item.adult>1){
                            item.adult--;
                            this.getFeeDetailParams();
                        }
                        break;
                    case 5:
                        if(item.children>0){
                            item.children--;
                            this.getFeeDetailParams();
                        }
                        break;
                }
            },
            //添加出游人数量
            addTourist(type,item){
                if(this.timeOut()){
                    return false;
                }
                switch (type){
                    case 1: if(this.touristBtnTxt == '确认')
                    {
                        this.touistObj.adult<this.maxAdult?this.touistObj.adult++:'';
                    }
                        break;
                    case 2: if(this.touristBtnTxt == '确认')
                    {
                        this.touistObj.children<this.maxChildren?this.touistObj.children++:'';
                    }
                        break;
                    case 3:
                        if(this.touistObj.roomNum<this.maxRoom){
                            this.touistObj.roomNum++;
                            this.getFeeDetailParams();
                        }
                        break;
                    case 4:
                        if(item.adult<item.maxPassagers){
                            item.adult++;
                            this.getFeeDetailParams();
                        }
                        break;
                    case 5:
                        if(item.children<item.maxPassagers-item.adult){
                            item.children++;
                            this.getFeeDetailParams();
                        }
                        break;
                }
            },
            //减少车辆资源
            minusCar(){
                if(this.timeOut()){
                    return false;
                }
                if(this.canMinusCar() && this.touristBtnTxt == '修改'){
                    this.carListArr.pop();
                    this.getFeeDetailParams();
                }
            },
            getData(data){
                this.flag = false;
                // console.log("flag",this.flag);
            },
            //增加车辆资源
            addCar(){
                if(this.carListArr.length < this.maxCar && this.touristBtnTxt == '修改'){
                    this.carListArr.push({
                        maxPassagers:this.carModelList[0].bearingLimit,
                        maxAdultNum:this.carModelList[0].bearingLimit-0,
                        maxChildrenNum:this.carModelList[0].bearingLimit-1,
                        adult:1,
                        children:0,
                        name:this.carModelList[0].carModelName,
                        carModelId: this.carModelList[0].carModelId,
                        resourceId:this.carModelList[0].resourceId,
                        carCardShow:false
                    });
                    this.getFeeDetailParams();
                }
            },
            //打开选择车型弹窗
            showCarModel(item){
                this.layerShow = true;
                this.carListArr = this.carListArr.filter(el =>{
                    if(el.index != item.index){
                        el.carCardShow = false;
                    }
                    return el;
                })
                item.carCardShow = !item.carCardShow;
            },
            //修改车型，重载乘客数量
            changeCarModel(list,item){//list 车型列表，item 车辆对象
                item.carModelId = list.carModelId;
                item.name = list.carModelName;
                item.maxPassagers =list.bearingLimit;
                item.maxAdultNum =list.bearingLimit - item.adult;
                item.maxChildrenNum =list.bearingLimit - item.children;
                item.adult = 1;
                item.children = 0;
                item.carCardShow =false;
                item.resourceId = list.resourceId;

                this.layerShow = false;
                //重新计算价格
                this.getFeeDetailParams();
            },
            canMinusCar(){
                //更新最小车辆数
                let sumSeat = 0,length = this.carListArr.length;
                this.carListArr.forEach((item,index)=>{
                    if(index < length -1){
                        sumSeat += item.maxPassagers;
                    }
                })

                if(sumSeat >= this.touistObj.touistSum){ //说明减少最后一辆车后其它的车辆也能容纳所有的乘客
                    return true;
                }else{
                    return false;
                }
            },
            //获取酒店资源
            getHotelInfo(){
                C.getApi(`rv-travel-business/${C.version}/travelChoiceHotel`,{
                    productId:this.productInfo.productId,
                    tourDate:this.productInfo.tourDate.replace(/\./g,'-')
                },{}).then(data=>{
                    this.hotelShow = !data.data.length?false:true;
                    if(data.data.length>0){
                        this.singleRoomMaxNum =data.data[0].bearingLimit;
                        //出游总人数
                        this.touistObj.touistSum = this.touistObj.adult + this.touistObj.children;
                        //最小房间数
                        this.minRoom = Math.ceil((this.touistObj.touistSum)/this.singleRoomMaxNum);
                        //默认房间数
                        this.touistObj.roomNum = this.minRoom;
                    }

                    this.loadNum--;
                    if(!this.loadNum){
                        this.getFeeDetailParams();
                    }
                })
            },
            //计算价格所需要的参数
            getFeeArr(){
                let arr = [];
                this.carListArr.forEach(item => {
                    arr.push({
                        "resourceId": item.resourceId,
                        "adultCount": item.adult,
                        "carModelId":item.carModelId,
                        "childCount": item.children
                    })
                })
                this.feeArr = {
                    "adultCount": this.touistObj.adult,
                    "childCount": this.touistObj.children,
                    "vehicle":arr,
                    "productId":this.productInfo.productId,
                    "tourDateId":this.productInfo.tourDateId,
                    "tourDate":this.productInfo.tourDate.replace(/\./g,'-'),
                    "supplierId":this.productInfo.supplierId,
                    "hotelCount":this.touistObj.roomNum
                }
            },
            //跳转到车辆详情
            goCarDetail(id){
                window.location.href = './cardetails.html#/'+id;

            },
            //获取费用明细参数
            getFeeDetailParams(){
                this.getFeeArr();
                this.$refs.feeDetail.calcFeeDetail(this.feeArr);
            },
            //根据出游人数确认默认车辆
            loadCarList(){
                let num =1;

                this.carListArr = [];
                this.updateMax();
                //根据出游人数 与 默认车型乘坐人数进行向上取整。
                while (num <= this.minCar){
                    this.carListArr.push({
                        maxPassagers:this.carModelList[0].bearingLimit,
                        maxAdultNum:this.carModelList[0].bearingLimit-0,
                        maxChildrenNum:this.carModelList[0].bearingLimit-1,
                        adult:1,
                        children:0,
                        name:this.carModelList[0].carModelName,
                        resourceId:this.carModelList[0].resourceId,
                        carModelId: this.carModelList[0].carModelId,
                        carCardShow:false
                    });
                    num++;
                }

            },
            //更新各种最大值
            updateMax(){
                //出游总人数
                this.touistObj.touistSum = this.touistObj.adult + this.touistObj.children;
                //最大房间数
                this.maxRoom = this.touistObj.adult;
                //最小房间数
                this.minRoom = Math.ceil((this.touistObj.touistSum)/this.singleRoomMaxNum);
                //默认房间数
                this.touistObj.roomNum = this.minRoom;
                //最小车辆数
                this.minCar = Math.ceil(this.touistObj.touistSum/(this.carModelList[0].bearingLimit?this.carModelList[0].bearingLimit:1));
                // 最大车辆数
                this.maxCar = this.touistObj.adult <= this.minCar?this.minCar:this.touistObj.adult;
            },
            //获取车型列表
            getCarModelList(){
                C.getApi(`rv-travel-business/${C.version}/travelChoiceCarModel`,{
                    productId:this.productInfo.productId,
                    tourDate:this.productInfo.tourDate.replace(/\./g,'-')
                },{}).then(data=>{
                    let json = data.data;
                    this.carModelList = json;
                    //设置默认车型的各种参数
                    let adult =1,children =0;
                    this.defaultCarObj = {
                        maxPassagers:this.carModelList[0].bearingLimit,
                        maxAdultNum:this.carModelList[0].bearingLimit-children,
                        maxChildrenNum:this.carModelList[0].bearingLimit-adult,
                        adult:adult,
                        children:children,
                        name:this.carModelList[0].carModelName,
                        carModelId: this.carModelList[0].carModelId,
                        carCardShow:false
                    }
                    this.loadCarList();
                    this.loadNum--;
                    if(!this.loadNum){
                        this.getFeeDetailParams();
                    }
                    //出游总人数
                    this.touistObj.touistSum = this.touistObj.adult + this.touistObj.children;
                    //最小车辆数
                    this.minCar = Math.ceil(this.touistObj.touistSum/this.carModelList[0].bearingLimit);
                    // 最大车辆数
                    this.maxCar = this.touistObj.adult <= this.minCar?this.minCar:this.touistObj.adult;
                });

            },
            //下一步
            goToNext(){
                //判断出游人和车辆乘坐总人数、是否一致
                let sumAdult = 0,sumChildren =0;
                this.carListArr.forEach(item =>{
                    sumAdult += item.adult;
                    sumChildren += item.children;
                })

                if( this.touistObj.adult != sumAdult || this.touistObj.children != sumChildren){
                    this.alertShow = true;
                }else{
                    this.getFeeArr();
                    pubMethods.setStore('touistParams',this.feeArr);
                    window.location.href = './confirmorderstep2.html';

                }


            }
        },
        activated(){
            //h5 开发模式
         /*   if(this.$MD.base.online === false)
            {
                pubMethods.removeStore('travellerList')
                let productDetail = pubMethods.getStore('productDetail');
                this.touistObj.adult = productDetail.adult;
                this.touistObj.children = productDetail.child;
                this.productInfo = productDetail;
                this.getCarModelList();
                this.getHotelInfo();
            } */
        },
        created(){
            pubMethods.removeStore('travellerList');
            let productDetail = pubMethods.getStore('productDetail');
            this.touistObj.adult = productDetail.adult;
            this.touistObj.children = productDetail.child;
            this.productInfo = productDetail;
            this.getCarModelList();
            this.getHotelInfo();


        }
    };
</script>
<style lang="scss" scoped>

  @import '../../../assets/scss/common';



  .confirmOrder-con {
    background:#F5F5F5;
    padding-top: 48px;
    &.iphoneTop{
      padding-top:64px;
    }
  }
  h2.title {
    @include pfm();
    font-size: 15px;
    line-height: 21px;
    padding-top: 16px;
  }
  .addMinusItem {
    display:inline-block;
    font-size:0;
    white-space: nowrap;
    span{
      display: inline-block;
      vertical-align: middle;
    }
    .name {
      width:38px;
      font-size:14px;
      color:$color3;
    }
    .add {
      @include icon-style(15px, 15px, 'i_add.png');
      &.active {
        @include icon-checked-style('i_add_active.png');
      }
    }
    .minus {
      @include icon-style(15px, 15px, 'i_minus.png');
      &.active {
        @include icon-checked-style('i_minus_active.png');
      }
    }
    .num {
      width:38px;
      font-size:17px;
      color:$color3;
      @include pfm();
      text-align:center;
    }
  }
  .common-sec {
    .twoLine {
      @include Flow(2);
    }
    .date {
      padding: 10px 0 12px;
      font-size: 14px;
      line-height: 20px;
      @include pfr();
    }
    .tourist {
      border-top: $border;
      padding-bottom:16px;
      .title{
        padding:10px 0 12px;
      }
      .row {
        line-height:24px;
      }
      button {
        @include pub-button(58px,22px,$colorf,#00C892,14px);
        border:1px solid #00C892;
        @include borderRadius(2px);
        vertical-align: middle;
        float:right;
        &.active {background:#00C892;color:$colorf;}
      }
      .addMinusItem{
        margin-right:25px;
      }
    }
    .choose-car{
      padding:16px 0 30px;
      .type {
        line-height:17px;
        font-size:0;
        white-space: nowrap;
        color:$color9;
        padding-bottom:8px;
        span{
          font-size: 12px;
        }
        .car{
          margin:0 30% 0 5.2%;
        }
        .carmodel{
          margin:0 13.3% 0 31.9%;
        }
      }
      .carmodel-list>li{
        height:85px;
        // overflow: hidden;
        padding:16px 2.6% 0 5.2%;
        background:$colorfb1;
        margin-bottom:10px;
        position:relative;
        @include borderRadius(4px);
        .passenger {
          margin:0 0 0 8.7%;
          float:left;
          width:50%;
        }
        .no {
          font-size: 30px;
          line-height:52px;
          width:7%;
          padding-right:8.7%;
          text-align:center;
          float:left;
        }
        .addMinusItem {
          line-height:20px;
          margin:0 0 15px 0;
          .name {
            width:42px;
          }
          .num {
            width:58px;
          }
        }
        .carmodel-name {
          font-size:14px;
          line-height:20px;
          width:31%;
          float:right;
          .name{
            @include singleFlow();
            width:80%;
            display: inline-block;
            vertical-align: middle;
          }

          .i-arrow-d{
            @include icon-style(11px, 11px, 'i_arr_d.png');
            margin-left:5px;
          }
        }
        .carmodel-type{
          position:absolute;
          right:6.4%;
          top:49.4%;
          width:85.5%;
          padding:20px 3.5% 0 5.3%;
          z-index:555;
          background:$colorf;
          @include borderRadius(5px);
          box-shadow: 0 1px 10px 0 rgba(0,0,0,0.30);
          -webkit-box-shadow: 0 1px 10px 0 rgba(0,0,0,0.30);
          -moz-box-shadow: 0 1px 10px 0 rgba(0,0,0,0.30);
          -ms-box-shadow: 0 1px 10px 0 rgba(0,0,0,0.30);
          -o-box-shadow: 0 1px 10px 0 rgba(0,0,0,0.30);
          li{
            margin-bottom:18px;
            line-height:20px;
            .i-radio{
              vertical-align: middle;
            }
            .carname{
              width:60%;
              display: inline-block;
              font-size: 14px;
              @include pfm();
              margin-left:4%;
              vertical-align: middle;
            }
            .view{
              float:right;
              font-size: 11px;
              color: #00C892;
            }
          }
        }

      }
      .ope-car{
        padding-top:5px;
        height:25px;
        line-height:25px;
        div {
          @include icon-style(31.9%, 25px, 'minus_car.png');
          font-size:13px;
          color:$colord9;
        }
        .fl {
          float:left;
          margin-left:1.45%;
          text-align:right;
          padding-right:3.5%;
          &.active {
            @include icon-checked-style('minus_car_active.png');
            color:#00C892;
          }
        }
        .fr {
          float:right;
          margin-right:1.45%;
          padding-left:3.5%;
          @include icon-style(31.9%, 25px, 'add_car.png');
          &.active {
            @include icon-checked-style('add_car_active.png');
            color:#00C892;
          }
        }
      }
    }
  }
  .hotel {
    .row {
      line-height:60px;
      .name {
        font-size:15px;
        @include pfm();
        display: inline-block;
        vertical-align: middle;
        width:21%;
      }
      .addMinusItem{
        width:43%;
        vertical-align: middle;
        .name {
          width:44px
        }
        .num {
          width:57px;
        }
      }
      .price{
        width:36%;
        display: inline-block;
        vertical-align: middle;
        font-size:14px;
        color:$colorf70;
        letter-spacing: -0.34px;
        text-align: right;
        i{
          font-size: 12px;
          color:$colorf70;
          letter-spacing: -0.29px;
          margin: 0 5px 0 3px;
        }
      }
    }
  }
  .coupon {
    .title {
      padding:14px 0 2px;
    }
    .row {
      line-height: 57px;
      .i-arr-r{
        @include icon-style(6px,10px,'i_arr_r.png');
        margin-left:9px;
      }
    }
  }
  .choose-list{
    background:$colorf;
    .title {
      padding:12px 4% 7px;
    }
    .item-list {
      padding:0 0 4px 4%;
    }
    li{
      padding:10px 0 14px;
      overflow: hidden;
      border-bottom:$liborder;
      .i-checkbox{
        margin-top:2px;
      }
      .right {
        float: right;
        width:91%;
        padding-right:4%;
        .first {
          line-height:21px;
          font-size: 15px;
          .price {
            float: right;
          }
        }
        .des {
          padding-top:8px;
          font-size: 13px;
          line-height: 18px;
          color:$color9;
        }
      }
      &:last-child{
        border:0;
      }
    }
  }
  .i-checkbox{
    @include icon-style(18px,18px,'i_checkbox.png');
    &.checked {
      @include icon-checked-style('i_checkbox_active.png');
    }
  }
  .i-radio{
    @include icon-style(18px,18px,'i_radio.png');
    &.checked {
      @include icon-checked-style('i_radio_checked.png');
    }
  }
  .resource {
    .title {
      padding-top:12px;
    }
  }
  .rent-info {
    padding-bottom:75px;
    .item-mid{
      padding:8px 4% 20px;
    }
    .row {
      overflow: hidden;
      padding-top:9px;
      .icon {
        @include icon-style(24px,24px,'info_icon01.png');
      }
      .icon02 {
        @include icon-style(24px,24px,'info_icon02.png');
      }
      .icon03 {
        @include icon-style(24px,24px,'info_icon03.png');
      }
      .icon04 {
        @include icon-style(24px,24px,'info_icon04.png');
      }
      .icon05 {
        @include icon-style(24px,24px,'info_icon05.png');
      }
      .rent-process{
        margin-top:3px;
        img{width:100%;height:auto;}
        @include icon-style(100%,39px,'rent_process.png');
      }
      .explain{
        width:90%;
        float:right;
        .headline {
          font-size: 13px;
          color:$color0;
          line-height:24px;
          @include pfm();
          padding-bottom:3px;
        }
        .txt{
          font-size: 12px;
          color:$color9;
          line-height:18px;
          white-space: normal;
        }
      }
    }
  }
  .coupon-wrap{
    position:fixed;
    z-index:113;
    left:0;
    right:0;
    bottom:0;
    top:0;
    .common-sec{
      background:$colorf;
      max-height:80vh;
      overflow-y:auto;
      position:fixed;
      left:0;right:0;
      bottom:0;
      z-index:113;
      margin-bottom:0;
    }
    .two-tab{
      overflow: hidden;
      li {
        width:50%;
        float:left;
        line-height:60px;
        font-size: 16px;
        text-align: center;
        position:relative;
        &.active{
          color: $colorf700;
        }
        &:first-child:after {
          content:"";
          position:absolute;
          right:0;
          top:20px;
          height:20px;
          width:1px;
          background:$colore5;
        }
      }
    }
    .list{
      background:$colorf2f1;
      padding:10px 4% 55px 3.7%;
      li{
        @include icon-style(100%,19.74vw,'cou_pic01.png');
        font-size:0;
        white-space: nowrap;
        line-height:19.74vw;
        margin-bottom:10px;
        .word {
          width:30.35%;
          padding:0 4.3% 0 4.8%;
          vertical-align: middle;
          display:inline-block;
          text-align:center;
          .discount{
            font-size: 38px;
            line-height:41px;
            color:$colorf;
            .unit{
              font-size: 13px;
              line-height:18px;
              color:$colorf;
              @include pfm();
            }
          }
          .txt{
            font-size: 11px;
            color:$colorf;
            line-height:16px;
            white-space: normal;
          }
        }
        .explain{
          width:56.9%;
          display:inline-block;
          vertical-align: middle;
          padding-left:4.5%;
          .title{
            font-size:14px;
            line-height:20px;
            color:$color6;
            span{
              width:36px;
              // height:15px;
              font-size:10px;
              color:$colorf;
              line-height:14px;
              display:inline-block;
              background:#FF4A4A;
              text-align: center;
              @include borderRadius(2px);
              margin-right:7px;
              vertical-align: middle;
            }
            margin-bottom:6px;
          }
          .time {
            font-size: 10px;
            line-height:14px;
            color: $color9;
          }
        }
        .radio {
          display:inline-block;
          vertical-align: middle;
          width:12.75%;
          text-align:center;
        }
        &.discountCoupon {
          @include icon-checked-style('cou_pic02.png');
          .explain{
            .title{
              span{
                background: #FF7543;
              }
            }
          }
        }
        &.saleCoupon {
          @include icon-checked-style('cou_pic03.png');
          .explain{
            .title{
              span{
                background:#F7AE00;
              }
            }
          }
        }
        &.disabled {
          @include icon-checked-style('cou_pic04.png');
          .explain{
            .title{
              span{
                background:$colorc;
              }
            }
          }
          .radio {
            .i-radio {@include icon-checked-style('i_radio_disabled.png');}
          }
        }
      }
    }
  }
  .popupAlert {
    .shadowLayer{
      z-index:113;
    }
    .alerTip {
      width:68%;
      left:16%;
      min-height:163px;
      position:fixed;
      top:50%;
      margin-top:-82px;
      z-index:114;
      background:$colorf;
      @include borderRadius(12px);
      text-align: center;
      p{
        font-size: 14px;
        width:75%;
        color: $color6;
        margin:0 auto;
        line-height:20px;
        padding:43px 0 35px;
      }
      .btn{
        border-top:1px solid #e0e0e0;
        line-height:44px;
        font-size: 16px;
        color: #666;
        letter-spacing: -0.38px;
      }
    }
  }
  .layerShadow{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background:transparent;
    z-index:1;
  }

</style>




