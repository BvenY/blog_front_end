<template>
    <div class="indexContainer">
        <div class="blogMsg" v-for="item in blog" :key='item.blogID' @click="startBlog(item)">
            <div class="blogTile">
                {{item.blogName}}
            </div>
            <div class="blogTime">
                {{item.userName}} || {{item.blogTime}}
            </div>
            <div class="blogDescription">
                {{item.blogDescription}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
            blog: []
        };
    },
    methods: {
        startBlog (item) {
            let id = item.blogID;
            this.$router.push({name: 'blog', params: {blogId: id}});
        }
    },
    created () {
        this.$http.get('/getNew')
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    let date = new Date(res[i].blogTime).toJSON();
                    let dates = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                    res[i].blogTime = dates;
                }
                this.blog = res;
            })
            .catch((err) => {
                console.log(err);
            });
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
        .blogMsg{
            margin-top: 2em;
            width: 90%;
            height: 20%;
            box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
            cursor: pointer;
            min-height: 150px;
            &:hover{
                box-shadow: 0 4px 5px 4px rgba(0,0,0,.1);
            }
            .blogTile{
                @media screen{
                    margin-top: 5px;
                    width: 100%;
                    height: 30%;
                    font-size: 1.8em;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: gray;
                @media (max-width:425px){
                    font-size: 1.4em;
                }
                @media (max-width:1024px) and (min-width: 425px){
                    font-size: 1.6em;
                }
                }
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
