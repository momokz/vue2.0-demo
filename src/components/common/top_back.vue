<template>
    <div class="top-back" @click="backToTop">
        top
    </div>
</template>
<script>
export default {
    name: 'top-back',
    data() {
        return {}
    },
    methods: {
        backToTop() {
            this.$emit('clickBack');
        }
    }
}
</script>
<style scoped>
.top-back {
    position: fixed;
    left: 50%;
    bottom: 200px;
    width: 50px;
    height: 50px;
    margin-left: 400px;
    border-radius: 50%;
    background: #2196f3;
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    cursor: pointer;
}
</style>
