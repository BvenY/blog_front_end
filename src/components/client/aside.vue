<template>
    <div class="asideContainer">
            <!-- PC端菜单栏 -->
            <div class="pc">
                <Menu :theme="theme" active-name="0" width="100%" @on-select="startType">
                        <MenuItem name="0" to="/home/index">
                            <Icon type="md-document" />
                            最近发表
                        </MenuItem>
                        <MenuItem name="friendLink" to="/home/friendLink">
                            <Icon type="md-document" />
                            友链
                        </MenuItem>
                    <MenuGroup title="博客分类">
                        <MenuItem  v-for="item in menus" :key='item.id' :name="item.id" >
                            <Icon :type="item.icon" />
                            {{item.msg}}
                        </MenuItem>
                    </MenuGroup>
                </Menu>
            </div>
            <!-- 移动端菜单栏 -->
            <div class="mobiel">
                <Menu :theme="theme" active-name="0" mode="horizontal" @on-select="startType">
                        <MenuItem name="0" to="/home/index">
                            <Icon type="md-document" />
                            最近发表
                        </MenuItem>
                        <MenuItem v-for="item in menus" :name="item.id" :key='item.id'>
                            <Icon :type="item.icon" />
                            {{item.msg}}
                        </MenuItem>
                </Menu>
            </div>
    </div>
</template>

<script>
export default {
    name: 'aside',
    data () {
        return {
            theme: 'light',
            menus: [
                {
                    id: '1',
                    msg: 'VUE专题',
                    icon: 'md-document'
                },
                {
                    id: '2',
                    msg: 'JavaScript专题',
                    icon: 'md-document'
                },
                {
                    id: '3',
                    msg: 'JavaScript专题',
                    icon: 'md-document'
                },
                {
                    id: '4',
                    msg: 'JavaScript专题',
                    icon: 'md-document'
                },
                {
                    id: '5',
                    msg: 'JavaScript专题',
                    icon: 'md-document'
                },
                {
                    id: '6',
                    msg: 'JavaScript专题',
                    icon: 'md-document'
                }
            ]
        };
    },
    methods: {
        startType (name) {
            this.$router.push({name: 'typeBlog', params: {typeId: name}});
        }
    }
};
</script>

<style scoped  lang="less">
    .asideContainer{
        width: 100%;
        height: 100%;
    }
    .pc{
        @media screen{
            width: 100%;
            height: 100%;
        @media (max-width:425px){
            display: none;
        }
        @media (max-width:1024px) and (min-width: 425px){
            display: none;
        }
    }
    }
    .mobiel{
        @media screen{
            width: 100%;
            height: 100%;
            display: none;
        @media (max-width:425px){
            display: block;
        }
        @media (max-width:1024px) and (min-width: 425px){
            display: block;
        }
    }
    }
</style>

<style lang="less">
    .pc{
        .ivu-menu{
            width: 100% !important;
            height: 100% !important;
            background-color: #E8EAED;
        }
        .ivu-menu-item{
            padding: 15px 6px !important;
            font-size: 12px !important;
        }
    }
    .mobiel{
        .ivu-menu{
            width: 100% !important;
            height: 100% !important;
            background-color: #E8EAED;
            display: flex;
            overflow-x: scroll;
        }
        .ivu-menu-item{
            font-size: 12px !important;
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 150px !important;
        }
    }
</style>
