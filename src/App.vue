<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      width: 100%;
      height: 100%;
    }
    body,html{
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
    }
    *{
      padding: 0;
      margin: 0;
    }
    @media screen{
    @media (min-width:1025px){
     /* 滚动槽 */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            border-radius: 3px;
            background: rgba(0,0,0,0.06);
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.08);
        }
        /* 滚动条滑块 */
        ::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background: rgba(0,0,0,0.12);
            -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
        }
    }
    }
    ::selection {
    color:#fff;
    background-color: #FAE3DF ;
    }

    ::-moz-selection {
        color:#fff;
        background-color: #FAE3DF ;
    }

    ::-webkit-selection {
        color:#fff;
        background-color: #FAE3DF ;
    }
</style>
