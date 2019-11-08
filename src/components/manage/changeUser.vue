<template>
    <div>
        <Modal :value.sync="visible" @on-cancel="cancel" :footer-hide="true" :title="title">
            <div class="main">
                <Form ref="formInline" :model="newData" label-position="right" :label-width="100">
                    <FormItem prop="user" label="用户名">
                        <Input type="text" v-model="newData.userName" placeholder="Username">
                        </Input>
                    </FormItem>
                    <FormItem prop="telephone" label="手机号码">
                        <Input type="text" v-model="newData.telephone" placeholder="telephone">
                        </Input>
                    </FormItem>
                    <FormItem prop="password" label="密码">
                        <Input type="password" v-model="newData.password" placeholder="Password">
                        </Input>
                    </FormItem>
                    <FormItem prop="sex" label="性别">
                        <Select v-model="newData.sex">
                            <Option v-for="item in sex" :value="item.label" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="userType" label="用户类型">
                        <Select v-model="newData.userType">
                            <Option v-for="item in userType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
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
            sex: [
                {
                    value: '男',
                    label: '男'
                },
                {
                    value: '女',
                    label: '女'
                }
            ],
            userType: [
                {
                    value: '0',
                    label: '普通用户'
                },
                {
                    value: '1',
                    label: '管理员'
                }
            ],
            newData: {
                userID: '',
                userName: '',
                telephone: '',
                sex: '',
                password: '',
                userType: ''
            }
        };
    },
    methods: {
        cancel () {
            this.visible = false;
        },
        sure () {
            let postData = {};
            postData['userName'] = this.newData.userName;
            postData['telePhone'] = this.newData.telephone;
            postData['sex'] = this.newData.sex;
            postData['userType'] = this.newData.userType;
            if (this.title === '修改用户信息') {
                postData['userID'] = this.newData.userID;
                if (this.newData.password !== '') {
                    postData['passWord'] = this.newData.password;
                }
                this.$http.post('api/changeUser',
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
                postData['passWord'] = this.newData.password;
                this.$Message.warning({
                    content: '还在开发',
                    background: true,
                    center: true,
                    duration: 1
                });
                // this.$http.post('newUser',
                //     JSON.stringify(postData),
                //     {
                //         headers: {'Content-Type': 'application/json'}
                //     }
                // )
                //     .then((res) => {
                //         this.$Message.success({
                //             content: '修改成功',
                //             background: true,
                //             center: true,
                //             duration: 1
                //         });
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     });
            }
        }
    },
    created () {
        bus.$on('changeUser', (msg) => {
            this.visible = false;
            this.visible = true;
            this.newData.userID = msg.userID;
            this.newData.userName = msg.userName;
            this.newData.telephone = msg.telePhone;
            this.newData.sex = msg.sex;
            if (msg.userType === '管理员') {
                this.newData.userType = '1';
            }
            else if (msg.userType === '宝贝儿') {
                this.newData.userType = '520';
            }
            else {
                this.newData.userType = '0';
            }
            this.title = '修改用户信息';
        });
        bus.$on('addUser', () => {
            this.visible = false;
            this.visible = true;
            this.newData.userID = '';
            this.newData.userName = '';
            this.newData.telephone = '';
            this.newData.sex = '';
            this.newData.userType = '';
            this.title = '添加用户';
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
