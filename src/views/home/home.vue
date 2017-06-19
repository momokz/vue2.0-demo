<template>
    <div id="home" class="home">
        <navBar></navBar>
        <keep-alive>
            <transition name="slider" mode="out-in">
                <router-view></router-view>
            </transition>
        </keep-alive>
    </div>
</template>
<script>
import navBar from '@/components/common/navbar';
export default {
    name: 'home',
    components: {
        navBar
    },
    data() {
        return {}
    }
}
</script>
<style scoped>
.home {
    width: 800px;
    margin: 0 auto;
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
</style>