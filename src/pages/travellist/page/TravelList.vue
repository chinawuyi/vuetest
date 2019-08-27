<template>
    <div class="box" v-bind:class="{'ground':isShadow}">
        <div class="productList">
            <header>
                <a @click="goBack" class="back"></a>
                <span v-on:click="goSelect">{{travelType}}<i class="top"></i></span>
            </header>
            <section v-if="currentType">
                <div class="bannerImg">
                    <img :src="currentType.featureWordTopImg" alt="">
                    <a href="javascript:;" class="shadow"></a>
                    <div class="word">
                        <span>{{currentType.descript}}</span>
                    </div>
                </div>
                <div class="bigTitle">
                    <a href="javascript:;"></a>
                    <span>- 推荐线路 -</span>
                    <a href="javascript:;"></a>
                </div>
                <mt-loadmore :bottom-method="loadBottom"
                             :bottom-all-loaded="allLoaded"
                             @bottom-status-change="handleBottomChange"
                             :auto-fill="false"
                             ref="loadmore">
                    <ul>
                        <li v-if="travel" v-for="travel in travelList" v-bind:class="{ 'lineI': isI}"
                            @click="goDetail(travel.productCode,travel.id)">
                            <div class="imgBox">
                                <img :src="travel.productListImg" alt="">
                            </div>
                            <p class="title">{{travel.productName}}</p>
                            <div class="tag">
                                <a href="javascript:;" class="tab"
                                   v-bind:class="{ 'lineI': isI}">
                                    {{travel.departureCityName | getSlice}}出发
                                </a>
                                <p>
                                    <span class="money"><b>&yen;</b>{{travel.minPrice}}</span>
                                    <span>起/人均</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                    <div slot="bottom" class="mint-loadmore-bottom">
                        <span v-show="(bottomStatus === 'pull')&&(!allLoaded)">{{bottomPullText}}</span>
                        <span v-show="bottomStatus === 'drop'">{{bottomDropText}}</span>
                        <span v-show="allLoaded">{{allLoadedText}}</span>
                        <span v-show="bottomStatus === 'loading'">
                            <mt-spinner type="snake"></mt-spinner>
                        </span>
                    </div>
                </mt-loadmore>
            </section>
        </div>
        <mt-popup class="shadowBox"
                  v-model="isShadow"
                  popup-transition="popup-fade"
                  closeOnClickModal=false
                  lockScroll=true>
            <p class="title">
                <a href="javascript:;" class="shadowLine"></a>
                <span>选择品质类型</span>
                <a href="javascript:;" class="shadowLine"></a>
            </p>
            <div class="featureList">
                <ul>
                    <li @click="goSwitch()">
                        <div v-bind:class="{ 'boxI': !isI}">
                            <img src="../../../assets/images/allType2.png" alt=""></div>
                        <b class="mask"></b><a href="javascript:;">全部</a></li>
                    <li v-for="type in typeList" @click="goSwitch({i:type.id})"
                        v-bind:class="{'noImg':(type.featureWordListImg=='http://oyo2sl9fz.bkt.clouddn.com/')}">
                        <div v-bind:class="{ 'boxI': !isI}"><img :src="type.featureWordListImg
" alt=""></div>
                        <b class="mask"></b><a href="javascript:;">{{type.featureWordName
                        }}</a></li>
                </ul>
            </div>
            <p class="cancel">
                <a href="javascript:;" @click="cancel"></a>
            </p>
        </mt-popup>

    </div>
</template>


