<template>
    <div>
        <Modal :value.sync="visible" @on-cancel="cancel" :footer-hide="true">
            <div class="title" v-if="type === 'login'">登录您的账号</div>
            <div class="title" v-if="type === 'new'">注册新的账号</div>
            <div class="main" v-if="type === 'login'">
                <Form ref="formInline" :model="loginData" :rules="loginRule">
                    <FormItem prop="user">
                        <Input type="text" v-model="loginData.user" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="loginData.password" placeholder="Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="code">
                        <Input type="text" v-model="loginData.code" placeholder="code">
                            <Icon type="ios-barcode" slot="prepend"></Icon>
                        </Input>
                        <div class="code"></div>
                    </FormItem>
                </Form>
            </div>
            <div class="main" v-if="type === 'new'">
                <Form ref="formInline" :model="newData" :rules="newRule" label-position="right" :label-width="100">
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
                        <Select v-model="sex_value" style="width:200px">
                            <Option v-for="item in sex" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="code" label="验证码">
                        <Input type="text" v-model="newData.code" placeholder="code">
                        </Input>
                        <div class="code"></div>
                    </FormItem>
                </Form>
            </div>
            <div class="todo">
                <Button size="large" type="success" shape="circle" v-if="type === 'login'">登录</Button>
                <Button size="large" type="warning" shape="circle" v-if="type === 'new'">注册</Button>
            </div>
            <div class="description" v-if="type === 'login'">没有账号?点击<a @click="addNew">注册</a></div>
            <div class="description" v-if="type === 'new'">已有账号?点击<a @click="login">登录</a></div>
        </Modal>
    </div>
</template>

<script>
import bus from './bus';

export default {
    name: 'about_me',
    data () {
        return {
            type: 'login',
            visible: false,
            loginData: {
                user: '',
                password: '',
                code: ''
            },
            sex_value: '',
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
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码不得少于6位', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            newData: {
                userName: '',
                telephone: '',
                sex: '',
                password: '',
                code: ''
            },
            newRule: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                telephone: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' }
                ],
                password: [
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
        addNew () {
            this.type = 'new';
        },
        login () {
            this.type = 'login';
        }
    },
    created () {
        bus.$on('login', () => {
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
