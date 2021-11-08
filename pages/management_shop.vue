<template>
  <div class="management">
    <div>
      <div class="header">
        <ManagementHeader></ManagementHeader>
        <p>ログイン中のユーザー：{{$auth.user.name}}</p>
        <p v-if="$auth.user.role_id==1">管理者</p>
        <p v-else-if="$auth.user.role_id==2">店長</p>
        <p v-else>従業員</p>
      </div>
      <div class="management-ttl">
        <h2>店舗管理画面</h2>
      </div>
      <div class="add-search">
        <div class="shop-search">
          <div class="ttl"><p>検索</p></div>
          <div class="search-name search">
            <label >店舗名：</label><input type="text" v-model="searchName" >
          </div>
          <div class="search-area search">
            <label>エリア名:</label>
            <select name="area" id="area" v-model="searchArea" >
            <option value="">全エリア</option>
            <option value="東京都">東京都</option>
            <option value="大阪府">大阪府</option>
            <option value="福岡県">福岡県</option>
          </select>
          </div>
          <div class="search-genre search">
            <label>ジャンル名:</label>
            <select name="genre" id="genre" v-model="searchGenre">
            <option value="">全ジャンル</option>
            <option value="寿司">寿司</option>
            <option value="焼肉">焼肉</option>
            <option value="居酒屋">居酒屋</option>
            <option value="イタリアン">イタリアン</option>
            <option value="ラーメン">ラーメン</option>
          </select>
          </div>
        </div>
        <validation-observer ref="obs" v-slot="ObserverProps">
        <div class="shop-add" v-if="$auth.user.role_id !='3'">
          <div class="ttl"><p>追加</p></div>
          <div class="search">
            <label>店舗名:</label>
            <validation-provider v-slot="ProviderProps" rules="required|max:10">
              <input type="text" name="name" id="name" v-model="newName" placeholder="名前10文字以内">
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="search">
            <label>エリア名：</label>
            <validation-provider v-slot="ProviderProps" rules="oneOf:13,27,40">
              <select name="area_id" id="area_id" v-model="newAreaId">
                <option value="" selected="selected">地域を選んでください</option>
                <option value="13">東京都</option>
                <option value="27">大阪府</option>
                <option value="40">福岡県</option>
              </select>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="search">
            <label>ジャンル名：</label>
            <validation-provider v-slot="ProviderProps" rules="oneOf:1,2,3,4,5">
              <select name="genre_id" id="genre_id" v-model="newGenreId">
                <option value="" selected="selected">ジャンルを選んでください</option>
                <option value="1">寿司</option>
                <option value="2">焼肉</option>
                <option value="3">居酒屋</option>
                <option value="4">イタリアン</option>
                <option value="5">ラーメン</option>
              </select>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="search">
            <validation-provider v-slot="ProviderProps" rules="required|max:100">
              <label>詳細：</label>
              <textarea name="detail" id="detail" cols="30" rows="5" v-model="newDetail" placeholder="概要を100字以内で記入してください"></textarea>
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="search">
            <validation-provider v-slot="ProviderProps" rules="required">
              <label for="image">イメージURL:</label>
              <input type="text" name="image" id="image" v-model="newImage" placeholder="画像URLを記入してください">
              <div class="error">{{ ProviderProps.errors[0] }}</div>
            </validation-provider>
          </div>
          <button @click="shopAdd" :disabled="ObserverProps.invalid || !ObserverProps.validated" class="btn">登録</button>
        </div>
        </validation-observer>
      </div>
    </div>
    <div class="shop-info" >
      <table>
        <tr>
          <th>店舗名</th>
          <th>エリア</th>
          <th>ジャンル</th>
          <th>詳細</th>
          <th>店舗詳細</th>
          <th v-if="$auth.user.role_id !='3'">削除</th>
        </tr>
        <tr v-for="shop in filterdShops" :key="shop.id">
          <td class="shop-name">{{shop.name}}</td>
          <td class="shop-area">{{shop.area.name}}</td>
          <td class="shop-genre">{{shop.genre.name}}</td>
          <td class="shop-detail">{{shop.detail}}</td>
          <td><NuxtLink :to="{ name: 'shop-id', params:{id: shop.id}}" class="btn" >店舗詳細へ</NuxtLink></td>
          <td v-if="$auth.user.role_id !='3'"><button @click="openModal(shop)" type="submit" class="btn" >削除</button>
          <modalShop :val="postItem" v-if="showModal" @close="closeModal"></modalShop>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import modalShop from '~/components/modal_shop.vue'
import axios from "axios";
export default {
  middleware: 'authenticator',
  components: {
    modalShop,
  },
  data() {
    return {
      showModal: false,
      postItem: '',
      shops: [],
      searchName: '',
      searchArea: '',
      searchGenre: '',
      newName: '',
      newAreaId: '',
      newGenreId: '',
      newDetail: '',
      newImage: '',
    };
  },
  methods: {
    openModal(shop) {
      this.postItem = shop;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async getUserInfo(){
      if(user){
        console.log(user);
        console.log("user");
      }
    },
    async getContent() {
      const resData = await axios.get("https://vast-sea-00508.herokuapp.com/api/v1/shop")
      this.shops = resData.data.data;
      console.log(resData);
      console.log("レスデータ");
      console.log(this.shops);
      console.log('コンテンツ');
    },
    async shopAdd(){
      try {
        const sendShopData = {
          name: this.newName,
          area_id: this.newAreaId,
          genre_id: this.newGenreId,
          detail: this.newDetail,
          image: this.newImage,
        }
        console.log(sendShopData);
        console.log("センドデータ");
        await this.$axios.post("https://vast-sea-00508.herokuapp.com/api/v1/shop", sendShopData);
        location.reload()
      } catch{
        alert("正しく入力して下さい");
      }
    },
  },
  created(){
    this.getContent();

  },
  computed: {
    filterdShops: function(){
      const shops = [];
      for(const i in this.shops) {
        const shop = this.shops[i];
        if(shop.name.indexOf(this.searchName) !== -1 && shop.area.name.indexOf(this.searchArea) !== -1 && shop.genre.name.indexOf(this.searchGenre) !== -1) {
          shops.push(shop);
        }
      }
      return shops;
    }
  }
};
</script>
<style scoped>
.header p{
  margin-left: 30px;
  margin-top: 10px;
}
.management{
  background-color: rgb(238, 237, 237);
  min-height:100vh;
}
.management-ttl{
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
}
.add-search{
  border-bottom: solid 1px #000;
}
.shop-info{
  display: flex;
  width: 100%;
}
.shop-name, .user-email{
  margin: 5px 10px;
}
.shop-search{
  display: flex;
  height: 100px;
}
.shop-add{
  display: flex;
  margin-bottom: 50px;
  width: 100%;
}
.search{
  margin: 0 auto;
}
.ttl{
  margin-left: 50px;
}
.search input ,textarea{
  outline: none;
  resize: none;
  vertical-align:top;
}

th ,td{
  width: 300px;
  text-align: center;
  padding: 10px 0;
}
table{
  margin: 0 auto;
}
.btn{
  width: 100px;
  height: 50px;
}
.management input, textarea, select{
  outline: none;
}
</style>
