<template>
    <div class="blogContainer">
        <!-- 博客显示 -->
        <div class="blog">
            <div class="title">{{blog.blogName}}</div>
            <div class="time">{{blog.blogTime}}</div>
            <div class="description">{{blog.blogDescription}}</div>
            <div class="msg">
                <vue-markdown>{{blog.blogMsg}}</vue-markdown>
            </div>
        </div>
        <!-- 评论区 -->
        <div class="comment">
            <div class="title">
                评论区:
            </div>
            <div class="msgInput">
                    <div class="msg">
                        <Input v-model="commentMsg" maxlength="100" show-word-limit type="textarea" placeholder="Enter something..." style="width: 100%;resize: none;" />
                    </div>

                    <div class="send">
                        <Button type="info" shape="circle" icon="md-checkmark" @click="comments">提交评论</Button>
                    </div>
            </div>
            <!-- 已有评论 -->
            <div class="commentMsg" v-for="(item, index) in comment" :key="item.commentsID">
                <div class="commentName">
                    <div class="userName">
                        {{item.commentsName}}
                    </div>
                    <div class="time">
                        {{item.commentsTime}}
                    </div>
                </div>
                <div class="commentData">
                    {{item.commentsMsg}}
                </div>
                <div class="commentButton">
                    <Button type="text" shape="circle" icon="md-checkmark" @click="replyOpen(index)">回复</Button>
                </div>
                <!-- 回复区 -->
                <div class="replyInput" v-if='item.replys === true'>
                    <div class="msg">
                        <Input v-model="replyMsg" maxlength="100" show-word-limit type="textarea" placeholder="Enter something..." style="width: 100%;resize: none;" />
                    </div>

                    <div class="send">
                        <Button type="info" shape="circle" icon="md-checkmark" @click="replys(item.commentsID)">提交回复</Button>
                    </div>
                </div>
                <!-- 已有回复 -->
                <div class="reply" v-for="reply in item.reply" :key="reply.replyID">
                    <div class="replyName">
                        <div class="userName">
                            {{reply.replyName}}
                        </div>
                        <div class="time">
                            {{reply.replyTime}}
                        </div>
                    </div>
                    <div class="replyMsg">
                        {{reply.replyMsg}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import blogLogin from './login';
import bus from './bus';
import vueMarkdown from 'vue-markdown';

export default {
    name: 'blog',
    components: {
        blogLogin,
        vueMarkdown
    },
    data () {
        return {
            id: '',
            blog: {
                blogDescription: '',
                blogMsg: '',
                blogName: '',
                blogTime: ''
            },
            commentMsg: '',
            replyMsg: '',
            reply: false,
            comment: []
        };
    },
    methods: {
        replyOpen (index) {
            if (!sessionStorage.token) {
                bus.$emit('login');
            }
            else {
                this.comment[index].replys = !(this.comment[index].replys);
            }
        },
        replys (id) {
            let postData = {};
            postData['userID'] = sessionStorage.userID;
            postData['commentsID'] = this.id;
            postData['replyMsg'] = this.replyMsg;
            this.$http.post('api/addReply',
                JSON.stringify(postData),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
                .then((res) => {
                    this.$Message.success({
                        content: '回复成功',
                        background: true,
                        center: true,
                        duration: 1
                    });
                    this.replyMsg = '';
                    this.reply = !(this.reply);
                    this.getComments();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        comments () {
            if (!sessionStorage.token) {
                bus.$emit('login');
            }
            else {
                if (this.commentMsg === '') {
                    this.$Message.warning({
                        content: '评论不得为空',
                        background: true,
                        center: true,
                        duration: 1
                    });
                }
                else {
                    let postData = {};
                    postData['userID'] = sessionStorage.userID;
                    postData['blogID'] = this.id;
                    postData['commentsMsg'] = this.commentMsg;
                    this.$http.post('api/addComments',
                        JSON.stringify(postData),
                        {
                            headers: {'Content-Type': 'application/json'}
                        }
                    )
                        .then((res) => {
                            this.$Message.success({
                                content: '感谢您的反馈',
                                background: true,
                                center: true,
                                duration: 1
                            });
                            this.commentMsg = '';
                            this.getComments();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        },
        getBlog () {
            this.$http.get('searchBlog',
                {
                    params: {
                        blogID: this.id
                    }
                })
                .then((res) => {
                    let date = new Date(res.blogTime).toJSON();
                    let dates = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                    res.blogTime = dates;
                    this.blog.blogDescription = res.blogDescription;
                    this.blog.blogMsg = res.blogMsg;
                    this.blog.blogName = res.blogName;
                    this.blog.blogTime = res.blogTime;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getComments () {
            this.$http.get('getComments',
                {
                    params: {
                        blogID: this.id
                    }
                })
                .then((res) => {
                    for (let i = 0; i < res.length; i++) {
                        let date = new Date(res[i].commentsTime).toJSON();
                        let dates = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        res[i].commentsTime = dates;
                        res[i]['replys'] = false;
                        for (let j = 0; j < res[i].reply.length; j++) {
                            let date = new Date(res[i].reply[j].replyTime).toJSON();
                            let dates = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                            res[i].reply[j].replyTime = dates;
                        }
                    }
                    console.log(res);
                    this.comment = res;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    mounted () {
        this.id = this.$route.params.blogId;
        this.getBlog();
        this.getComments();
    },
    watch: {
        '$route' (to, from) {
            this.id = this.$route.params.blogId;
            this.getBlog();
            this.getComments();
        }
    }
};
</script>

<style scoped  lang="less">
    .blogContainer{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .blog{
            margin-top: 5%;
            width: 85%;
            min-height: 50%;
            .title{
                @media screen{
                width: 100%;
                height: 60px;
                font-size: 3.5em;
                text-indent: 0.2em;
                display: flex;
                align-items: center;
                @media (max-width:425px){
                    font-size: 2.2em;
                }
                @media (max-width:1024px) and (min-width: 425px){
                    font-size: 3em;
                }
                }
            }
            .time{
                width: 100%;
                text-indent: 2em;
                color: gray;
            }
            .description{
                margin-top: 10px;
                width: 100%;
                text-indent: 2em;
                color: gray;
                font-size: 1.2em;
            }
            .msg{
                margin-top: 10px;
                text-indent: 2em;
                font-size: 1.5em;
            }
        }
        .comment{
            width: 90%;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: auto;
            .title{
                width: 95%;
                height: 50px;
                display: flex;
                align-items: flex-end;
                text-indent: 0.3em;
                font-size: 1.5em;
                border-radius: 10px;
                border-bottom: 2px solid #8F95A1;
            }
            .msgInput{
                margin-top: 10px;
                width: 90%;
                height: 120px;
                .msg{
                    width: 100%;
                    height: 70%;
                    .ivu-input-wrapper {
                        width: 100%;
                        height: 100%;
                    }
                    .ivu-input{
                        width: 100%;
                        height: 100%;
                        resize: none;
                    }
                }
                .send{
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    height: 30%;
                }
            }
            .commentMsg{
                margin-top: 10px;
                width: 90%;
                display: flex;
                flex-direction: column;
                align-items: center;
                box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
                border-radius: 5px;
                .commentName{
                    width: 98%;
                    height: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .userName{
                        font-size: 1.5em;
                        color: black;
                    }
                    .time{
                        color: gray;
                    }
                }
                .commentData{
                    margin-top: 10px;
                    width: 100%;
                    text-indent: 2em;
                    height: auto;
                    font-size: 1.2em;
                }
                .commentButton{
                    width: 100%;
                    height: 35px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    border-bottom:1px solid #BBBCBD;
                }
                .replyInput{
                    width: 100%;
                    height: 120px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-bottom:1px solid #BBBCBD;
                    .msg{
                    width: 95%;
                    height: 70%;
                    .ivu-input-wrapper {
                        width: 100%;
                        height: 100%;
                    }
                    .ivu-input{
                        width: 100%;
                        height: 100%;
                        resize: none;
                    }
                }
                .send{
                    width: 95%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    height: 30%;
                }
                }
                .reply{
                    margin-top: 5px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                }
                .replyName{
                    margin-top: 5px;
                    width: 93%;
                    height: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .userName{
                        font-size: 1.5em;
                        color: black;
                    }
                    .time{
                        color: gray;
                    }
                }
                .replyMsg{
                    width: 93%;
                    text-indent: 2em;
                    height: auto;
                    font-size: 1.2em;
                    border-bottom:1px solid #BBBCBD;
                }
            }
        }
    }
</style>
<style lang="less">
    .msgInput{
                .msg{
                    .ivu-input{
                        width: 100% !important;
                        height: 100% !important;
                        resize: none;
                    }
                }
            }
    .replyInput{
        .msg{
                    .ivu-input{
                        width: 100% !important;
                        height: 100% !important;
                        resize: none;
                    }
                }
    }
</style>
