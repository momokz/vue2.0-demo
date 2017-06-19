<template>
    <div class="seach-muisc">
        <div class="md-input-container">
            <label for="">搜索</label>
            <input type="text" v-model="searchQuery" v-on:input="search">
        </div>
    </div>
</template>
<script>
export default {
    name: 'seach-muisc',
    data() {
        return {
            searchQuery: ''
        }
    },
    methods: {
        search() {
            this.$http.get('http://s.music.163.com/search/get?type=1&s=' + this.searchQuery)
                .then(response => {
                    if (response.data.result && response.data.result.songs) {
                        let playList = response.data.result.songs;
                        playList.forEach(obj => {
                            obj.playing = false;
                        });
                        this.$store.commit('MUSIC_LISTS_CHANGE', {
                            'activeList': playList,
                            'activeListId': this.id
                        });
                        this.$emit('searchSong', playList);
                    }
                    if (typeof response.data.result === 'undefined') {
                        this.$emit(searchSong, '');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>
<style scoped></style>
