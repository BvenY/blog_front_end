<template>
    <div class="aboutContainer">
        <div class="aboutMsg" v-for="item in about" :key="item.id">
            <div class="aboutTitle">
                {{item.title}}
            </div>
            <div class="aboutMsg">
                {{item.msg}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'about_me',
    data () {
        return {
            about: [
                {
                    title: '个人简介：',
                    id: '1',
                    msg: 'just a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a test'
                },
                {
                    title: '个人简介：',
                    id: '2',
                    msg: 'just a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a test'
                },
                {
                    title: '个人简介：',
                    id: '31',
                    msg: 'just a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a test'
                },
                {
                    title: '个人简介：',
                    id: '4',
                    msg: 'just a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a testjust a test'
                }

            ]
        };
    }
};
</script>

<style scoped  lang="less">
    .aboutContainer{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        // overflow-y: scroll;
        .aboutMsg{
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            .aboutTitle{
                width: 100%;
                height: 50px;
                font-size: 2em;
                text-indent: 2em;
                display: flex;
                align-items: center;
                color: #031C67;
            }
            .aboutMsg{
                width: 95%;
                height: auto;
                font-size: 1.3em;
                text-indent: 2em;
                color: black;
            }
        }
    }
</style>
