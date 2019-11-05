<template>
    <div class="newBlogContainer" ref="data">
        <div class="topButton">
            <div class="titleInput">
                <Input v-model="blogName" size="large" placeholder="请输入博客名字" />
                <Select v-model="blogType" size="large" placeholder="请选择博客类型">
                    <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="titleSubmit">
                <Button size="large" type="success" @click="submit">提交博客</Button>
            </div>
        </div>
        <div :style="{height:height + 'px'}">
            <mavon-editor v-model="blogValue" @save="submit"  :navigation="true"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'nwe_blog',
    data () {
        return {
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
        submit () {
            console.log(this.blogValue);
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
    .newBlogContainer{
        width: 100%;
        height: 100%;
        .topButton{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-between;
            .titleInput{
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            .titleSubmit{
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
    .newBlogContainer{
        .ivu-input-wrapper{
            width: 40% !important;
        }
        .ivu-select{
            width: 40% !important;
        }
    }
</style>