<script>
import {C} from "@/common/connect";
import { isWeixin,getStore } from "@/common/utils";
export default {
  name: "travellist",
  data() {
      return {
          isI: false,
          isShadow: false,
          travelType: '',
          typeList: [],
          travelList: [],
          currentType: {},
          allType: {"featureWordTopImg": "static/images/allType3.png", "descript": '带上全家，开房车向美景出发！自驾房车去茶卡盐湖看雪山映湖美景，去张掖看丹霞风光，去祁连看大草原，去敦煌看月牙泉沙漠奇观…'},
          pageNum: 1,
          pageSize: 10,
          totalpage: 0,
          allLoaded: false,
          loading: false,
          bottomStatus: 'pull',
          bottomPullText: '上拉加载更多...',
          bottomDropText: '释放更新...',
          allLoadedText: '没有更多数据了'
      }
  },
  created() {
      this.init();
  },
    created() {
        this.init();
    },
    filters: {
        getSlice(t) {
            return t ? t.slice(0, -1) : t;
        },
    },
    methods: {
        init() {
            let featureWordsId = this.$route.params.featureWordsId;
            this.getTypeList();
            featureWordsId == 0 ? this.getTypeAll() : this.getCurrentType(featureWordsId);
            this.getTravelList(featureWordsId);
        },
        goBack(){
            let t = getStore("wxOpenId");
            window.location.href = './home.html#/'+t;
        },
        resetList() {
            this.travelList = [];
            this.pageNum = 1;
            this.pageSize = 10;
            this.totalpage = 0;
            this.allLoaded = false;
            this.loading = false;
            this.bottomStatus = 'pull';
        },
        getTypeAll() {//全部分类
            this.currentType = this.allType;
            this.travelType = '全部';
        },
        getCurrentType(t) {//获取当前特色词参数
            C.getApi('rv-travel-mainpage/' + C.version + '/featureWord/' + t, {}, {}).then((data) => {
                this.currentType = data.data;
                this.travelType = this.currentType ? this.currentType.featureWordName : "null";
            });
        },
        getTypeList() {//获取特色词列表
            C.getApi('rv-travel-mainpage/' + C.version + '/featureWords', {
                seqNoSort: 2,
                featureWordStatus: 1,
                isEnable: 1
            }, {}).then((data) => {
                this.typeList = data.data.resultList;
            });
        },
        goSwitch({i = 0} = {}) {//选择某一特色词
            if(i == 0){
                window.location.href = './travellist.html#/0';
            }else{
                window.location.href = './travellist.html#/'+i;
            }
            i == 0 ? this.getTypeAll() : this.getCurrentType(i);
            this.isShadow = false;
            this.resetList();
            this.getTravelList(i);
        },
        loadBottom() {
            // 加载更多数据
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            this.more();// 上拉触发的分页查询
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        more() {
            //分页查询
            if (this.totalpage == 1) {
                this.pageNum = 1;
                this.allLoaded = true;
            } else {
                this.pageNum = parseInt(this.pageNum) + 1;
                this.allLoaded = false;
            }
            if (this.currentType.id) {
                this.getTravelList(this.currentType.id);
            } else {
                this.getTravelList(0);
            }
        },
        isHaveMore: function () {
            // 是否还有下一页，如果没有就禁止上拉刷新
            if (this.pageNum == this.totalpage) {
                this.allLoaded = true;
            }
        },
        //获取特色词相关产品list
        getTravelList(featureWordsId) {
            C.getApi('rv-travel-product/' + C.version + '/products/feature/' + featureWordsId, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }, {}).then((res) => {
                this.travelList.push(...res.data.resultList);
                this.totalpage = res.data.totalPages;
                this.isHaveMore();
            });
        },
        goSelect() {//打开特色词选择
            this.isShadow = true;
            window.scrollTo(0, 0);
        },
        cancel(event) {//关闭模态
            this.isShadow = false;
            window.scrollTo(0, 0);
        },
        //跳转产品详情
        goDetail(productid, id) {
            window.location.href='travelproduct.html#/'+productid+'/'+id;

        }
    },
    beforeRouteEnter(to, from, next) {
        to.meta.keepAlive = from.name == "travelProduct" ? true : false;
        next();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .box {
        padding-top: 43px;
        background: #f1f1f1;
        &.boxI {
            padding-top: 64px;
        }
        &.ground {
            /*position:fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            height: 150%;
            overflow: hidden;*/
            min-height: 120vh;
        }

        .productList {
            &.ground {
                height: 100vh;
                overflow: hidden;
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
                    background:url("../assets/images/top.png") right 6px no-repeat;
                    background-size: 14px 8px;
                    .top {

                    }
                }
            }

            section {
                padding-bottom: 59px;
                background: #f1f1f1;
                overflow: hidden;
                .bannerImg {
                    position: relative;
                    background: url("../../../assets/images/default-img.png") no-repeat center;
                    background-size: cover;
                    min-width: 100%;
                    min-height: 310px;

                    img {
                        min-width: 100%;
                        min-height: 310px;
                        max-height: 310px;
                    }
                    a.shadow {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0.00) 0%, #000000 100%);
                    }
                    .word {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        max-height: 125px;
                        padding: 12px 15px;
                        overflow: hidden;
                        .title {
                            position: relative;
                            a.line {
                                display: inline-block;
                                position: relative;
                                bottom: 5px;
                                background: #fff;
                            }
                        }
                        span {
                            font-size: 15px;
                            line-height: 21px;
                            letter-spacing: 0.5px;
                            color: #fff;
                        }
                        & > span {
                            display: block;
                            max-height: 63px;
                            letter-spacing: 0.5px;
                            color: #fff;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                        }
                    }
                }
                .bigTitle {
                    position: relative;
                    padding: 20px 0;
                    background: #fff;
                    font-size: 20px;
                    line-height: 28px;
                    color: #333;
                    overflow: hidden;
                    text-align: center;

                    span {
                        font-weight: 600;
                    }
                    a {
                        display: inline-block;
                        position: relative;
                        top: -6px;
                        background: #333;
                    }
                }
                ul {
                    width: 100%;
                    padding: 0 15px;
                    background: #fff;
                    overflow: hidden;
                    li {
                        position: relative;
                        width: 100%;
                        margin-bottom: 20px;
                        border-bottom: 1Px solid #eaeaea;
                        background: #fff;
                        overflow: hidden;
                        &.lineI {
                            border-bottom: 1px solid #eaeaea;
                        }

                        &:last-child {
                            border-bottom: none;
                        }
                        .imgBox {
                            position: relative;
                            margin-bottom: 15px;
                            height:4.6666rem;
                            /*background: #FACBA0;*/
                            background: url("../../../assets/images/default-img.png") no-repeat center center;
                            background-size: cover;
                            overflow: hidden;
                            transform: rotate(0deg);
                            img {
                                /*min-width: 100%;*/
                                /*min-height: 175px;*/
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        p.title {
                            font-size: 16px;
                            line-height: 22px;
                            font-weight: 600;
                            max-height: 44px;
                            margin-bottom: 10px;
                            color: #333;
                            font-family: PingFangSC-Medium,Helvetica Neue,Roboto,sans-serif;
                            /*font-weight: 600;*/
                            letter-spacing: 0.5px;
                            text-align: justify;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                        .tag {
                            position: relative;
                            margin-bottom: 20px;
                            height:22px;
                            overflow: hidden;

                            a.tab {
                                display: block;
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                padding: 4px 6px;
                                border-radius:4px;
                                /*height: 16px;*/
                                border: 0.5Px solid #999;
                                -webkit-box-sizing: content-box;
                                -moz-box-sizing: content-box;
                                box-sizing: content-box;
                                color: #999;
                                span {
                                    display: block;
                                    color: #999;
                                    height: 16px;
                                }
                                &.lineI {
                                    border: 0.6px solid #999;

                                }
                            }
                            p {
                                float: right;line-height:20px;
                                span {
                                    &.money {
                                        font-size: 20px;
                                        color: #FD7F00;
                                        text-align: center;
                                        letter-spacing: -0.48px;
                                        b{
                                            color: #FD7F00;
                                            font-weight: normal;
                                            font-family: Helvetica Neue,Roboto,sans-serif;
                                        }
                                    }
                                    &:last-child {
                                        color: #FD7F00;
                                        text-align: center;
                                        letter-spacing: -0.29px;
                                    }
                                }
                            }

                        }
                    }
                }
            }

        }

        .shadowBox {
            background: transparent;
            opacity: 1;
            width: 100%;
            height: 100%;
            background: transparent;
            opacity: 1;

            p.title {
                margin-top: 40px;
                margin-bottom: 33px;
                width: 100%;
                text-align: center;
            }
            a.shadowLine {
                display: inline-block;
                position: relative;
                width: 31px;
                height: 1.5px;
                bottom: 5px;
                background: #999;
            }

            span {
                margin: 0 11px 0 16px;
                color: #999;
                font-size: 15px;
                line-height: 21px;
            }
            .featureList {
                margin: 0 auto;
                width: 226px;
                height: 480px;
                overflow-x: hidden;
                ul {
                    width: 226px;
                    overflow-scrolling: touch;
                    -webkit-overflow-scrolling : touch;
                    &::-webkit-scrollbar {
                        display: none;
                    }
                    li {
                        position: relative;
                        float: left;
                        margin-bottom: 15px;
                        width: 105px;
                        height: 105px;
                        line-height: 105px;
                        text-align: center;
                        overflow: hidden;
                        &.noImg {
                            background: #FCDC9F;
                        }
                        div{
                            width: 105px;
                            height: 105px;
                            border-radius: 10px;
                            position: relative;
                            overflow: hidden;
                            &.boxI{
                                transform: rotate(0deg);
                                img{
                                    display: block;
                                    border-radius: 10px;
                                }
                            }
                        }
                        img {
                            height: 105px;
                        }

                        &:nth-child(odd) {
                            margin-right: 15px;
                        }
                        b.mask {
                            width: 105px;
                            height: 105px;
                            border-radius: 10px;
                            position: absolute;
                            top: 0;
                            left: 0;
                            background: rgba(0, 0, 0, .3);
                            filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#4c000000,endColorstr=#4c000000);
                        }

                        a {
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            font-weight: 600;
                            transform: translate(-50%,-50%);
                            font-size: 20px;
                            line-height: 28px;
                            width: 100%;
                            color: #fff;
                        }
                    }
                }
            }
            p.cancel {
                margin-top: 36px;
                text-align: center;
                a {
                    width: 16px;
                    height: 16px;
                    background: url('../assets/images/cancel.png');
                    background-size: 16px 16px;
                    display: inline-block;
                    overflow: hidden;
                }
            }

        }
    }


</style>


<style>
    body{
        overflow-y: auto!important;
    }
    .v-modal {
        /*opacity: 0.9!important;*/
        opacity: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 150%!important;
        background: rgba(0,0,0,.8);
    }
    .mint-loadmore{
        background: #fff;
    }
    .mint-loadmore-bottom{
        background: #f1f1f1;
    }
</style>