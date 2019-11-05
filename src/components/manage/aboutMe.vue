<template>
    <div class="aboutMe">
        <div class="msg">
            <div class="aboutMsg">
                <div class="msgTitle">
                    个人简介
                </div>
                <div class="msgData">
                    just a test
                    just a test
                    just a test
                    just a test
                    just a test
                    just a test
                    just a test
                </div>
                <div class="msgButton">
                    <Button  type="warning" style="margin-right: 15px">修改</Button>
                    <Button  type="error" style="margin-right: 15px">删除</Button>
                </div>
            </div>
        </div>
        <div class="edit"></div>
    </div>
</template>

<script>
export default {
    name: 'about_me',
    data () {
        return {

        };
    }
};
</script>

<style scoped  lang="less">
    .aboutMe{
        width: 100%;
        height: 100%;
        .msg{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-y: scroll;
            .aboutMsg{
                margin-top: 10px;
                width: 95%;
                height: auto;
                border-radius: 5px;
                box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
                .msgTitle{
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    font-size: 1.7em;
                    text-indent: 1em;
                }
                .msgData{
                    margin-top: 10px;
                    width: 100%;
                    height: auto;
                    font-size: 1.3em;
                    text-indent: 1em;
                }
                .msgButton{
                    margin-top: 10px;
                    width: 100%;
                    height: 40px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
            }
        }
    }
</style>
