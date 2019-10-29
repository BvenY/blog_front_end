import Vue from 'vue';
import Router from 'vue-router';

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
                    path: 'typeBlog/:typeId',
                    component: resolve => require(['@/components/client/typeBlog.vue'], resolve),
                    name: 'typeBlog',
                    title: '博客类型'
                }
            ]
        },
        {
            path: '/manage',
            name: 'manage',
            component: resolve => require(['@/components/manage/manage.vue'], resolve),
            children: [
                {
                    path: 'index',
                    component: resolve => require(['@/components/manage/index.vue'], resolve),
                    name: 'index',
                    title: '管理系统首页'
                },
                {
                    path: 'blog',
                    component: resolve => require(['@/components/manage/blog.vue'], resolve),
                    name: 'blog',
                    title: '博客管理'
                },
                {
                    path: 'aboutMe',
                    component: resolve => require(['@/components/manage/aboutMe.vue'], resolve),
                    name: 'aboutMe',
                    title: '关于我'
                },
                {
                    path: 'blogType',
                    component: resolve => require(['@/components/manage/blogType.vue'], resolve),
                    name: 'blogType',
                    title: '博客类型管理'
                },
                {
                    path: 'comment',
                    component: resolve => require(['@/components/manage/comment.vue'], resolve),
                    name: 'comment',
                    title: '评论管理'
                },
                {
                    path: 'user',
                    component: resolve => require(['@/components/manage/user.vue'], resolve),
                    name: 'user',
                    title: '用户管理'
                },
                {
                    path: 'friendLink',
                    component: resolve => require(['@/components/manage/friendLink.vue'], resolve),
                    name: 'friendLink',
                    title: '友链管理'
                },
                {
                    path: 'newBlog',
                    component: resolve => require(['@/components/manage/newBlog.vue'], resolve),
                    name: 'newBlog',
                    title: '新增博客'
                }
            ]
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     if (to.path !== '/' && !localStorage.token) {
//         return next('/');
//     }
//     next();
// });

export default router;
