<template>
    <div id="movie">
        <div class="md-blue">
            <div class="md-fixed" v-bind:class="{'wrap-fixed': isScrollDown}">
                <button type="button" class="md-button" v-bind:class="{'md-active': isActive==0}" v-on:click="toggleHandle(0)">top25</button>
                <button type="button" class="md-button" v-bind:class="{'md-active': isActive==1}" v-on:click="toggleHandle(1)">正在上映</button>
                <button type="button" class="md-button" v-bind:class="{'md-active': isActive==2}" v-on:click="toggleHandle(2)">即将上映</button>
            </div>
            <div class="md-wraper">
                <div class="md-container" ref="container">
                    <movieListTop250></movieListTop250>
                    <movieListHot></movieListHot>
                    <movieListComing></movieListComing>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import movieListTop250 from './movie_list_top250';
import movieListHot from './movie_list_hot';
import movieListComing from './movie_list_coming';

export default {
    name: 'movie',
    components: {
        movieListTop250,
        movieListHot,
        movieListComing
    },
    data() {
        return {
            isScrollDown: false,
            isActive: 0
        }
    },
    mounted() {
        this.$refs.container.style.width = document.body.clientWidth + 'px';
    },
    methods: {
        toggleHandle(num) {
            this.isActive = num;
            let container = document.querySelector('.md-container');
            container.style.transform = "translate3d(" + (-num * document.body.clientWidth) + "px, 0, 0)"
        }
    }
}
</script>
<style scoped>
.md-button {
    display: inline-block;
    width: 100px;
    height: 30px;
    margin: 0 30px;
    line-height: 30px;
    background: none;
    border: none;
    cursor: pointer;
    border-bottom: 1px solid #000;
    outline: none;
}

.md-active {
    border-bottom-color: #f00;
}

.md-wraper {
    width: 100%;
    height: auto;
}

.md-container {
    position: absolute;
    transition: all .6s;
    transform: translate3d(0, 0, 0);
}

.md-fixed {
    position: fixed;
    left: 50%;
    top: 51px;
    z-index: 10;
    width: 100%;
    margin-left: -50%;
    background: #2196f3;
}
</style>
