/* eslint-disable no-tabs */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue';
import App from './App';
import router from './router';// 使用iview
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';//  使用CSS
//  markdown编辑器
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
// 引入vuex进行公共状态管理
import store from './vuex/store';
import http from './assets/js/http';
const Vue = require('vue');

Vue.config.productionTip = false;
Vue.prototype.$http = http;

Vue.use(iView);
Vue.use(mavonEditor);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
