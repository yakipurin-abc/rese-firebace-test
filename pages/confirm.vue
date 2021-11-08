<template>
  <div class="confirm">
    <div>
      <h1>ログイン完了！！</h1>
      <p>{{user}}</p>
      <p>{{email}}</p>
      <p>{{user_id}}</p>
      <button @click="logout()">戻る</button>
    </div>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
			return{
        user_id: '',
        user: '',
				email: '',
			}
		},
  methods: {
    certification(){
			firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.email = user.email
          this.user = user.displayName
					this.user_id = user.uid
          
        } else {
          this.$router.push("/login");
        }
        
      });
		},
    logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert('ログアウトが完了しました')
        this.$router.push('/')
      })
  },
  },
  created() {
		this.certification();
	}
}
</script>

<style scoped>
.confirm {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>