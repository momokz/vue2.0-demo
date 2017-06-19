<template>
    <div class="regist" v-on:keyup.enter="regist">
        <div class="return-login"><a href="" v-on:click.prevent="login">返回</a>，登录页</div>
        <form autocomplete="" novalidate>
            <div class="input-container">
                <label for="">用户名：</label>
                <input type="text" v-model="username" v-bind:required="inputFlag">
            </div>
            <div class="input-container">
                <label for="">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
                <input type="password" v-model="password" v-bind:required="inputFlag">
            </div>
            <div class="md-button">
                <button v-on:click.prevent="regist">注册</button>
            </div>
        </form>
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
            inputFlag: false,
            registing: false
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
            window.localStorage.setItem('login', JSON.stringify({
                username: this.username,
                password: this.password
            }));
            this.$router.push({
                name: 'movie'
            })
        },
        check(obj) {
            if (this.isEmpty(obj.username)) {
                alert('用户名不能为空')
                return false;
            } else if (this.isEmpty(obj.password)) {
                alert('密码不能为空')
                return false;
            }
            return true;
        },
        isEmpty(val) {
            return val === '';
        },
        login(){
            this.$router.push({
                name: 'login'
            })
        }
    }
}
</script>
<style scoped>
.regist{
    text-align: center;
}
.input-container,
.md-button {
    margin-top: 10px;
}
.return-login{
    margin-top: 20px;
}
.return-login a{
    color: #f00;
}
</style>
