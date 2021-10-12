<template>
  <div class="login">
    <Header></Header>
  <div class="card">
    <div class="ttl">
      <h2>Login</h2>
    </div>
    <form @submit.prevent="login">
      <ul>
        <li>
          <label for="email"><img src="~assets//email.png"></label>
          <input type="email" id="email" class="email log-form" v-model="email" placeholder="Email" required />
        </li>
        <li>
          <label for="password"><img src="~assets//key.png"></label>
          <input type="password"  id="password" class="pass log-form" v-model="password" placeholder="Password" required />
        </li>
      </ul>
      <button type="submit" class="btn">ログイン</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        this.$router.push("/");
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
      }
    },
  },
};
</script>
<style scoped>
.login{
  background-color: rgb(238, 237, 237);
  min-height:100vh;
  position: relative;
}
.card{
  box-shadow: 3px 3px 3px #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 25%;
  background-color: #fff;
  border-radius: 10px;
  color: #fff;
}
.ttl{
  background-color: rgb(49, 114, 255);
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
ul{
  margin: 15px;
  padding: 0;
}
li{
  list-style: none;
  margin: 15px;
  display: flex;
}
li img{
  width: 30px;
  margin-right: 10px;
}
li input{
  outline: none;
}
.log-form{
  border-bottom:2px solid #000;
  border-right:none;
  border-left:none;
  border-top:none;
  border-radius:0px;
}
.btn{
  float: right;
  margin-right: 15px;
  background-color: rgb(49, 114, 255);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
}
@media screen and (max-width: 768px) {

  li label{
    width: 30px;
    margin-right: 10px;
  }
}
</style>