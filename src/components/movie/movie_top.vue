<template>
    <div class="movie-top movie-scroll">
        <!-- movie top -->
        <div class="movie-content">
            <transition-group name="list" tag="ul">
                <li v-for="movie in movieTopList" :key="movie" @click="getMovieDetail(movie.id)">
                    <div class="movie-content-img">
                        <img :src="movie.images.large" alt="">
                    </div>
                    <div class="movie-content-info">
                        <div class="movie-content-name">{{movie.title}}</div>
                        <div class="movie-content-describe">
                            <span v-for="genre in movie.genres">{{genre}}</span>({{movie.year}})(平均{{movie.rating.average}}分)
                        </div>
                    </div>
                </li>
            </transition-group>
        </div>
        <!-- loader -->
        <div class="load" v-show="spinnerFlag">top 加载中...</div>
    </div>
</template>
<script>
export default {
    name: 'movie-top',
    data() {
        return {
            spinnerFlag: true,
            movieTopList: [],
            busy: false,
            container: null,
            content: null,
            eleH: 0
        }
    },
    watch: {
        movieTopList() {
            setTimeout(() => {
                this.eleH = this.content.offsetHeight;
            }, 1000)
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.container = this.$el;
            this.content = this.$el.querySelector('.movie-content');
            this.eleH = this.content.offsetHeight;
            this.loadMore();
            this.container.addEventListener('scroll', e => {
                if (this.isscrollBottom()) {
                    this.loadMore();
                }
            })
        })
    },
    methods: {
        isscrollBottom() {
            let winH = window.innerHeight || document.documentElement.clientHeight;
            let navH = document.querySelector('.nav-bar').offsetHeight * 2 + 20;
            let scrT = this.container.scrollTop;
            let innerWinH = winH - navH;
            let eleH = this.eleH;
            console.log(scrT+ ' '+eleH+' '+innerWinH);
            if (scrT >= eleH - innerWinH) {
                return true;
            } else {
                return false;
            }
        },
        loadMore() {
            if (this.busy) {
                return;
            }
            let start = this.movieTopList.length;
            this.spinnerFlag = true;
            this.busy = true;
            this.$http.get('https://api.douban.com/v2/movie/top250?count=10&start=' + start)
                .then(response => {
                    response.data.subjects.forEach(item => {
                        this.movieTopList.push(item);
                    })
                    this.spinnerFlag = false;
                    this.busy = false;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getMovieDetail(id) {
            this.$router.push({
                name: 'movie-detail',
                params: {
                    id: id
                }
            })
        }
    }
}
</script>
<style scoped>
.load {
    margin-top: 20px;
    text-align: center;
}
.movie-top {
    float: left;
    width: 800px;
    height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
}
.movie-content {
    height: auto;
}
.movie-content li {
    box-sizing: border-box;
    height: 100px;
    padding: 25px 0;
    border-bottom: 1px dashed #ccc;
    cursor: pointer;
}
.movie-content-img {
    float: left;
    width: 50px;
    height: 50px;
    margin: 0 25px;
    border-radius: 50%;
    overflow: hidden;
}
.movie-content-info {
    float: left;
    width: 600px;
}
.movie-content-name {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
}
.list-enter-active,
.list-leave-active {
    transition: all 1s;
}
.list-enter,
.list-leave-active {
    opacity: 0;
}
.list-enter {
    transform: translateX(20px);
}
.list-leave-active {
    transform: translateX(-20px);
}
</style>