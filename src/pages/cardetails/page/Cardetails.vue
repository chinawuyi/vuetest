<template>
    <div class="confirmOrder-wrap">
        <!-- <app-header :headTitle="carDetail.carModelName"></app-header> -->
            <header class='head_top'>
                <div class="back_btn"  onClick="javascript:history.back(-1);"><span class="back"></span></div>
                <p class="title">{{carDetail.carModelName}}</p>
            </header>
        <div class="confirmOrder-con" :class="{'iphoneTop':isI}">
            <section class="common-sec banner">
                <mt-swipe :auto="4000" ref="swipeWrapper">
                    <mt-swipe-item v-for="(url,index) of carDetail.bannerImgUrl" :key="index"><img :src="url" alt=""></mt-swipe-item>
                </mt-swipe>
            </section>
            <section class="common-sec configure">
                <div class="item-mid">
                    <div class="headline"><span>车辆配置</span></div>
                    <mt-swipe :auto="0">
                        <mt-swipe-item>
                            <ul>
                                <li v-for="(item,index) of configure.slice(0,8)" :key="index">
                                    <img :src="'../../../../static/images/'+item.icon+'.png'" alt="">
                                    <p class="name">{{item.name}}</p>
                                </li>
                            </ul>
                        </mt-swipe-item>
                        <mt-swipe-item>
                            <ul>
                                <li v-for="(item,index) of configure.slice(8)" :key="index">
                                    <img :src="'../../../../static/images/'+item.icon+'.png'" alt="">
                                    <p class="name">{{item.name}}</p>
                                </li>
                            </ul>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </section>
            <section class="common-sec">
                <div class="item-mid">
                    <div class="headline"><span>房车展示</span></div>
                    <div class="imglist">
                        <img v-for="(url,index) of carDetail.carImgUrl" :key="index" :src="url" alt="">
                    </div>
                </div>
            </section>
            <section class="common-sec">
                <div class="item-mid">
                    <div class="headline"><span>房车参数</span></div>
                    <div class="imglist">
                        <img v-for="(url,index) of carDetail.carDetailImgUrl" :key="index" :src="url" alt="">
                    </div>
                    <div class="close" onClick="javascript:history.back(-1);"></div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import {C} from "@/common/connect";
    import {
        Swipe,
        SwipeItem
    } from 'mint-ui';
    export default {
        data() {
            return {
                isI: /iphone/i.test(navigator.userAgent),
                carDetail: {
                    carModelName: '大通房车 -B型 V80 4座3卧'
                },
                configure: []
            }
        },
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem
        },
        methods: {
            //返回上一页
            // back() {
            //     window.location.href='travellist.html#/'+61;
            // },
            getCarDetail(id) {
                C.getApi(`rv-travel-business/${C.version}/getCarModelInfo`, {
                    id: id
                }, {}).then(data => {
                    this.carDetail = data.data;
                    this.handleConfigure()
                    // console.log(data.data);
                })
            },
            handleConfigure() {
                //去掉外接淋浴器 和 尺寸（长x宽x高）
                for (let obj of this.carDetail.configure) {
                    let item = obj
                    if (obj.name == '车门数') {
                        continue;
                    } else if (obj.name == '要求驾照') {
                        item.name = obj.descri;
                        item.icon = 'i_card';
                    } else if (obj.name == '外置遮阳棚') {
                        if (obj.descri == '是') {
                            item.icon = 'i_umbrella';
                        } else {
                            continue;
                        }
                    } else if (obj.name == '室外照明灯条') {
                        if (obj.descri == '是') {
                            item.icon = 'i_light';
                        } else {
                            continue;
                        }
                    } else if (obj.name == '倒车影像') {
                        if (obj.descri == '是') {
                            item.icon = 'i_projection';
                        } else {
                            continue;
                        }
                    } else if (obj.name == '倒车雷达') {
                        if (obj.descri == '是') {
                            item.icon = 'i_projection';
                        } else {
                            continue;
                        }
                    } else if (obj.name == '主副驾安全气囊') {
                        continue;
                    } else if (obj.name == '厨房') {
                        if (obj.descri == '是') {
                            item.icon = 'i_cook';
                        } else {
                            continue;
                        }
                    } else if (obj.name == '车载冰箱') {
                        if (obj.descri == '是') {
                            item.icon = 'i_refrigerator';
                        } else {
                            continue;
                        }
                    } else if (obj.name == '卫浴') {
                        if (obj.descri == '是') {
                            item.icon = 'i_bathroom';
                        } else {
                            continue;
                        }
                    } else if (obj.name == '储物柜') {
                        if (obj.descri == '是') {
                            item.icon = 'i_lockers';
                        } else {
                            continue;
                        }
                    } else if (obj.name == '外接淋浴器') {
                        continue;
                    } else if (obj.name == '尺寸（长x宽x高）') {
                        continue;
                    }
                    this.configure.push(item);
                }
                this.configure.unshift({
                    'name': this.carDetail.oilType == '80310001' ? '汽油' : '柴油',
                    'descri': '是',
                    'icon': 'i_oil'
                })
                this.configure.unshift({
                    'name': this.carDetail.seats + '座' + this.carDetail.beds + '卧',
                    'descri': '是',
                    'icon': 'i_bed'
                })
                this.configure.unshift({
                    'name': this.carDetail.isAt ? '自动挡' : '手动挡',
                    'descri': '是',
                    'icon': 'i_auto'
                })
            }
        },
        activated() {
            //h5 开发模式
            // if (this.$MD.base.online === false) {
            //     this.getCarDetail(this.$route.params.carModelId);
            // }
        },
        created() {
                this.getCarDetail(this.$route.params.carModelId);
            
        }
    };
