<template>
    <div class="blogType" ref="data">
        <change-type></change-type>
        <div class="title">
            <div class="search">
                <Input search enter-button placeholder="请输入要查找的博客类型ID" v-model="findNumber" @on-search="findType"/>
                <Button type="primary" size="large"  icon="md-arrow-round-back" shape="circle" style="margin-left:10px" title="取消查找" @click="getTable"></Button>
            </div>
            <Button type="primary" size="large" @click="addType">添加博客类型</Button>
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
import changeType from './changeType';

export default {
    name: 'blogType',
    components: {
        changeType
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
                    title: '类型ID',
                    align: 'center',
                    key: 'typeID'
                },
                {
                    title: '类型名',
                    align: 'center',
                    width: 400,
                    key: 'blogType'
                },
                {
                    title: '博客数量',
                    align: 'center',
                    key: 'blogNum'
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
        findType () {
            this.$Message.warning({
                content: '类型就这几个，还查？？？？？？？十年之内没得这个功能',
                background: true,
                center: true,
                duration: 2
            });
        },
        change (row) {
            bus.$emit('changeType', row.typeID);
        },
        remove (row) {
            this.$http.delete('/api/deleteType',
                {
                    params: {
                        typeID: row.typeID
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
        addType () {
            bus.$emit('addType');
        },
        /* 数组对象排序函数 */
        compare (property) {
            return function (obj1, obj2) {
                let value1 = obj1[property];
                let value2 = obj2[property];
                return value1 - value2;// 升序
            };
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
            this.$http.get('getType')
                .then((res) => {
                    this.tableData = res.sort(this.compare('typeID'));
                    this.loading = false;
                    this.pageInfo.pageTotal = res.length;
                })
                .catch((err) => {
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
        bus.$on('typeChanged', () => {
            this.getTable();
        });
    }
};
</script>

<style scoped  lang="less">
    .blogType{
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
    .blogType{
        .ivu-input{
                    height: 100% !important;
                }
    }
</style>
