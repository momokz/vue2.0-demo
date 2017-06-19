<template>
    <div class="photo-detail">
        <transition name="slideT">
            <div class="login-tip" v-show="tipFlag"></div>
        </transition>
        <headerBack title="photo"></headerBack>
        <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight">
            <img v-bind:src="photoList[index]['url']">
        </v-touch>
    </div>
</template>
<script>
import headerBack from '@/components/common/header_back';
export default {
    name: 'photo-detail',
    components: {
        headerBack
    },
    data() {
        return {
            tipFlag: false,
            localData: JSON.parse(window.localStorage.getItem('photoData')),
            tip: ''
        }
    },
    computed: {
        index() {
            return this.localData.index;
        },
        photoList() {
            return this.localData.photoLists;
        }
    },
    methods: {
        onSwipeLeft() {
            if (this.localData.index == this.photoList.length - 1) {
                this.tip = "这事最后一张图";
                this.tipFlag = true;
                setTimeout(() => {
                    this.tipFlag = false;
                }, 2000);
                return;
            }
            this.localData.index++;
        },
        onSwipeRight() {
            if (this.localData.index == 0) {
                this.tip = "这事第一张图";
                this.tipFlag = true;
                setTimeout(() => {
                    this.tipFlag = false;
                }, 2000);
                return;
            }
            this.localData.index--;
        }
    }
}
</script>
<style scoped>
.photo-detail {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
}

.photo-detail img {
    max-width: 100%;
    max-height: 100%;
}

.login-tip {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 64px;
    line-height: 64px;
    text-align: center;
    background-color: #3f51b5;
    color: #fff;
}

.slideT-enter-active,
.slideT-leave-active {
    transition: all .5s
}

.slideT-enter-active {
    transform: translateY(0);
}

.slideT-enter,
.slideT-leave-active {
    transform: translateY(100%);
}
</style>
