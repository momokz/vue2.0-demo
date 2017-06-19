<template>
    <div id="music">
        <div class="music-list">
            <ul>
                <li v-for="(album, index) in albums">
                    <img class="album-img" v-bind:src="album.bg" v-on:click="showList(index)" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'muisc',
    data() {
        return {
            albums: [{
                name: "飙升榜",
                id: 19723756,
                bg: require("./img/soar_music.jpg")
            }, {
                name: "新歌榜",
                id: 3779629,
                bg: require("./img/new_music.jpg")
            }, {
                name: "原创榜",
                id: 2884035,
                bg: require("./img/original_music.jpg")
            }, {
                name: "KTV麦榜",
                id: 21845217,
                bg: require("./img/ktv_music.jpg")
            }, {
                name: "华语金曲榜",
                id: 4395559,
                bg: require("./img/chinese_music.jpg")
            }, {
                name: "我的专辑",
                id: 98833242,
                bg: require("./img/my_music.jpg")
            }]
        }
    },
    methods: {
        showList(index) {
            this.$router.push({
                name: 'music-list',
                params: {
                    listId: this.albums[index].id
                }
            });
            window.localStorage.setItem('activeListId', this.albums[index].id);
        }
    }
}
</script>
<style scoped>
.music-list{
    width: 90%;
    margin: 60px auto 0;
}
.music-list li {
    float: left;
    width: 150px;
    height: 150px;
    margin: 10px 10px 0 0;
    cursor: pointer;
}

.album-img {
    width: 100%;
    max-height: 100%;
}
</style>
