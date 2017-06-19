<template>
    <div class="movie_list_top250 j-container">
        <div class="j-content">
            <div class="custom-list md-reiple line">
                <ul>
                    <li v-for="movie in movieLists" v-on:click="getMovieDetail(movie.id)">
                        <div class="md-avatar">
                            <img v-bind:src="movie.images.large" v-bind:alt="movie.title">
                        </div>
                        <div class="md-list-text-container">
                            <span>{{movie.title}}</span>
                            <p>
                                <span v-for="genre in movie.genres">{{genre}}</span> ({{movie.year}}) (平均：{{movie.rating.average}}分)
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="md-spinner" v-show="spinnerFlag">加载中..</div>
    </div>
</template>
<script>
export default {
    name: 'movieListTop250',
    data() {
        return {
            movieLists: [],
            busy: false,
            spinnerFlag: true,
            scrContainer: null,
            scrContent: null,
            eleH: 0
        }
    },
    watch: {
        movieLists: {
            handler() {
                setTimeout(() => {
                    this.eleH = this.scrContent.offsetHeight;
                }, 1000)
            },
            deep: true
        }
    },
    /*watch: {
        movieLists(){
            setTimeout(()=>{
                this.eleH=this.scrContent.offsetHeight;
                console.log(this.eleH);
            }, 1000)
        }
    },*/
    mounted() {
        this.$nextTick(() => {
            this.scrContainer = this.$el;

            this.scrContainer.style.width = document.body.clientWidth + 'px';
            this.scrContainer.style.position = 'absolute';
            this.scrContainer.style.left = 0;

            this.scrContainer = this.$el;
            this.scrContent = this.$el.querySelector('.j-content');
            this.eleH = this.scrContent.offsetHeight;
            this.loadMore();
            window.addEventListener('scroll', e => {
                if (this.isTouchScreenBtn(e)) {
                    this.loadMore();
                }
            })
        })
    },
    methods: {
        isTouchScreenBtn() {
            let winH = window.innerHeight || document.documentElement.clientHeight;
            let navH = document.querySelector('.navbar').offsetHeight * 2;
            let innerWinH = winH - navH + 168;
            let eleH = this.eleH;
            let scrT = document.body.scrollTop;
            if (scrT >= eleH - innerWinH) {
                return true;
            } else {
                return false
            }
        },
        getMovieDetail(id) {
            this.$router.push({
                name: 'movie-detail',
                params: {
                    id: id
                }
            })
        },
        loadMore() {
            if (this.busy) {
                return;
            }
            let start = this.movieLists.length;
            this.busy = true;
            this.spinnerFlag = true;
            this.$http.get('https://api.douban.com/v2/movie/top250?count=10&start=' + start)
                .then(response => {
                    // console.log(response);
                    response.data.subjects.forEach(movie => {
                        this.movieLists.push(movie);
                    })
                    this.busy = false;
                    this.spinnerFlag = false;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>
<style scoped>
.movie_list_top250 {
    margin-top: 100px;
}

.custom-list li {
    border-bottom: 1px dashed #ccc;
    padding: 10px;
    cursor: pointer;
}

.md-avatar {
    width: 150px;
    margin: 0 auto;
}

.md-avatar img {
    display: block;
    width: 100%;
}
</style>
