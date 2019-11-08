<template>
    <div class="newBlogContainer" ref="data">
        <Modal :value.sync="visible" @on-cancel="cancel" @on-ok="ok" title="博客简介">
            <Input v-model="blogDescription" maxlength="100" show-word-limit type="textarea" placeholder="Enter something..." style="width: 100%;resize: none;" />
        </Modal>
        <div class="topButton">
            <div class="titleInput">
                <Input v-model="blogName" size="large" placeholder="请输入博客名字" />
                <Select v-model="blogType" size="large" placeholder="请选择博客类型">
                    <Option v-for="item in types" :value="item.label" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="titleSubmit">
                <Button size="large" type="success" @click="submit">提交博客</Button>
            </div>
        </div>
        <div :style="{height:height + 'px'}">
            <mavon-editor v-model="blogValue" @save="save" ref="md" @change="save" @imgAdd="$imgAdd" @imgDel="$imgDel" :navigation="true"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'new_blog',
    data () {
        return {
            visible: false,
            blogValue: '',
            blogDescription: '',
            key: '',
            blogName: '',
            blogType: '',
            types: [],
            height: 0
        };
    },
    methods: {
        // 绑定@imgAdd event
        $imgAdd (pos, $file) {
            // 第一步.将图片上传到服务器.
            let formdata = new FormData();
            formdata.append('image', $file);
            this.$http.post('/api/uploadImg',
                formdata,
                {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            )
                .then((res) => {
                    this.$refs.md.$img2Url(pos, res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        $imgDel (pos) {
            delete this.img_file[pos];
        },
        cancel () {
            this.visible = false;
        },
        ok () {
            let postData = {};
            postData['userID'] = sessionStorage.userID;
            postData['blogType'] = this.blogType;
            postData['blogName'] = this.blogName;
            postData['blogMsg'] = this.blogValue;
            postData['description'] = this.blogDescription;
            postData = JSON.stringify(postData);
            this.$http.post('api/addBlog',
                postData,
                {
                    headers: {'Content-Type': 'application/json'}
                }
            )
                .then((res) => {
                    this.$Message.success({
                        content: '发布成功',
                        background: true,
                        center: true,
                        duration: 1.5
                    });
                    this.blogValue = '';
                })
                .catch((err) => {
                    console.log(err);
                });
            sessionStorage.removeItem('blogMsg');
        },
        save () {
            sessionStorage.setItem('blogMsg', this.blogValue);
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
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.height = this.$refs.data.offsetHeight - 51;
        });
    },
    created () {
        if (sessionStorage.blogMsg) {
            this.blogValue = sessionStorage.blogMsg;
        }
        this.getHeight();
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
