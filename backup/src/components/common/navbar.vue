<template>
    <div class="navbar">
        <ul class="navbar-list">
            <li v-on:click="go(0)" v-bind:class="{'md-active': isActive[0]}">电影</li>
            <li v-on:click="go(1)" v-bind:class="{'md-active': isActive[1]}">音乐</li>
            <li v-on:click="go(2)" v-bind:class="{'md-active': isActive[2]}">书籍</li>
            <li v-on:click="go(3)" v-bind:class="{'md-active': isActive[3]}">图片</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'navBar',
    data() {
        return {
            isActive: [true, false, false, false]
        }
    },
    computed: {
        activeRoute() {
            return this.$store.state.activeRoute;
        }
    },
    methods: {
        doAction() {
            this.$store.commit('ROUTE_CHANGE', {
                activeRoute: this.$route.name
            });
            this.setActiveNav();
        },
        go(index) {
            switch (index) {
                case 0:
                    this.$router.push({
                        name: 'movie'
                    });
                    break;
                case 1:
                    this.$router.push({
                        name: 'music'
                    });
                    break;
                case 2:
                    this.$router.push({
                        name: 'book'
                    });
                    break;
                case 3:
                    this.$router.push({
                        name: 'photo'
                    });
                    break;
            };
            this.doAction();
        },
        setActiveNav() {
            let mapRoute = {
                'movie': 0,
                'music': 1,
                'book': 2,
                'photo': 3
            };
            this.isActive = [false, false, false, false];
            this.isActive[mapRoute[this.activeRoute]] = true;
        }
    }
}
</script>
<style scope>
.navbar{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px dashed #ccc;
    background: #fff;
    z-index: 10;
}
.navbar-list {
    overflow: hidden;
}
.navbar-list li{
    border-right: 1px dashed #ccc;
}
.navbar-list li:last-child{
    border-right: none;
}
.navbar-list li {
    box-sizing: border-box;
    list-style: none;
    width: 25%;
    float: left;
    cursor: pointer;
}

.md-active{
    color: #f00;
}
</style>
