<template>
  <div class="login">
    <Header></Header>
  <div class="card">
    <div class="ttl">
      <h2>ログイン</h2>
    </div>
      <button @click="login" type="submit" class="btn">Googleでログイン</button>
      <p>※Googleでのログイン後、ホーム画面に映るまで時間がかかることがあります。</p>
   </div>
  
</div>
</template>

<script>
import firebase from "~/plugins/firebase";
export default {
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
    },
    certification(){
				firebase.auth().onAuthStateChanged((user) => {
    			if (user) {
            this.$router.push('/')
    			}
  			});
			},
  },
  created() {
			this.certification();
		}
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
  width: 300px;
  height: 300px;
}
.ttl{
  background-color: rgb(49, 114, 255);
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.btn{
 position: relative;
  background-color: rgb(49, 114, 255);
  width: 200px;
  display: block;
  padding: 18;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 60px;
}
.btn::before{
   content: "";
  position: absolute;
  top: 50%;
  left: 1px;
  background: url(~assets//google.png) no-repeat;
  background-size: cover;
  width: 30px;
  height: 30px;
  transform: translate(0, -50%);
}
p{
  color: #000;
  width: 90%;
  text-align: center;
  margin: 10px auto;
}
@media screen and (max-width: 768px) {

  li label{
    width: 30px;
    margin-right: 10px;
  }
}
</style>