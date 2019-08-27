<template>
  <div class="countryList" v-bind:class="{ 'cityI': isI}">
    <app-header headTitle="国籍选择"></app-header>
    <mt-index-list>
      <mt-index-section class="allCity" :index="index" :key="index" v-for="(list,index) in cityList">
        <div v-bind:class="{ 'line': !isI}" v-for="item in list" @click="pick(item)">
          {{item.chineseName}}
        </div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
    // import {getSome} from "@/common/api";

    import * as pubMethods from '@/common/utils';
    import {C} from "@/common/connect";
    export default {
        name: "CountryList",
        data() {
            return {
                isI: /iphone/i.test(navigator.userAgent),
                cityList: {},
            };
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                C.getApi("rv-travel-product/"+C.version +"/country", {}, {}).then((res) => {
                    this.cityList = res.data;
                    console.log(this.cityList);
                })
            },
            pick(item){
                let country = {code:item.code,text:item.chineseName};
                pubMethods.setStore('visitors_stamp',new Date().getTime());
                pubMethods.setStore('visitors',{
                    'code':item.code,
                    'text':item.chineseName
                });
                this.$router.push({path:'/addvisitors',query:{
                     'code':item.code,
                     'text':item.chineseName
                }});
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to  this component only -->
<style scoped lang="scss">
  @import '../../../assets/scss/common';

  .countryList {
    position: relative;
    top: 48px;
    width: 100%;
    &.cityI {
      top: 64px;
    }

  }
  .allCity {
    width: 100%;
    background-color: #FFFFFF;
    color: #222222;
    div {
      margin: 0 25px 0 15px;
      padding: 14px 0 10px;
      height: 50px;
      border-bottom: 1px solid #f1f1f1;
      &.line {
        border-bottom: 1Px solid #f1f1f1;
      }
    }
  }

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .cityList.cityI {
      top: 88px;
    }
  }
</style>
<style lang="scss">

  .mint-indexsection-index {
    height: 28px;
    padding: 0 16px;
  }

  .mint-indexlist-nav {
    position: fixed;
    top: 0;
    right: 3.5px;
    z-index: 100;
    padding: 0;
    margin: 0;
    width: 23.5px;
    background: none;
    border: none;
    text-align: center;
    .mint-indexlist-navlist {
      margin-top: 195px;
      height: 390px;
      li {
        padding: 0;
        color: #FFAC00;
      }
    }
  }

  .mint-indexlist-content {
    margin: 0 !important;
  }

  .mint-indexsection-index {
    background: none;
    padding: 0 16px;
    height: 28px;
    background-color: #f1f1f1;
    color: #222222;
  }
</style>
