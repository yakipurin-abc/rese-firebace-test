<template>
<div class="register">
  <Header></Header>
  <div class="card">
    <div class="ttl">
      <h2>Registration</h2>
    </div>
    <form @submit.prevent="register">
      <ul>
        <li>
          <label for="user"><img src="~assets//icon.png"></label>
          <input type="text" id="user" class="regi-form" v-model="name" placeholder="Username" required />
        </li>
        <li>
          <label for="email"><img src="~assets//email.png"></label>
          <input type="email" id="email" class="regi-form" v-model="email" placeholder="Email" required />
        </li>
        <li>
          <label for="password"><img src="~assets//key.png"></label>
          <input type="password" id="password" class="regi-form" v-model="password" placeholder="Password" required />
        </li>
      </ul>
      <button type="submit" class="btn">登録</button>
    </form>
  </div>
</div>
</template>
<script>
export default {
  auth: false,
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async register() {
      try {
        await this.$axios.post("http://localhost:8000/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push("/thanks");
      } catch {
        alert("ユーザー名またはメールアドレスがすでに登録されています");
      }
    },
  },
};
</script>
<style scoped>
.register{
  background-color: rgb(238, 237, 237);
  height: 100vh;
  position: relative;
}
.card{
  box-shadow: 3px 3px 3px #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 30%;
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
.regi-form{
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
@media screen and (max-width: 768px){
  label{
    width: 30px;
    margin-right: 10px;
  }
}
</style>