<template>
    <div class="typeContainer">
        <div class="blogMsg" v-for="item in blog.slice((pageInfo.currentPage-1)*pageInfo.pageSize,pageInfo.currentPage*pageInfo.pageSize)" :key='item.blogID' @click="startBlog(item)">
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
        <div class="typePage">
            <Page :total="pageInfo.pageTotal"  @on-change="pageChange" @on-page-size-change="pageSize" show-sizer show-total  :page-size-opts="[5,10,20,30]"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'typeBlog',
    data () {
        return {
            id: '',
            pageInfo: {
                pageSize: 10,
                currentPage: 1,
                pageTotal: 0
            },
            blog: []
        };
    },
    methods: {
        startBlog (item) {
            let id = item.blogID;
            this.$router.push({name: 'blog', params: {blogId: id}});
        },
        getBlog () {
            this.blog = [];
            let postData = {};
            postData['typeName'] = this.id;
            this.$http.post('typeBlog',
                JSON.stringify(postData),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
                .then((res) => {
                    for (let i = 0; i < res.length; i++) {
                        let date = new Date(res[i].blogTime).toJSON();
                        let dates = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        res[i].blogTime = dates;
                    }
                    this.blog = res;
                    this.pageInfo.pageTotal = res.length;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        pageChange (num) {
            this.pageInfo.currentPage = num;
        },
        pageSize (num) {
            this.pageInfo.pageSize = num;
        }
    },
    mounted () {
        this.id = this.$route.params.typeName;
        this.getBlog();
    },
    watch: {
        '$route' (to, from) {
            this.id = this.$route.params.typeName;
            this.getBlog();
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
