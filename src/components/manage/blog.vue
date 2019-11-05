<template>
    <div class="blogContainer" ref="data">
        <div class="title">
            <Input search enter-button placeholder="请输入要查找的博客ID" v-model="findeNumber" @on-search="findUser"/>
        </div>
        <Table border :columns="columns1" :data="data1" :height="tableHeight">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>
        <div class="page">
            <Page :total="pageInfo.pageTotal" :current="pageInfo.currentPage" :page-size="pageInfo.pageSize" @on-change="pageChange" @on-page-size-change="pageSize" show-sizer show-total show-elevator/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'blogContainer',
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
                    title: '博客ID',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '博客编写人',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '博客类型',
                    align: 'center',
                    key: 'time'
                },
                {
                    title: '博客名',
                    align: 'center',
                    key: 'time'
                },
                {
                    title: '博客描述',
                    align: 'center',
                    resizable: true,
                    width: 400,
                    key: 'time'
                },
                {
                    title: '博客创建时间',
                    align: 'center',
                    key: 'time'
                },
                {
                    title: '博客评论数',
                    align: 'center',
                    key: 'time'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 100,
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
        remove (index) {

        },
        pageChange (num) {
            console.log(num);
        },
        pageSize (num) {
            console.log(num);
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
    .blogContainer{
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
    .blogContainer{
        .ivu-input{
                    height: 100% !important;
                }
    }
</style>
