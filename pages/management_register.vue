<template>
  <form @submit.prevent="register">
    <input type="text" v-model="name" placeholder="name" required />
    <select name="role_id" id="role_id" v-model="newRoleId">
      <option value="1">管理者</option>
      <option value="2">店長</option>
      <option value="3">従業員</option>
    </select>

    <input type="password" v-model="password" placeholder="password" required />
    <button type="submit">送信</button>
  </form>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      name: '',
      newRoleId: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        const sendData ={
          name: this.name,
          role_id: this.newRoleId,
          password: this.password,
        }
        console.log(sendData);
        console.log('センドデータ')
        await this.$axios.post("http://creepy-witch-87015/api/auth/register", sendData);
        this.$router.push("/management_login");
      } catch {
        alert("その名前はすでに登録されています");
      }
    },
  },
};
</script>