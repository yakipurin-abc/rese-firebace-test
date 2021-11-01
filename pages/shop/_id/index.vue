<template>
  <div class="shop-detail">
    <ManagementHeader></ManagementHeader>
    <h2 v-for="name in shopName" :key="name.id" class="shop-ttl">
      {{name.name}}
    </h2>
    <div class="reserve-list">
      <div  v-if="contents.length != 0">
        <p class="ttl">《予約一覧》</p>
        <table>
          <tr>
            <th>ユーザー名</th>
            <th>日付</th>
            <th>時間</th>
            <th>人数</th>
            <th>更新</th>
            <th>削除</th>
          </tr>
          <tr v-for="reserve in contents" :key="reserve.id">
            <td>
              <p>{{reserve.name}}</p>
            </td>
            <td>
              <input type="date" name="date" id="date" v-model="reserve.date">
            </td>
            <td>
              <select name="time" v-model="reserve.time" required>
                <option :value="reserve.time" selected >{{reserve.time | omittedText}}</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
              </select>
            </td>
            <td>
              <select name="number" v-model="reserve.number">
                <option :value="reserve.number">{{reserve.number}}人</option>
                <option v-for="(n, nIndex) in 10" v-bind:key="nIndex" v-bind:value="n">{{ n }}人</option>
              </select>
            </td>
            <td>
              <button @click="updateReserve(reserve.id, reserve.shop_id, reserve.user_id, reserve.date, reserve.time, reserve.number)">更新</button>
            </td>
            <td>
              <button @click="deleteReserve(reserve.id)">削除</button>
            </td>
          </tr>
        </table>
      </div>
      <div v-else　class='no-reserve'>
        <p>現在予約はありません</p>
      </div>
    </div>
    <div class="shop-update" v-if="$auth.user.role_id !='3'">
      <p class="ttl">《店舗詳細》</p>
      <div v-for="shop in shopName" :key="shop.id">
        <table>
          <tr>
            <th>店舗名</th>
            <th>地域</th>
            <th>ジャンル</th>
            <th>詳細</th>
            <th>イメージ画像URL</th>
            <th>更新</th>
          </tr>
          <tr>
            <td class="shop-name">
              <input type="text" v-model="shop.name" >
            </td>
            <td>
              <select name="area" id="area" v-model="shop.area_id" >
                <option :value="shop.area_id">{{shop.area.name}}</option>
                <option value="13">東京都</option>
                <option value="27">大阪府</option>
                <option value="40">福岡県</option>
              </select>
            </td>
            <td>
              <select name="genre_id" id="genre_id" v-model="shop.genre_id">
                <option :value="shop.genre_id">{{shop.genre.name}}</option>
                <option value="1">寿司</option>
                <option value="2">焼肉</option>
                <option value="3">居酒屋</option>
                <option value="4">イタリアン</option>
                <option value="5">ラーメン</option>
              </select>
            </td>
            <td>
              <textarea name="" id="" cols="30" rows="10" v-model="shop.detail"></textarea>
            </td>
            <td class="shop-image">
              <input type="text" v-model="shop.image">
            </td>
            <td ><button  @click="updateShop(shop.id, shop.name, shop.area_id, shop.genre_id, shop.detail, shop.image)">更新</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return{
      paramsId: this.$route.params.id || '',
      contents: [],
      shopName: [],

    }
  },
  methods: {
    async getShopName(){
      const resShopName = await axios.request({
        method: 'get',
  			url: 'https://vast-sea-00508.herokuapp.com/api/v1/shop/' + this.paramsId,
  			params: {id: this.paramsId},
      })
      this.shopName = resShopName.data.data;
      console.log(resShopName)
      console.log(this.shopName);
      console.log('ショップネーム');
    },
    
    async getContent() {
      console.log(this.paramsId)
      console.log('パラムス')
      const contents = await axios.get("/api/reserve/" + this.paramsId);
      this.contents = contents.data.data;
      console.log(contents);
      console.log("レスデータ");
      console.log(this.contents);
      console.log('コンテンツ');
    },
    async deleteReserve(id) {
      await this.$axios.delete("https://vast-sea-00508.herokuapp.com/api/v1/reserve/" + id);
      this.getContent();
    },
    async updateReserve(id, shop_id, user_id, date, time, number) {
      const sendData = {
        shop_id: shop_id,
        user_id: user_id,
        date: date,
        time: time,
        number: number,
      };
      console.log(sendData);
      console.log('センドデータ')
      await this.$axios.put(
        "/api/reserve/" + id,
        sendData
      );
      this.getContent();
    },
    async updateShop(id, name, area_id, genre_id, detail, image) {
      const sendData = {
        name: name,
        area_id: area_id,
        genre_id: genre_id,
        detail: detail,
        image: image,
      };
      console.log(sendData);
      console.log('センドデータ')
       await this.$axios.put(
        "/api/shop/" + id,
        sendData
      );
      this.getContent();
    },
  },
  filters: {
    omittedText(time) {
    return time.length > 5 ? time.slice(0, 5) : time;
    },
  },
  created(){
    this.getContent();
    this.getShopName();
  },
}
</script>
<style scoped>
.shop-detail{
  background-color: rgb(238, 237, 237);
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
}

.shop-ttl{
  text-align: center;
  font-size: 30px;
}
table{
  margin: 0 auto;
}
th, td{
  padding: 10px 15px;
}
.no-reserve{
  text-align: center;
  margin: 30px;
}
.shop-name input{
  width: 100px;
}
.shop-image input{
  width: 300px;
}
.reserve-list{
  
  margin: 30px 0;
  padding-bottom: 30px;
}
.reserve-list input, select, textarea{
  outline: none;
  resize: none;
}
.shop-update{
  border-bottom: solid 1px #000;
  border-top: solid 1px #000;
  padding-top: 30px;
  margin: 30px 0;
  padding-bottom: 30px;
}
.ttl{
  font-size: 20px;
  margin-left: 10%;
}
</style>