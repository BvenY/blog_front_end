<template>
  <div class="welcome">
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
          <Button type="default" ghost>首页</Button>
          <Button type="default" ghost>关于我</Button>
          <Button type="default" ghost>写博客</Button>
          <Button type="default" ghost shape="circle" icon="logo-github"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {

    }
  }
}
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
    background-color: rgba(0,0,0,0.5);
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
      }
      @media (max-width:768px) and (min-width: 425px){
        width: 70%;
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
    width: 50%;
    height: 20%;
    font-size: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #F1F3F4;
    border-bottom: 0.5px solid #3F3F41;
  }
  .description{
    margin-top: 5%;
    width: 50%;
    height: 10%;
    font-size: 1.3em;
    color: #F1F3F4;
    display: flex;
    justify-content: center;
    align-items: center;
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
