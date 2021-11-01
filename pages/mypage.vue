<template>
  <div class="mypage" >
    <Header></Header>
    <div class="contents">
      <div class="reserve-info">
        <h2>{{user}}さん</h2>
        <h3>予約状況</h3>
        <div v-for="(item, index) in contents" :key='index'>
          <div class="reserve-detail" >
            <div class="reserve-ttl">
              <img src="~/assets/clock.png">
              <p>予約{{index + 1}}</p>
              <img src="~/assets/cross_white.png" class="test"  @click="deleteReserve(item.id)">
            </div>
            <div class="reserve-table">
              <table>
                <tr>
                  <th>Shop</th>
                  <td>{{item.shop.name}}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td><datepicker id="date" class="datepicker" :format="DatePickerFormat" :language="ja" v-model="item.date" @closed='pickerClosedChange(item.id)'
            :disabled-dates="disabledDates"/></td>
                </tr>
                <tr>
                  <th>Time</th>
                  <td>
                    <select name="time" v-model="item.time" required>
                      <option :value="item.time">{{item.time | omittedText}}</option>
                      <option v-for="time in times" :key="time.id" :value="time.time">{{time.time}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Number</th>
                  <td>
                    <select name="number" id="number" v-model="item.number">
                      <option :value="item.number">{{item.number}}人</option>
                      <option v-for="number in numbers" :key="number.id" :value="number.number">{{number.number}}人</option>
                    </select>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="update-btn" @click="updateReserve(item.id, item.shop_id, item.user_id, item.date, item.time, item.number)">
            <button>予約更新</button>
          </div>
        </div>
      </div>
      <div class="like-info">
        <div class="like-user">
          <h2>{{user}}さん</h2>
        </div>
        <div class="like-contents">
          <h3>お気に入り店舗</h3>
          <div class="card">
            <div v-for="content in likeStatus" :key="content.id" class="like-items">
            <div  class="like-item">
              <div class="shop-img">
                <img :src="content.shop.image" >
              </div>
              <div class="detail">
                <p class="shop-name">{{content.shop.name}}</p>
                <div class="shop-tag">
                  <p>#{{content.shop.area.name}}</p>
                  <p>#{{content.shop.genre.name}}</p>
                </div>
                <div class="shop-btn">
                  <NuxtLink :to="{ name: 'detail-id', params:{id: content.shop.id}}" class="btn" >詳しくみる</NuxtLink>
                  <img src="~/assets/heart.png" @click.prevent="unlike(content.shop.id)"  class="unlike-img">
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ja} from 'vuejs-datepicker/dist/locale';
import moment from 'moment';
import Datepicker from "vuejs-datepicker";
import axios from "axios";
import firebase from "~/plugins/firebase";
export default {
  components: {
    Datepicker,
  },
  data(){
    return{
      contents: [],
      status: false,
      likeStatus: [],
      user: '',
			email: '',
      user_id: '',
      date: '',
      time: '',
      number: '',
      times:[
        {id: '1', time: '12:00'},
        {id: '2', time: '12:30'},
        {id: '3', time: '13:00'},
        {id: '4', time: '13:30'},
        {id: '5', time: '14:00'},
        {id: '6', time: '14:30'},
        {id: '7', time: '15:00'},
        {id: '8', time: '15:30'},
        {id: '9', time: '16:00'},
        {id: '10', time: '16:30'},
        {id: '11', time: '17:00'},
        {id: '12', time: '17:30'},
        {id: '13', time: '18:00'},
        {id: '14', time: '18:30'},
        {id: '15', time: '19:00'},
        {id: '16', time: '19:30'},
        {id: '17', time: '20:00'},
        {id: '18', time: '20:30'},
        {id: '19', time: '21:00'},
        {id: '20', time: '21:30'},
        {id: '21', time: '22:00'},
      ],
      numbers:[
        {id: '1', number: '1'},
        {id: '2', number: '2'},
        {id: '3', number: '3'},
        {id: '4', number: '4'},
        {id: '5', number: '5'},
        {id: '6', number: '6'},
        {id: '7', number: '7'},
        {id: '8', number: '8'},
        {id: '9', number: '9'},
        {id: '10', number: '10'},
      ],
      DatePickerFormat: 'yyyy/MM/dd',
      ja:ja,
      disabledDates: {
      to: new Date(),
      },
    }
  },
  methods:{
    certification(){
			firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.email = user.email
          this.user = user.displayName
					this.user_id = user.uid
          this.like_check();
          this.getContent();
        }
      });
		},
    pickerClosedChange(inputId) {
        const item = this.contents.find((v) => v.id === inputId);
        item.date = moment(item.date).format("YYYY-MM-DD");
    },
    async getContent() {
      console.log(this.user_id);
      console.log('this.user_id');
      const resData = await axios.get(
        `/api/reserve?user_id=${this.user_id}`
        );
      this.contents = resData.data.items;

      console.log(resData);
      console.log("レスデータ");
      console.log(this.contents);
      console.log('コンテンツ');
    },
    async updateReserve(id, shop_id, user_id, date, time, number) {
      const sendData = {
        shop_id: shop_id,
        user_id: user_id,
        date: date,
        time: time,
        number: number,
      };
      console.log(date);
      console.log(sendData);
      console.log('センドデータ')
      await this.$axios.put(
        "/api/reserve/" + id,
        sendData
      );
      this.getContent();
    },
    async deleteReserve(id) {
      await this.$axios.delete("/api/reserve/" + id);
      this.getContent();
      this.$router.push('/mypage');
    },
    async like_check(){
      console.log(this.user_id);
      console.log('ユーザーID');
      const resLikeInfo = await axios.get(
        `/api/like?user_id=${this.user_id}`
        );
			console.log(resLikeInfo);
			console.log('ライクインフォ');
			this.likeStatus = resLikeInfo.data.items
			console.log(this.likeStatus);
			console.log("ライクステータス");
			console.log(this.like)
			console.log("ライク");
		},
    async unlike(id) {
				await this.$axios.request({
  				method: 'delete',
  				url: '/api/like/{like}',
  				data: {user_id: this.user_id,  shop_id: id},
				});
				this.like_check();
    	},
      
  },
  filters: {
    omittedText(time) {
    return time.length > 5 ? time.slice(0, 5) : time;
    },
  },
  created() {

    this.certification();
  },
  
}
</script>
<style scoped>
.comment{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  text-align: center;
}
.login{
  text-decoration: none;
  border-radius: 10px;
  background-color: rgb(49, 114, 255);
  color: #fff;
  padding: 10px 15px;
  font-size: 20px;
}
.mypage{
  background-color: rgb(238, 237, 237);
  min-height:100vh;
}
.contents{
  display: flex;
  padding: 0 5%;
}
.reserve-info{
  width: 100%;
  margin-right: 15px;
  margin-top: 90px;
}
.reserve-info h2{
  display: none;
}
.like-info{
  width: 100%;
  margin-left: 15px;
}
.reserve-detail{
  background-color: rgb(49, 114, 255);
  padding: 30px;
  border-radius: 10px 10px 0 0;
  height: 300px;
  
}
.reserve-ttl{
  display: flex;
  color: #fff;
}
.reserve-ttl img{
  width: 30px;
  height: 30px;
}
table{
  color: #fff;
}
.test{
  margin-left: auto;
}
.no-reserve{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
.like-user{
  margin-left: 50px;
}
.like-contents h3{
  margin-left: 50px;
}
.like-contents{
  margin-top: 50px;
}
.card{
  display: flex;
  flex-wrap: wrap;
  margin: 0 12%;

}
.like-items{
  width: 45%;
  margin-bottom: 30px;
}
.like-item{
  width: 95%;
}
.shop-img{
  width: 100%;
}
.shop-img img{
  border-radius: 10px 10px 0 0;
}
.detail{
  padding: 20px;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
}
.shop-tag{
  display: flex;
}
.shop-tag p{
  margin-right: 10px;
  margin-bottom: 20px;
}
.btn{
  text-decoration: none;
  text-align: center;
  background-color: rgb(49, 114, 255);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding:10px 15px;
  width: 50%;
  height: 100%;
}
.shop-btn{
  display: flex;
  justify-content: space-between;
}
.shop-btn img {
  width: 15%;
  height: 15%;
}
.unlike-img{
  filter: invert(50%) sepia(85%) saturate(7000%) hue-rotate(310deg) brightness(80%) contrast(112%);
}
.datepicker{
  color: black;
}
select{
  color: black;
}
.update-btn button{
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50px;
  margin-left: 0;
  margin-bottom: 10px;
  border: none;
  background-color: rgb(32, 73, 255);
  color: #fff;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
  text-align: center;
  outline: none;
  display: inline-block;
}
@media screen and (max-width: 768px){

  .contents{
    display: block;
    
  }
  .reserve-info{
    margin-top: 30px;
  }
  .reserve-info h2{
  display: block;
}
  .no-reserve{
    height: 200px;
  }
  .like-user{
    display: none;
  }
  .like-contents h3{
    margin: 0;
  }
  .like-items{
    width: 100%;
  }
  .btn{
    width: 70%;
  }
  .shop-btn img{
    margin: auto;
  }
  .card{
    width: 100%;
    margin: 0;
  }
  .reserve-table{
    margin-top: 30px;
  }
}
</style>