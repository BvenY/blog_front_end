<template>
    <div class="homeContainer">
        <div class="nav">
            <div class="black">
                <div class="img"></div>
                <div class="name">
                    BvenY
                </div>
                <div class="description">
                    Welcome to my blog
                </div>
                <div class="hr">
                </div>
                <div class="button_box">
                    <Button type="dashed" ghost shape="circle" to="/">欢迎页</Button>
                    <Button type="dashed" ghost shape="circle" to="/home/aboutMe">关于我</Button>
                    <Button type="dashed" ghost shape="circle">写博客</Button>
                    <Button type="dashed" ghost shape="circle" icon="logo-github" @click="github"></Button>
                </div>
            </div>
        </div>
        <div class="aside">
            <blog-aside></blog-aside>
        </div>
        <div class="main">
            <div class="routerView">
                <router-view></router-view>
            </div>
            <div class="footer">
                <blog-footer></blog-footer>
            </div>
        </div>
    </div>
</template>

<script>
import blogFooter from './footer';
import blogAside from './aside';

export default {
    name: 'home',
    components: {
        blogFooter,
        blogAside
    },
    data () {
        return {

        };
    },
    methods: {
        github () {
            window.location.href = 'https://github.com/BvenY';
        }
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
            min-width: 300px;
            min-height: 620px;
        }
        @media (max-width:1024px) and (min-width: 425px){
            flex-direction: column;
        }
    }
    }
    .nav{
        .black{
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            .img{
                @media screen{
                    margin-top: 55%;
                    width: 80px;
                    height: 80px;
                    background-image:url(../../assets/img/user.jpg);
                    background-size:100% 100%;
                    border-radius: 45%;
                @media (max-width:425px){
                    width: 40px;
                    height: 40px;
                    margin-top: 5px;
                }
                @media (max-width:1024px) and (min-width: 425px){
                    width: 50px;
                    height: 50px;
                    margin-top: 10px;
                }
                }
            }
            .name{
                @media screen{
                    width: 70%;
                    height: 10%;
                    font-size: 4em;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #F1F3F4;
                    border-bottom: 0.5px solid #3F3F41;
                @media (max-width:425px){
                    width: 40%;
                    height: 20%;
                    font-size: 1em;
                }
                @media (max-width:1024px) and (min-width: 425px){
                    width: 40%;
                    height: 20%;
                    font-size: 2em;
                }
                }
            }
            .description{
                @media screen{
                    margin-top: 5%;
                    width: 100%;
                    height: 5%;
                    font-size: 1.3em;
                    color: #F1F3F4;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                @media (max-width:425px){
                    margin-top: 1%;
                    width: 100%;
                    height: 10%;
                    font-size: 0.8em;
                }
                @media (max-width:1024px) and (min-width: 425px){
                    margin-top: 1%;
                    width: 100%;
                    height: 10%;
                    font-size: 0.8em;
                }
                }
            }
            .hr{
                @media screen{
                    margin-top: 3%;
                    height: 1px;
                    width: 50%;
                    border-bottom: 0.5px solid #3F3F41;
                @media (max-width:425px){
                    margin-top: 0.5%;
                    width: 30%;
                }
                @media (max-width:1024px) and (min-width: 425px){
                    margin-top: 0.5%;
                    width: 30%;
                }
                }
            }
            .button_box{
                @media screen{
                    margin-top: 3%;
                    width: 100%;
                    height: 10%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                @media (max-width:425px){
                    margin-top: 12px;
                }
                @media (max-width:1024px) and (min-width: 425px){
                    margin-top: 10px;
                }
                }
                .ivu-btn{
                margin-left: 15px;
                }
            }
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
        @media (max-width:1024px) and (min-width: 425px){
            width: 100%;
            height: 25%;
        }
    }
    }
    .aside{
        @media screen{
            width: 8%;
        @media (max-width:425px){
            width: 100%;
            height: 5%;
        }
        @media (max-width:1024px) and (min-width: 425px){
            width: 100%;
            height: 6%;
        }
        }
    }
    .main{
        @media screen{
            width: 72%;
            height: 100%;
            overflow-y: scroll;
            .routerView{
                width: 100%;
                min-height: calc(100% - 30px);
            }
            .footer{
                width: 100%;
                height: 30px;
            }
        @media (max-width:425px){
            width: 100%;
            height: 75%;
        }
        @media (max-width:1024px) and (min-width: 425px){
            width: 100%;
            height: 67%;
        }
        }
    }
</style>
