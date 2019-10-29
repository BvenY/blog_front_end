<template>
    <div class="typeContainer">
        <div class="blogMsg" v-for="item in blog" :key='item.id' @click="startBlog(item)">
            <div class="blogTile">
                {{item.title}}
            </div>
            <div class="blogTime">
                {{item.user}} || {{item.time}}
            </div>
            <div class="blogDescription">
                {{item.description}}
            </div>
        </div>
        <div class="typePage">
            <Page :current="2" :total="62" simple :page-size="10"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'typeBlog',
    data () {
        return {
            id: '',
            blog: [
                {
                    title: 'Hello World',
                    time: '2019-10-28 16:30:28',
                    user: 'BvenY',
                    description: '这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试',
                    id: '1'
                },
                {
                    title: 'Hello World1',
                    time: '2019-10-28 16:30:28',
                    user: 'BvenY',
                    description: '这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试',
                    id: '11'
                },
                {
                    title: 'Hello World2',
                    time: '2019-10-28 16:30:28',
                    user: 'BvenY',
                    description: '这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试',
                    id: '111'
                },
                {
                    title: 'Hello World3',
                    time: '2019-10-28 16:30:28',
                    user: 'BvenY',
                    description: '这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试',
                    id: '1111'
                },
                {
                    title: 'Hello World13',
                    time: '2019-10-28 16:30:28',
                    user: 'BvenY',
                    description: '这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试这只是一个测试',
                    id: '11111'
                }
            ]
        };
    },
    methods: {
        startBlog (item) {
            let id = item.id;
            this.$router.push({name: 'blog', params: {blogId: id}});
        }
    },
    mounted () {
        this.id = this.$route.params.typeId;
        this.blog[0].title = this.id;
    },
    watch: {
        '$route' (to, from) {
            this.id = this.$route.params.typeId;
            this.blog[0].title = this.id;
        }
    },
    created () {

    }
};
</script>

<style scoped  lang="less">
    .typeContainer{
        width: 100%;
        height: 100%;
        flex-direction: column;
        display: flex;
        align-items: center;
        .blogMsg{
            margin-top: 2em;
            width: 90%;
            height: 20%;
            border-bottom: 1px solid #E8EAED;
            cursor: pointer;
            min-height: 150px;
            .blogTile{
                width: 100%;
                height: 30%;
                font-size: 2.5em;
                display: flex;
                justify-content: center;
                align-items: center;
                color: gray;
            }
            .blogTime{
                width: 100%;
                height: 20%;
                display: flex;
                font-size: 0.7em;
                color: #C7C8C7;
                justify-content: center;
                align-items: center;
            }
            .blogDescription{
                width: 100%;
                height: 50%;
                text-indent: 2em;
                padding: 5px 3px;
                overflow-y: hidden;
            }
        }
        .typePage{
            margin-top: 10px;
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
