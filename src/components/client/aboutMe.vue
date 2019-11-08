<template>
    <div class="aboutContainer">
        <div class="aboutMsg" v-for="item in about" :key="item.msgID">
            <div class="aboutTitle">
                {{item.msgType}}
            </div>
            <div class="about">
                <vue-markdown>{{item.message}}</vue-markdown>
            </div>
        </div>
    </div>
</template>

<script>
import vueMarkdown from 'vue-markdown';

export default {
    name: 'about_me',
    components: {
        vueMarkdown
    },
    data () {
        return {
            about: []
        };
    },
    methods: {
        getData () {
            this.loading = true;
            this.$http.get('getMsg'
            )
                .then((res) => {
                    this.about = res;
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.loading = false;
                });
        }
    },
    created () {
        this.getData();
    }
};
</script>

<style scoped  lang="less">
    .aboutContainer{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        // overflow-y: scroll;
        .aboutMsg{
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            .aboutTitle{
                width: 100%;
                height: 50px;
                font-size: 2em;
                text-indent: 2em;
                display: flex;
                align-items: center;
                color: #031C67;
            }
            .about{
                width: 95%;
                height: auto;
                font-size: 1.3em;
                text-indent: 2em;
                color: black;
            }
        }
    }
</style>
