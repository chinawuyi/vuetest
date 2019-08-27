<template>
    <div class="page">
        <header>
            <h1>旅行产品</h1>
        </header>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in imgList">
                    <img v-bind:src="item.advertiseImg" class="swiper-image coverImg">
                </div>
            </div>
        </div>
        <div class="hot">
            <span>热门旅行</span>
            <a href="./travellist.html#/0">全部<b></b></a>
        </div>
        <ul class="feature">
            <a class="liBox" v-for="item in featureList" :href="'./travellist.html#/'+ item.id">
                <li>
                    <img v-bind:src="item.featureWordListImg" alt=""  class="coverImg">
                    <span>{{item.featureWordName}}</span>
                    <p><span>{{item.bookCount}}</span>人想去<a href="javascript:;"></a></p>
                </li>
            </a>
        </ul>
        <p class="best">精选游</p>
        <article>
            <dl v-for="(item,index) in topProduct">
                <dt>
                    <a class="imgBox" :href="'./travelproduct.html#/'+item.productCode + '/' + item.id">
                        <img v-bind:src="item.productListImg" alt="" class="coverImg" >
                    </a>
                </dt>
                <dd class="name">{{item.productName}}</dd>
                <dd class="sign">{{item.departureCityName}}出发</dd>
                <dd class="person">
                    <img  class="coverImg" v-for="(item,index1) in 3" v-bind:src="require(`../assets/head/head_${30-((index+1)-parseInt((index+1)/10)*10)*3+index1}.png`)" alt="">
                    <span v-if="item.orderCount<3">等人已出发</span>
                    <span v-else>等{{item.orderCount}}人已出发</span>
                </dd>
            </dl>
            <dl v-for="(item,index) in conProduct">
                <dt>
                    <a  class="imgBox"  :href="'./travelproduct.html#/'+item.productCode + '/' + item.id">
                        <img class="coverImg" v-bind:src="item.productListImg" alt="" >
                    </a>
                </dt>
                <dd class="name">{{item.productName}}</dd>
                <dd class="sign">{{item.departureCityName}}出发</dd>
                <dd class="person">
                    <img  class="coverImg" v-for="(item,index1) in 3" v-bind:src="require(`../assets/head/head_${30-((index+1)-parseInt((index+1)/10)*10)*3+index1}.png`)" alt="">
                    <span v-if="item.orderCount<3">等人已出发</span>
                    <span v-else>等{{item.orderCount}}人已出发</span>
                </dd>
            </dl>
        </article>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import {C} from "@/common/connect";
    import { isWeixin,setStore } from "@/common/utils";
    export default {
        data() {
            return {
                imgList: [{}],
                featureList: [{}],
                conProduct: [{}],
                topProduct: []
            }
        },
        mounted(){
            this.cacheWxOpenId();
            this.getBanner();
            this.getFeature();
            this.getTop();
            this.getNormal();
        },
        methods: {
            cacheWxOpenId()
            {
                let wxOpenId = this.$route.query.wxOpenId;
                setStore('wxOpenId',wxOpenId);
                console.log(wxOpenId);
            },
            swiperInit() {
                var mySwiper = new Swiper('.swiper-container', {
                    loop: true,
                    slidesPerView: 'auto',
                    initialSlide:0,//用来设定页面加载完成时，第几张图片先显示出来
                    centeredSlides: true,
                    spaceBetween: 10,
                    // observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    // observeParents:true,//修改swiper的父元素时，自动初始化swiper
                })
            },
            getBanner() {
                let that = this;
                C.getApi('rv-travel-mainpage/v1/mainPage/banners',{
                },{
                }).then(res => {
                    this.imgList = res.data;
                    that.$nextTick(function () {
                        that.swiperInit();
                    })
                });
            },
            getFeature() {
                C.getApi('rv-travel-mainpage/v1/featureWords',{
                    "seqNoSort": "2",
                    "featureWordStatus": "1",
                    "isEnable": "1"
                },{
                }).then(res =>{
                    console.log(res.data.resultList);
                    let feature = res.data.resultList;
                    let bookCount = [617, 825, 573];
                    feature.map((item,index)=>{
                        item.bookCount = bookCount[index];
                        if(index < 3){
                            this.featureList.push(item);
                        }
                    })
                    this.featureList.shift();
                });
            },
            getTop() {
                C.getApi('rv-travel-mainpage/v1/mainPage/topInfo',{
                    "channelCode": "81114410"
                },{
                }).then(res =>{
                    res.data.map(item =>{
                        this.topProduct.push(item.object);
                    });
                    this.topProduct.map((item,index)=>{
                        if(item.id == ""){
                            this.topProduct[index].id = -1;
                        }
                    })
                });
            },
            getNormal() {
                C.getApi('rv-travel-mainpage/v1/mainPage/generalInfo',{
                    "channelCode": "81114410"
                },{
                }).then(res =>{
                    this.conProduct = res.data.resultList;
                    this.conProduct.map((item,index)=>{
                        if(item.id == ""){
                            this.conProduct[index].id = -1;
                        }
                    })

                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../../assets/scss/common';

    .page {
        padding-bottom: 283px;
        background:#F4F4F4;
    }
    .page dl dt a.imgBox{
        display: block;
        width:fit-content;
        height: fit-content;
    }
    .page img.coverImg{
        object-fit: cover;
    }
    .page header {
        overflow: hidden;
        padding: 0 15px;
        height: 45px;
        text-align: center;
        background: #fff;
    }
    .page .arrow {
        /*float: left;*/
        position: absolute;
        top: 13px;
        left: 15px;
        /*margin: 13px 133px 0 0;*/
        width: 10px;
        height: 18px;
        background:url('../assets/back.png') no-repeat center;
        background-size: 100% 100%;
    }
    .page header h1 {
        margin-top: 13px;
        height: 24px;
        color: #222;
        font: 15px/21px "PingFangSC-Regular";
    }
    .page .swiper-container {
        padding: 10px 0;
        background: #fff;
        width: 100%;
        height: 170px;
    }
    .page .swiper-wrapper .swiper-slide{
        width: 327px;
        border-radius: 5px;
    }
    .page .swiper-image{
        border-radius: 5px;
        width: 327px;
        height: 170px;
    }
    .page .hot {
        overflow: hidden;
        padding: 20px 15px 15px;
        background: #fff;
    }
    .page .hot span{
        float: left;
        color: #666;
        font: 20px/28px "PingFangSC-Medium";
    }
    .page .hot a {
        float: right;
        margin-top: 4px;
        color: #666;
        font: 15px/21px "PingFangSC-Regular";
        text-decoration: none;
    }
    .page .hot a b {
        float: right;
        margin-top: 4px;
        width: 7px;
        height: 12px;
        margin-left: 10.5px;
        background:url('../assets/next.png');
        background-size: 7px 12px;
    }
    .page .feature {
        overflow: hidden;
        background: #fff;
    }
    .page .feature .liBox {
        overflow: hidden;
        float: left;
        width: fit-content;
    }
    .page .feature li {
        position: relative;
        float: left;
        width: 105px;
        height: 105px;
        margin-left: 15px;
    }
    /*.page .feature li:last-child{*/
    /*margin-right: 15px;*/
    /*}*/
    .page .feature img {
        width: 105px;
        height: 105px;
        border-radius: 5px;
    }
    .page .feature li>span {
        position: absolute;
        top: 62.5px;
        left: 10px;
        color: #fff;
        font: 15px/21px "PingFangSC-Medium";
    }
    .page .feature p {
        position: absolute;
        top: 84.5px;
        left: 10px;
        color: #fff;
        font: 11px/16px "PingFangSC-Regular";
    }
    .page .feature p>span {
        color: #fff;
        margin-right: 3px;
    }
    .page .feature p a {
        float: right;
        margin-left: 25px;
        margin-top: 5.5px;
        width: 4px;
        height: 8px;
        background:url('../assets/right.png');
        background-size: 100% 100%;
    }
    .page .best {
        background: #fff;
        padding: 34px 0px 15.5px 15px;
        color: #666;
        font: 20px/28px "PingFangSC-Medium";
    }
    .page article {
        overflow: hidden;
        padding: 0 15px;
        background: #fff;
    }
    .page article dl {
        overflow: hidden;
        margin-bottom: 21px;
        height: 105px;
    }
    .page article dt {
        float: left;
        margin-right: 15px;
        width: 105px;
        height: 105px;
        border-radius: 5px;
    }
    .page article dt img {
        display: inline-block;
        width: 105px;
        height: 105px;
        border-radius: 5px;
    }
    .page article .name{
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 225px;
        height: 44px;
        color: #333;
        font: 16px/22px "PingFangSC-Medium";
    }
    .page .sign {
        overflow: hidden;
        margin-top: 7px;
        margin-bottom: 16px;
        padding: 1px 6px;
        width: fit-content;
        height: 17px;
        color: #999;
        font: 11px/16px "PingFangSC-Regular";
        text-align: center;
        border: 0.5px solid #999;
        border-radius: 5px;
    }
    .page .person img {
        float: left;
        width: 18px;
        height: 18px;
    }
    .person img:nth-of-type(2), .person img:nth-of-type(3) {
        margin-left: -4px;
    }
    .page .person span{
        float: left;
        margin-left: 6px;
        color: #999;
        font: 12px/17px "PingFangSC-Regular";
    }
</style>
