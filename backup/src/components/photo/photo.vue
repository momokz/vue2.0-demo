<template>
    <div class="photo j-container">
        <div class="j-content">
            <div class="m-gallery">
                <transition-group name="fade" tag="div">
                    <div v-for="(photo, index) in photoLists" v-bind:key="photo" class="item" v-on:click="getPhotoDetail(index)">
                        <img v-bind:src="photo.url" alt="" class="animated bounceIn">
                    </div>
                </transition-group>
            </div>
            <div v-show="spinnerFlag">加载中...</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'photo',
    data() {
        return {
            scrContainer: null,
            scrContent: null,
            eleH: 0,
            spinnerFlag: true,
            photoLists: [],
            busy: false,
            page: 1
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.loadMore();
            this.scrContainer = this.$el;
            this.scrContent = this.$el.querySelector('.j-content');
            this.eleH = this.scrContent.offsetHeight;
            this.scrContainer.addEventListener('scroll', e => {
                if (this.isTouchScreenBtn()) {
                    this.loadMore();
                }
            })
        })
    },
    watch: {
        photoLists() {
            this.eleH = this.scrContent.offsetHeight;
        }
    },
    methods: {
        getPhotoDetail(index) {
            this.$router.push({
                name: 'photo-detail',
                params: {
                    id: this.photoLists[index]._id
                }
            });

            let photoData={
                'index': index,
                'photoLists': this.photoLists
            };localStorage
            window.localStorage.setItem('photoData', JSON.stringify(photoData));
        },
        isTouchScreenBtn() {
            let winH = window.innerHeight || document.documentElement.clientHeight;
            let navH = document.querySelector('.navbar').offsetHeight * 2;
            let innerWinH = winH - navH + 168;
            let eleH = this.eleH;
            let scrT = this.scrContainer.scrollTop;
            // console.log('innerWinH '+innerWinH);
            // console.log('eleH '+eleH);
            // console.log('scrT '+scrT);
            if (scrT >= eleH - innerWinH) {
                return true;
            } else {
                return false;
            }
        },
        loadMore() {
            if (this.busy) {
                return
            }
            let start = this.photoLists.length;
            this.busy = true;
            this.spinnerFlag = true;
            this.$http.get('https://gank.io/api/data/福利/10/' + this.page)
                .then(response => {
                    // console.log(response);
                    response.data.results.forEach(photo => {
                        this.photoLists.push(photo);
                    })
                    this.busy = false;
                    this.spinnerFlag = false;
                    this.page++;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
</script>
<style scoped>
.photo {
    min-height: 100vh;
    box-sizing: border-box;
    padding: 64px 0;
    text-align: center;
}

.j-container {
    text-align: center;
    height: 100vh;
    overflow-y: scroll
}

.j-content {
    min-height: 102vh;
    height: auto;
}

.m-gallery>div {
    /* 采用flex布局 */
    display: flex;
    /* 规定一行放不下flex元素时自动换行 */
    flex-wrap: wrap;
}

.m-gallery .item {
    height: 100px;
    /* 每个flex元素占的宽度相同 */
    flex-grow: 1;
    margin: 2px;
}

.m-gallery img {
    height: 100px;
    min-width: 100%;
    max-width: 100%;
    /* 使图片等比拉伸，可能会被裁减 */
    object-fit: cover;
    vertical-align: bottom;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>
