<template>
    <div class="movie-hot movie-scroll">
        <div class="movie-content">
            <transition-group name="list" tag="ul">
                <li v-for="movie in movieHotList" :key="movie" @click="getMovieDetail(movie.id)">
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
        <!-- load -->
        <div class="load" v-show="spinnerFlag">hot 加载中...</div>
    </div>
</template>
<script>
export default {
    name: 'movie-hot',
    data() {
        return {
            spinnerFlag: true,
            busy: false,
            movieHotList: [],
            container: null,
            content: null,
            eleH: 0
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.container = this.$el;
            this.content = this.$el.querySelector('.movie-content');
            this.eleH = this.content.offsetHeight;
            this.loadMore();
            this.container.addEventListener('scroll', e => {
                if (this.isscrollBottom) {
                    this.loadMore();
                }
            })
        })
    },
    watch: {
        movieHotList() {
            setTimeout(() => {
                this.eleH = this.content.offsetHeight;
            }, 1000)
        }
    },
    methods: {
        isscrollBottom() {
            let winH = window.innerHeight || document.documentElement.clientHeight;
            let navH = document.querySelector('.nav-bar').offsetHeight * 2 + 20;
            let innerWinH = winH - navH;
            let scrT = this.container.scrollTop;
            let eleH = this.eleH;
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
            this.busy = true;
            this.spinnerFlag = true;
            let start = this.movieHotList.length;
            this.$http.get('https://api.douban.com/v2/movie/in_theaters?count=10&start=' + start)
                .then(response => {
                    response.data.subjects.forEach(item => {
                        this.movieHotList.push(item);
                    });
                    this.busy = false;
                    this.spinnerFlag = false;
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
.movie-hot {
    float: left;
    width: 800px;
    height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
}
.load {
    margin-top: 20px;
    text-align: center;
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