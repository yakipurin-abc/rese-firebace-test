<template>
  <div class="management">
    <div class="header">
      <ManagementHeader></ManagementHeader>
      <p>ログイン中のユーザー：{{$auth.user.name}}</p>
      <p v-if="$auth.user.role_id==1">管理者</p>
      <p v-else-if="$auth.user.role_id==2">店長</p>
      <p v-else>従業員</p>
    </div>
    <div class="management-ttl">
      <h2>ユーザー管理画面</h2>
    </div>
    <div v-if="$auth.loggedIn">
      <div class="user-add" >
        <validation-observer ref="obs" v-slot="ObserverProps">
    <form @submit.prevent="register">
      <ul>
        <li>
          <validation-provider v-slot="ProviderProps" rules="required">
            <input type="text" v-model="name" class="regi-form" placeholder="名前"  />
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
        </li>
        <li>
          <validation-provider v-slot="ProviderProps" rules="oneOf:1,2,3">
            <select name="role_id" id="role_id" v-model="newRoleId">
              <option value="" selected="selected">ロールを選んでください</option>
              <option value="1" >管理者</option>
              <option value="2">店長</option>
              <option value="3">従業員</option>
            </select>
            <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
        </li>
        <li>
          <validation-provider v-slot="ProviderProps" rules="required">
          <input type="password" v-model="password" placeholder="パスワード"  class="regi-form"/>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
          </validation-provider>
        </li>
      </ul>
      <button type="submit" class="btn" :disabled="ObserverProps.invalid || !ObserverProps.validated">登録</button>
    </form>
    </validation-observer>
      </div>
      <div class="user-info" >
        <table>
          <tr>
            <th>名前</th>
            <th>ロール</th>
            <th v-if="$auth.user.role_id !='3'">更新</th>
            <th v-if=" $auth.user.role_id !='3'">削除</th>
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
              <td><button v-if="user.id!=5 && $auth.user.role_id != 3" @click="updateUser(user.id, user.name, user.role_id)">更新</button>
              </td>
            <td><button v-if="user.id!=5 && $auth.user.role_id != 3" @click="openModal(user)">削除</button>
            <modalUser :val="postItem" v-if="showModal" @close="closeModal"></modalUser></td>
          </tr>
        </table>
      </div>
    </div>
    <div v-else　class="login-comment">
      <h2>ログインしてください</h2>
    </div>
    
  </div>
</template>
<script>
import modalUser from '~/components/modal_user.vue'
export default {
  middleware: 'authenticator',
  components: {
    modalUser,
  },
  data() {
    return {
      showModal: false,
      postItem: '',
      users: [],
      searchName: '',
      searchRole: '',
      name: '',
      newRoleId: '',
      password: '',
    };
  },
  methods: {
    openModal(user) {
      this.postItem = user;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/management_login");
      } catch (error) {
        console.log(error);
      }
    },
    async getContent() {
      const resData = await this.$axios.get("https://vast-sea-00508.herokuapp.com/api/v1/user")
      this.users = resData.data.user;
      console.log(resData);
      console.log("レスデータ");
      console.log(this.users);
      console.log('ユーザーズ');
    },
      async updateUser(id, name, role_id) {
      const sendData = {
        name: name,
        role_id: role_id,
      };
      console.log(sendData);
      console.log('センドデータ')
      await this.$axios.put(
        "https://vast-sea-00508.herokuapp.com/api/v1/user/" + id,
        sendData
      );
      this.getContent();
    },
    async register() {
      try {
        const sendData ={
          name: this.name,
          role_id: this.newRoleId,
          password: this.password,
        }
        console.log(sendData);
        console.log('センドデータ')
        await this.$axios.post("https://vast-sea-00508.herokuapp.com/api/auth/register", sendData);
        location.reload()
      } catch {
        alert("その名前はすでに登録されている、または入力事項が条件に合っていません。");
      }
    },
  },
  created(){
    this.getContent();

  },
};
</script>
<style scoped>
.header p{
  margin-left: 30px;
  margin-top: 10px;
}
.login-comment{
  text-align: center;
  margin-top:100px;
}
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
