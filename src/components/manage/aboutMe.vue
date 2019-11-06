<template>
    <div class="aboutMe" ref="data">
        <Button type="primary" shape="circle" icon="md-add" class="add" size="large" title="新建关于" @click="newAbout"></Button>
        <div class="msg" :style="{height:height + 'px'}" v-if="edit === false">
            <div class="aboutMsg" v-for="(item,index) in about" :key="item.id">
                <div class="msgTitle">
                    {{item.title}}
                </div>
                <div class="msgData">
                    {{item.msg}}
                </div>
                <div class="msgButton">
                    <Button  type="warning" style="margin-right: 15px" @click="change(index)">修改</Button>
                    <Button  type="error" style="margin-right: 15px" @click="deletes(index)">删除</Button>
                </div>
            </div>
        </div>

        <div class="edit" v-if="edit === true" :style="{height:height + 'px'}">
            <div class="editTitle">
                <Input v-model="aboutName" size="large" placeholder="请输入标题" />
                <div class="titleButton">
                    <Button size="large" type="primary" @click="exit">返回</Button>
                    <Button size="large" type="warning" @click="change">提交关于</Button>
                </div>
            </div>
            <div class="editMsg">
                <mavon-editor v-model="aboutValue" @save="submit"  :navigation="true"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'about_me',
    data () {
        return {
            aboutValue: '',
            aboutName: '',
            edit: false,
            key: 0,
            height: 0,
            about: [],
            ahout_copy: [
                {
                    id: '1',
                    title: '个人简介',
                    msg: 'just a testjust a testjust a testjust a testjust a test'
                },
                {
                    id: '2',
                    title: '个人简介',
                    msg: 'just a testjust a testjust a testjust a testjust a test'
                },
                {
                    id: '3',
                    title: '个人简介',
                    msg: 'just a testjust a testjust a testjust a testjust a test'
                },
                {
                    id: '4',
                    title: '个人简介',
                    msg: 'just a testjust a testjust a testjust a testjust a test'
                },
                {
                    id: '5',
                    title: '个人简介',
                    msg: 'just a testjust a testjust a testjust a testjust a test'
                }
            ]
        };
    },
    methods: {
        newAbout () {
            this.edit = true;
        },
        change (index) {
            console.log(index);
            this.edit = true;
        },
        deletes (index) {

        },
        submit () {

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
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.height = this.$refs.data.offsetHeight - 1;
            this.about = this.ahout_copy;
        });
    },
    created () {
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
                    text-indent: 1em;
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
