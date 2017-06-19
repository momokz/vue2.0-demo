<template>
    <div class="movie-detail">
        <headerBack v-bind:title="movieDetail.title"></headerBack>
        <div class="md-spinner" v-show="spinnerFlag">加载中..</div>
        <div class="movie-wrap" v-show="!spinnerFlag">
            <div class="movie-detail-img">
                <img v-bind:src="movieDetail.images?movieDetail.images.large:''" v-bind:alt="movieDetail.title">
            </div>
            <div class="movie-detail-info">
                <h2 class="md-title">{{movieDetail.title}}</h2>
                <div class="movie-detail-info-1">
                    <p>{{movieDetail.countries?movieDetail.countries[0]:''}}/<span v-for="genre in movieDetail.genres">{{genre}}</span></p>
                    <p>年份：{{movieDetail.year}}</p>
                </div>
            </div>
            <div class="movie-detail-summary">
                {{movieDetail.summary}}
            </div>
            <div class="movie-detail-subheading">
                <h3 class="md-subheading">导演：{{movieDetail.directors?movieDetail.directors[0].name:''}}</h3>
                <div class="card-reservation">
                    <img v-bind:src="movieDetail.directors?movieDetail.directors[0].avatars.medium:''" alt="director">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerBack from '@/components/common/header_back';

export default {
    name: 'movie-detail',
    components: {
        headerBack
    },
    data() {
        return {
            movieId: this.$route.params.id,
            movieDetail: {},
            spinnerFlag: true
        }
    },
    mounted() {
        this.reqMovieDetail();
    },
    methods: {
        reqMovieDetail() {
            this.$http.get('https://api.douban.com/v2/movie/subject/' + this.movieId)
                .then(response => {
                    console.log(response);
                    this.movieDetail = response.data.id ? response.data : JSON.parse(response.request.response);
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
.movie-detail {
    width: 80%;
    margin: 0 auto;
    padding-top: 60px;
}

.movie-detail-summary {
    line-height: 24px;
}

.md-spinner,
.movie-detail-img,
.movie-detail-info,
.movie-detail-summary,
.movie-detail-subheading,
.card-reservation {
    margin-top: 20px;
}
</style>
