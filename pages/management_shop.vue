<template>
  <div class="management">
    <ManagementHeader></ManagementHeader>
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
          <option value="">All area</option>
          <option value="東京都">東京都</option>
          <option value="大阪府">大阪府</option>
          <option value="福岡県">福岡県</option>
        </select>
        </div>
        <div class="search-genre search">
          <label>ジャンル名:</label>
          <select name="genre" id="genre" v-model="searchGenre">
          <option value="">All genre</option>
          <option value="寿司">寿司</option>
          <option value="焼肉">焼肉</option>
          <option value="居酒屋">居酒屋</option>
          <option value="イタリアン">イタリアン</option>
          <option value="ラーメン">ラーメン</option>
        </select>
        </div>
      </div>
      <div class="shop-add" v-if="$auth.user.role_id !='3'">
        <div class="ttl"><p>店舗を追加</p></div>
        <div class="search">
          <label>店舗名:</label>
          <input type="text" name="name" id="name" v-model="newName">
        </div>
        <div class="search">
          <label>エリア名：</label>
          <select name="area_id" id="area_id" v-model="newAreaId">
            <option value="13">東京都</option>
            <option value="27">大阪府</option>
            <option value="40">福岡県</option>
          </select>
        </div>
        <div class="search">
          <label>ジャンル名：</label>
          <select name="genre_id" id="genre_id" v-model="newGenreId">
            <option value="1">寿司</option>
            <option value="2">焼肉</option>
            <option value="3">居酒屋</option>
            <option value="4">イタリアン</option>
            <option value="5">ラーメン</option>
          </select>
        </div>
        <div class="search">
          <label>詳細：</label>
          <textarea name="detail" id="detail" cols="30" rows="5" v-model="newDetail"></textarea>
        </div>
        <div class="search">
          <label for="image">イメージURL:</label>
          <input type="text" name="image" id="image" v-model="newImage">
        </div>
        <button @click="shopAdd" class="btn">登録</button>
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
          <td v-if="$auth.user.role_id !='3'"><button @click="shopDelete(shop.id)" type="submit" class="btn" >削除</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
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
    async getContent() {
      const resData = await axios.get("https://vast-sea-00508.herokuapp.com/api/v1/shop")
      this.shops = resData.data.data;
      console.log(resData);
      console.log("レスデータ");
      console.log(this.contents);
      console.log('コンテンツ');
    },
    async shopDelete(id) {
				await this.$axios.request({
  				method: 'delete',
  				url: 'https://vast-sea-00508.herokuapp.com/api/v1/shop/{shop}',
  				data: {id: id},
				});
      this.getContent();
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
        this.getContent();
      } catch{
        alert("正しく入力して下さい");
      }
    },
  },
  created(){
    this.getContent();
    this.Content();
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

.management{
  background-color: rgb(238, 237, 237);
  min-height:100vh;
  @media screen and (max-width: 480px) {
       background-color: black;
}
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
