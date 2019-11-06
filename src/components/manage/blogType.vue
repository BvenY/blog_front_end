<template>
    <div class="blogType" ref="data">
        <change-type></change-type>
        <div class="title">
            <Input search enter-button placeholder="请输入要查找的博客类型ID" v-model="findNumber" @on-search="findUser"/>
            <Button type="primary" size="large" @click="addType">添加博客类型</Button>
        </div>
        <Table border :columns="columns1" :data="data1" :height="tableHeight">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="change(index)">修改</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>
        <div class="page">
            <Page :total="pageInfo.pageTotal" :current="pageInfo.currentPage" :page-size="pageInfo.pageSize" @on-change="pageChange" @on-page-size-change="pageSize" show-sizer show-total show-elevator/>
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
            findNumber: '',
            /* 通过key刷新表格 */
            table: 1,
            tableHeight: 0,
            pageInfo: {
                pageSize: 5,
                currentPage: 1,
                pageTotal: 500
            },
            columns1: [
                {
                    title: '类型ID',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '类型名',
                    align: 'center',
                    width: 400,
                    key: 'name'
                },
                {
                    title: '博客数量',
                    align: 'center',
                    key: 'time'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 180,
                    align: 'center'
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    time: '2016-10-03',
                    url: 'www.baidu.com'
                },
                {
                    name: 'John Brown',
                    time: '2016-10-03',
                    url: 'www.baidu.com'
                },
                {
                    name: 'John Brown',
                    time: '2016-10-03',
                    url: 'www.baidu.com'
                },
                {
                    name: 'John Brown',
                    time: '2016-10-03',
                    url: 'www.baidu.com'
                }
            ]
        };
    },
    methods: {
        findUser () {

        },
        change (index) {
            bus.$emit('changeType', index);
        },
        remove (index) {

        },
        pageChange (num) {
            console.log(num);
        },
        pageSize (num) {
            console.log(num);
        },
        addType () {
            bus.$emit('addType');
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
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.tableHeight = this.$refs.data.offsetHeight - 86;
        });
    },
    created () {
        this.getHeight();
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
    .blogType{
        .ivu-input{
                    height: 100% !important;
                }
    }
</style>
