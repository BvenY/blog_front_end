<template>
    <div class="aboutContainer">
        <div class="aboutMsg" v-for="item in about" :key="item.msgID">
            <div class="aboutTitle">
                ●{{item.msgType}}
            </div>
            <div class="about">
                <mavon-editor defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :preview="true" v-model="item.message"  style="min-height: 100px"></mavon-editor>
                <!-- <vue-markdown>{{item.message}}</vue-markdown> -->
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
                font-size: 1.8em;
                text-indent: 1em;
                display: flex;
                align-items: center;
                color: #031C67;
            }
            .about{
            @media screen{
                width: 95%;
                height: auto;
                font-size: 1.2em;
                color: black;
            @media (max-width:425px){
                font-size: 0.9em;
            }
            @media (max-width:1024px) and (min-width: 425px){
                font-size: 1.1em;
            }
        }
        }
        }
    }
</style>
