<template>
    <div class="index">
        <Spin size="large" fix v-if="loading"></Spin>
        <div class="dataMain">
            <div class="user num">
                <div class="title">注册用户总数</div>
                <div class="msg">{{userNum}}</div>
            </div>
            <div class="blog num">
                <div class="title">发表博客篇数</div>
                <div class="msg">{{blogNum}}</div>
            </div>
            <div class="comment num">
                <div class="title">评论总条数</div>
                <div class="msg">{{commentNum}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
            loading: true,
            userNum: 0,
            blogNum: 0,
            commentNum: 0
        };
    },
    created () {
        this.$http.get('/api/getNum')
            .then((res) => {
                this.userNum = res.userNum;
                this.blogNum = res.blogNum;
                this.commentNum = res.commentNum;
                this.loading = false;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
</script>

<style scoped  lang="less">
    .index{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        .dataMain{
            width: 90%;
            height: 60%;
            margin-top: 100px;
            display: flex;
            justify-content: space-around;
            .user{
                border: 1px solid #19BE6B;
                color: #19BE6B;
            }
            .blog{
                border: 1px solid #FF9900;
                color: #FF9900;
            }
            .comment{
                border: 1px solid #2D8CF0;
                color: #2D8CF0;
            }
            .num{
                width: 30%;
                height: 100%;
                border-radius: 15px;
                .title{
                    width: 100%;
                    height: 15%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #E8EAED;
                    border-top-right-radius: 15px;
                    border-top-left-radius: 15px;
                    border-bottom: 2px solid gray;
                    font-size: 1.4em;
                }
                .msg{
                    width: 100%;
                    height: 85%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 6em;
                }
            }
        }
    }
</style>
