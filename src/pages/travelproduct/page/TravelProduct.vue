<template>
  <div class="box" ref="myBox">
      <div v-iscroll=getIscroll2 class="demo3-scroll">
        <div>
            <div class="header"></div>
            <div class="travelProduct">
                <div class="productList">
                    <div class="banner-btn">
                        <a onClick="javascript:history.back(-1);" class="back"></a>
                        <a @click="share" class="share"></a>
                    </div>
                    <!-- 图片轮播 -->
                    <div v-if="isShow"  class="picture">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(img,index) in filePath" :key="index">
                                    <img :src="img" height="auto" width="100%" alt="">
                                    <div class="pageNum">{{index+1}}/{{filePath.length}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 视频播放 -->
                    <div class="video-box" v-else>
                        <video @click="playPause()" class="video" :src="img" id="ckplayer_a1" v-bind:poster="img+'?vframe/jpg/offset/0/w/0/h/840'"  webkit-playsinline="true" playsinline="true" ></video>
                        <div class="video-poster" id="jsposter" @click="playPause()">
                            <img :src="img+'?vframe/jpg/offset/0/w/0/h/840'">
                            <div class="i play"></div>
                        </div>
                        <span class="play-btn" :class="{'iphoneTop':isI}"  v-show="isPlay" @click="playPause()"></span>
                        <div class="progress-bar">
                            <div class="bar" v-bind:style="{ width: videoRange}"></div>
                        </div>
                        <div v-show="isRemind" :class="{'iphoneTop':isI}" class="remind">
                            <p class="main-mes" v-if="playfailed" v-show="!noNetwork" :class="{'iphoneTop':isI}">播放失败</p>
                            <p class="main-mes" v-else v-show="!noNetwork" :class="{'iphoneTop':isI}">正在使用蜂窝数据，播放将消耗 {{fileSize}} M流量</p>
                            <button v-show="!noNetwork" v-if="playfailed" @click.stop="isContinue()">点击重试</button>
                            <button v-show="!noNetwork" v-else @click.stop="isContinue()">继续播放</button>
                            <p v-show="noNetwork" class="noNet">无网络连接</p>
                        </div>
                    </div>
                </div>
                <!-- 标签标题价格 -->
                <div class="content">
                    <div class="content-tit">
                        <span>{{ productName }}</span>
                    </div>
                    <ul class="content-category clearfix">
                        <li v-for="(item,index) in labels" :key="index"><span></span> {{item}} </li>
                    </ul>
                    <div class="mes">
                        <span class="moneyS">&yen;</span><span class="money">{{ price }}</span>
                        <span class="any">起/人均</span>
                    </div>
                </div>
                <!-- tab栏切换 -->
                <ul class="product-tab  clearfix" id="travelProductTopBar2" ref="myTab" :class="[{iphoneTop:isI}]">
                    <li>
                        <div class="tit-text"> <a @click="gotoPosition(1)"  :class="hasLine1 == true? 'weight':false">行程亮点</a></div>
                        <div ref="myLine1" :class="hasLine1 == true? 'line':false"></div>
                    </li>
                    <li>
                        <div class="tit-text"> <a @click="gotoPosition(2)"  :class="hasLine2 == true? 'weight':false">行程介绍</a></div>
                        <div ref="myLine2" :class="hasLine2 == true? 'line':false"></div>
                    </li>
                    <li>
                        <div class="tit-text"> <a @click="gotoPosition(3)"   :class="hasLine3 == true? 'weight':false">费用说明</a></div>
                        <div ref="myLine3" :class="hasLine3 == true? 'line':false"></div>
                    </li>
                    <li>
                        <div class="tit-text"> <a  @click="gotoPosition(4)" :class="hasLine4 == true? 'weight':false">预订必读</a></div>
                        <div ref="myLine4" :class="hasLine4 == true? 'line':false"></div>
                    </li>
                </ul>
                <!-- 主要内容 -->
                <div class="main-message">
                    <div id="tabLight" class="tabBox"></div>
                    <!-- 行程亮点部分-->
                    <div class="tour-lights" ref="myLights" id="myLights" v-html="productFeature">

                    </div>

                    <!-- 高效服务部分 -->

                </div>
                <!-- 路线规划部分 -->
                <div class="path-plan">
                    <!-- 行程路线 -->
                    <div class="tour-path" ref="myPath" id="myPath">
                        <div id="tabPlan" class="tabBox"></div>
                        <div class="title font-family-big" id="tourPath">行程路线</div>
                        <div class="days-plan" v-for="(item,index) in tourPath" :key="index">
                            <div class="oneDays">
                                <div class="path-details">
                                    <div class="bigTitle font-family-big">{{dayNum[item.routeDayNum-1]}}{{item.routeName}} </div>
                                    <!-- <div class="smallTitle">• 自由活动，办理提提车手续</div> -->
                                    <div class="text" v-html="item.routeDescription"></div>
                                </div>
                                <div class="live">
                                    <div class="breakfast"><span>早餐: </span> {{item.breakfast}} </div>
                                    <div class="lunch"><span>午餐: </span> {{item.lunch}} </div>
                                    <div class="dinner"><span>晚餐: </span> {{item.dinner}} </div>
                                    <div class="sleep" v-show="item.accommodationDescription === null || item.accommodationDescription === '' ? false:true"><span>住宿: </span> {{item.accommodationDescription}} </div>
                                    <div class="tips" v-show="item.friendlyReminder === null ? false:true">温馨提示：{{item.friendlyReminder}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 费用说明部分 -->
                <div class="cost-explain" ref="myExplain" id="myExplain">
                    <div id="tabExplain" class="tabBox"></div>
                    <div class="title font-family-big" id="costExplain">费用说明</div>
                    <div class="cost-details">
                        <div class="contains-txt" v-html="expenseExplanation">

                        </div>

                    </div>
                </div>
            </div>
            <!-- 预定须知 -->
            <div class="reserve-know" ref="myKnow" id="myKnow">
                <div id="tabKnow" class="tabBox"></div>
                <div class="title font-family-big" id="reserveKnow">预订须知</div>
                <div class="reserve-details">
                    <div class="reserve-text" v-html="bookingNotes">
                    </div>
                    <div class="compact">合同协议</div>
                    <div class="compact-text">
                        <p>请认真阅读 <a @click="gotoReserve()">预订须知</a> 和 <a @click="gotoCompact" >合同协议</a> ，协议将在资源确认且支付后生效。 </p>
                        <p>扣款说明：根据您的支付方式进行订单全款扣除预授权预订，如果订单不确定将解决预授权或全额退款至您的支付账户。订单是否生效以房车生活家最终通知为准。</p>
                    </div>
                </div>
            </div>
            <!-- 取消政策 -->
            <div class="cancel-policy">
                <div class="title font-family-big">取消政策</div>
                <div class="cancel-details">
                    <p>当您在行程前解除合同，会扣除必要的费用。 </p>
                    <p>扣除标准如下： </p>
                    <p>1､出行前2日取消订单解除合同，需支付40%的违约金（占订单总费用40%）； </p>
                    <p>2､出行当日取消订单解除合同，需支付100%的违约金（占订单总费用100%）；</p>
                </div>
            </div>
        </div>
    </div>
    <!-- tab栏切换 -->
    <ul class="product-tab  clearfix fixed" id="travelProductTopBar" ref="myTab" :class="[{'fixhidden':isFixed==false },{iphoneTop:isI}]">
        <li>
            <div class="tit-text"> <a @click="gotoPosition(1)"  :class="hasLine1 == true? 'weight':false">行程亮点</a></div>
            <div ref="myLine1" :class="hasLine1 == true? 'line':false"></div>
        </li>
        <li>
            <div class="tit-text"> <a @click="gotoPosition(2)"  :class="hasLine2 == true? 'weight':false">行程介绍</a></div>
            <div ref="myLine2" :class="hasLine2 == true? 'line':false"></div>
        </li>
        <li>
            <div class="tit-text"> <a @click="gotoPosition(3)"   :class="hasLine3 == true? 'weight':false">费用说明</a></div>
            <div ref="myLine3" :class="hasLine3 == true? 'line':false"></div>
        </li>
        <li>
            <div class="tit-text"> <a  @click="gotoPosition(4)" :class="hasLine4 == true? 'weight':false">预订必读</a></div>
            <div ref="myLine4" :class="hasLine4 == true? 'line':false"></div>
        </li>
        <!-- <div class="icon-return" v-show="isReturn" @click="back"></div>
        <div class="tab-share" @click="share" v-show="isShare"></div> -->
        <div class="icon-return" v-show="isReturn"></div>
        <!-- <div class="tab-share" v-show="isShare"></div> -->
    </ul>

    <!-- footer底部 -->
    <footer>
        <div class="footer-btn clearfix">
            <mt-button class="consult" type="primary" :class="[{'cellOutPhone':sellOut},{'gray':sellOut},{'cellOutPhone':soldOut},{'gray':soldOut}]" @click="callPhone"> <a class="phone" href="tel:4008215666"></a> 电话咨询</mt-button>
            <mt-button class="reserve" type="primary" :class="[{'cellOut':sellOut},{'cellOut':soldOut}]"  @click="showModel()">{{sellOutText}}</mt-button>
        </div>
    </footer>

    <!-- 模态框  <div id="myModal" class="modal" v-show="isShowModel"></div> -->
    <mt-popup class="myspemodal"
              v-model="isShowModel"
              popup-transition="popup-fade"
              closeOnClickModal=true
              lockScroll=true>
        <div class="close-other" style="width:100%;height:300px;" @click="showModel()"></div>
        <div class="modal-content">
            <div class="modal-header clearfix">
                <span class="img"><img :src="productListImg" class="productlistimg" alt=""></span>
                <span class="mes"> {{productName}} </span>
                <div class="line"></div>
            </div>
            <!--  日历 -->
            <div v-iscroll=getIscroll class="demo2-scroll">
                <div>
                    <div class="modal-body" v-for="(item,index) in dateList" :key="index" :id="'year'+index">
                        <!-- 年份 -->
                        <div class="year" >-{{item.yearMonth.split('-')[0]}}年{{item.yearMonth.split('-')[1]}}月-</div>
                        <!-- 星期 -->
                        <ul class="weekdays clearfix">
                            <li>日</li>
                            <li>一</li>
                            <li>二</li>
                            <li>三</li>
                            <li>四</li>
                            <li>五</li>
                            <li>六</li>
                        </ul>
                        <!-- 每天 -->
                        <div class="days clearfix">
                            <!-- <li v-for="(value,index) in daysList" :key="index"></li> -->
                            <ul class="row_daysList clearfix">
                                <li class="daysList" ref="days" :class="{isChoose: value.isChoose?true:false}" v-for="(value,index) in item.days" :key="index" @click="chooseDate(value)">
                                    <div class="value" :class="value.price == 0 || value.disable ?'white_out':'black_out'">{{value.holidayName!==''?value.holidayName:value.date}}</div>
                                    <div class="daysList_money" :class="[{white_out: value.isSellOut || value.disable == true ? true: false},{rest_out: value.isChoose?true:false}]">{{value.disable?'':value.isTourDate == false?'':value.before ? '': value.test ?'':(value.isSellOut ?'已售罄':'￥'+value.price+'起')}}</div>
                                    <div class="daysList_rest" :class="[{rest_out:value.isChoose?true:false},{white_out:value.isSellOut?true:false}]"> {{value.mayRest}} </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="model-footer">
                <div class="footer-line"></div>
                <div class="tourist clearfix">
                    <span class="title left not-selected">选择出游人数</span>
                    <span class="addMinusItem left">
                                                                                                                                                                                                                                                                                            <span class="name">成人</span>
                    <span class="minus" @click="subAdult()" :class="{active:adultNum > 0 ? 'active':''}"></span><span class="num">{{adultNum}}</span><span class="add" :class="{active:adultNum < 20 ? 'active':''}" @click="addAdult(adultNum)"></span>
                    </span>
                    <span class="addMinusItem left">
                                                                                                                                                                                                                                                                                            <span class="name">儿童</span>
                    <span class="minus" @click="subChild()" :class="{active:childNum > 0 ? 'active':''}"></span><span class="num">{{childNum}}</span><span class="add" :class="{active:childNum < 20 ? 'active':''}" @click="addChild(childNum)"></span>
                    </span>
                </div>
                <mt-button type="primary" @click="startBooking()">开始预订</mt-button>
            </div>
        </div>
    </mt-popup>
  </div>
</template>

<script>
import {C} from "@/common/connect";
import { isWeixin,setStore } from "@/common/utils";
import {Indicator,Toast } from 'mint-ui';
        
   
// import Swiper from 'swiper/dist/css/swiper.min.js';
// import 'swiper/dist/css/swiper.min.css';
export default {
  name: "travelproduct",
  data() {
            return {
                isI: /iphone/i.test(navigator.userAgent),
                //阻止多次点击 触发
                onceClick:true,
                //如果是false显示视频播放，否则显示图片轮播
                isShow: true,
                // 判断是否是无网络状态，false代表有网络
                noNetwork:false,
                // 播放失败
                playfailed:true,
                isShadow:true,
                tourDateId: 0,
                supplierId: 0,
                isPlay: true,
                isRemind: false,
                isFixed: false,
                adultNum: 0,
                childNum: 0,
                isShowModel: false,
                hasLine1: true,
                hasLine2: false,
                hasLine3: false,
                hasLine4: false,
                isReturn: false,
                isShare: false,
                is4G: true,
                productName: '',
                hasPrice: false,
                date: '',
                dateList: [],
                bannerList: [],
                tourPath: [],
                videoRange: 0,
                videoPoster:'',
                timer: null,
                year: '',
                month: '',
                filePath: [],
                bookingNotes: '',
                expenseExplanation: '',
                labels: [],
                price: '',
                productFeature: '',
                //产品code
                productId: '',
                //自增ID
                id:'',
                //页面滚动对象
                scroller:null,
                //日历滚动对象
                scroller2:null,
                //滚动到Y轴的位置
                scrollerY:0,
                //判断产品是否售罄  false表示没有售罄    true 表示售罄
                sellOut:false,
                //判断产品是否下线  false表示没有下线    true 表示下线
                soldOut:false,
                //如果产品已经售罄则显示  产品已售罄
                sellOutText:'直接预订',
                //产量列表中的正方形图片
                productListImg:'',
                fileSize:0,
                //行程路线的第几天
                dayNum:[
                    '第一天： ',
                    '第二天： ',
                    '第三天： ',
                    '第四天： ',
                    '第五天： ',
                    '第六天： ',
                    '第七天： ',
                    '第八天： ',
                    '第九天： ',
                    '第十天： ',
                    '第十一天： ',
                    '第十二天： ',
                    '第十三天： ',
                    '第十四天： ',
                    '第十五天： '
                ],
                scrollTop:1,
                //记录当前月份是否有出团日期，没有返回 - 1，有返回当前月份
                hasTravelDay : -1
            };
  },
  created() {
    this.scrollTop = 0;
    this.productId = this.$route.params.productId;
    this.id = this.$route.params.id;
    this.getProductDetail(); //产品详情接口数据
    if(this.id != -1)
    {
        this.getProductPrice(); //获取日历数据
        this.getProductCalendar(); //获取人均价格接口
        this.checkSellOut(); //判断产品是否售罄
    }

    /***********************************************************************************************************************/ 
    //   this.autoSwiper();
    /*  connect.getApi('rv-travel-business/v1/travelChoiceCarModel/1',{},{}).then(data=>{
          console.log(data);
      });
      connect.getApi('rv-travel-mainpage/v1/featureWords',{},{
          headers: {
              'xxxxx': 'ddddd'
          }
      }).then(data=>{
          //this.featureWords = data.data.resultList;
          console.log(data.data);
          console.log(this.featureWords);
      });*/
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

    /***********************************************************************************************************************/
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll);
    this.autoSwiper();

  },
    filters: {
        formatDate: function(val) {
            if (val) {
                var padDate = function(va) {
                    va = va < 10 ? '0' + va : va;
                    return va
                }
                var value = new Date(val);
                var year = value.getFullYear();
                var month = padDate(value.getMonth() + 1);
                var day = padDate(value.getDate());
                var hour = padDate(value.getHours());
                var minutes = padDate(value.getMinutes());
                var seconds = padDate(value.getSeconds());
                return year + '-' + month + '-' + day;
            }
        }
    },
  methods:{
    //轮播图的设置  
    autoSwiper()
      {
          var mySwiper = new Swiper('.swiper-container', {
              autoHeight: true, //enable auto height
              spaceBetween: 20,
              autoplay:false
          });
      },
    //跳转到预订须知
    gotoReserve() {
        window.location.href='reserve.html#/'
    },
    //跳转到合同协议
    gotoCompact() {
        window.location.href='contract.html#/'+0;
    },
    //返回上一页
    back() {
        //this.$LS.backView(this, {});
    },
    //分享
    share: function() {
        this.$LS.openShare({
            'title': this.productName,
            'des': ' 我发现一个不错的旅行产品，赶快来看看吧？',
            'img': this.productListImg,
            'url': this.$MD.base.share+this.productId+'.html'
        });
    },
    // 进度条
    playControl() {
        //ckplayer_a1
        if (this.isShow == false) {
            var video = document.getElementById('ckplayer_a1');
            this.timer = setInterval(() => {
                if(video == null)
                {
                    video = document.getElementById('ckplayer_a1');
                }
                this.videoRange = parseInt((video.currentTime / video.duration) * 100) + '%';
            }, 1000);
        }
    },
    // 打电话
    callPhone() {
         window.location.href = 'tel:4008215666';
        // if(this.$MD.base.online === true)
        // {
        //     this.$LS.buriedPoint('phoneconsultation_click','click');
        // }
        // this.$LS.callPhone('4008215666');
    },
    playPause() {
        var myVideo = document.getElementById('ckplayer_a1');
        var jsposter = document.getElementById("jsposter");
        if (this.is4G) {
            this.isRemind = true;
            this.isPlay = false;
            jsposter.style.display="none";
            this.is4G = false;
            return;
        }
        if (myVideo.paused) {
            myVideo.play();
            this.isPlay = false;
            jsposter.style.display="none";
        } else {
            myVideo.pause();
            this.isPlay = true;
        }
    },
    isContinue() {

        if(this.onceClick == true)
        {
            this.onceClick = false;
            this.isPlay = false;
            var myVideo = document.getElementById('ckplayer_a1');
            myVideo.play();
            this.isRemind = false;
            let _this = this;
            setTimeout(()=>{_this.onceClick =true;},100);
        }
    },
    // 补全返回日期以前的日期
    getCountDays(curDate) {
        var curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1);
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0);
        /* 返回当月的天数 */
        return curDate.getDate();
    },
    getDaysOfMonth(today, days, daystring) {
        let day = today.getDate();
        let today2 = new Date(today.getTime());
        let totaldays = this.getCountDays(today2);
        let firstday = today;
        let firstweekday = firstday.getDay();
        let weekday = firstweekday;
        let _days = [];
        // let todaystring = this.timeFormat(new Date());
        for (weekday; weekday > 0; weekday--) {
            days.unshift({
                'test': true,
                'bookStock': 0,
                'date': '',
                'holidayName': '',
                'isSellOut': false,
                'isTourDate': false,
                'mayRest': '',
                'price': 0,
                'productId': 0,
                'productStock': 0,
                'stock': 0,
                'tourDateId': 0,
                'yearMonth': ''
            });
        }
        return {
            'yearMonth': daystring,
            'days': days
        }
    },
    // 去预定
    showModel() {
        if(this.sellOut || this.soldOut){
            return;
        }
        this.isShowModel = !this.isShowModel;
        // if (this.isShowModel) {
        //     this.stop();
        // } else {
        //     this.move();
        // }
        // if(this.$MD.base.online === true)
        // {
        //     this.$LS.buriedPoint('bookingtravelnow_click','click');
        // }
        // if(this.hasTravelDay > -1)
        // {
        //     setTimeout(()=>{
        //         let height = document.querySelector('#year0').offsetHeight*this.hasTravelDay;
        //         this.scroller2.scrollTo(0,-height,0);
        //     },800);

        // }
    },
    //  获取人均价格
    getProductCalendar()
    {
        //价格
         C.getApi('rv-travel-business/'+C.version +'/travelProductMinPrice', {
             'productId': this.id
         }, {}).then(data => {
             this.price = data.data.price;
         });
    },
    //产品详情数据
    getProductDetail(){
        C.getApi('rv-travel-product/' + C.version + '/products/detailByCode/' + this.productId, {}, {}).then(data => {
            // console.log(data.data.product.supplierId,'supplierId');
            // console.log(data,'data');
            if(this.id == -1)
            {
                this.id = data.data.product.id;
                this.getProductPrice();
                this.getProductCalendar();
                this.checkSellOut();
            }
            this.id = data.data.product.id;
            this.productName = data.data.product.productName;
            this.supplierId = data.data.product.supplierId;
            this.bannerList = data.data.photos;
            this.bookingNotes = data.data.product.bookingNotes;
            this.expenseExplanation = data.data.product.expenseExplanation;
            this.productListImg = data.data.product.productListImg;
            this.productFeature = data.data.product.productFeature;
            // console.log(this.bannerList);
            for (let i = 0; i < this.bannerList.length; i++) {
                this.fileSize = (this.bannerList[i].fileSize/1024);
                this.fileSize = Math.floor(this.fileSize * 100)/100;
                this.filePath.push(this.bannerList[i].filePath)
                // console.log(this.filePath,'this.filePath');
                //02表示视频
                if(this.bannerList[i].fileType == 90050002){
                    this.isShow = false;
                    this.playControl();
                }
            }
            // 表示该产品已下线
            if(data.data.product.productStatus == 90120003){
                this.soldOut = true;
                this.sellOutText = this.soldOut==true?'产品已下线':this.sellOut==false?'直接预订':'产品已售罄';
            }
            //返回多个标签的时候 截取前三个
            if(data.data.labels != null){
                if(data.data.labels.length > 3){
                    this.labels.push(data.data.labels[0]);
                    this.labels.push(data.data.labels[1]);
                    this.labels.push(data.data.labels[2]);
                }else{
                    this.labels = data.data.labels;
                }
            }
            this.tourPath = data.data.routes;
            setTimeout(()=>{
                this.autoSwiper();
            },1000);

        });
    },
    //判断该产品是否售罄
    checkSellOut()
    {
         C.getApi("rv-travel-business/" + C.version + "/products/checkProductStock", {
             'productId': this.id
         }, {}).then((res) => {
             this.sellOut = res.data.isSellOut;
             this.sellOutText = this.soldOut==true?'产品已下线':this.sellOut==false?'直接预订':'产品已售罄';
         });
    },
    //获取价格日历数据 
    getProductPrice()
    {
         C.getApi("rv-travel-business/" + C.version + "/travelPriceCalendar", {
             'productId': this.id
         }, {}).then((res) => {
             res.data = res.data.map((item) => {
                //  console.log(item, 'item');
                 item.days = item.days.map((e) => {
                     //   console.log(e.isSellOut,'是否售罄', e.price,'价格',e.isBooking,e.date);
                     e.before = false;
                     // console.log(e.price, 'e.price',e.isSellOut,'e.issellout',e.date,'e.date',e.before,'e.before')
                     if (e.date.split('-')[2].split('')[0] === '0') {
                         e.date = e.date.split('-')[2].split('')[1];
                     } else {
                         e.date = e.date.split('-')[2];
                     }
                     e.disable = false; //添加disable属性
                     if(e.isBooking == 0){
                         e.disable = true;
                     }
                     // console.log(new Date((e.yearMonth + '-' + e.date).replace(/-/g, '/')).getTime(), 'eeee');
                     //遍历每一天，将日期转换成时间戳并与当前日期进行比较，如果小于当前日期，将设置为不可点击
                     if (new Date((e.yearMonth + '-' + e.date).replace(/-/g, '/')).getTime() < (new Date(this.$options.filters['formatDate'](new Date()).replace(/-/g, '/'))).getTime()) {
                         // console.log(888);
                         e.disable = true;
                         e.before = true; //如果是当前日期以前，只显示日期
                         // console.log(e.disable, e.date);
                         // console.log(e.price, 'e.price',e.isSellOut,'e.issellout',e.date,'e.date',e.before,'e.before','************************')
                     }else if(new Date((e.yearMonth + '-' + e.date).replace(/-/g, '/')).getTime() == (new Date(this.$options.filters['formatDate'](new Date()).replace(/-/g, '/'))).getTime()){
                         if(e.holidayName == ''){
                             e.holidayName = '今天';
                         }
                     }
                     return e
                 })
                 return item;
             });
             let dateList = [];
             //记录当前月份是否有出团日期，没有返回 - 1，有返回当前月份
             let hasTravelDay = -1;
             res.data.forEach((item,index) => {
                 // console.log(item);
                 dateList.push(this.getDaysOfMonth(new Date(item.yearMonth), item.days, item.yearMonth));
                 item.days.forEach((it)=>{
                     if(hasTravelDay > -1)
                     {
                         return;
                     }
                     if((it.isSellOut==true || it.price != 0 ) && it.disable != true?true:false)
                     {
                         hasTravelDay = index;
                     }
                 });
                //  console.log(item.days,'item.days');
             });
             this.hasTravelDay = hasTravelDay;
             this.dateList = dateList;
                 // console.log(dateList,'datelist');
         });
    },
    getIscroll(iscroll)
    {
        if (iscroll) {
            this.scroller2 = iscroll;
        }
    },
    getIscroll2(iscroll) {
        if (iscroll)
        {
            this.scroller = iscroll;
            let _this = this;
            iscroll.on('scrollEnd', function() {
                _this.scrollerY = this.y;
                _this.checkPos();
            })
        }
    },
    gotoPosition(i)
    {
        let y = document.querySelector('#travelProductTopBar').offsetHeight;
        let myPath = document.querySelector('#myPath').offsetTop -y;
        let myExplain = document.querySelector('#myExplain').offsetTop - y;
        let myKnow = document.querySelector('#myKnow').offsetTop -y;
        if(i == 1)
        {
            this.hasLine1 = true;
            this.hasLine2 = false;
            this.hasLine3 = false;
            this.hasLine4 = false;
            this.scroller.scrollTo(0, 0, 200);

        }
        if(i == 2)
        {
            this.hasLine1 = false;
            this.hasLine2 = true;
            this.hasLine3 = false;
            this.hasLine4 = false;
            this.scroller.scrollTo(0, -myPath, 200);
        }
        if(i == 3)
        {
            this.hasLine1 = false;
            this.hasLine2 = false;
            this.hasLine3 = true;
            this.hasLine4 = false;
            this.scroller.scrollTo(0, -myExplain, 200);
        }
        if(i == 4)
        {
            this.hasLine1 = false;
            this.hasLine2 = false;
            this.hasLine3 = false;
            this.hasLine4 = true;
            this.scroller.scrollTo(0, -myKnow, 200);
        }
    },
        updatePos()
    {
        let myLights = document.querySelector('#myLights').offsetTop;

    },
    checkPos()
    {
        let scrollTop = Math.abs(this.scrollerY);
        let y = document.querySelector('#travelProductTopBar').offsetHeight;
        let offsetTop = document.querySelector('#travelProductTopBar2').offsetTop-y;
        let myPath = document.querySelector('#myPath').offsetTop-y;
        let myExplain = document.querySelector('#myExplain').offsetTop-y;
        let myKnow = document.querySelector('#myKnow').offsetTop-y;
        if (scrollTop > offsetTop) {
            this.isFixed = true;
            this.isReturn = true;
            this.isShare = true;
        } else {
            this.isFixed = false;
            this.isReturn = false;
            this.isShare = false;
        }
        if(scrollTop < myPath)
        {
            this.hasLine1 = true;
            this.hasLine2 = false;
            this.hasLine3 = false;
            this.hasLine4 = false;
        }
        if(scrollTop >= myPath)
        {
            this.hasLine1 = false;
            this.hasLine2 = true;
            this.hasLine3 = false;
            this.hasLine4 = false;
        }
        if(scrollTop >= myExplain)
        {
            this.hasLine1 = false;
            this.hasLine2 = false;
            this.hasLine3 = true;
            this.hasLine4 = false;
        }
        if(scrollTop >= myKnow)
        {
            this.hasLine1 = false;
            this.hasLine2 = false;
            this.hasLine3 = false;
            this.hasLine4 = true;
        }
        // console.log(scrollTop+'|'+myPath+'|'+myExplain+'|'+myKnow);
    },
    // 选择出行日期
    chooseDate(value) {
        if (value.price != 0 && value.isSellOut != true && value.disable == false) {
            for (let i = 0; i < this.dateList.length; i++) {
                this.dateList[i].days = this.dateList[i].days.map(element => {
                    element.isChoose = false
                    if ((element.yearMonth + element.date) === (value.yearMonth + value.date)) {
                        element.isChoose = true;
                        this.year = value.yearMonth.split('-')[0]
                        this.month = value.yearMonth.split('-')[1]
                        if (value.date < 10) {
                            this.date = '0' + value.date
                        } else {
                            this.date = value.date
                        }
                    }
                    return element
                });
            }
            this.hasPrice = true
            this.tourDateId = value.tourDateId
        }
    },
    // 增加或者减少出游人数
    addAdult() {
       if (this.adultNum < 20) {
           this.adultNum = this.adultNum + 1
       }
   },
   addChild() {
       if (this.childNum < 20) {
           this.childNum = this.childNum + 1
       }
   },
   subAdult() {
       if (this.adultNum > 0) {
           this.adultNum = this.adultNum - 1
       }
   },
   subChild() {
       if (this.childNum > 0) {
           this.childNum = this.childNum - 1
       }
   },
    startBooking(value) {
       if (this.hasPrice) {
           if (this.adultNum != 0) {} else {
               Toast({
                   message: '请选择出游的成人人数',
                   duration: 2000
               });
               return;
           }
           for (let i = 0; i < this.dateList.length; i++) {
               this.dateList[i].days.forEach(element => {
                   if (element.isChoose == true) {
                   }
               });
           }
       } else {
           Toast({
               message: '请选择预订日期',
               duration: 2000,
           });
           return;
       }
       this.scrollTop = 0;
        console.log(setStore);
        setStore('productDetail',{
            'adult': this.adultNum,
            'child': this.childNum,
            //这里要用ID，不能用productid
            'productId': this.id,
            'tourDate': this.year + '.' + this.month + '.' + this.date,
            'tourDateId': this.tourDateId,
            'supplierId': this.supplierId,
            'productName': this.productName
        });
        window.location.href='./confirmorderstep1.html'
   /*    this.$LS.openView(this, {
           path: '/confirmOrderStep1',
           name: 'confirmOrderStep1',
           query: {
               'name': 'productDetail',
               'productDetail': {
                   'adult': this.adultNum,
                   'child': this.childNum,
                   //这里要用ID，不能用productid
                   'productId': this.id,
                   'tourDate': this.year + '.' + this.month + '.' + this.date,
                   'tourDateId': this.tourDateId,
                   'supplierId': this.supplierId,
                   'productName': this.productName
               }
           },
           callback: 'productDetail'
       });*/
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
//   margin: 0 10px;
}
.weight{
    font-weight: 600;
}
.font-family-big{
    font-weight: 600;
}
a {
  color: #42b983;
}
a.phone{
    width: 135px;
    height: 40px;
    position: absolute;
    left: 0;
    bottom: 0;
}
.clearfix:after,
.clearfix:before {
    content: ".";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
}
.cellOut{
    background-color:#7C7C7C !important;
}
.cellOutPhone{
    border:1px solid #7C7C7C !important;
    color:#7C7C7C !important;
}
.main-message,
.tour-path,
.cost-explain,
.reserve-know{
    position: relative;
}
.box{
    height: 100vh;
    position: relative;
}
.fixhidden{
    visibility:hidden !important;
}
.icon-return {
    width: 10px;
    height: 18px;
    position: absolute;
    left: 15px;
    bottom: 15px;
    background: url(../assets/images/back.png) center no-repeat;
    background-size: 10px 18px;
}
.tab-share {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 15px;
    bottom: 15px;
    background: url(../assets/images/black-share.png) center no-repeat;
    background-size: 18px 18px;
}
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}
.fixed.product-tab {
    width: 100%;
    position: fixed;
    top: 0px;
    z-index: 99;
    box-shadow: 0 0.08px 0.5px gray;
    &.iphoneTop {
        // padding-top: 18px;
        height: 52px;
    }
}
.demo2-scroll {
    height:350px;
    overflow: hidden;
    touch-action: none;
}
.demo3-scroll {
    position:absolute;top:0px;width:100%;height:100%;bottom:0px;
    // overflow: hidden;
    // touch-action: none;
}
.productList {
    position: relative;
    .picture{
        position: relative;
        min-height:150px;
        img{width:100%;height:auto;}
        .pageNum{
            position: absolute;
            width: 45px;
            height: 24px;
            bottom: 20px;
            right: 0;
            line-height: 24px;
            background: rgba(0,0,0,0.40);
            border-radius: 15px 0 0 15px;
            // font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #FFFFFF;
            text-align: center;
        }
    }

    // 视频播放控件样式设置
    .video {
        width: 100%;
        height: 281px;
    } // 视频盒子
    .video-box {
        width: 100%;
        position: relative;
        .play-btn {
            position: absolute;
            text-align: center;
            line-height: 60px;
            color: #fff;
            width: 60px;
            height: 60px;
            top: 80px;
            left: 50%;
            border-radius: 50%;
            background-color: rgba(255, 234, 45, 0.5);
            background: url(../assets/images/video-play.png) center no-repeat;
            background-size: 60px 60px;
            transform: translateX(-50%);
        }
        .remind {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.8);
            .main-mes {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
                margin-top: 80px;
            }
            button {
                display: inline-block;
                border-radius: 37px;
                margin-left: 123px;
                margin-top: 20px;
                width: 130px;
                height: 30px;
                background-color: rgba(255, 255, 255, 0.2);
                color: #fff;
                font-size: 14px;
                text-align: center;
            }
            .noNet{
                position: absolute;
                width: 100%;
                height: 20px;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                line-height: 20px;
                font-size: 14px;
                color: #FFFFFF;
                text-align: center;
            }
        }
    }
    .progress-bar {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        .bar {
            background-color: #FFB00B;
            width: 0%;
            height: 100%;
        }
    }
    video::-webkit-media-controls {
        display:none !important;
    }
    //iPhone视频播放图片的问题
    .video-poster{
        position: absolute;
        width: 100%;
        top: 0px;
    }
    .video-poster img{
        width:100%;
        height:auto;
    }
}
// 顶部回退按钮和分享按钮样式设置
.banner-btn {
    position: relative;
    top: 34px;
    .back {
        z-index: 999;
        position: absolute;
        width: 18px;
        height: 18px;
        left: 15px;
        top: 0;
        background: url(../assets/images/icon-back.png) center no-repeat;
        background-size: 10px 18px;
    }
    .share {
        z-index: 999;
        position: absolute;
        width: 18px;
        height: 18px;
        right: 20px;
        top: 0; // background-color: #fff;
        background: url(../assets/images/icon-share.png) center no-repeat;
        background-size: 18px 18px;
        }
}
 // 标题 标签样式设置
