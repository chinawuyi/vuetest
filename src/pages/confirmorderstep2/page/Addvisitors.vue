<template>
  <div class="add">
    <app-header headTitle="添加出游人"></app-header>
    <div class="addvisitors" :class="{'iphoneTop':isI}">
      <ul class="add-list bgc-white">
        <li class="clearfix">
          <mt-radio title="身份类型" v-model="value1" :options="['成人', '儿童']">
          </mt-radio>
          <span class="query" @click="queryTip"></span>
        </li>
        <li class="clearfix" @click="identityType">
          <span class="title left">证件类型</span>
          <div class="main left">
            <span class="identity">{{identityWay.name}}</span>
            <span class="check"></span>
          </div>
        </li>
        <li class="clearfix">
          <span class="title left">姓名</span>
          <div class="main left">
            <input type="text" class="name" v-model="travellerName" placeholder=" 请输入出游人姓名">
          </div>
        </li>
        <li class="clearfix">
          <mt-radio title="性别" v-model="value2" :options="['男', '女']">
          </mt-radio>
        </li>
        <li class="clearfix" v-show="isChinese" @click="openPicker">
          <span class="title left">生日</span>
          <div class="main left">
            <span class="birthday">{{birthday | formatDate}} </span>
            <span class="check"></span>
          </div>
        </li>
        <li class="clearfix" v-show="isChinese" @click="getNationnality">
          <span class="title left">国籍</span>
          <div class="main left">
            <span class="nationality"> {{Nationality.text}} </span>
            <span class="check"></span>
          </div>
        </li>
        <li class="clearfix" v-show="isChinese">
          <span class="title left">护照号</span>
          <div class="main left">
            <input @focus="scrollToTop" type="text" class="passportNum" v-model="PassportNum" placeholder="请输入出游人证件号码">
          </div>
        </li>
        <li class="clearfix" v-show="isChinese" @click="openPicker1">
          <span class="title left">护照有效期</span>
          <div class="main left">
            <span class="passport" placeholder="请输入出游人证件有效期">{{passport | formatDate}}</span>
            <span class="check"></span>
          </div>
        </li>
        <li class="clearfix" v-show="isForeigner">
          <span class="title left">证件号</span>
          <div class="main left">
            <input type="text"  autocapitalize="on" class="identity-num" v-model="identityNum" placeholder="请输入出游人证件号码">
          </div>
        </li>
        <li class="clearfix">
          <span class="optional" v-show="optional">(选填)</span>
          <span class="title left">手机号</span>
          <div class="main left">
            <span class="phone-tit">+86</span>
            <input type="number" @focus="scrollToTop" class="phone-num" v-model="phone" pattern="[0-9]*">
          </div>
        </li>
      </ul>
      <div class="myheight"></div>
    </div>

    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
    <mt-datetime-picker v-model="pickerValue" :startDate="startDate" :endDate='endDate' ref="picker" type="date" year-format="{value}" month-format="{value}" date-format="{value}" @confirm="handleConfirm">
    </mt-datetime-picker>
    <mt-datetime-picker v-model="pickerValue1" :startDate="startDate1" :endDate='endDate1' ref="picker1" type="date" year-format="{value}" month-format="{value}" date-format="{value}" @confirm="handleConfirm1">
    </mt-datetime-picker>
    <footer>
      <mt-button class="save" @click="confirm" type="primary">保存</mt-button>
    </footer>
  </div>
</template>

