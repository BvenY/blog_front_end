/* eslint-disable no-tabs */
/* axios请求二次封装函数 */

// 分别引入axios、router、消息提示、API根地址
import axios from 'axios';
import router from '../../router/index';
import { Message } from 'view-design';
import api from '../js/api';

/**
 *配置HTTP拦截器，统一处理所有的HTTP请求和响应
 */
const http = axios.create({
    /* 超时时间 */
    timeout: 180000,
    /* api地址 */
    baseURL: api
});

/**
 * http request拦截器
 */
http.interceptors.request.use(
    config => {
        console.log(config);
        /* Tip:1
        * 请求开始时结合vuex开启loading动画
        * */
        if (sessionStorage.token) {
            config.headers['x-access-token'] = sessionStorage.token;
        }
        return config;
    },
    error => {
        Message.error({
            content: '请求数据错误',
            background: true,
            center: true,
            duration: 2
        });
        return Promise.reject(error);
    }
);

/**
 * http response拦截器
 */
http.interceptors.response.use(
    response => {
        console.log(response);
        if (response.headers['x-access-token']) {
            sessionStorage.setItem('token', response.headers['x-access-token']);
        }
        let data = response.data;
        if (data.code === '0000') {
            return data.data;
        }
        else if (data.code === '0203') {
            Message.error({
                content: data.msg,
                background: true,
                center: true,
                duration: 2
            });
            setTimeout(() => {
                sessionStorage.removeItem('token');
                router.replace({
                    path: '/home/index'
                });
            }, 1500);
            return Promise.reject(data);
        }
        else {
            Message.error({
                content: data.msg,
                background: true,
                center: true,
                duration: 1
            });
            return Promise.reject(response);
        }
    },
    error => {
        console.log(error);
        let data = error.data;
        return Promise.reject(data);
    }
);

export default http;
