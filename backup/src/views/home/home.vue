<template>
    <div id="home">
        <navBar></navBar>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
import navBar from '@/components/common/navBar';
import movie from '@/components/movie/movie';
import music from '@/components/music/music';

export default {
    name: 'home',
    data() {
        return {}
    },
    components: {
        navBar,
        movie,
        music
    },
    methods: {
    }
}
</script>
<style scoped></style>