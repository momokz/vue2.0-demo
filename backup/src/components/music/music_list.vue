<template>
    <div class="music-list">
        <headerBack v-bind:title="albumName"></headerBack>
        <search v-on:searchSong="showResults"></search>
        <div class="md-spinner" v-if="spinnerFlag">加载中..</div>
        <!-- 专辑列表 -->
        <div class="md-list" v-if="flag" v-show="!spinnerFlag">
            <div class="md-list-item" v-for="(music, index) in activeList" v-on:click="goPlay(index)">
                <img v-bind:src="music.album.picUrl" alt="prople">
                <span>
                    {{music.name | getShortName}}/
                    <span class="duration">
                        {{music.duration | formatTime}}
                    </span>
                </span>
            </div>
        </div>
        <!-- 搜索列表 -->
        <div class="md-list" v-if="!flag" v-show="!spinnerFlag">
            <div class="md-list-item" v-for="(music, index) in searchList" v-on:click="goPlay(index)">
                <img v-bind:src="music.album.picUrl" alt="prople">
                <span>
                    {{music.name | getShortName}}/
                    <span class="duration">
                        {{music.duration | formatTime}}
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import headerBack from '@/components/common/header_back';
import search from './search_music';

export default {
    name: 'music-list',
    components: {
        headerBack,
        search
    },
    data() {
        return {
            id: this.$route.params.listId,
            flag: true,
            spinnerFlag: false,
            searchList: []
        }
    },
    filters: {
        getShortName(val) {
            if (val.length > 10) {
                return val.slice(0, 10) + '...'
            }
            return val;
        },
        formatTime(val) {
            if (typeof val === 'undefined') {
                return '未知长度';
            }
            let m = Math.floor(val / 1000 / 60).toString();
            let s = Math.round(val / 1000 % 60).toString();
            m = (m.length == 1) ? 0 + m : m;
            s = (s.length == 1) ? 0 + s : s;
            return m + ":" + s;
        }
    },
    computed: {
        activeList() {
            return this.$store.state.music.activeList
        },
        activeListId() {
            return this.$store.state.music.activeListId
        },
        albumName() {
            var mapAlbum = {
                19723756: "飙升榜",
                3779629: "新歌榜",
                2884035: "原创榜",
                21845217: "KTV麦榜",
                4395559: "华语金曲榜",
                98833242: "我的专辑",
            }
            return mapAlbum[this.id]
        }
    },
    mounted() {
        if (typeof this.activeList !== '' && this.activeListId == this.id) {
            this.spinnerFlag = false;
            return;
        }
        this.getList();
    },
    methods: {
        showResults(songs) {
            if (songs) {
                this.searchList = songs;
                this.flag = false;
            } else {
                this.flag = true;
                this.getList();
            }
        },
        getList() {
            this.spinnerFlag = true;
            this.$http.get('http://music.163.com/api/playlist/detail?id=' + this.id)
                .then(response => {
                    let playList = response.data.result.tracks;
                    playList.forEach(obj => {
                        obj.playList = false;
                    });
                    this.$store.commit('MUSIC_LISTS_CHANGE', {
                        'activeList': playList,
                        'activeListId': this.id
                    });
                    this.spinnerFlag = false;
                })
        },
        getLyric(){
            this.$http.get('http://music.163.com/api/song/lyric?os=pc&lv=-1&kv=-1&tv=-1&id='+this.songId)
                .then(response=>{
                    let lyric = res.data && res.data.lrc.lyric;
                    console.log(lyric);
                })
        },
        formatTime(val) {
            if (typeof val === 'undefined') {
                return '未知长度';
            }
            let m = Math.floor(val / 1000 / 60).toString();
            let s = Math.round(val / 1000 % 60).toString();
            m = (m.length == 1) ? 0 + m : m;
            s = (s.length == 1) ? 0 + s : s;
            return m + ":" + s;
        },
        goPlay(index) {
            // 如果为搜索列表
            if (!this.flag) {
                let localSeach={
                    id: this.searchList[index].id,
                    albumName: this.searchList[index].album.name,
                    avatarUrl: this.searchList[index].album.picUrl,
                    name: this.searchList[index].name,
                    singer: this.searchList[index].artists[0].name,
                    duration: this.formatTime(this.searchList[index].duration),
                    activeIndex: index
                };
                window.localStorage.setItem('activeSong', JSON.stringify(localSeach));

                // 提交到vuex中
                // this.$store.commit('MUSIC_SONG_CHANGE', localSeach);
            }
            // 如果为专题列表
            else {
                let localAblum={
                    id: this.activeList[index].id,
                    albumName: this.activeList[index].album.name,
                    avatarUrl: this.activeList[index].album.picUrl,
                    name: this.activeList[index].name,
                    singer: this.activeList[index].artists[0].name,
                    duration: this.formatTime(this.activeList[index].duration),
                    activeIndex: index
                };
                window.localStorage.setItem('activeSong', JSON.stringify(localAblum));

                // 提交到vuex中
                // this.$store.commit('MUSIC_SONG_CHANGE', localAblum);
            }
            this.$router.push({
                name: 'music-play',
                params: {
                    songId: this.activeList[index].id
                }
            })
        }
    }
}
</script>
<style scoped>
.music-list {
    padding-top: 60px;
}

.md-list-item {
    width: 200px;
    margin: 20px auto 0;
    cursor: pointer;
}

.md-list-item img {
    display: block;
    width: 100%;
}
</style>
