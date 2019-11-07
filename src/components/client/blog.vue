<template>
    <div class="blogContainer">
        <!-- 博客显示 -->
        <div class="blog">
            <div class="title">Hello World {{id}}</div>
            <div class="time">2015-11-28</div>
            <div class="description">Welcome to Hexo! This is your very first post. Check documentation for more info. If you get any problems when using Hexo, you can find the answer in troubleshooting or you can ask me on GitHub.</div>
            <div class="msg">
                just a test
                just a test
                just a test
                just a test
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
                        <Button type="info" shape="circle" icon="md-checkmark" @click="loginOpen">提交评论</Button>
                    </div>
            </div>
            <!-- 已有评论 -->
            <div class="commentMsg" v-for="item in comment" :key="item.id">
                <div class="commentName">
                    <div class="userName">
                        {{item.commentUser}}
                    </div>
                    <div class="time">
                        {{item.commentTime}}
                    </div>
                </div>
                <div class="commentData">
                    {{item.commentMsg}}
                </div>
                <div class="commentButton">
                    <Button type="text" shape="circle" icon="md-checkmark" @click="replyOpen">回复</Button>
                </div>
                <!-- 回复区 -->
                <div class="replyInput" v-if='reply === true'>
                    <div class="msg">
                        <Input v-model="commentMsg" maxlength="100" show-word-limit type="textarea" placeholder="Enter something..." style="width: 100%;resize: none;" />
                    </div>

                    <div class="send">
                        <Button type="info" shape="circle" icon="md-checkmark">提交回复</Button>
                    </div>
                </div>
                <!-- 已有回复 -->
                <div class="replyName" v-for="reply in item.reply" :key="reply.id">
                    <div class="userName">
                        {{reply.replyUser}}
                    </div>
                    <div class="time">
                        {{reply.replyTime}}
                    </div>
                </div>
                <div class="replyMsg" v-for="reply in item.reply" :key="reply.id">
                    {{reply.replyMsg}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import blogLogin from './login';
import bus from './bus';

export default {
    name: 'blog',
    components: {
        blogLogin
    },
    data () {
        return {
            id: '',
            commentMsg: '',
            reply: false,
            comment: [
                {
                    commentId: '1',
                    commentUser: 'BvenY',
                    commentTime: '2019-08-10',
                    commentMsg: 'just a test just a test',
                    reply: [
                        {
                            replyId: '1',
                            replyUser: 'TEst',
                            replyTime: '2019-08-08',
                            replyMsg: 'just a test'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        replyOpen () {
            this.reply = !(this.reply);
        },
        loginOpen () {
            this.$store.state.login = true;
            bus.$emit('login');
        }
    },
    mounted () {
        this.id = this.$route.params.blogId;
    },
    watch: {
        '$route' (to, from) {
            this.id = this.$route.params.blogId;
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
