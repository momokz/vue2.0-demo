<template>
    <div id="login" v-on:keyup.enter="login">
        <div class="from-wrap">
            <form novalidate autocomplete="off">
                <div class="md-input-container">
                    <label for="">用户名：</label>
                    <input type="text" v-model="username" v-bind:required="inputFlag">
                </div>
                <div class="md-input-container">
                    <label for="">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                    <input type="password" class="md-input" v-model="password" v-bind:required="inputFlag">
                </div>
                <button class="md-button" v-on:click.prevent="login">登录</button>
                <button class="md-button" v-on:click.prevent="goRegist">注册</button>
            </form>
        </div>
        <div class="overlay" v-show="logging">登录中...</div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            inputFlag: true,
            username: '',
            password: '',
            logging: false
        }
    },
    methods: {
        login() {
            let targetUsername = '';
            let targetPassword = '';
            let loginInfo = JSON.parse(window.localStorage.getItem('loginInfo'));
            if (loginInfo) {
                targetUsername = loginInfo.username
                targetPassword = loginInfo.password;
                if (!this.check({
                        username: this.username,
                        password: this.password
                    })) {
                    return;
                }
            }
            this.logging = true;
            if (this.username == targetUsername && this.password == targetPassword || this.username == 'test' && this.password == 'test') {
                setTimeout(() => {
                    this.logging = false;
                    this.$router.push({
                        name: 'movie'
                    });
                }, 600)
            } else {
                this.logging = false;
                alert('用户名或密码不匹配');

            }
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
        goRegist() {
            this.$router.push({
                name: 'regist'
            });
        }
    }
}
</script>
<style scoped>
.md-input-container {
    margin-top: 20px;
}

.md-tooltip {
    margin-bottom: 10px;
}

.md-button {
    margin: 10px 5px 0;
}
</style>
