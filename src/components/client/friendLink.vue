<template>
    <div class="linkContainer">
        <div class="title">
            友情链接
        </div>
        <div class="linkBox">
            <div class="link" v-for="item in link" :key="item.id">
                <a @click="friendLink(item.url)">·{{item.name}}</a>
            </div>
        </div>
        <div class="linkBottom">
            添加友情链接请联系博主邮箱bestbven@163.com
        </div>
    </div>
</template>

<script>
export default {
    name: 'friendLink',
    data () {
        return {
            link: [
                {
                    id: '1',
                    name: 'test',
                    url: 'http://www.baidu.com'
                }
            ]
        };
    },
    methods: {
        friendLink (url) {
            window.location.href = url;
        }
    }
};
</script>

<style scoped  lang="less">
    .linkContainer{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.1em;
        }
        .linkBox{
            width: 80%;
            display: flex;
            flex-wrap: wrap;
            .link{
                min-width: 100px;
                height: 45px;
                margin-top: 10px;
                margin-left: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.2em;
                text-decoration: underline;
                a{
                color: gray;
                }
            }
        }
        .linkBottom{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: gray;
            font-size: 1.1em;
        }
    }
</style>
