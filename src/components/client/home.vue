<template>
    <div class="homeContainer">
        <div class="nav">
            <div class="black">

            </div>
        </div>
        <div class="aside"></div>
        <div class="main">
            <div class="routerView"></div>
            <div class="footer"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {

        };
    }
};
</script>

<style scoped  lang="less">
    .homeContainer{
        @media screen{
            width: 100%;
            height: 100%;
            display: flex;
        @media (max-width:425px){
            flex-direction: column;
        }
        @media (max-width:768px) and (min-width: 425px){
            flex-direction: column;
        }
    }
    }
    .nav{
        .black{
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        @media screen{
            width: 20%;
            height: 100%;
            background: url(../../assets/img/welcome.jpg) no-repeat;
            background-size: cover;
        @media (max-width:425px){
            width: 100%;
            height: 20%;
        }
        @media (max-width:768px) and (min-width: 425px){
            width: 100%;
            height: 25%;
        }
    }
    }
    .aside{
        @media screen{
            width: 8%;
            background-color: rosybrown;
        @media (max-width:425px){
            width: 100%;
            height: 5%;
            overflow-x: scroll;
        }
        @media (max-width:768px) and (min-width: 425px){
            width: 100%;
            height: 8%;
            overflow-x: scroll;
        }
        }
    }
    .main{
        @media screen{
            width: 72%;
            height: 100%;
            background-color: salmon;
            .routerView{
                width: 100%;
                height: 95%;
                background-color: aqua;
            }
            .footer{
                width: 100%;
                height: 5%;
                background-color: chartreuse;
            }
        @media (max-width:425px){
            width: 100%;
            height: 75%;
        }
        @media (max-width:768px) and (min-width: 425px){
            width: 100%;
            height: 67%;
        }
        }
    }
</style>
