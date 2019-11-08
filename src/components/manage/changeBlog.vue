<template>
    <div class="changeBlog" ref="data">
        <Spin size="large" fix v-if="loading"></Spin>
        <Modal :value.sync="visible" @on-cancel="cancel" @on-ok="ok" title="博客简介">
            <Input v-model="blogDescription" maxlength="100" show-word-limit type="textarea" placeholder="Enter something..." style="width: 100%;resize: none;" />
        </Modal>
        <div class="topButton">
            <div class="topInput">
                <Input search enter-button placeholder="请输入要修改的博客ID" v-model="blogId" @on-search="findBlog" size="large"/>
                <Input v-model="blogName" size="large" placeholder="请输入博客名字" />
                <Select v-model="blogType" size="large" placeholder="请选择博客类型">
                    <Option v-for="item in types" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="topSub">
                <Button size="large" type="warning" @click="submit">提交修改</Button>
            </div>
        </div>
        <div :style="{height:height + 'px'}">
            <mavon-editor v-model="blogValue" @save="save" @change="save" :navigation="true"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'changeBlog',
    data () {
        return {
            visible: false,
            loading: false,
            blogId: '',
            blogDescription: '',
            blogValue: '',
            key: '',
            blogName: '',
            blogType: '',
            types: [],
            height: 0
        };
    },
    methods: {
        cancel () {
            this.visible = false;
        },
        ok () {
            let postData = {};
            postData['userID'] = sessionStorage.userID;
            postData['blogID'] = sessionStorage.changeID;
            postData['blogType'] = this.blogType;
            postData['blogName'] = this.blogName;
            postData['blogMsg'] = this.blogValue;
            postData['description'] = this.blogDescription;
            postData = JSON.stringify(postData);
            this.$http.post('api/changeBlog',
                postData,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
                .then((res) => {
                    this.$Message.success({
                        content: '修改成功',
                        background: true,
                        center: true,
                        duration: 1.5
                    });
                    this.blogValue = '';
                })
                .catch((err) => {
                    console.log(err);
                });
            sessionStorage.removeItem('changeType');
            sessionStorage.removeItem('changeName');
            sessionStorage.removeItem('changeID');
            sessionStorage.removeItem('changeDes');
            sessionStorage.removeItem('changeBlog');
            this.blogType = '';
            this.blogName = '';
            this.blogValue = '';
            this.blogDescription = '';
        },
        findBlog () {
            this.loading = true;
            this.$http.get('searchBlog',
                {
                    params: {
                        blogID: this.blogId
                    }
                }
            )
                .then((res) => {
                    this.blogType = res.blogType;
                    this.blogName = res.blogName;
                    this.blogValue = res.blogMsg;
                    this.blogDescription = res.blogDescription;
                    sessionStorage.setItem('changeType', this.blogType);
                    sessionStorage.setItem('changeName', this.blogName);
                    sessionStorage.setItem('changeID', res.blogID);
                    sessionStorage.setItem('changeDes', this.blogDescription);
                    this.loading = false;
                    this.blogId = '';
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        submit () {
            this.visible = true;
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
        },
        save () {
            sessionStorage.setItem('changeBlog', this.blogValue);
            sessionStorage.setItem('changeType', this.blogType);
            sessionStorage.setItem('changeName', this.blogName);
            sessionStorage.setItem('changeDes', this.blogDescription);
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.height = this.$refs.data.offsetHeight - 51;
        });
    },
    created () {
        this.getHeight();
        if (sessionStorage.changeBlog) {
            this.blogValue = sessionStorage.changeBlog;
            this.blogType = sessionStorage.changeType;
            this.blogName = sessionStorage.changeName;
            this.blogDescription = sessionStorage.changeDes;
        }
        this.$http.get('/getType')
            .then((res) => {
                let types = [];
                for (let i = 0; i < res.length; i++) {
                    let obj = {};
                    obj['value'] = res[i].typeID;
                    obj['label'] = res[i].blogType;
                    types[i] = obj;
                }
                this.types = types;
            })
            .catch((err) => {
                console.log(err);
            });
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
