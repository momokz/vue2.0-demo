<template>
    <div class="movie">
        <ul class="movie-list">
            <li :class="{'active': isActive==0}" @click="doActive(0)">top</li>
            <li :class="{'active': isActive==1}" @click="doActive(1)">上映</li>
            <li :class="{'active': isActive==2}" @click="doActive(2)">即将上映</li>
        </ul>
        <div class="movie-wrap">
            <div class="movie-container">
                <movieListTop></movieListTop>
                <movieListHot></movieListHot>
                <movieListComing></movieListComing>
            </div>
        </div>
        <!-- header-back -->
        <topBack @clickBack="backToTop"></topBack>
    </div>
</template>
<script>
import movieListTop from '@/components/movie/movie_top';
import movieListHot from '@/components/movie/movie_hot';
import movieListComing from '@/components/movie/movie_coming';
import topBack from '@/components/common/top_back';
export default {
    name: 'movie',
    components: {
        movieListComing,
        movieListHot,
        movieListTop,
        topBack
    },
    data() {
        return {
            isActive: 0,
            container: ''
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.container = this.$el.querySelector('.movie-container');
            this.container.style.width = 800 * 3 + 'px';
        })
    },
    methods: {
        doActive(num) {
            this.isActive = num;
            this.container.style.transform = 'translateX(' + -num * 800 + 'px)';
        },
        backToTop() {
            this.$el.querySelector('.movie-scroll').scrollTop = 0;
        }
    }
}
</script>
<style scoped>
.movie {
    box-sizing: border-box;
    height: 80vh;
}
.movie-list {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
}
.movie-list li {
    width: 33%;
    float: left;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    cursor: pointer;
    text-align: center;
}
.movie-list li:first-child {
    width: 34%;
    border-left: 1px solid #ccc;
}
.movie-wrap {
    position: relative;
    box-sizing: border-box;
    overflow-x: hidden;
    margin-top: 20px;
    padding-bottom: 20px;
    /* border: 1px solid #ccc; */
}
.active {
    color: #f00;
}
.movie-container {
    transition: all .5s;
    height: auto;
}
</style>