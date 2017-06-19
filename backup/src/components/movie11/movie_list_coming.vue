<template>
    <div class="movie_list_coming">
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
    name: 'movieListComing',
    data() {
        return {
            busy: false,
            movieLists: [],
            spinnerFlag: true,
            scrContainer: null,
            scrContent: null,
            eleH: 0
        }
    },
    mounted() {
        this.scrContainer = this.$el;

        this.scrContainer.style.width = document.body.clientWidth + 'px';
        this.scrContainer.style.position = 'absolute';
        this.scrContainer.style.left = document.body.clientWidth * 2 + 'px';

        this.scrContent = this.scrContainer.querySelector('.j-content');
        this.eleH = this.scrContent.offsetHeight;

        this.loadMore();
        window.addEventListener('scroll', e => {
            if (this.isTouchScreenBtn()) {
                this.loadMore();
            }
        })
    },
    watch: {
        movieLists: {
            handler() {
                this.eleH = this.scrContent.offsetHeight
            },
            deep: true
        }
    },
    methods: {
        getMovieDetail(id) {
            this.$router.push({
                name: 'movie-detail',
                params: {
                    id: id
                }
            })
        },
        isTouchScreenBtn() {
            let winH = window.innerHeight || document.documentElement.clientHeight;
            let navH = document.querySelector('.navbar').offsetHeight * 2;
            let innerWinH = winH - navH + 168;
            let eleH = this.eleH;
            let scrT = document.body.scrollTop;
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
            let start = this.movieLists.length;
            this.busy = true;
            this.spinnerFlag = true;
            this.$http.get('https://api.douban.com/v2/movie/coming_soon?count=10&start=' + start)
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
.movie_list_coming {
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
