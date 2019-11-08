<template>
    <div class="reply">
        <Modal :value.sync="visible" @on-cancel="cancel" :footer-hide="true" :title="title" width="70%" :scrollable="true">
            <div class="main">
                <Table border :columns="columns" :data="tableData" :loading="loading">
                    <template slot-scope="{ row }" slot="action">
                        <Button type="error" size="small" @click="remove(row)">删除</Button>
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
            loading: false,
            title: '',
            visible: false,
            commentsID: '',
            columns: [
                {
                    title: '回复ID',
                    align: 'center',
                    key: 'replyID'
                },
                {
                    title: '回复人',
                    align: 'center',
                    key: 'replyName'
                },
                {
                    title: '回复时间',
                    align: 'center',
                    key: 'replyTime'
                },
                {
                    title: '回复内容',
                    align: 'center',
                    resizable: true,
                    width: 400,
                    key: 'replyMsg'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 90,
                    align: 'center'
                }
            ],
            tableData: []
        };
    },
    methods: {
        cancel () {
            this.visible = false;
        },
        remove (row) {
            this.$http.delete('/api/deleteReply',
                {
                    params: {
                        replyID: row.replyID
                    }
                })
                .then((res) => {
                    this.$Message.success({
                        content: '删除成功',
                        background: true,
                        center: true,
                        duration: 1.5
                    });
                    this.getTable();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getTable () {
            this.loading = true;
            this.$http.get('api/getReply',
                {
                    params: {
                        commentID: this.commentsID
                    }
                }
            )
                .then((res) => {
                    for (let i = 0; i < res.length; i++) {
                        let date = new Date(res[i].replyTime).toJSON();
                        let dates = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        res[i].replyTime = dates;
                    }
                    this.tableData = res;
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.loading = false;
                });
        }
    },
    created () {
        bus.$on('reply', (msg) => {
            this.visible = false;
            this.visible = true;
            this.commentsID = msg;
            this.getTable();
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
