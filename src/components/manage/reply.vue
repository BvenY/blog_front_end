<template>
    <div class="reply">
        <Modal :value.sync="visible" @on-cancel="cancel" :footer-hide="true" :title="title" width="70%" :scrollable="true">
            <div class="main">
                <Table border :columns="columns1" :data="data1" >
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="error" size="small" @click="remove(index)">删除</Button>
                    </template>
                </Table>
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
            columns1: [
                {
                    title: '回复ID',
                    align: 'center',
                    key: 'userName'
                },
                {
                    title: '回复人',
                    align: 'center',
                    key: 'userName'
                },
                {
                    title: '回复时间',
                    align: 'center',
                    key: 'time'
                },
                {
                    title: '回复内容',
                    align: 'center',
                    resizable: true,
                    width: 400,
                    key: 'msg'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 90,
                    align: 'center'
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    time: '2016-10-03',
                    url: 'www.baidu.com'
                }
            ]
        };
    },
    methods: {
        cancel () {
            this.visible = false;
        }
    },
    created () {
        bus.$on('reply', (msg) => {
            this.visible = false;
            this.visible = true;
            this.title = '查看回复';
        });
    }

};
</script>

<style scoped  lang="less">
    .ivu-modal{
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
        }
    }
</style>