.content {
    // width: 100%;
    padding: 12px 15px;
    margin-bottom: 8px;
    background-color: #fff;
    .content-tit {
        span {
            // font-family: PingFangSC-Medium;
            font-weight: 600;
            display: inline-block;
            font-size: 17px;
            line-height: 26px;
            letter-spacing: 0.7px;
            color: #333;
            margin-bottom: 14px;
        }
    }
    .content-category {
        width: 100%;
        overflow: hidden;
        margin-bottom: 20px;
        li {
            float: left;
            margin-right: 18px;
            font-size: 13px;
            color: #999;
            line-height: 14px;
            height: 14px;
            background: url(../assets/images/icon-true.png) left center no-repeat;
            background-size: 13.5px 12.5px;
            span {
                padding-left: 12px;
                margin-top: -1.5px;
                display: inline-block;
                width: 14px;
                height: 13px;
            }
        }
    }
    .mes {
        background-color: #fff;
        .moneyS{
            font-size: 20px;
            color: #FD7F00;
            letter-spacing: -0.48px;
            text-align: center;
        }
        .money {
            font-size: 20px;
            // font-family: PingFangSC-Medium;
            color: #FD7F00;
            letter-spacing: -0.48px;
            text-align: center;
        }
        .any {
            font-size: 12px;
            color: #FD7F00;
            letter-spacing: -0.29px;
            text-align: center;
            line-height: 17px;
        }
    }
}
// tab栏样式设置
.product-tab {
        position: relative;
        background-color: #fff;
        padding: 0 23px;
        height: 44px;
        margin-bottom: 8px;
        li {
            width: 25%;
            float: left;
            margin: 0;
            margin-top: 15px;
            line-height: 20px;
            text-align: center;
            font-size: 14px;
            color: #333333;
            .line {
                width: 40px;
                margin: 5px auto 0;
                height: 3px;
                background: #00C892;
                border-radius: 6px;
            }
            .tit-text a{
                font-size: 14px;
                color: #333;
            }
        }
}
.fixed {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    padding: 0 58px;
    height: 44px;
    width: 72%;
    margin-bottom: 8px;
    z-index: 99;
}
// tab栏详情
.main-message {
        background-color: #fff;
        padding: 15px; // 行程亮点
        margin-bottom: 8px; // 行程亮点
        .tour-lights {
            .title {
                font-size: 16px;
                color: #333333;
                font-family: PingFangSC-Medium;
                font-weight: 600;
                line-height: 22px;
                margin-bottom: 12px;
                background: url(../assets/images/icon-tourLights.png) left center no-repeat;
                background-size: 12px 12px;
                padding-left: 18px;
            }
            /deep/ h1 {
                font-size: 16px;
                color: #333333;
                font-family: PingFangSC-Medium;
                line-height: 22px;
                margin-bottom: 12px;
                background: url(../assets/images/icon-tourLights.png) left center no-repeat;
                background-size: 12px 12px;
                padding-left: 18px;
            }
            /deep/ p,
            /deep/ div {
                font-size: 14px;
                color: #666;
                text-align: justify;
                line-height: 22px;
            }
            /deep/ img {
                width: 100%;
                height: auto;
                margin: 15px 0;
                background-color: salmon;
            }
        } 
        // 高效服务
        .efficient-service {
            .title {
                font-size: 16px;
                color: #333333;
                font-family: PingFangSC-Medium;
                font-weight: 600;
                line-height: 22px;
                margin-bottom: 12px;
                background: url(../assets/images/icon-tourLights.png) left center no-repeat;
                background-size: 12px 12px;
                padding-left: 18px;
            }
            .text {
                p {
                    font-size: 14px;
                    color: #666;
                    text-align: justify;
                    line-height: 22px;
                }
            }
        }
} 
// 路线规划问题
.path-plan {
        padding: 15px;
        background-color: #fff;
        margin-bottom: 8px;
        .tour-path {
            .title {
                font-size: 16px;
                color: #333333;
                font-family: PingFangSC-Medium;
                line-height: 22px;
                margin-bottom: 12px;
            }
            .days-plan {
                margin-left: 9px;
                padding-left: 17px;
                border-left: 1px dashed #C6C6C6;
                .path-details {
                    margin-bottom: 10px;
                    .bigTitle {
                        font-size: 15px;
                        color: #333333;
                        font-family: PingFangSC-Medium;
                        line-height: 21px;
                        margin-bottom: 10px;
                    }
                    .smallTitle {
                        font-size: 14px;
                        color: #333333;
                        line-height: 20px;
                        margin-bottom: 10px;
                    }
                    .text {
                        /deep/ div,
                        /deep/ p{
                            font-size: 13px;
                            color: #999999;
                            letter-spacing: 0.3px;
                            text-align: justify;
                            line-height: 20px;
                        }

                        p {
                            img {
                                display: block;
                                width: 200px;
                                height: 200px;
                            }
                        }
                        /deep/ h1{
                            position: relative;
                            padding-left: 6px;
                            font-size: 14px;
                            line-height: 20px;
                            margin: 11px 0;
                            color: #333333;
                        }
                        /deep/ h1::after{
                            position: absolute;
                            content: "";
                            width: 4px;
                            height: 4px;
                            top: 7px;
                            left: -2px;
                            background-color: #000;
                            border-radius: 2px;
                        }
                    }
                    /deep/ img {
                        width: 100%;
                        height: 200px;
                        margin: 15px 0;
                        background-color: gray;
                    }
                    .bigTitle {
                        position: relative;
                    }
                    .bigTitle::after {
                        content: "";
                        background: url(../assets/images/icon-lineRode.png) left center no-repeat;
                        background-size: 19px 19px;
                        padding-left: 18px;
                        position: absolute;
                        width: 5px;
                        height: 20px;
                        top: -0.2px;
                        left: -28px;
                        background-color: #fff;
                    }
                }
                .live {
                    font-size: 14px;
                    color: #151515;
                    line-height: 17px;
                    div {
                        line-height: 17px;
                        margin-bottom: 13px;
                    }
                    .tips {
                        font-size: 13px;
                        color: #999999;
                        text-align: justify;
                        line-height: 20px;
                        padding-bottom: 8px;
                        margin-bottom: 0;
                    }
                    .breakfast,
                    .sleep {
                        position: relative;
                    }
                    .breakfast::after,
                    .sleep::after {
                        content: "";
                        background-color: #00C892;
                        position: absolute;
                        border-radius: 50%;
                        border-top-left-radius: 999px; /* 左上角 */
                        border-top-right-radius: 999px; /* 右上角 */
                        border-bottom-right-radius: 999px; /* 右下角 */
                        border-bottom-left-radius: 999px; /* 左下角 */
                        border-radius: 999px;
                        width: 5px;
                        height: 5px;
                        top: 3px;
                        left: -20px;
                    }
                }
            }
        }
} 
// 费用说明部分
.cost-explain {
        background-color: #fff;
        padding: 15px;
        margin-bottom: 8px;
        .title {
            font-size: 16px;
            color: #333333;
            font-family: PingFangSC-Medium;
            line-height: 22px;
            margin-bottom: 12px;
        }
        .cost-details {
            /deep/ h1 {
                font-size: 15px;
                color: #333333;
                text-align: justify;
                line-height: 21px;
                margin-bottom: 11px;
                background: url(../assets/images/icon-money.png) left 4px no-repeat;
                background-size: 12px 12px;
                padding-left: 18px;
            }
            /deep/ p,
            /deep/ div {
                font-size: 14px;
                color: #666666;
                letter-spacing: 0;
                text-align: justify;
                line-height: 22px;
                margin-bottom: 14px;
            }
            /deep/ img{
                width: 100%;
                height: auto;
            }
        }
} 
// 预定须知
.reserve-know {
        padding: 15px;
        background-color: #fff;
        margin-bottom: 8px;
        .title {
            font-size: 16px;
            color: #333333;
            font-family: PingFangSC-Medium;
            font-weight: 600;
            line-height: 22px;
            margin-bottom: 12px;
        }
        /deep/ div,p{
            font-size: 14px;
            color: #666;
            line-height: 22px;
            margin-bottom: 15px;
        }
        /deep/ img{
            width: 100%;
            height: auto;
        }
        .reserve-details {
            .compact {
                font-size: 15px;
                color: #333333;
                font-family: PingFangSC-Medium;
                font-weight: 600;
                line-height: 21px;
                margin-bottom: 12px;
                background: url(../assets/images/icon-protocol.png) left 4px no-repeat;
                background-size: 12px 12px;
                padding-left: 18px;
            }
            /deep/ p{
                font-size: 14px;
                color: #666;
                line-height: 22px;
                margin-bottom: 15px;
            }
            .compact-text a {
                font-size: 14px;
                color: #000000;
                text-align: justify;
                line-height: 22px;
                text-decoration: underline;
                color: #00C892;
            }
        }
} 
// 取消政策
.cancel-policy {
        padding: 15px;
        padding-bottom: 68px;
        background-color: #fff;
        .title {
            font-size: 16px;
            color: #333333;
            font-family: PingFangSC-Medium;
            font-weight: 600;
            line-height: 22px;
            margin-bottom: 12px;
        }
        .cancel-details {
            p {
                font-size: 14px;
                color: #666666;
                letter-spacing: 0;
                line-height: 22px;
            }
        }
}
  
