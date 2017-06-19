<template>
    <div class="top-nav">
        <a href="" v-on:click.prevent="go">返回</a>
        <h2 class="md-title">{{title}}</h2>
    </div>
</template>
<script>
export default {
    name: 'top-nav',
    data() {
        return {}
    },
    props: ['title'],
    methods: {
        go() {
            history.go(-1);
        }
    }
}
</script>
<style scoped>
.top-nav{
    position: fixed;
    top: 0;
    left: 50%;
    margin-left: -50%;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2196f3;
    text-align: center;
}
.top-nav a{
    position: absolute;
    left: 20px;
    top: 0;
    color: #fff;
}
.top-nav h2{
    font-size: 24px;
}
</style>
