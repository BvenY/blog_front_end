import Vue from 'vue';
// import Router from 'vue-router';
import bus from '../components/client/bus';
import { Message } from 'view-design';
const Router = require('vue-router');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: resolve => require(['@/components/welcome.vue'], resolve)
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['@/components/client/home.vue'], resolve),
            children: [
                {
                    path: 'index',
                    component: resolve => require(['@/components/client/index.vue'], resolve),
                    name: 'index',
                    title: '博客首页'
                },
                {
                    path: 'blog/:blogId',
                    component: resolve => require(['@/components/client/blog.vue'], resolve),
                    name: 'blog',
                    title: '博客'
                },
                {
                    path: 'aboutMe',
                    component: resolve => require(['@/components/client/aboutMe.vue'], resolve),
                    name: 'aboutMe',
                    title: '关于我'
                },
                {
                    path: 'typeBlog/:typeName',
                    component: resolve => require(['@/components/client/typeBlog.vue'], resolve),
                    name: 'typeBlog',
                    title: '博客类型'
                },
                {
                    path: 'friendLink',
                    component: resolve => require(['@/components/client/friendLink.vue'], resolve),
                    name: 'friendLink',
                    title: '友情链接'
                }
            ]
        },
        {
            path: '/manage',
            name: 'manage',
            meta: {
                requireAuth: true
            },
            component: resolve => require(['@/components/manage/manage.vue'], resolve),
            children: [
                {
                    path: 'index',
                    component: resolve => require(['@/components/manage/index.vue'], resolve),
                    name: 'mindex',
                    meta: {
                        requireAuth: true
                    },
                    title: '管理系统首页'
                },
                {
                    path: 'blog',
                    component: resolve => require(['@/components/manage/blog.vue'], resolve),
                    name: 'mblog',
                    meta: {
                        requireAuth: true
                    },
                    title: '博客管理'
                },
                {
                    path: 'aboutMe',
                    component: resolve => require(['@/components/manage/aboutMe.vue'], resolve),
                    name: 'maboutMe',
                    meta: {
                        requireAuth: true
                    },
                    title: '关于我'
                },
                {
                    path: 'blogType',
                    component: resolve => require(['@/components/manage/blogType.vue'], resolve),
                    name: 'mblogType',
                    meta: {
                        requireAuth: true
                    },
                    title: '博客类型管理'
                },
                {
                    path: 'comment',
                    component: resolve => require(['@/components/manage/comment.vue'], resolve),
                    name: 'mcomment',
                    meta: {
                        requireAuth: true
                    },
                    title: '评论管理'
                },
                {
                    path: 'user',
                    component: resolve => require(['@/components/manage/user.vue'], resolve),
                    name: 'muser',
                    meta: {
                        requireAuth: true
                    },
                    title: '用户管理'
                },
                {
                    path: 'friendLink',
                    component: resolve => require(['@/components/manage/friendLink.vue'], resolve),
                    name: 'mfriendLink',
                    meta: {
                        requireAuth: true
                    },
                    title: '友链管理'
                },
                {
                    path: 'newBlog',
                    component: resolve => require(['@/components/manage/newBlog.vue'], resolve),
                    name: 'mnewBlog',
                    meta: {
                        requireAuth: true
                    },
                    title: '新增博客'
                },
                {
                    path: 'changeBlog',
                    component: resolve => require(['@/components/manage/changeBlog.vue'], resolve),
                    name: 'mchangeBlog',
                    meta: {
                        requireAuth: true
                    },
                    title: '修改博客'
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (!sessionStorage.token) {
            bus.$emit('unLogin');
            return from.path;
        }
        else if (sessionStorage.userType !== '1' && sessionStorage.userType !== '520') {
            Message.warning({
                content: '您没有相关权限',
                background: true,
                center: true,
                duration: 2
            });
            return from.path;
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});

export default router;
