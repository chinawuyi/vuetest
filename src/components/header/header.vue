<template>
    <header class='head_top' v-bind:class="{ 'head_i': isI}">
        <div class="back_btn" onClick="javascript:history.back(-1);"  @click="back"><span class="back"></span></div>
        <p class="title">{{headTitle}}</p>
    </header>
</template>

<script>
    export default {
        name: "headTop",
        data() {
            return {
                isI: /iphone/i.test(navigator.userAgent),
            }
        },
        mounted() {
        },
        props: ['headTitle'],
        computed: {},
        methods: {
            back() {
                // this.$LS.backView(this, {});
            }
        },

    }

</script>

<style lang="scss" scoped>

    @import '../../assets/scss/common';
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
            @include pfr();
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
                background-image: url('../../assets/images/back.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
             }
        }
    }

    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .head_top.head_i {
            padding-top: 44px;
            height: 88px;
        }
    }
</style>
