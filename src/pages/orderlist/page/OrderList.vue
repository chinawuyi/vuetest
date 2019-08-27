 <template>
  <div class="order">
    <header>
      <a href="" class="arrow"></a>
      <h1>旅行订单</h1>
    </header>
    <ul class="tab">
      <li v-for="item in items" @click="isActive(item)" :class="{'active':item.active,'unactive':!item.active}" >
        <a class="select" href="javascript:;">{{item.select}}</a>　
        <a class="line" href="javascript:;"></a>
      </li>　
    </ul>
    <div class="all" v-show="isEmpty">
      <a href="javascrtipt:;" class="empty"></a>
      <p v-show="isOrder" class="noOrder">您还没有订单哦，快去预订吧～</p>
      <p v-show="isContent" class="noContent">暂时没有相关内容</p>
      <button v-show="isGo">去逛逛</button>
    </div>
    <div class="orders" v-show="isAllOrder">
      <div class="list" v-for="item in finalList">
        <div class="headers">
          <p class="orderTime">
            <span>下单时间:</span>
            <span class="year">{{item.submitDate | time}}</span>
          </p>
        </div>
        <div class="content">
          <div class="placeInfo">
            <a href="javascript:;" class="wait common" v-show="item.isBlue"></a>
            <a href="javascript:;" class="waited common" v-show="item.isGrey" ></a>
            <span class="place">{{item.departCityName}}出发</span>
            <span class="status" v-bind:style="{color:item.statusColor}">{{item.orderStatusName}}</span>
            <p v-show="item.isTime">{{item.countDown | cut}}</p>
          </div>
          <div class="details">{{item.productName}}</div>
          <p class="otherInfo"><span class="time">{{item.startDate| data}}</span><span>{{item.totalCount}}</span>人</p>
          <p class="money">
            <span>金额:</span><span>¥{{item.totalAmt}}</span>
            <button class="liji" v-show="item.liji">立即支付</button>
            <button class="again" v-show="item.again">再次预定</button>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import {C} from "@/common/connect";
    import { isWeixin } from "@/common/utils";
    export default {
        data() {
            return {
                active: false,
                isTime: false,
                liji: false,
                again: false,
                statusColor: '',
                isBlue: false,
                isGrey: false,
                items:[
                    {select: '全部'},
                    {select: '待支付'},
                    {select: '已支付'},
                    {select: '已取消'}],
                isEmpty: false, //整个大盒子
                isOrder: false,
                isContent: false,
                isGo: false,
                isAllOrder: false,
                finalList: [{}],
                nowTab: '全部',
                usertoken: 'd15d0717-2df6-4415-8253-25e878ad2ad6',
                aa: [{}]
            }
        },
        filters:{
          time: function(value){
              if(value != undefined){
                var index = value.lastIndexOf(":");
                return value.substring(0,index) 
              }
          },
          data: function(value){
              if(value != undefined){
                var index = value.indexOf(":");
                var value = value.substring(0,index-2);
                return value.replace(new RegExp('-','gi'),'.');
              }
          },
          cut: function(value){
            if(value != undefined){
               var timeArr = value.split(':');
               if(timeArr[0] * 60 + timeArr[1] <= 0){
                   return '00:00'
               }else {
                   return value;
               }
            }
          }
        },
        mounted(){
            this.items.map((item, index)=>{
                if(index == 0){
                    this.$set(item,'active',true);
                }
            });
            this.getList(0);
        },
        methods: {
            isActive (item) {
                this.items.forEach(item=> {
                    this.$set(item,'active',false);
                });
                this.$set(item,'active',true);
                switch(item.select){
                  case '全部': this.getList(0);break;
                  case '待支付': this.getList(1);break;
                  case '已支付': this.getList(2);break;
                  case '已取消': this.getList(3);break;
                }
                this.nowTab = item.select;
            },
            getList(status) {
                C.getApi('rv-rental-order-service/v1/orders',{status},{
                    headers: {
                        'usertoken': this.usertoken
                    }
                }).then(res => {
                    this.finalList = this.isShow(res.data.resultList);
                });
            },
            isShow(list) {
                if(list.length == 0){
                  this.isEmpty = true;
                  this.isAllOrder = false;
                  if(this.nowTab == '全部'){
                      this.isOrder = this.isGo = true;
                      this.isContent = false;
                  }else {
                      this.isContent = true;
                      this.isOrder = this.isGo = false;
                  }
                }else {
                  this.isEmpty = false;
                  this.isAllOrder = true;
                }
                list.map((item,index)=>{
                  if(item.orderStatus == 90100003 || item.orderStatus == 90100004 || item.orderStatus == 90100005 || item.orderStatus == 90100006){
                    list[index].statusColor = "#333";
                    list[index].isGrey = true;
                    list[index].isBlue = list[index].liji = list[index].isTime = list[index].again = false;
                  }else if (item.orderStatus == 90100002 || item.orderStatus == 90100001){
                      var endTime = new Date(list[index].reqPrepayEndTime).getTime();
                      var nowTime = Date.parse(new Date());
                      var dTime = endTime - nowTime;
                      if(dTime > 0){                          
                          var seconds  = parseInt(dTime / 1000) % 60 + '';
                          var minutes = Math.floor(parseInt(dTime/1000)/60) + '';
                          seconds = seconds.length < 2 ? '0' + seconds: seconds + '';
                          minutes = minutes.length < 2 ? '0' + minutes: minutes;
                          list[index].countDown =  `${minutes}:${seconds}`;
                            setInterval(() => {
                              list[index].countDown =  `${minutes}:${--seconds}`;
                              if(seconds < 0){
                                  --minutes;
                                  seconds = 60;
                                  list[index].countDown =  `${minutes}:${--seconds}`;
                              }
                              if((seconds + '').length < 2){
                                list[index].countDown = minutes + ':' + '0' + seconds;
                              }
                              if((minutes + '').length < 2){   
                                list[index].countDown = '0' + minutes + ':' + seconds;
                                  if((seconds + '').length < 2){
                                    list[index].countDown ='0'+ minutes + ':' + '0' + seconds;
                                }
                              }
                          },1000)
                      }else {
                          list[index].countDown =  '00:00';
                      }
                    list[index].statusColor = "#FD5600";
                    list[index].isBlue = list[index].liji = list[index].isTime = true;
                    list[index].isGrey = list[index].again =  false;
                  }else if (item.orderStatus == 90100007){//已取消
                    list[index].statusColor = "#999";
                    list[index].isGrey = list[index].again = true;
                    list[index].isBlue = list[index].liji = list[index].isTime = false; 
                  }
                })
                return list;
            },
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #app {
    height: 100%;
  }
  .order {
    height: 100%;
    background: #F1F1F1;
  }
  .order a {
    text-decoration: none;
    color: #333;
  }
  .order header {
    overflow: hidden;
    padding: 0 15px;
    height: 45px;
    text-align: center;
    background: #fff;
  }
  .order .arrow {
    position: absolute;
    top: 13px;
    left: 15px;
    width: 10px;
    height: 18px;
    background:url('../assets/back.png') no-repeat center;
    background-size: 100% 100%;
  }
  .order header h1 {
    margin-top: 13px;
    height: 24px;
    color: #222;
    font: 15px/21px 'PingFangSC-Regular';
  }
  .order .tab {
    overflow: hidden;
    background: #fff;
    width: 100%;
    border-top:0.5px solid #E5E5E5;
    border-bottom:0.5px solid #E5E5E5;
  }
  .order .tab li {
    float: left;
    position: relative;
    overflow: hidden;
    padding: 9px 24.8px 0 24.8px;
    height: 32px;
  }
  .order .tab li a.select {
    color: #333;
    font: 16px/22px "PingFangSC-Regular";
  }
  .order .tab li.active  a{
    color: #00C892;
  }
  .order .tab li.active a.line {
    display: inline-block;
  }
  .order .tab li a.line{
    position: absolute;
    top: 33px;
    display: none;
    width: 28px;
    height: 3px;
    background: #00C892;
    border-radius: 1.5px;
  }
  .order .tab li a:nth-of-type(2){
    right: 35px;
  }
  .order .tab li:nth-of-type(1) a:nth-of-type(2){
    right: 26.5px;
  }
  /*all*/
  .order .all {
    overflow: hidden;
    width: 375px;
    height: 87%;
    background: #fff;
    text-align: center;
  }
  .order .all a.empty{
    display: inline-block;
    margin-top: 102px;
    margin-bottom: 20px;
    width: 144px;
    height: 109px;
    background:url('../assets/empty.png');
    background-size: 100% 100%;
  }
  .order .all .noOrder{
    font: 15px/21px PingFangSC-Medium;
    color: #999;
  }
  .order .all .noContent {
    font: 15px/18px PingFangSC-Regular;
    color: #999;
  }
  .order .all button{
    margin-top: 23px;
    width: 125px;
    height: 40px;
    border: none;
    font: 19px/26px PingFangSC-Regular;
    color: #fff;
    background: #00C892;
    border-radius: 7px;
  }
  /*orders*/
  .order .orders {
    padding-bottom: 103px;
    width: 100%;
    background: #F1F1F1;
  }
  .orders .list .headers{
    padding-top: 16px;
    height: 34px;
    width: 375px;
  }
  .orders .list .headers p {
    width: fit-content;
    padding-right: 5px;
    height: 24px;
    line-height: 24px;
    background: #E5E5E5;
    border-radius:0 12px 12px 0;
    font: 12px/17px PingFangSC-Light;
    color: #999;
  }
  .orders .list .headers p span {
    display: inline-block;
  }
  .order .list .headers p span:nth-of-type(1) {
    margin-left: 10px;
    margin-top: 3px;
    height: 17px;
  }

  .orders .list .content {
    background: #fff;
    height: 172px;
    padding: 0 15px;
  }
  .orders .content .placeInfo {
    height: 55px;
    line-height: 55px;
  }
  .orders .placeInfo a.common {
    float: left;
    margin-right: 6px;
    margin-top: 18px;
    width: 20px;
    height: 20px;
  }
  .orders .placeInfo a.wait{
    background:url('../assets/waitPay.png') no-repeat center;
    background-size: 100% 100%;
  }
  .orders .placeInfo a.waited{
    background:url('../assets/payed.png') no-repeat center;
    background-size: 100% 100%;
  }
  .orders .placeInfo .place {
    float: left;
    margin-top: 16px;
    font: 18px/24px PingFangSC-Medium;
    color: #333;
  }
  .orders .placeInfo .status{
    float: right;
    margin-left: 4px;
    margin-top: 18px;
    font: 14px/20px PingFangSC-Medium;
    color: #FD5600;
    text-align: center;
  }
  .orders .placeInfo p {
    float: right;
    margin-top: 19px;
    height: 16px;
    color: #FD5600;
    font: 12px/16px PingFangSC-Medium;
    border: 1px solid #FD5600;
    border-radius: 2px;
    padding: 0 5px 0 15px;
    background: url(../assets/sandglass.png) no-repeat 2px;
    background-size: 10px;
  }
  .order .content .money {
    height: 45px;
    line-height: 45px;
    border-top: 1px solid #e5e5e5;
  }
  .order .content .details {
    overflow: hidden;
    display: -webkit-box;
    width: 260px;
    height: 40px;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #333;
    font: 15px/20px PingFangSC-Regular;
  }
  .order .content .otherInfo {
    margin-top: 4px;
    margin-bottom: 10px;
    font: 12px/17px PingFangSC-Regular;
    color: #999;
  }
  .order .content .otherInfo .time{
    margin-right: 15px;
  }
  .order .content .money span{
    float: left;
    margin-top: 13px;
    margin-right: 5px;
  }
  .order .content .money span:nth-of-type(1){
    font: 14px/20px PingFangSC-Regular;
    color: #666;
  }
  .order .content .money span:nth-of-type(2){
    margin-top: 12px;
    font: 16px/22px PingFangSC-Medium;
    color: #FD7F00;
  }
  .order .content .money  button{
    float: right;
    margin-top: 9px;
    border-radius: 14px;
    border: none;
    font-size: 15px;
    font-family: PingFangSC-Regular;
  }
  .order .content .money .liji {
    background: #FF9500;
    padding: 4px 11px;
    color: #fff;
  }
  .order .content .money .again {
    padding: 2.5px 10px;
    border: 1px solid #ff8200;
    color: #ff8200;
    background: #fff;
  }

</style>
