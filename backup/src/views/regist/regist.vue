<template>
    <div id="movie" v-on:keyup.enter="regist">
        <div class="form-wrap">
            <form novalidate autocomplete="off">
                <p>已有账号，直接登录 <a v-on:click="goLogin" class="link-color">登录</a></p>
                <div class="md-input-container">
                    <label for="">用户名：</label>
                    <input type="text" v-model="username" v-bind:required="inputFlag">
                </div>
                <div class="md-input-container">
                    <label for="">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                    <input type="password" v-model="password" v-bind:required="inputFlag">
                </div>
                <button class="md-button" v-on:click="regist">注册</button>
            </form>
        </div>
        <div class="overlay" v-show="registing">注册中..</div>
    </div>
</template>
<script>
export default {
    name: 'regist',
    data() {
        return {
            username: '',
            password: '',
            registing: false,
            inputFlag: true
        }
    },
    methods: {
        regist() {

            if (!this.check({
                    username: this.username,
                    password: this.password
                })) {
                return;
            }
            this.registing = true;

            window.localStorage.setItem('loginInfo', JSON.stringify({
                username: this.username,
                password: this.password
            }));

            this.registing = false;
            this.$router.push({
                name: 'movie'
            });
        },
        check(obj) {
            if (this.isEmpty(obj.username)) {
                alert('用户名不能为空');
                return false;
            } else if (this.isEmpty(obj.password)) {
                alert('密码不能为空');
                return false;
            }
            return true;
        },
        isEmpty(val) {
            return val === '';
        },
        goLogin() {
            this.$router.push({
                name: 'login'
            })
        }
    }
}
</script>
<style scoped>
.link-color {
    color: #f44336;
    cursor: pointer;
}

.md-input-container {
    margin-bottom: 15px;
}
</style>
