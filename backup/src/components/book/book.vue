<template>
    <div class="book">
        <swipe class="my-swipe">
            <swipe-item class="slide1"></swipe-item>
            <swipe-item class="slide2"></swipe-item>
            <swipe-item class="slide3"></swipe-item>
        </swipe>
        <div class="md-list md-triple-line">
            <div class="md-list-item" v-for="item in books">
                <div class="md-avatar">
                    <img v-bind:src="item.book.image" alt="bookPoster">
                </div>
                <div class="md-list-text-container">
                    <span>{{item.book.title}}</span>
                    <p>作者：{{item.book.author_intro | captureAuthor}}</p>
                </div>
            </div>
        </div>
        <div class="md-spinner" v-show="flag">加载中..</div>
    </div>
</template>
<script>
require('vue-swipe/dist/vue-swipe.css');
import {
    Swipe,
    SwipeItem
} from 'vue-swipe';
Swipe.auto = false;

export default {
    name: 'book',
    components: {
        Swipe,
        SwipeItem
    },
    data() {
        return {
            books: [],
            flag: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadMore();
        })
    },
    methods: {
        loadMore() {
            this.$http.get('https://api.douban.com/v2/book/user/alex1504/collections')
                .then(response => {
                    console.log(response);
                    this.books = response.data.collections;
                    this.flag = false;
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    filters: {
        captureAuthor(val) {
            return val ? val.slice(0, 20) + '...' : '未知';
        }
    }
}
</script>
<style scoped>
.book {
    min-height: 100vh;
    box-sizing: border-box;
    padding: 64px 0;
    text-align: center;
    padding-top: 50px;
}

.md-list {
    margin-top: 20px;
    padding: 0;
}

.md-list-item {
    margin-bottom: 20px;
}

.my-swipe {
    width: 100%;
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
}

.slide1 {
    background: url('https://img3.doubanio.com/lpic/s27102925.jpg');
    color: #fff;
}

.slide2 {
    background: url('https://img3.doubanio.com/lpic/s6989253.jpg');
    color: #000;
}

.slide3 {
    background: url('https://img3.doubanio.com/lpic/s24468373.jpg');
    color: #fff;
}
</style>
