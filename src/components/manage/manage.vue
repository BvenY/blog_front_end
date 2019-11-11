<template>
    <div class="manageContainer">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="index" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="rrturn" to="/home/index">
                        <Icon type="ios-arrow-back"></Icon>
                        <span>返回</span>
                    </MenuItem>
                    <MenuItem name="index" to="/manage/index">
                        <Icon type="ios-home"></Icon>
                        <span>首页</span>
                    </MenuItem>
                    <Submenu name="Blog">
                        <template slot="title">
                            <Icon type="ios-book" />
                            博客管理
                        </template>
                        <MenuItem name="newBlog" to="/manage/newBlog">添加博客</MenuItem>
                        <MenuItem name="changeBlog" to="/manage/changeBlog">修改博客</MenuItem>
                        <MenuItem name="blog" to="/manage/blog">博客总览</MenuItem>
                        <MenuItem name="blogType" to="/manage/blogType">博客类型</MenuItem>
                    </Submenu>
                    <MenuItem name="comment" to="/manage/comment">
                        <Icon type="ios-chatboxes"></Icon>
                        <span>评论管理</span>
                    </MenuItem>
                    <MenuItem name="friendLink" to="/manage/friendLink">
                        <Icon type="ios-link"></Icon>
                        <span>友链管理</span>
                    </MenuItem>
                    <MenuItem name="aboutMe" to="/manage/aboutMe">
                        <Icon type="ios-contact"></Icon>
                        <span>关于我</span> </MenuItem>
                    <MenuItem name="user" to="/manage/user">
                        <Icon type="ios-contacts"></Icon>
                        <span>用户管理</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                    <div class="name" v-if="type === '1'">
                        <img alt="myself logo" src="../../assets/img/logo.png">20岁菜鸡前端想进腾讯
                    </div>
                    <div class="name" style="color:pink" v-if="type === '520'">
                        <img alt="myself logo" src="../../assets/img/dear.png">欢迎老婆大人视察工作
                    </div>
                    <div class="user">
                        <Dropdown trigger="click">
                            <a href="javascript:void(0)" style="color:#046B84">
                                {{username}}
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem @click.native="exit">退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Header>
                <Content :style="{padding: '16px 0 16px 16px'}">
                    <Card style="height: 100%">
                        <div class="routerView">
                            <router-view></router-view>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
    name: 'manage',
    data () {
        return {
            type: '1',
            isCollapsed: false,
            username: sessionStorage.userName
        };
    },
    methods: {
        exit () {
            this.$router.push({path: '/'});
            sessionStorage.clear();
        }
    },
    computed: {
        menuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ];
        }
    },
    created () {
        if (sessionStorage.userType === '1') {
            this.type = '1';
        }
        else if (sessionStorage.userType === '520') {
            this.type = '520';
        }
    }
};
</script>

<style scoped  lang="less">
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .manageContainer{
        .ivu-layout-header{
            display: flex;
            justify-content: space-between;
        }
        .name{
            width: 50%;
            height: 100%;
            font-size: 1.5em;
            letter-spacing: 0.3em;
            color: #036C85;
            display: flex;
            align-items: center;
            img{
                width: 10%;
                height: 80%;
            }
        }
        .user{
            width: 15%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .ivu-btn{
                background-color: #036C85;
            }
        }
        .routerView{
            width: 100%;
            height: 100%;
        }
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>

<style lang="less">
    .manageContainer{
        .ivu-card-body{
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
        }
    }
</style>
