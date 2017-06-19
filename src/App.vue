<template>
    <div id="app">
        <transition name="slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'app'
}
</script>
<style>
*{
    margin: 0;
    padding: 0;
}
html{
    overflow-y: scroll;
}
html, body{
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100%;
}
ul, li{
    list-style: none;
}
img{
    display: block;
    width: 100%;
}
#app {
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: left;
    color: #2c3e50;
    font-size: 12px;
    width: 800px;
    height: 100%;
    margin: 0 auto;
}
.clearfix::after {
    font-size: 0;
    display: block;
    visibility: hidden;
    clear: both;
    height: 0;
    content: '.';
}
.slider-enter-active,
.slider-leave-active {
    transition: all .5s;
}
.slider-enter,
.slider-leave-active {
    opacity: 0;
}
.slider-enter {
    transform: translateX(100px);
}
.slider-leave-active {
    transform: translateX(-100px);
}
/* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */
::-webkit-scrollbar  
{  
    width: 10px;  
    height: 10px;  
    background-color: #fff;  
}
/* 定义滚动条轨道 内阴影+圆角 */  
::-webkit-scrollbar-track  
{ 
    border-radius: 10px;  
    background-color: #fff;  
}  
  
/* 定义滑块 内阴影+圆角 */  
::-webkit-scrollbar-thumb  
{  
    border-radius: 20px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #555;  
}  
</style>