<template>
  <div class="management">
<ManagementHeader></ManagementHeader>
    <div class="management-ttl">
      <h2>ユーザー管理画面</h2>
    </div>
    <div class="user-add" v-if="$auth.loggedIn">
      <form >
        <label for="">追加</label>
        <input type="text" v-model="name" placeholder="name" required />
        <select name="role_id" id="role_id" v-model="newRoleId">
          <option value="" >ロールを選んでください</option>
          <option value="1" >管理者</option>
          <option value="2">店長</option>
          <option value="3">従業員</option>
        </select>

        <input type="password" v-model="password" placeholder="password" required />
        <button type="submit">追加</button>
      </form>
    </div>
    <div class="user-info" >
        <table v-if="$auth.loggedIn">
        <tr>
          <th>名前</th>
          <th>ロール</th>
          <th>更新</th>
          <th>削除</th>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td class="user-name">
            <input type="text" v-model="user.name">
          </td>
          <td class="user-email" >
            <select name="role_id" id="role_id" v-model="user.role_id" >
              <option :value="user.role_id">{{user.role.name}}</option>
              <option value="1" v>管理者</option>
              <option value="2">店長</option>
              <option value="3">従業員</option>
              </select>
            </td>
            <td><button v-if="user.id != 1" @click="updateUser(user.id, user.name, user.role_id)">更新</button>
            </td>
          <td><button v-if="user.id != 1" @click="userDelete(user.id)">削除</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      searchName: '',
      searchRole: '',
      name: '',
      newRoleId: '',
      password: '',
    };
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/management_login");
      } catch (error) {
        console.log(error);
      }
    },
    async getContent() {
      const resData = await this.$axios.request({
  			method: 'get',
  			url: '/api/user/'
			});
      this.users = resData.data.user;
      console.log(resData);
      console.log("レスデータ");
      console.log(this.users);
      console.log('コンテンツ');
    },
    async userDelete(id) {
				await this.$axios.request({
  				method: 'delete',
  				url: '/api/user/{user}',
  				data: {id: id},
				});
      this.getContent();
    	},
      async updateUser(id, name, role_id) {
      const sendData = {
        name: name,
        role_id: role_id,
      };
      console.log(sendData);
      console.log('センドデータ')
      await this.$axios.put(
        "/api/user/" + id,
        sendData
      );
      this.getContent();
    },
    async register() {
      try {
        await this.$axios.post("https://vast-sea-00508.com/api/auth/register", {
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
  created(){
    this.getContent();

  },
};
</script>
<style scoped>
.management{
  background-color: rgb(238, 237, 237);
  min-height:100vh;
}
.management-ttl{
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
  padding-top: 50px;
}
.user-info{
  display: flex;
  width: 100%;
}
.user-name, .user-email{
  margin: 5px 10px;
}
.user-search{
  display: flex;
  height: 100px;
  border-bottom: solid 1px #000;

}
.search{
  margin: 0 auto;
}
.search input {
  outline: none;
}
.search-name{
  margin-left: 30%;
}
.search-email{
  margin-right: 30%;
}
th ,td{
  padding: 10px 70px;
  text-align: center;
}
table{
  margin: 0 auto;
}
.user-add{
  text-align: center;
  margin-bottom: 30px;
}
</style>