</script>
<style lang="scss" scoped>
    .head_top {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        padding: 0 4%;
        width: 100%;
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
                background: url(../../../../static/images/back.png);
                background-size: 10px 18px;
                // @include bis('back.png');
             }
        }
    }

    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .head_top.head_i {
            padding-top: 44px;
            height: 88px;
        }
    }
    .confirmOrder-con {
        padding-top: 48px;
        &.iphoneTop {
            padding-top: 64px;
        }
    }
    .banner {
        height: 52vw;
        margin: 0;
        .mint-swipe {
            img {
                width: 100%;
                height: auto;
            }
        }
    }
    h2.title {
        // @include pfm();
        font-size: 15px;
        line-height: 21px;
        padding-top: 16px;
    }
    .configure {
        .mint-swipe {
            height: 150px;
            ul {
                width: 95.7%;
                li {
                    float: left;
                    width: 25%;
                    text-align: center;
                    margin-bottom: 7px;
                    img {
                        width: 35px;
                    }
                    p {
                        font-size: 12px;
                        line-height: 22px;
                    }
                }
            }
        }
    }
    .price {
        padding-bottom: 6px;
        .title {
            padding-bottom: 15px;
        }
        .row {
            line-height: 18px;
            .title-name,
            .des {
                font-size: 13px;
            }
            padding-bottom:9px;
        }
    }
    .headline {
        line-height: 24px;
        font-size: 17px;
        color: #030303;
        text-align: center;
        padding: 15px 0 12px;
        span {
            position: relative;
            letter-spacing: -0.41px;
            &:before {
                content: "";
                width: 16px;
                height: 1px;
                background: #999;
                // background: $colord8;
                position: absolute;
                left: -27px;
                top: 11px;
            }
            &:after {
                content: "";
                width: 16px;
                height: 1px;
                background: #999;
                // background: $colord8;
                position: absolute;
                right: -27px;
                top: 11px;
            }
        }
    }
    .imglist {
        img {
            width: 100%;
            height: auto;
            margin-bottom: 10px;
        }
        padding-bottom:10px;
    }
    .close {
        width: 100%;
        height: 50px;
        margin-top: 51px;
        border-top: 1px solid #f0f0f0;
        background: url(../../../../static/images/i_closed.png) no-repeat;
        // background-size: 13.6px 13.6px;
        // @include icon-style(100%, 50px, 'i_closed.png');
        background-position: center center;
        background-size: 14px auto;
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .confirmOrder-con.iphoneTop {
            padding-top: 88px;
        }
    }
</style>