<script>
    import * as pubMethods from '@/common/utils';
    import {
        Header,
        MessageBox
    } from 'mint-ui';
    import {
        Indicator,
        Toast
    } from 'mint-ui';
    export default {
        name: "add",
        data() {
            return {
                isI: /iphone/i.test(navigator.userAgent),
                optional: false,
                isAdult: 1,
                isBoy: 1,
                value1: '成人',
                value2: '男',
                phone: '',
                travellerName: '',
                //判断是否是添加新用车人，还是 修改老用车人  true = 添加新用车人
                addNew:true,
                Nationality: {
                    code: '',
                    text: '中国'
                },
                Passport: '',
                PassportNum: '',
                identityNum: '',
                isChinese: false,
                isForeigner: true,
                checkResult: false,
                pickerValue: new Date(),
                pickerValue1: new Date(),
                startDate: new Date('1900'),
                startDate1: new Date(),
                endDate: new Date(),
                endDate1: "",
                actions: [{
                    name: '身份证',
                    value: 90130001,
                    method: this.getIdentity
                },
                    {
                        name: '护照',
                        value: 90130002,
                        method: this.getPassport
                    }
                ],
                sheetVisible: false,
                identityWay: {
                    name: '身份证',
                    value: 90130001
                },
                data: {},
                birthday: '',
                passport: '',
                touistInfo: null,
                travellerList:null
            };
        },
        watch: {
            value1: function() {
                if (this.value1 == '儿童') {
                    this.optional = true
                } else {
                    this.optional = false
                }
            }
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
        methods: {
            scrollToTop()
            {
                window.scrollTo(0,150);
            },
            // 弹出儿童提示信息
            queryTip(){
                MessageBox({
                    title: '儿童说明',
                    message: '年龄在12周岁以下且身高在 140 CM以下（含）的儿童。',
                    showCancelButton: false,
                    confirmButtonText:'关闭'
                });
            },
            identityType() {
                this.sheetVisible = true
            },
            getIdentity: function() {
                this.identityWay.name = this.actions[0].name
                this.identityWay.value = this.actions[0].value
                this.isChinese = false
                this.isForeigner = true
            },
            getPassport: function() {
                this.identityWay.name = this.actions[1].name
                this.identityWay.value = this.actions[1].value
                this.isChinese = true
                this.isForeigner = false
            },
            openPicker() {
                this.$refs.picker.open();
            },
            openPicker1() {
                this.$refs.picker1.open();
            },
            handleConfirm: function() {
                this.birthday = this.pickerValue;

            },
            handleConfirm1: function() {
                this.passport = this.pickerValue1;
            },
            // 校验身份证
            checkIdentityNum: function(arrIdCard) {
                var tag = false;
                var sigma = 0;
                var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var w = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
                for (var i = 0; i < 17; i++) {
                    var ai = parseInt(arrIdCard.substring(i, i + 1));
                    var wi = a[i];
                    sigma += ai * wi;
                }
                var number = sigma % 11;
                var check_number = w[number];
                if (arrIdCard.substring(17) != check_number) {
                    tag = false;
                } else {
                    tag = true;
                }
                return tag;
            },
            // 获取国籍信息
            getNationnality: function() {
                this.$router.push({path: '/countrypicker'});
            },
            //校验姓名
            checkName(str){
                var realLength = 0, len = str.length, charCode = -1;
                for (var i = 0; i < len; i++) {
                    charCode = str.charCodeAt(i);
                    if (charCode >= 0 && charCode <= 128)
                        realLength += 1;
                    else
                        realLength += 2;
                }
                return realLength;
            },
            confirm() {
                /*{
                    "travellerName":"钱依依",
                    "credentialsType":"90130001", //90130001,身份证  90130002，护照
                    "nation":"中国",
                    "credentialsNo":"123456789898989",
                    "validityDate":"有效期",
                    "mobile":"13245678901",
                    "isAdult":"1", //是否成人：1是 0否
                    "gender":"1" ,//性别：1男 0女
                    "isDriver":"0"
                }*/
                if (this.value1 === '成人') {
                    this.isAdult = 1
                } else {
                    this.isAdult = 0
                }
                if (this.value2 === '男') {
                    this.isBoy = 1
                } else {
                    this.isBoy = 0
                }
                if (this.value1 === '') {
                    Toast('请选择身份类型')
                    return
                }
                if (this.identityWay.name === '') {
                    Toast('请选择证件类型')
                    return
                }
                if (this.travellerName === '') {
                    Toast('请完善姓名信息')
                    return
                }else if(this.checkName(this.travellerName) > 12){
                    Toast('最多输入6个汉字或12个英文字符')
                    return
                }
                if (this.value2 === '') {
                    Toast('请选择性别')
                    return
                }
                if (this.identityWay.name === '护照') {
                    if (this.birthday === '') {
                        Toast('请完善出生日期')
                        return
                    }
                    if (this.Nationality.text === '') {
                        Toast('请完善国籍信息')
                        return
                    }
                    if (this.PassportNum === '') {
                        Toast('请完善证件号信息')
                        return
                    }
                    if (this.passport === '') {
                        Toast('请完善证件有效期')
                        return
                    }
                }
                if (this.identityNum === '' && this.identityWay.name === '身份证') {
                    Toast({
                        message: '请完善证件号信息',
                        duration: 2000
                    });
                    return
                }
                if (!this.checkIdentityNum(this.identityNum) && this.identityWay.name === '身份证') {
                    Toast({
                        message: '身份证格式错误',
                        duration: 2000
                    });
                    return
                }
                if (this.value1 == '成人') {
                    if (this.phone === '') {
                        Toast({
                            message: '请完善手机号信息',
                            duration: 2000
                        });
                        return
                    }
                }
                let reg = /^1[0-9]{10}$/;
                this.checkResult = reg.test(this.phone);
                if (this.value1 == '成人') {
                    if (this.checkResult === false) {
                        Toast('手机号格式错误')
                        return
                    }
                }
                //Toast('添加成功')
                let travellerList = this.travellerList,
                    person = {
                        "isAdult": this.isAdult, //身份类型 是否成人：1是 0否
                        "credentialsType": this.identityWay.value, //90130001,身份证  90130002，护照
                        "travellerName": this.travellerName, //出游人姓名
                        "gender": this.isBoy, //性别：1男 0女
                        "birthday": this.$options.filters['formatDate'](this.birthday),
                        "nation": this.Nationality.text, //国籍
                        "credentialsNo": this.identityWay.value == '90130001' ? this.identityNum : this.PassportNum, //护照号
                        "deadline": this.$options.filters['formatDate'](this.passport), //护照有效期
                        // "identityNum": this.identityNum, //证件号
                        "mobile": this.phone, //手机号
                        "isDriver": 0
                    };
                if (!travellerList) {
                    person.id = 1;
                    travellerList = [person]
                } else {
                    //判断是添加出游人还是修改出游人 //添加
                    if (this.addNew == true) {
                        if(!this.checkMaxLimit(this.isAdult, travellerList)){
                            return;
                        }
                        if (!this.checkSameInfo(travellerList)) {
                            person.id = parseInt(travellerList[travellerList.length - 1].id) + 1;
                            travellerList.push(person)
                        } else {
                            return;
                        }
                    }
                    else //修改
                    {
                        if (this.isAdult == 1) { //当前信息为成人
                            if (this.touistInfo.item.isAdult == 0) { //修改前出游人信息为儿童，移除之前的儿童信息，添加成人信息
                                //校验成人数是否达上线
                                if(!this.checkMaxLimit(this.isAdult, travellerList)){
                                    return;
                                }

                                //移除儿童信息
                                travellerList = travellerList.filter((item, index) => {
                                    if (item.id != this.touistInfo.item.id) {
                                        return item;
                                    }
                                })

                                //判断当前对象是否有数据
                                if(!travellerList.length)
                                {
                                    person.id = 1
                                    travellerList.push(person)
                                }else{
                                    //添加成人信息
                                    if (!this.checkSameInfo(travellerList)) {
                                        person.id = parseInt(travellerList[travellerList.length - 1].id) + 1;
                                        travellerList.push(person)
                                    }else{
                                        return;
                                    }
                                }

                            } else { //修改前出游人信息为成人,只做修改
                                if (!this.checkSameInfo(travellerList,this.touistInfo.item.id)) {
                                    travellerList = travellerList.map((item, index) => {
                                        if (item.id == this.touistInfo.item.id) {
                                            item = person;
                                            item.id = this.touistInfo.item.id;
                                            item.isDriver =  this.touistInfo.item.isDriver;
                                        }
                                        return item;
                                    });
                                }else{
                                    return;
                                }
                            }
                        } else if (this.isAdult == 0) { //当前添加为儿童，判断儿童数量是否添加满
                            if (this.touistInfo.item.isAdult == 1) { //修改前出游人信息为成人
                                //校验儿童数是否达上线
                                if(!this.checkMaxLimit(this.isAdult, travellerList)){
                                    return;
                                }

                                //移除成人信息
                                travellerList = travellerList.filter((item, index) => {
                                    if (item.id != this.touistInfo.item.id) {
                                        return item;
                                    }
                                })
                                //判断当前对象是否有数据
                                if(!travellerList.length)
                                {
                                    person.id = 1
                                    travellerList.push(person)
                                }else{
                                    //添加儿童信息
                                    if (!this.checkSameInfo(travellerList)) {
                                        person.id = parseInt(travellerList[travellerList.length - 1].id) + 1;
                                        travellerList.push(person)
                                    } else {
                                        return;
                                    }
                                }

                            } else {
                                if(!this.checkSameInfo(travellerList,this.touistInfo.item.id)) {
                                    travellerList = travellerList.map((item, index) => {
                                        if (item.id == this.touistInfo.item.id) {
                                            item = person;
                                            item.id = this.touistInfo.item.id
                                        }
                                        return item;
                                    });
                                }else{
                                    return;
                                }
                            }
                        }
                    }
                }


                pubMethods.setStore('travellerList',travellerList);
                this.$router.push({
                    path:'/',
                    name:'Confirmorderstep2'
                });
                // this.$LS.backView(this, {
                //     path: '/confirmOrderStep2',
                //     name: 'confirmOrderStep2',
                //     query: {
                //         name: 'travellerList',
                //         'travellerList': travellerList
                //     },
                //     callback: 'travellerList'
                // });
            },
            insertVistor(visitors) {
                if (visitors) {
                    this.Nationality = visitors;
                }
            },
            //初始化用车人信息
            _constructVisitor()
            {

                //初始化身份证类型
                this.value1 = '成人';
                //初始化证件类型
                this.getIdentity();
                //初始化姓名
                this.travellerName = '';
                //初始化性别
                this.value2 = '男';
                //初始化证件号码
                this.identityNum = '';
                //初始化手机号码
                this.phone = '';
            },
            insertTouistInfo(touistInfo)
            {
                //添加新人
                if(touistInfo.item == '' || touistInfo.item == undefined)
                {
                    //初始化用车人信息，清空操作
                    this._constructVisitor();
                }
                else
                {

                    //身份类型
                    this.value1 = touistInfo.item.isAdult == 1?'成人':'儿童';
                    if (touistInfo.item.credentialsType == 90130002) {
                        this.getPassport();
                        this.birthday = touistInfo.item.birthday;
                        this.PassportNum = touistInfo.item.credentialsNo;
                        this.passport = touistInfo.item.deadline;
                        this.Nationality.text = touistInfo.item.nation;
                        this.identityNum = '';
                    } else { //身份证
                        this.getIdentity();
                        this.identityNum = touistInfo.item.credentialsNo;
                        this.birthday = '';
                        this.PassportNum = '';
                        this.passport = '';
                        this.Nationality.text = '中国';
                    }
                    this.travellerName = touistInfo.item.travellerName;
                    if (touistInfo.item.gender == 1) {
                        this.value2 = '男';
                    } else {
                        this.value2 = '女';
                    }
                    this.phone = touistInfo.item.mobile;
                }

            },
            //判断添加的是否有相同信息
            checkSameInfo(travellerList,id) {
                let status = false,
                    no = this.identityWay.value == '90130001' ? this.identityNum : this.PassportNum;
                //校验是否有相同的信息
                if(id){ //修改不校验当前的信息是否重复
                    travellerList = travellerList.filter(item=>{
                        if(item.id != this.touistInfo.item.id)
                        {
                            return item;
                        }
                    })
                }
                travellerList.some((item, index) => {
                    if (item.credentialsType == '90130001') { //身份证
                        if (item.credentialsNo == no) {
                            Toast({
                                message: '您已添加此身份证为出游人，请勿重复添加',
                                duration: 2000
                            });
                            status = true;
                            return true
                        }
                    } else if (item.credentialsType == '90130002') { //护照
                        if (item.credentialsNo == no) {
                            Toast({
                                message: '您已添加此护照为出游人，请勿重复添加',
                                duration: 2000
                            });
                            status = true;
                            return true
                        }
                    }
                })
                return status
            },
            //判断添加人数是否到上线
            checkMaxLimit(isAdult, travellerList) {
                let adultSum = 0,
                    childSum = 0;
                travellerList.forEach((item, index) => {
                    item.isAdult == 1 ? adultSum += 1 : childSum += 1;
                });
                if (isAdult == 1) { //当前添加为成人，判断成人数量是否添加满
                    if (adultSum >= this.touistInfo.adultCount) { //成人数量已满
                        Toast({
                            message: '您的成人信息已达上限，不能再添加了哦',
                            duration: 2000
                        });
                        return false;
                    }
                } else if (isAdult == 0) { //当前添加为儿童，判断儿童数量是否添加满
                    if (childSum >= this.touistInfo.childCount) {
                        Toast({
                            message: '您的儿童信息已达上限，不能再添加了哦',
                            duration: 2000
                        });
                        return false;
                    }
                }
                return true;
            }
        },
        created() {

            var time = new Date().getFullYear()+10;
            this.endDate1=new Date(time,0,0,0,0,0);
        },
        activated() {
            let visitors_stamp = pubMethods.getStore('visitors_stamp');
            let touistInfo_stamp = pubMethods.getStore('touistInfo_stamp');
            if(pubMethods.getStore('touistInfo'))
            {
                let touistInfo = pubMethods.getStore('touistInfo');
                if(touistInfo.item == '' || touistInfo.item == undefined)
                {
                    console.log('addnew');
                    this.addNew = true;
                }
                else
                {
                    this.addNew = false;
                }

            }
            if (visitors_stamp && touistInfo_stamp) {
                if (visitors_stamp > touistInfo_stamp) {
                    let visitors = pubMethods.getStore('visitors');
                    this.insertVistor(visitors);
                }
                else
                {
                    let touistInfo = pubMethods.getStore('touistInfo');
                    if (!touistInfo)
                    {

                    }
                    else
                    {
                        this.touistInfo = touistInfo;
                        this.insertTouistInfo(touistInfo);
                        this.travellerList =  pubMethods.getStore('touistInfo').travellerList ? pubMethods.getStore('touistInfo').travellerList : '';
                    }
                }
            } else if (visitors_stamp && touistInfo_stamp == null) {
                let visitors = pubMethods.getStore('visitors');
                this.insertVistor(visitors);
            } else if (visitors_stamp == null && touistInfo_stamp) {
                let touistInfo = pubMethods.getStore('touistInfo');
                if (!touistInfo) {} else {
                    this.touistInfo = touistInfo;
                    console.log(touistInfo);
                    this.insertTouistInfo(touistInfo);
                    this.travellerList =  pubMethods.getStore('touistInfo').travellerList ? pubMethods.getStore('touistInfo').travellerList : '';
                }

            }

        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../../assets/scss/common';
  /*清除浮动*/
  .clearfix:after,
  .clearfix:before {
    content: ".";
    display: block;
    clear: both;
    height: 0;
    visibility: hidden;
  }
  body{
    overflow:auto !important;
  }
  .bgc-white {
    background-color: #fff;
  }
  .addvisitors {
    height: 100vh;
    position: relative;
    padding-top: 50px;
    &.iphoneTop {
      padding-top: 64px;
    }
  }
  .add-list {
    padding: 0 20px;
    li {
      // height: 50px;
      position: relative;
      border-bottom: $border;
      .query {
        display: inline-block;
        position: absolute;
        top: 17px;
        right: 4px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: url(../../../assets/images/icon-question.png);
        background-size: 16px 16px;
        background-repeat: no-repeat;
      }
      .title {
        position: relative;
        font-size: 15px;
        color: #666666;
        width: 80px;
        line-height: 50px;
        margin-right: 30px;
      }
      &:last-child .main input{
        max-width: 130px;
        text-indent: 15px;
      }
      .main {
        line-height: 50px;
        .identity {
          max-width: 250px;
          line-height: 20px;
          font-size: 14px;
        }
        .adult-icon,
        .child-icon,
        .boy-icon,
        .girl-icon {
          display: inline-block;
          margin-top: 15px;
          margin-right: 10px;
          content: "";
          background: url(../../../assets/images/i_radio_checked.png);
          background-size: 18px 18px;
          width: 18px;
          height: 18px;
        }
        .child-icon,
        .girl-icon {
          background: url(../../../assets/images/i_radio.png);
          background-size: 18px 18px;
        }
        .adult,
        .child,
        .boy,
        .girl {
          margin-right: 28px;
          font-size: 14px;
          color: #666666;
        }
        .passport,
        .birthday {
          font-size: 14px;
        }
        .check,
        .query {
          display: inline-block;
          position: absolute;
          top: 20px;
          right: 5px;
          width: 6px;
          height: 10px;
          background: url(../../../assets/images/i_arr_r.png);
          background-size: 6px 10px;
          background-repeat: no-repeat;
        }
        .query {
          background: url(../../../assets/images/i_add_active.png);
          background-size: 6px 6px;
          background-repeat: no-repeat;
        }
        input {
          width: 160px;
          max-width: 250px;
          line-height: 20px;
          font-size: 14px;
        }
        input::-webkit-input-placeholder {
          /* placeholder颜色  */
          color: #D1D1D1;
          /* placeholder字体大小  */
        }
        .phone-tit {
          font-size: 14px;
          color: #333333;
          padding-right: 15px;
          border-right: 1px solid #EAEAEA;
        }
        .nationality{
          display: inline-block;
          width: 160px;
          max-width: 250px;
        }
      }
    }
  }
  .optional {
    position: absolute;
    left: 61px;
    top: 17px;
    font-size: 13px;
    color: #CCCCCC;
  }
  .myheight{
    height:400px;
  }
footer{
    button {
        position: fixed;
        bottom: 25px;
        left: 15px;
        font-size: 19px;
        width: 92%;
        color: #fff;
        height: 45px;
        background: #00C892 !important;
        border-radius: 7px;
        text-align: center;
    }
}
  .mint-radiolist {background:#000;}
  .mint-radio-input:checked + .mint-radio-core::after {background:red;}
</style>
