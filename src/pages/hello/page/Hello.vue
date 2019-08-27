<template>
  <div class="hello">
    <div style="border:1px solid red;">
      <h1>APP原生接口调试</h1>

      <mt-button type="primary" @click="gotoOrderList">订单列表（给原生APP测试用）</mt-button><br /><br />

      <mt-button type="primary" @click="getReachability">获取wifi连接情况（给原生APP测试用）</mt-button><br /><br />
      <mt-button type="primary" @click="callLogin">呼叫登录页面（给原生APP测试用）</mt-button><br /><br />

      <mt-button type="primary" @click="callPay">呼叫支付页面（给原生APP测试用）</mt-button><br /><br />


      <mt-button type="primary" @click="login">获取用户登录信息 login（给原生APP测试用）</mt-button><br /><br />


      <mt-button type="primary" @click="openShare">打开分享控件（给原生APP测试用）</mt-button><br /><br />

    </div>



    <mt-button type="primary" @click="gotoStep1">下单第一步</mt-button><br /><br />

    <mt-button type="primary" @click="sendParams">订单详情</mt-button><br /><br />

    <mt-button type="danger" @click="productList">产品列表123123</mt-button><br /><br />

    <mt-button type="primary" @click="productDetail">产品详情</mt-button><br /><br />

    <mt-button type="primary" @click="addPerson">添加用户信息</mt-button><br /><br />


    <mt-button type="primary" @click="country">国籍</mt-button><br /><br />
    <input />
    <h1 style="height:50px;border:2px solid red; font-size:1rem;">热门旅行   <a style="float:right">全部</a></h1>
    <ul>
      <li  v-for="item in featureWords"  @click="jumpToProductList(item)">
        <h1>{{item.featureWordName}} ----  {{item.descript}}</h1>
        <img v-bind:src="item.featureWordTopImg" />
      </li>
    </ul>
  </div>
</template>

<script>
    import { Spinner } from 'mint-ui';
    import { Indicator,Toast } from 'mint-ui';
    export default {
        name: "Hello",
        data() {
            return {
                msg: "Welcome to Your Vue.js App SCSS",
                featureWords:[]

            };
        },
        created() {


        },
        methods:{
            openShare()
            {

            },
            login()
            {
                this.$LS.login();
            },
            callPay()
            {

            },
            getReachability()
            {

            },
            callLogin()
            {

            },
            country()
            {

            },
            gotoOrderList()
            {

            },
            productDetail()
            {

            },
            productList()
            {

            },
            jumpToProductList(item)
            {

            },
            gotoStep1()
            {

            },
            sendParams(){

            },
            addPerson()
            {

            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  h1,
  h5 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>


