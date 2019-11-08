<template>
    <div class="friendLink" ref="data">
        <change-link></change-link>
        <div class="title">
            <div class="search">
                <Input search enter-button placeholder="请输入要查找的友链ID" v-model="findNumber" @on-search="findLink"/>
                <Button type="primary" size="large"  icon="md-arrow-round-back" shape="circle" style="margin-left:10px" title="取消查找" @click="getTable"></Button>
            </div>
            <Button type="primary" size="large" @click="addLink">添加友链</Button>
        </div>
        <Table border :columns="columns" :data="tableData.slice((pageInfo.currentPage-1)*pageInfo.pageSize,pageInfo.currentPage*pageInfo.pageSize)" :height="tableHeight" :loading="loading">
            <template slot-scope="{ row }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="change(row)">修改</Button>
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
import changeLink from './changeLink';

export default {
    name: 'friendLink',
    components: {
        changeLink
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
                    title: '友链ID',
                    align: 'center',
                    key: 'linkID'
                },
                {
                    title: '友链名字',
                    align: 'center',
                    key: 'linkName'
                },
                {
                    title: 'Url',
                    align: 'center',
                    resizable: true,
                    width: 400,
                    key: 'link'
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
        findLink () {
            this.loading = true;
            this.$http.get('api/searchLink',
                {
                    params: {
                        linkID: this.findNumber
                    }
                })
                .then((res) => {
                    this.tableData = [];
                    this.tableData[0] = res;
                    this.loading = false;
                    this.findNumber = '';
                })
                .catch((err) => {
                    console.log(err);
                    this.loading = false;
                });
        },
        addLink () {
            bus.$emit('addLink');
        },
        change (row) {
            bus.$emit('changeLink', row);
        },
        remove (row) {
            this.$http.delete('/api/deleteLink',
                {
                    params: {
                        linkID: row.linkID
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
        pageChange (num) {
            this.pageInfo.currentPage = num;
        },
        pageSize (num) {
            this.pageInfo.pageSize = num;
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
        getTable () {
            this.loading = true;
            this.$http.get('/getLink')
                .then((res) => {
                    this.tableData = res;
                    this.link = res;
                    this.pageInfo.pageTotal = res.length;
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                    console.log(err);
                });
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.tableHeight = this.$refs.data.offsetHeight - 86;
        });
    },
    created () {
        this.getTable();
        this.getHeight();
        bus.$on('linkChanged', () => {
            this.getTable();
        });
    }
};
</script>

<style scoped  lang="less">
    .friendLink{
        width: 100%;
        height: 100%;
        .title{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #F5F7F9;
            .search{
                width: 40%;
                height: 80%;
                display: flex;
                .ivu-input-wrapper{
                width: 80%;
                height: 100%;
                .ivu-input{
                    height: 100%;
                }
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
    .friendLink{
        .ivu-input{
                    height: 100% !important;
                }
    }
</style>
