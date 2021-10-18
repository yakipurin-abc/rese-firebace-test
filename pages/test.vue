<template>
  <div class="login">
    <div>
      <button @click="login">googleアカウントでログイン</button>
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
            this.$router.push('confirm')
    			}
  			});
			},
  },
  created() {
			this.certification();
		}
}
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>