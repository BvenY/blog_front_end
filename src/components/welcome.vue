<template>
  <div class="welcome">
    <blog-login></blog-login>
    <div class="main">
      <div class="window">
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
          <Button type="dashed" ghost shape="circle" to="/home/index">首页</Button>
          <Button type="dashed" ghost shape="circle" to="/home/aboutMe">关于我</Button>
          <Button type="dashed" ghost shape="circle" to="/manage/index" class="write">写博客</Button>
          <Button type="dashed" ghost shape="circle" icon="logo-github" @click="github"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blogLogin from './client/login';
import bus from './client/bus';

export default {
    name: 'welcome',
    components: {
        blogLogin
    },
    data () {
        return {

        };
    },
    methods: {
        github () {
            window.location.href = 'https://github.com/BvenY';
        }
    },
    created () {
        bus.$on('loginSuc', () => {
            this.login = false;
            this.login = true;
            if (sessionStorage.userType === '1' || sessionStorage.userType === '520') {
                this.$router.push({path: '/manage/index'});
            }
        });
    }
};
</script>

<style scoped  lang="less">
  .welcome{
    width: 100%;
    height: 100%;
    background-image:url(../assets/img/welcome.jpg);
    background-size:100% 100%;
  }
  .main{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .window{
    /*媒体查询不同屏幕大小适配*/
    @media screen{
      width: 35%;
      height: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (max-width:425px){
        width: 100%;
        .write{
                display: none;
            }
      }
      @media (max-width:768px) and (min-width: 425px){
        width: 70%;
        .write{
                display: none;
            }
      }
    }
  }
  .img{
    width: 80px;
    height: 80px;
    background-image:url(../assets/img/user.jpg);
    background-size:100% 100%;
    border-radius: 45%;
  }
  .name{
    @media screen{
      width: 50%;
      height: 20%;
      font-size: 4em;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #F1F3F4;
      border-bottom: 0.5px solid #3F3F41;
      @media (max-width:425px){
        font-size: 2.3em;
      }
      @media (max-width:768px) and (min-width: 425px){
        font-size: 3em;
      }
    }
  }
  .description{
    @media screen{
      margin-top: 5%;
      width: 50%;
      height: 10%;
      font-size: 1.3em;
      color: #F1F3F4;
      display: flex;
      justify-content: center;
      align-items: center;
      @media (max-width:425px){
        font-size: 1em;
      }
      @media (max-width:768px) and (min-width: 425px){
        font-size: 1em;
      }
    }
  }
  .hr{
    margin-top: 3%;
    height: 1px;
    width: 15%;
    border-bottom: 0.5px solid #3F3F41;
  }
  .button_box{
    margin-top: 5%;
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    .ivu-btn{
      margin-left: 20px;
    }
  }
</style>
