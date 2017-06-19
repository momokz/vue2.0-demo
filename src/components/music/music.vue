<template>
	<div id="music">
         <!-- loader -->
        <div class="load" v-show="spinnerFlag">music 加载中...</div>   
    </div>
</template>
<script>
export default {
    name: 'music',
    data() {
        return {
            spinnerFlag: true
        }
    }
}
</script>
<style scoped>
.load {
    margin-top: 20px;
    text-align: center;
}
</style>