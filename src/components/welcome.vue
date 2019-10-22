<template>
  <div class="welcome">
    <div class="main">

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

<style scoped>
  .welcome{
    width: 100%;
    height: 100%;
    background-image:url(../assets/img/welcome.jpg);
    background-size:100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main{
    width: 40%;
    height: 50%;
    background-color: rgba(255,255,255,0.2);
  }
</style>
