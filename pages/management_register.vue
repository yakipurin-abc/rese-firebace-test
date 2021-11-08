<template>
<div class="register">
  <Header></Header>
  <div class="card">
    <div class="ttl">
      <h2>管理者新規登録</h2>
    </div>
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
</div>
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
        await this.$axios.post("https://vast-sea-00508.herokuapp.com/api/auth/register", sendData);
        this.$router.push("/management_login");
      } catch {
        alert("その名前はすでに登録されています");
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
label{
  color: black;
}
select{
  width: 100%;
  border: none;
  border-bottom:2px solid #000;
  outline: none;
}
</style>