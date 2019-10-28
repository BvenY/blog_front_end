<template>
    <div class="footerContainer">
        <div class="footerMsg">Copyright © 2019</div>
        <div class="footerMsg">BvenY-Xhu-WeiLy</div>
        <div class="footerMsg">蜀ICP备19027184号</div>
    </div>
</template>

<script>
export default {
    name: 'footer',
    data () {
        return {

        };
    }
};
</script>

<style scoped  lang="less">
    .footerContainer{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #E8EAED;
    }
    .footerMsg{
        @media screen{
            width: 25%;
            height: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2em;
            color: grey;
        @media (max-width:425px){
            width: 33%;
            font-size: 2px;
        }
        @media (max-width:1024px) and (min-width: 425px){
            width: 33%;
            font-size: 0.8em;
        }
    }
    }
</style>
