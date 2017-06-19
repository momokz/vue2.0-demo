<template>
    <div class="header-back">
        {{title}}
        <a href="" @click.prevent="go"></a>
    </div>
</template>
<script>
export default {
    name: 'header-back',
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
.header-back {
    position: relative;
    background: #2196f3;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 16px;
}

.header-back a {
    position: absolute;
    left: 20px;
    top: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    line-height: 20px;
    box-sizing: border-box;
    color: #fff;
}
.header-back a::before, .header-back a::after{
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 20px;
    height: 2px;
    margin-top: -1px;
    background: #fff;
    transform-origin: left top;
}
.header-back a::before{
    transform: rotate(35deg);
}
.header-back a::after{
    transform: rotate(-35deg);
}
</style>
