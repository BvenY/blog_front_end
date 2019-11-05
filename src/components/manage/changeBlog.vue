<template>
    <div class="changeBlog" ref="data">
        <div class="topButton">
            <div class="topInput">
                <Input search enter-button placeholder="请输入要修改的博客ID" v-model="blogId" @on-search="findBlog" size="large"/>
                <Input v-model="blogName" size="large" placeholder="请输入博客名字" />
                <Select v-model="blogType" size="large" placeholder="请选择博客类型">
                    <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="topSub">
                <Button size="large" type="warning" @click="change">提交修改</Button>
            </div>
        </div>
        <div :style="{height:height + 'px'}">
            <mavon-editor v-model="blogValue" @save="submit"  :navigation="true"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'changeBlog',
    data () {
        return {
            blogId: '',
            blogValue: '',
            key: '',
            blogName: '',
            blogType: '',
            types: [
                {
                    value: '1',
                    label: 'VUE专题'
                },
                {
                    value: '2',
                    label: 'Javascript专题'
                }
            ],
            height: 0
        };
    },
    methods: {
        change () {

        },
        findBlog () {

        },
        submit () {

        },
        /* 获取高度 */
        getHeight () {
            /* 定义两个高度，初始高度和现在高度 */
            let nowH;
            /* 延迟获取当前高度 */
            this.$nextTick(() => {
                nowH = this.$refs.data.offsetHeight - 51;
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
            this.height = this.$refs.data.offsetHeight - 51;
        });
    },
    created () {
        this.getHeight();
    }
};
</script>

<style scoped  lang="less">
    .changeBlog{
        width: 100%;
        height: 100%;
        .topButton{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-between;
            .topInput{
                width: 75%;
                height: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            .topSub{
                width: 15%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .v-note-wrapper{
            width: 100%;
            height: 100%;
            z-index: 1;
        }
    }
</style>
<style lang="less">
    .changeBlog{
        .ivu-input-wrapper{
            width: 30% !important;
        }
        .ivu-select{
            width: 30% !important;
        }
    }
</style>
