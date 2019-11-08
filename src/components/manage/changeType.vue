<template>
    <div>
        <Modal :value.sync="visible" @on-cancel="cancel" :footer-hide="true" :title="title">
            <div class="main">
                <Form ref="formInline" :model="newData" :rules="newRule" label-position="right" :label-width="100">
                    <FormItem prop="typeName" label="类型名">
                        <Input type="text" v-model="newData.typeName" placeholder="typeName">
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
            typeID: '',
            visible: false,
            newData: {
                typeName: ''
            },
            newRule: {
                typeName: [
                    { required: true, message: '请输入类型名', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        cancel () {
            this.visible = false;
        },
        sure () {
            let blogType = this.newData.typeName;
            let postData = {};
            postData['blogType'] = blogType;
            if (this.title === '修改类型') {
                postData['typeID'] = this.typeID;
                this.$http.post('api/changeType',
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
                    .catch(() => {
                        this.$Message.error({
                            content: '该类型下有博客，无法更改',
                            background: true,
                            center: true,
                            duration: 1
                        });
                    });
            }
            else {
                this.$http.post('api/addType',
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
            this.newData.typeName = '';
            bus.$emit('typeChanged');
            this.visible = false;
        }
    },
    created () {
        bus.$on('changeType', (msg) => {
            this.visible = false;
            this.visible = true;
            this.typeID = msg;
            this.title = '修改类型';
        });
        bus.$on('addType', () => {
            this.visible = false;
            this.visible = true;
            this.title = '添加类型';
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
