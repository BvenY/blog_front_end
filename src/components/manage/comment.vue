<template>
    <div class="comment" ref="data">
        <blog-reply></blog-reply>
        <div class="title">
            <Input search enter-button placeholder="请输入要查找的评论的博客ID" v-model="findNumber" @on-search="findComents"/>
            <Button type="primary" size="large"  @click="getTable(1, 10)" icon="md-arrow-round-back" shape="circle" style="margin-left:10px" title="取消查找"></Button>
        </div>
        <Table border :columns="columns" :data="tableData" :height="tableHeight" :loading="loading">
            <template slot-scope="{ row }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="reply(row)">查看回复</Button>
                <Button type="error" size="small" @click="remove(row)">删除</Button>
            </template>
        </Table>
        <div class="page">
            <Page :total="pageInfo.pageTotal"  @on-change="pageChange" @on-page-size-change="pageSize" show-sizer show-total show-elevator :page-size-opts="[5,10,20,30]"/>
        </div>
    </div>
</template>

<script>
import bus from './bus';
import blogReply from './reply';

export default {
    name: 'comment',
    components: {
        blogReply
    },
    data () {
        return {
            loading: false,
            findNumber: '',
            /* 通过key刷新表格 */
            table: 1,
            tableHeight: 0,
            pageInfo: {
                pageSize: 10,
                currentPage: 1,
                pageTotal: 0
            },
            columns: [
                {
                    title: '评论ID',
                    align: 'center',
                    key: 'commentsID'
                },
                {
                    title: '评论人',
                    align: 'center',
                    key: 'commentsName'
                },
                {
                    title: '评论时间',
                    align: 'center',
                    width: 200,
                    key: 'commentsTime'
                },
                {
                    title: '评论内容',
                    align: 'center',
                    resizable: true,
                    width: 400,
                    key: 'commentsMsg'
                },
                {
                    title: '博客名字',
                    align: 'center',
                    key: 'blogName'
                },
                {
                    title: '回复数',
                    align: 'center',
                    key: 'replyNum'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 180,
                    align: 'center'
                }
            ],
            tableData: []
        };
    },
    methods: {
        findComents () {
            this.loading = true;
            this.$http.get('api/searchComments',
                {
                    params: {
                        commentsID: this.findNumber
                    }
                }
            )
                .then((res) => {
                    for (let i = 0; i < res.length; i++) {
                        let date = new Date(res[i].commentsTime).toJSON();
                        let dates = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        res[i].commentsTime = dates;
                    }
                    this.tableData = res;
                    this.pageInfo.pageTotal = res.length;
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.loading = false;
                });
            this.findNumber = '';
        },
        reply (row) {
            bus.$emit('reply', row.commentsID);
        },
        remove (row) {
            this.$http.delete('/api/deleteComments',
                {
                    params: {
                        commentsID: row.commentsID
                    }
                })
                .then((res) => {
                    this.$Message.success({
                        content: '删除成功',
                        background: true,
                        center: true,
                        duration: 1.5
                    });
                    this.getTable(this.pageInfo.currentPage, this.pageInfo.pageSize);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        pageChange (num) {
            this.pageInfo.currentPage = num;
            this.getTable(this.pageInfo.currentPage, this.pageInfo.pageSize);
        },
        pageSize (num) {
            this.pageInfo.pageSize = num;
            this.getTable(this.pageInfo.currentPage, this.pageInfo.pageSize);
        },
        /* 获取高度 */
        getHeight () {
            /* 定义两个高度，初始高度和现在高度 */
            let nowH;
            /* 延迟获取当前高度 */
            this.$nextTick(() => {
                nowH = this.$refs.data.offsetHeight - 86;
            });
            let height = this.tableHeight;
            /* 比对操作 */
            if (nowH !== height) {
                this.tableHeight = nowH;
                this.table++;
            }
        },
        getTable (pageNum, pageSize) {
            this.loading = true;
            this.$http.get('api/allComments',
                {
                    params: {
                        pageNum: pageNum,
                        pageSize: pageSize
                    }
                }
            )
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        let date = new Date(res.data[i].commentsTime).toJSON();
                        let dates = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        res.data[i].commentsTime = dates;
                    }
                    this.tableData = res.data.sort(this.compare('commentsTime'));
                    this.pageInfo.pageTotal = res.totalCount;
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.loading = false;
                });
        },
        // 时间排序函数
        compare (property) {
            return function (obj1, obj2) {
                let value1 = obj1[property];
                let value2 = obj2[property];
                return value1 < value2 ? 1 : -1;
            };
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.tableHeight = this.$refs.data.offsetHeight - 86;
        });
    },
    created () {
        this.getTable(1, 10);
        this.getHeight();
    }
};
</script>

<style scoped  lang="less">
    .comment{
        width: 100%;
        height: 100%;
        .title{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            background-color: #F5F7F9;
            .ivu-input-wrapper{
                width: 40%;
                height: 80%;
                .ivu-input{
                    height: 100%;
                }
            }
        }
    }
    .page{
        width: 100%;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<style lang="less">
    .comment{
        .ivu-input{
                    height: 100% !important;
                }
    }
</style>
