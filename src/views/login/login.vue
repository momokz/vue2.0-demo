<template>
    <div class="login" @keyup.enter="login">
        <form autocomplete="off" novalidate>
            <div class="md-input-container">
                <label for="">用户名：</label>
                <input type="text" v-model="username" :required="inputFlag">
            </div>
            <div class="md-input-container">
                <label for="">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                <input type="password" v-model="password" :required="inputFlag">
            </div>
            <div class="md-button">
                <button @click.prevent="login">登录</button>
                <button @click.prevent="goRegist">注册</button>
            </div>
        </form>
        <div class="overlay" v-show="logging">登录中..</div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            inputFlag: true,
            logging: false
        }
    },
    methods: {
        login() {
            let loginUser = null;
            let loginPassword = null;
            if (!this.check({
                    username: this.username,
                    password: this.password
                })) {
                return;
            }

            let login = JSON.parse(window.localStorage.getItem('login'));
            if (login) {
                loginUser = login.username;
                loginPassword = login.password;
            }
            this.logging = true;
            if (this.username == 'test' && this.password == 'test' || this.username == loginUser && this.password == loginPassword) {
                this.$router.push({
                        name: 'movie'
                    });
            } else {
                alert('用户名密码不匹配');
                this.logging = false;
            }
        },
        check(obj) {
            if (this.isEmpty(obj.username)) {
                alert('用户名不能为空');
                return false;
            }
            if (this.isEmpty(obj.password)) {
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
            })
        }
    }
}
</script>
<style scoped>
.login{
    text-align: center;
}
.md-input-container,
.md-button {
    margin-top: 20px;
}

.md-button button:first-child {
    margin-right: 10px;
}
</style>
