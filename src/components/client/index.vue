<template>
    <div class="indexContainer">
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
    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
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
    }
};
</script>

<style scoped  lang="less">
    .indexContainer{
        width: 100%;
        height: 100%;
        flex-direction: column;
        display: flex;
        align-items: center;
        // overflow-y: scroll;
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
    }
</style>
