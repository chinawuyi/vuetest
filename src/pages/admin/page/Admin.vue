<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{name }}</h1>
   

    <mt-button type="default">default</mt-button>
    <mt-button type="primary">primary</mt-button>
    <mt-button type="danger">danger</mt-button>
  </div>
</template>

<script>
import {C} from "@/common/connect";
import { isWeixin } from "@/common/utils";
export default {
  name: "ADMIN",
  data() {
    return {
      msg: "Welcome to Your Vue.js App SCSS",
      name: "我是ADMIN",
      lxl:{
      //  a:""
      }

    };
  },
  created() {

      C.getApi('rv-travel-mainpage/v1/featureWords',{},{
          headers: {
              'xxxxx': 'ddddd'
          }
      }).then(data=>{
          //this.featureWords = data.data.resultList;
          console.log(data.data);
          console.log(this.featureWords);
      });
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
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