// 底部
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 7px 15px 8px 16px;
    .footer-btn{
        .consult {
            position: relative;
            width: 40%;
            height: 40px;
            float: left;
            letter-spacing: 0.5px;
            font-size: 14px;
            color: #00C892;
            border: 1px solid #00C892;
            border-radius: 7px;
            background-color: #fff;
            background: url(../assets/images/icon-phone.png) 22px center no-repeat;
            background-size: 13.5px 13.5px;
            &.gray{
                background: url(../assets/images/icon-phone-gray.png) 22px center no-repeat;
                background-size: 13.5px 13.5px;
            }
        }
        .reserve {
            float: right;
            width: 55%;
            height: 40px;
            font-family: PingFangSC-Regular;
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.5px;
            background: #00C892;
            border-radius: 7px;
            color: #fff;
        }
    }
}
/************************************************************************************************************************/ 
 /**********************************************模态框************************************************************************/
.myspemodal {
    // @include wh(100%, 100%);
    width: 100%;
    height: 100%;
    background: transparent;
    .close-other{width:100%;height:300px;}
}
/*模态框内容*/
.modal-content {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    padding-bottom: 15px;
    width: 100%;
    height: 549px;
    border-radius: 12px 12px 0 0;
    animation: topDown 0.4s;
    /* //自定义动画，从模态框内容上到下出现   */
    .modal-header {
        z-index: 999;
        height: 110px;
        padding: 0 20px;
        background-color: #fff;
        img.productlistimg{
            width:100%;
            height:100%;
            border-radius: 5px;
        }
        .img {
            float: left;
            display: inline-block;
            width: 110px;
            height: 110px;
            background-color: #00C892;
            margin-top: -22px;
            border: 2px solid #FFFFFF;
            border-radius: 5px;
        }
        .mes {
            width: 57.7%;
            float: left;
            margin-left: 15px;
            margin-top: 15px;
            font-family: PingFangSC-Medium;
            font-weight: 600;
            font-size: 14px;
            color: #333333;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis; //文本溢出显示省略号
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .line {
            width: 90%;
            height: 1px;
            position: absolute;
            top: 100px;
            left: 20px;
            border: 0.2px dashed #979797;
        }
    }
} // 具体日历部分
.box-calendar {
    height: 350px; // overflow-y: auto;
    overflow-x: hidden;
}
.modal-body {
    &:last-child {
        padding-bottom: 43px;
    }
    .year {
        text-align: center;
        font-family: PingFangSC-Medium;
        font-weight: 600;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        margin-bottom: 13.5px;
    }
    .weekdays {
        margin-bottom: 10px;
        li {
            float: left;
            width: 14.2%;
            text-align: center;
            font-family: PingFangSC-Regular;
            font-weight: 600;
            font-size: 15px;
            color: #333333;
            line-height: 21px;
            margin-bottom: 10px;
        }
    }
    .days {
        .row_daysList {
            .daysList {
                float: left;
                position: relative;
                text-align: center;
                width: 14.2%;
                height: 40px;
                margin-bottom: 10px;
                .value {
                    font-size: 16px;
                    line-height: 24px;
                }
                .daysList_money {
                    color: orange;
                    font-size: 10px;
                    line-height: 14px;
                }
                .daysList_rest {
                    width: 9px;
                    height: 14px;
                    position: absolute;
                    font-size: 10px;
                    right: 7px;
                    top: 0;
                    color: #FFB824;
                }
                .img {
                    position: absolute;
                    width: 9px;
                    height: 14px;
                    right: 8px;
                    top: 0;
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    color: #00C892;
                }
                .sold_out {
                    color: #999;
                }
                .white_out {
                    color: #ccc;
                }
                .black_out {
                    color: #333;
                }
                .white_special{
                    color:#ccc;
                }
            }
            .isChoose {
                background: #00C892;
                border-radius: 4px;
                .value,
                .daysList_money,
                .sold_out,
                .white_out,
                .rest_out,
                .black_out {
                    color: #fff;
                }
            }
        }
    }
}
.model-footer {
    position: fixed;
    z-index: 999;
    width: 100%;
    left: 0;
    bottom: 0;
    border-top: 0.5px solid #E9E9E9;
    background-color: #fff;
    .footer-line {
        width: 345px;
        height: 0.5px;
        background-color: #E9E9E9;
        margin-bottom: 20px;
        margin-left: 15px;
    }
    .tourist {
        padding-left: 13px;
        line-height: 20px;
        .title {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #9F9F9F;
            display: inline-block;
            line-height: 20px;
            vertical-align: middle;
            // margin-top: 1.1px;
        }
        .addMinusItem {
            margin-left: 8px;
            line-height: 20px;
            span {
                display: tabel-cell;
                vertical-align: middle;
                display: inline-block;
                font-family: PingFangSC-Medium;
                font-weight: 600;
                font-size: 14px;
                color: #666666;
                line-height: 20px;
                margin-right: 10px;
            }
        }
        span.add {
            width: 15px;
            height: 15px;
            background: url(../assets/images/i_add.png);
            background-size: 15px 15px;
            // @include icon-style(15px, 15px, 'i_add.png');
            &.active {
                // @include icon-checked-style('i_add_active.png');
                background: url(../assets/images/i_add_active.png);
                background-size: 15px 15px;
            }
        }
        span.minus {
            width: 15px;
            height: 15px;
            background: url(../assets/images/i_minus.png);
            background-size: 15px 15px;
            // @include icon-style(15px, 15px, 'i_minus.png');
            &.active {
                // @include icon-checked-style('i_minus_active.png');
                background: url(../assets/images/i_minus_active.png);
                background-size: 15px 15px;
            }
        }
        name {
            font-family: PingFangSC-Medium;
            font-weight: 600;
            font-size: 14px;
            color: #666666;
            line-height: 20px;
        }
    }
    button {
        width: 100%;
        height: 44px;
        background: #00C892;
        color: #fff;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        line-height: 21px;
        margin-top: 23px;
        color: #FFFFFF;
    }
}
.not-selected {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9F9F9F;
    line-height: 20px;
}
.day-not-selected {
    font-family: PingFangSC-Medium;
    font-weight: 600;
    font-size: 16px;
    color: #CCCCCC;
    letter-spacing: -0.38px;
    text-align: center;
}
.nomal {
    color: #333;
}   
@keyframes topDown {
    from {
        bottom: -300px;
        opacity: 0
    }
    to {
        bottom: 0;
        opacity: 1
    }
}

</style>