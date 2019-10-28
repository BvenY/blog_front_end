<template>
    <div class="asideContainer">
            <!-- PC端菜单栏 -->
            <div class="pc">
                <Menu :theme="theme" active-name="1">
                    <MenuGroup title="博客分类">
                        <MenuItem v-for="item in menus" :name="item.name" :key='item.name'>
                            <Icon :type="item.icon" />
                            {{item.msg}}
                        </MenuItem>
                    </MenuGroup>
                </Menu>
            </div>
            <!-- 移动端菜单栏 -->
            <div class="mobiel">
                <Menu :theme="theme" active-name="1" mode="horizontal">
                        <MenuItem v-for="item in menus" :name="item.name" :key='item.name'>
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
                    name: '1',
                    msg: 'VUE专题',
                    icon: 'md-document'
                },
                {
                    name: '2',
                    msg: 'JavaScript专题',
                    icon: 'md-document'
                },
                {
                    name: '3',
                    msg: 'JavaScript专题',
                    icon: 'md-document'
                },
                {
                    name: '4',
                    msg: 'JavaScript专题',
                    icon: 'md-document'
                },
                {
                    name: '5',
                    msg: 'JavaScript专题',
                    icon: 'md-document'
                },
                {
                    name: '6',
                    msg: 'JavaScript专题',
                    icon: 'md-document'
                }
            ]
        };
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
            @media screen{
            font-size: 12px !important;
            min-width: 150px !important;
            @media (max-width:1024px) and (min-width: 425px){
                font-size: 12px !important;
                line-height: 90px !important;
            }
            @media (max-width:425px) and (min-width: 320px) {
                line-height: 32px !important;
            }
            @media (max-width: 320px) {
                line-height: 25px !important;
            }
    }
        }
    }
</style>
