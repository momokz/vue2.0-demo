<template>
    <div class="music-play">
        <headerBack></headerBack>
        <div class="container-wrap">
            music-play
            <div class="container" v-if="isRemove">
                <div class="lyric-wrap">
                    <img v-bind:src="activeSong.avatarUrl" v-bind:alt="activeSong.albumName">
                    <div class="lyric-content">
                        <p v-bind:class="['lyric', lineIndex===index?'active':'']" v-for="(obj, index) of lyricData" v-bind:data-time="obj.time">{{obj.lyric}}</p>
                    </div>
                </div>
            </div>
            <div class="main">
                <h2>{{activeSong.name}}</h2>
                <p>{{activeSong.singer}}</p>
                <div class="progress-wrap">
                    <div class="time_play">{{curTime}}</div>
                    <div class="progress-bg">
                        <div class="progress" v-bind:style="{width:activePercent}">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                    <div class="time total">{{activeSong.duration | formatTime}}</div>
                </div>
                <div class="panel">
                    <i class="btn prev iconfont icon-prev" @click.prevent="playPrev()"></i>
                    <i :class="['btn play iconfont', iconState]" @click.prevent="togglePlay()"></i>
                    <i class="btn next iconfont icon-next" @click.prevent="playNext()"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerBack from '@/components/common/header_back';
export default {
    name: 'music-play',
    components: {
        headerBack
    },
    data() {
        return {
            isRemove: true,
            dis: 0,
            hArr: []
        }
    },
    computed: {
        activeSong() {
            let activeSong = JSON.parse(window.localStorage.getItem('activeSong'));
            console.log(activeSong);
            return activeSong;
        }
    }
}
</script>
<style scoped>
.container-wrap {
    margin-top: 60px;
}
</style>
