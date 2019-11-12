<template>
    <div class="aboutMe" ref="data">
        <Spin size="large" fix v-if="loading"></Spin>
        <Button type="primary" shape="circle" icon="md-add" class="add" size="large" title="新建关于" @click="newAbout"></Button>
        <div class="msg" :style="{height:height + 'px'}" v-if="edit === false">
            <div class="aboutMsg" v-for="(item) in about" :key="item.msgID">
                <div class="msgTitle">
                    {{item.msgType}}
                </div>
                <div class="msgData">
                    <mavon-editor defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :preview="true" v-model="item.message"  style="min-height: 100px" :boxShadow="false"></mavon-editor>
                </div>
                <div class="msgButton">
                    <Button  type="warning" style="margin-right: 15px" @click="change(item)">修改</Button>
                    <Button  type="error" style="margin-right: 15px" @click="deletes(item.msgID)">删除</Button>
                </div>
            </div>
        </div>

        <div class="edit" v-if="edit === true" :style="{height:height + 'px'}">
            <div class="editTitle">
                <Input v-model="aboutName" size="large" placeholder="请输入标题" />
                <div class="titleButton">
                    <Button size="large" type="primary" @click="exit">返回</Button>
                    <Button size="large" type="warning" @click="submit">提交关于</Button>
                </div>
            </div>
            <div class="editMsg">
                <mavon-editor v-model="aboutValue" @imgAdd="$imgAdd" @imgDel="$imgDel" :navigation="true"/>
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
            type: 'change',
            loading: false,
            aboutValue: '',
            aboutName: '',
            edit: false,
            key: 0,
            height: 0,
            msgID: '',
            about: []
        };
    },
    methods: {
        // 绑定@imgAdd event
        $imgAdd (pos, $file) {
            // 第一步.将图片上传到服务器.
            let formdata = new FormData();
            formdata.append('image', $file);
            this.$http.post('/api/uploadImg',
                formdata,
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            )
                .then((res) => {
                    this.$refs.md.$img2Url(pos, res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        $imgDel (pos) {
            delete this.img_file[pos];
        },
        newAbout () {
            this.type = 'add';
            this.edit = true;
            this.aboutValue = '';
            this.aboutName = '';
        },
        change (item) {
            this.type = 'change';
            this.edit = true;
            this.aboutValue = item.message;
            this.aboutName = item.msgType;
            this.msgID = item.msgID;
        },
        submit () {
            let postData = {};
            postData['message'] = this.aboutValue;
            postData['msgType'] = this.aboutName;
            if (this.type === 'add') {
                postData['userID'] = sessionStorage.userID;
                this.$http.post('/api/addMsg',
                    JSON.stringify(postData),
                    {
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .then(() => {
                        this.$Message.success({
                            content: '新增成功',
                            background: true,
                            center: true,
                            duration: 1
                        });
                        this.edit = false;
                        this.getData();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                postData['msgID'] = this.msgID;
                this.$http.post('/api/changeMsg',
                    JSON.stringify(postData),
                    {
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .then(() => {
                        this.$Message.success({
                            content: '修改成功',
                            background: true,
                            center: true,
                            duration: 1
                        });
                        this.edit = false;
                        this.getData();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        deletes (id) {
            this.$http.delete('/api/deleteMsg',
                {
                    params: {
                        msgID: id
                    }
                })
                .then((res) => {
                    this.$Message.success({
                        content: '删除成功',
                        background: true,
                        center: true,
                        duration: 1.5
                    });
                    this.getData();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        exit () {
            this.edit = false;
        },
        /* 获取高度 */
        getHeight () {
            /* 定义两个高度，初始高度和现在高度 */
            let nowH;
            /* 延迟获取当前高度 */
            this.$nextTick(() => {
                nowH = this.$refs.data.offsetHeight - 1;
            });
            let height = this.height;
            /* 比对操作 */
            if (nowH !== height) {
                this.height = nowH;
                this.key++;
            }
        },
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
    mounted () {
        this.$nextTick(() => {
            this.height = this.$refs.data.offsetHeight - 1;
        });
    },
    created () {
        this.getData();
        this.getHeight();
    }
};
</script>

<style scoped  lang="less">
    .aboutMe{
        width: 100%;
        height: 100%;
        .add{
            position: fixed;
            margin-top: 38%;
            margin-left: 83%;
        }
        .msg{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-y: scroll;
            .aboutMsg{
                background-color: #FBFBFB;
                margin-top: 10px;
                width: 95%;
                height: auto;
                border-radius: 5px;
                box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
                .msgTitle{
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    font-size: 1.7em;
                    text-indent: 1em;
                }
                .msgData{
                    margin-top: 10px;
                    width: 100%;
                    height: auto;
                    font-size: 1.3em;
                }
                .msgButton{
                    margin-top: 10px;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
            }
        }
        .edit{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .editTitle{
                width: 96%;
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .editMsg{
                width: 100%;
                height: calc(100% - 50px);
            }
            .v-note-wrapper{
                width: 100%;
                height: 100%;
                z-index: 1;
            }
        }
    }
</style>
<style lang="less">
    .aboutMe{
        .ivu-input-wrapper{
            width: 30% !important;
        }
    }
</style>
