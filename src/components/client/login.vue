<template>
    <div>
        <Modal :value.sync="visible" @on-cancel="cancel" :footer-hide="true">
            <div class="title" v-if="type === 'login'">登录您的账号</div>
            <div class="title" v-if="type === 'new'">注册新的账号</div>
            <div class="main" v-if="type === 'login'">
                <Form ref="formInline" :model="loginData" :rules="loginRule">
                    <FormItem prop="telePhone">
                        <Input type="text" v-model="loginData.telePhone" placeholder="telephone">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="passWord">
                        <Input type="password" v-model="loginData.passWord" placeholder="Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="code">
                        <Input type="text" v-model="loginData.code" placeholder="code">
                            <Icon type="ios-barcode" slot="prepend"></Icon>
                        </Input>
                        <div class="code">
                            <img alt="验证码" :src="code" ref="code" @click.prevent="getCode"/>
                        </div>
                    </FormItem>
                </Form>
            </div>
            <div class="main" v-if="type === 'new'">
                <Form ref="formInline" :model="newData" :rules="newRule" label-position="right" :label-width="100">
                    <FormItem prop="userName" label="用户名">
                        <Input type="text" v-model="newData.userName" placeholder="Username">
                        </Input>
                    </FormItem>
                    <FormItem prop="telePhone" label="手机号码">
                        <Input type="text" v-model="newData.telePhone" placeholder="telephone">
                        </Input>
                    </FormItem>
                    <FormItem prop="passWord" label="密码">
                        <Input type="password" v-model="newData.passWord" placeholder="Password">
                        </Input>
                    </FormItem>
                    <FormItem prop="sex" label="性别">
                        <Select v-model="newData.sex" style="width:200px">
                            <Option v-for="item in sex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="code" label="验证码">
                        <Input type="text" v-model="newData.code" placeholder="code">
                        </Input>
                        <div class="code">
                            <img alt="验证码" :src="code" ref="code" @click.prevent="getCode"/>
                        </div>
                    </FormItem>
                </Form>
            </div>
            <div class="todo">
                <Button size="large" type="success" shape="circle" v-if="type === 'login'" @click="login">登录</Button>
                <Button size="large" type="warning" shape="circle" v-if="type === 'new'" @click="newUser">注册</Button>
            </div>
            <div class="description" v-if="type === 'login'">没有账号?点击<a @click="changAdd">注册</a></div>
            <div class="description" v-if="type === 'new'">已有账号?点击<a @click="changeLogin">登录</a></div>
        </Modal>
    </div>
</template>

<script>
import bus from './bus';
import api from '../../assets/js/api';

export default {
    name: 'about_me',
    data () {
        return {
            code: api + 'code',
            type: 'login',
            visible: false,
            loginData: {
                telePhone: '',
                passWord: '',
                code: ''
            },
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
            loginRule: {
                telePhone: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不得少于6位', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            newData: {
                userName: '',
                telePhone: '',
                sex: '',
                passWord: '',
                code: ''
            },
            newRule: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                telePhone: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不得少于6位', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        cancel () {
            this.visible = false;
        },
        changAdd () {
            this.type = 'new';
        },
        changeLogin () {
            this.type = 'login';
        },
        getCode () {
            this.$refs.code.src = api + 'code' + '?date=' + Date.now();
        },
        login () {
            let postData = {};
            for (let i in this.loginData) {
                postData[i] = this.loginData[i];
            }
            this.$http.get(
                '/login',
                {
                    params: postData
                })
                .then((res) => {
                    sessionStorage.setItem('userType', res.userType);
                    sessionStorage.setItem('userName', res.userName);
                    sessionStorage.setItem('userID', res.userID);
                    this.$Message.success({
                        content: '登录成功',
                        background: true,
                        center: true,
                        duration: 1
                    });
                    this.visible = false;
                    bus.$emit('loginSuc');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        newUser () {
            let postData = {};
            for (let i in this.newData) {
                postData[i] = this.newData[i];
            }
            postData['userType'] = '2';
            postData = JSON.stringify(postData);
            this.$http.post(
                '/newUser',
                postData,
                {
                    headers: {'Content-Type': 'application/json'}
                })
                .then((res) => {
                    this.$Message.success({
                        content: '注册成功',
                        background: true,
                        center: true,
                        duration: 1
                    });
                    this.visible = false;
                    bus.$emit('newSuc');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    created () {
        bus.$on('login', () => {
            this.visible = false;
            this.visible = true;
        });
        bus.$on('unLogin', () => {
            this.visible = false;
            this.visible = true;
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
                img{
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }
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
