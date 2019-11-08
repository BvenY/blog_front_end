<template>
    <div>
        <Modal :value.sync="visible" @on-cancel="cancel" :footer-hide="true" :title="title">
            <div class="main">
                <Form ref="formInline" :model="newData" :rules="newRule" label-position="right" :label-width="100">
                    <FormItem prop="linkName" label="友链名">
                        <Input type="text" v-model="newData.linkName" placeholder="linkName">
                        </Input>
                    </FormItem>
                    <FormItem prop="linkURL" label="友链URL">
                        <Input type="text" v-model="newData.linkURL" placeholder="linkURL">
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <div class="todo">
                <Button size="large" type="warning" shape="circle" @click="sure">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import bus from './bus';

export default {
    name: 'about_me',
    data () {
        return {
            title: '',
            visible: false,
            newData: {
                linkName: '',
                linkURL: '',
                linkID: ''
            },
            newRule: {
                linkName: [
                    { required: true, message: '请输入友链名', trigger: 'blur' }
                ],
                linkURL: [
                    { required: true, message: '请输入URL', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        cancel () {
            this.visible = false;
        },
        sure () {
            let postData = {};
            postData['linkID'] = this.newData.linkID;
            postData['link'] = this.newData.linkURL;
            postData['linkName'] = this.newData.linkName;
            if (this.title === '修改友链') {
                this.$http.post('api/changeLink',
                    JSON.stringify(postData),
                    {
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .then((res) => {
                        this.$Message.success({
                            content: '修改成功',
                            background: true,
                            center: true,
                            duration: 1
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                this.$http.post('api/addLink',
                    JSON.stringify(postData),
                    {
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .then((res) => {
                        this.$Message.success({
                            content: '添加成功',
                            background: true,
                            center: true,
                            duration: 1
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            this.newData.linkName = '';
            this.newData.linkURL = '';
            this.newData.linkID = '';
            bus.$emit('linkChanged');
            this.visible = false;
        }
    },
    created () {
        bus.$on('changeLink', (msg) => {
            this.visible = false;
            this.visible = true;
            this.title = '修改友链';
            this.newData.linkID = msg.linkID;
            this.newData.linkName = msg.linkName;
            this.newData.linkURL = msg.link;
        });
        bus.$on('addLink', () => {
            this.visible = false;
            this.visible = true;
            this.title = '添加友链';
        });
    }

};
</script>

<style scoped  lang="less">
    .ivu-modal{
        width: 20%;
        .ivu-modal-body{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .title{
            width: 100%;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5em;
            color: gray;
        }
        .main{
            width: 100%;
            height: auto;
            .code{
                width: 80px;
                height: 32px;
                background-color: aqua;
            }
        }
        .todo{
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .description{
            margin-top: 10px;
            width: 100%;
            height: 30px;
            color: gray;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
<style lang="less">
    .main {
        .ivu-form-item-content{
            display: flex !important;
        }
    }
</style>
