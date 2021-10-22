<template>
  <div class="detail">
    <Header></Header>
    <div v-for="content in contents" :key="content.id" class="contents">
      <div class="shop-detail">
        <div class="contents-name">
          <NuxtLink  to="/" class="back-home" >＜</NuxtLink>
          <h2>{{content.name}}</h2>
        </div>
        <img :src="content.image" >
        <div class="tag">
          <p>#{{content.area.name}}</p>
          <p>#{{content.genre.name}}</p>
        </div>
        <p class="comment">{{content.detail}}</p>
      </div>
      <div>
      </div>
      <div class="reserve">
        <div class="reserve-contents">
          <ul>
          <li class="reserve-ttl">
            <h2>予約</h2>
          </li>
          <li class="reserve-date">
            <label for="date">Date</label>
            <datepicker id="date" class="datepicker" :format="DatePickerFormat" :language="ja" v-model="date" @closed='pickerClosedChange'
            :disabled-dates="disabledDates"/>
          </li>
          <li class="reserve-time select">
            <label for="">Time</label>
            <select name="time" v-model="time" required>
              <option disabled selected >時間を選んでください</option>
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
          </li>
          <li class="reserve-number select">
            <label for="">Number</label>
            <select name="number" v-model="number">
              <option v-for="(n, nIndex) in 10" v-bind:key="nIndex" v-bind:value="n">{{ n }}人</option>
            </select>
          </li>
        </ul>
        <div class="reserve-data">
          <table>
            <tr>
              <th>Shop</th>
              <td>{{content.name}}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{{date}}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{{time}}</td>
            </tr>
            <tr>
              <th>Number</th>
              <td>{{number}}人</td>
            </tr>
          </table>
        </div>
        </div>
        <div class="reserve-btn">
          <button @click="reserve">予約する</button>
        </div>
      </div>
    </div>
    <Comments></Comments>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";
import {ja} from 'vuejs-datepicker/dist/locale';
import moment from 'moment';
import firebase from "~/plugins/firebase";
import axios from "axios";
export default {

  components: {
    Datepicker,
  },
  data(){
    return{
      paramsId: this.$route.params.id || '',
      contents: [],
      date: '',
      time: '',
      number: '',
      user: '',
			email: '',
      user_id: '',
      DatePickerFormat: 'yyyy/MM/dd',
      ja:ja,
      disabledDates: {
      to: new Date(),
      },
    }
  },
  methods:{
    pickerClosedChange() {
    　if (this.date) {
      　 this.date = moment(this.date).format('YYYY-MM-DD')
  　}
  },
  certification(){
			firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.email = user.email
          this.user = user.displayName
					this.user_id = user.uid
          this.getReserve();
        }
      });
		},
    async reserve() {
      try{
        const sendData = {
        	shop_id: this.paramsId,
        	name: this.user,
          user_id: this.user_id,
          date: this.date,
					time: this.time,
          number: this.number,
      	};
        console.log(sendData)
        console.log('センドデータ')
      	await this.$axios.post("http://127.0.0.1:8000/api/v1/reserve", sendData)
        this.$router.push('/done')
      } catch(error) {
        console.log(error);
        alert("正しく入力して下さい")
      }
    	},
    async getContent() {
      const resData = await this.$axios.request({
  			method: 'get',
  			url: 'http://127.0.0.1:8000/api/v1/shop/' + this.paramsId,
  			params: {id: this.paramsId},
			});
      this.contents = resData.data.data;
      console.log(resData);
      console.log("レスデータ");
      console.log(this.contents);
      console.log('コンテンツ');
    },
    async getReserve() {
      console.log(this.user_id);
      console.log('this.user_id');
      const sendData = {
        user_id: this.user_id,
        shop_id: this.paramsId
      }
      console.log(sendData);
      console.log('センドデータ');
      const resData = await this.$axios.request({
  				method: 'get',
  				url: 'http://127.0.0.1:8000/api/v1/reserve/{reserve}',
  				data: {user_id: this.user_id,  shop_id: this.paramsId},
				});
      this.reserves = resData.data.items;

      console.log(resData);
      console.log("レスデータ");
      console.log(this.reserves);
      console.log('リザーブ');
    },
  },
  created() {
    this.getContent();
    this.certification();
    
  },
}
</script>
<style scoped>
.datepicker {
  color: black;
  outline: none;
  margin-bottom: 10px;

}
.reserve-date input{
  width: 100%;
  
}
.detail{
  background-color: rgb(238, 237, 237);
  margin: 0 auto;
  min-height:100vh
}
.contents{
  display: flex;
  padding: 0 22%;
}
.contents-name{
  display: flex;
}
.back-home{
  text-decoration: none;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 2px 2px 4px rgb(68, 68, 68) ;
  height: 80%;
  width: 20px;
  padding-right: 5px;
  text-align: center;
  margin-right: 10px;
  margin-top: 5px;
}
.shop-detail{
  width: 100%;
  margin-left: 30px;
  margin-top: 30px;
  font-weight: 550;
}
.tag{
  display: flex;
}
.tag p {
  margin-right: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.reserve{
  width: 100%;
}
.reserve-contents{
  width: 100%;
  height: 90%;
  margin-left: 3%;
  margin-top: 3%;
  background-color: rgb(49, 114, 255);
  color: #fff;
  border-radius: 10px 10px 0 0;
  padding: 40px 40px;
}
.reserve-date input{
  outline: none;
  border-radius: 5px;
  border: solid 1px #fff;
  margin-bottom: 10px;
}
.select select{
  width: 100%;
  border-radius: 5px;
  outline: none;
  border: solid 1px #fff;
  margin-bottom: 10px;
}
ul{
  padding-left: 0;
}
th{
  float: left;
}
td{
  padding-left: 5%;
  width: 100%;
}
.reserve-data{
  background-color: rgb(89, 146, 252);
  border-radius: 5px;
  padding: 15px 15px;
}
.reserve-btn button{
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 50px;
  margin-left: 3%;
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
    padding: 20px;
  }
  .shop-detail{
    margin-left: 0;
  }
  .reserve-contents{
    margin-left: 0;
    padding: 0 55px;
  }
  .reserve-btn button{
    margin-left: 0;
  }
}

</style>
