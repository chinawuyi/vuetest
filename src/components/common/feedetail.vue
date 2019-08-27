<template>
    <div class="fee-wrap">
        <div class="shadowLayer" v-show="showHide" @click="showHide=false"></div>
        <div class="fee-detail" v-show="showHide">
            <section class="common-sec">
                <div class="title"><span>费用明细</span></div>
                <ul class="fee-list">
                    <li>
                        <div class="headline"><span class="name">套餐总价</span><span class="price">￥{{travelComboAmt}}</span></div>
                    </li>
                    <!-- <li>
                        <div class="headline"><span class="name">保险</span></div>
                        <div class="txt"><span class="des">租车意外险 X 2人</span><span class="price">￥360</span></div>
                    </li>
                    <li>
                        <div class="headline"><span class="name">优惠</span></div>
                        <div class="txt"><span class="des">300元优惠券</span><span class="price">-￥360</span></div>
                    </li> -->
                </ul>
            </section>
        </div>
        <div class="submit-btn">
            <div class="sub-btn-l">
                <div class="submit-info">
                    <div class="con">
                        <p class="money">总价:<span class="orange">¥{{totalAmt}}</span></p>
                        <!-- <p class="discount">已优惠¥300</p> -->
                    </div>
                </div>
                <div class="submit-detail" @click="showDetail">明细<span class="i-arr-up" :class='{"down":showHide}'></span></div>
            </div>
            <div class="sub-btn-r" @click="goToNext()" :class="{'disabled':canNotClick}">{{msg}}</div>
        </div>
    </div>
</template>
<script>
    import {C} from "@/common/connect";
    export default {
        data(){
            return{
                showHide:false,
                travelComboAmt:0,//套餐总价
                totalAmt:0,//总价
            }
        },
        props:{
            msg:String,
            linkUrl:String, // 按钮跳转链接
            feeArr:Object, //费用明细
            canNotClick:{
                type:Boolean,
                default:false
            } //提交按钮是否可以点击
        },
        watch: {
            canNotClick: function (val) {
            },
            feeArr:function(val){
                if(this.showHide){
                    this.calcFeeDetail();
                }
            }
        },
        methods: {
            showDetail(){
                this.showHide = !this.showHide;
            },
            //计算费用明细
            calcFeeDetail(arr){

                var args = arr?arr:this.feeArr;
                C.postApi(`rv-rental-order-service/${C.version}/preOrders/calcprice`,args,{}).then(data =>{
                    this.travelComboAmt = data.data.travelComboAmt;
                    this.totalAmt = data.data.totalAmt;
                    this.$emit('fn',data);
                })
            },
            goToNext(){
                this.$emit('goToNext');
            }
        },
        created(){
        }
    }
</script>
<style lang="scss" scoped>
    .i-arr-up{
        display: inline-block;
        width: 13px;
        height: 7px;
        background: url(../../assets/images/i_arr_up.png);
        background-size: 13px 7px;
        // @include icon-style(13px,7px,'i_arr_up.png');
        &.down {
            background: url(../../assets/images/i_arr_down.png);
            background-size: 13px 7px;
            // @include icon-checked-style('i_arr_down.png');
        }
    }
    .fee-wrap {
        .submit-btn {
            position:fixed;
            bottom:0;
            left:0; right:0;
            height:55px;
            z-index:112;
            background: #fff;
            // background:$colorf;
        }
        .sub-btn-l{
            width:68%;
            float:left;
            margin-left:4%;
            .submit-info{
                width:68%;
                float:left;
                // padding:10px 0 8px;
                line-height:55px;
                .con{
                    vertical-align: middle;
                    display: inline-block;
                }
                .money {
                    font-size: 16px;
                    color: #222;
                    // color: $color2;
                    line-height:22px;
                    .orange {
                        color: #FF7800;
                        // color: $colorf780;
                        // @include pfm();
                        padding-left:4px;
                    }
                }
                .discount{
                    font-size: 11px;
                    color: #FF7800;
                    // color: $colorf780;
                    line-height: 16px;
                }
            }
            .submit-detail {
                width:30%;
                float:left;
                line-height:18px;
                font-size:14px;
                text-align:center;
                border-left: 0.5px solid #d8d8d8;
                // border-left:$bor;
                margin:19px 0;
                .i-arr-up {
                    margin-left:6px;
                }
            }
        }
        .sub-btn-r{
            float:left;
            width: 28%;
            background: #00C892;
            height: 55px;
            text-align: center;
            color: #fff;
            font-size: 17px;
            display: inline-block;
            line-height:55px;
            &.disabled {
                background: #ccc;
                // background:$colorc;
            }
        }
    }
    .fee-detail{
        position:fixed;
        bottom:55px;
        left:0;
        right:0;
        z-index:112;
        padding:0 5.3% 0 6.7%;
        background: #fff;
        border-bottom: 0.5px solid #e5e5e5;
        // background:$colorf;
        // border-bottom:$bore5;
        .title {
            line-height:21px;
            font-size:15px;
            color:#666;
            // color:$color6;
            text-align:center;
            margin:23px auto 20px;
            span{
                position:relative;
                letter-spacing: -0.36px;
                &:before{
                    content:"";
                    width:16px;
                    height:1px;
                    background: #d8d8d8;
                    // background:$colord8;
                    position:absolute;
                    left:-27px;
                    top:10px;
                }
                &:after{
                    content:"";
                    width:16px;
                    height:1px;
                    background: #d8d8d8;
                    // background:$colord8;
                    position:absolute;
                    right:-27px;
                    top:10px;
                }
            }
           
        }
        .fee-list{
            li {
                font-size:15px;
                .name {
                    font-weight: 600;
                    // @include pfm();
                }
                .headline{
                    line-height: 21px;
                    &:last-child{
                        padding-bottom:16px;
                    }
                }
                .txt {
                    padding:6px 0 16px 0;
                    line-height:20px;
                    .des {
                        font-size:14px;
                        color:#666;
                        // color:$color6;
                    }
                }
                .price {
                    float: right;
                    font-size:14px;
                }
            }
        }
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .fee-wrap {
            .submit-btn{
                height:89px !important;
                padding-bottom: 34px !important;
            }
            .fee-detail{
                margin-bottom: 34px !important;
            }
        }
    }
</style>

