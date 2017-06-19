<template>
    <div class="nav-bar">
        <ul class="nav-bar-list clearfix">
            <li v-bind:class="{'active': isActive[0]}" v-on:click="doActive(0)">电影</li>
            <li v-bind:class="{'active': isActive[1]}" v-on:click="doActive(1)">音乐</li>
            <li v-bind:class="{'active': isActive[2]}" v-on:click="doActive(2)">书籍</li>
            <li v-bind:class="{'active': isActive[3]}" v-on:click="doActive(3)">图片</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'navBar',
    data() {
        return {
            isActive: [true, false, false, false],
            activeRoute: ''
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.setNavActive();
        })
    },
    methods: {
        doActive(index) {
            this.go(index);
            this.setNavActive();
        },
        go(index) {
            switch (index) {
                case 0:
                    this.$router.push({
                        name: 'movie'
                    })
                    break;
                case 1:
                    this.$router.push({
                        name: 'music'
                    })
                    break;
                case 2:
                    this.$router.push({
                        name: 'book'
                    })
                    break;
                case 3:
                    this.$router.push({
                        name: 'photo'
                    })
                    break;
            }
        },
        setNavActive() {
            let mapActive = {
                'movie': 0,
                'music': 1,
                'book': 2,
                'photo': 3
            };
            this.activeRoute = this.$route.name;
            this.isActive = [false, false, false, false];
            this.isActive[mapActive[this.activeRoute]] = true;
        }
    }
}
</script>
<style scoped>
.nav-bar{
    margin-bottom: 20px;
}
.nav-bar-list {
    box-sizing: border-box;
    border-bottom: 1px dashed #ccc;
    border-right: 1px dashed #ccc;
    border-left: 1px dashed #ccc;
}
.nav-bar-list li{
    float: left;
    width: 25%;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    border-right: 1px dashed #ccc;
    box-sizing: border-box;
    text-align: center;
}
.nav-bar-list li.active{
    color: #f00;
}
</style>