<template>
<div class="evaluation" id="app">
  <div v-for="item in items" :key="item.id" class="user-eva">
    <div class="eva-name">
      <h2>{{item.name}}</h2>
      <img src="~/assets/ゴミ箱のアイコン.png" @click="deleteComment(item.id)">
    </div>
    <p>評価：{{item.rate}}</p>
    <p>コメント：{{item.comment}}</p>
  </div>
  <div >
    <div class="post-eva" v-for="(comItem,index) in limitCount" :key="index">
      <div v-if="(nowdate+nowtime)>(comItem.date+comItem.time)">
        <div class="rating">
          <h3>[評価]</h3>
          <star-rating v-model="rate" v-bind:increment="0.5" class="ster"></star-rating>
        </div>
      <div class="comment">
        <h3>[コメント]</h3>
        <textarea name="comment" id="" cols="60" rows="8" v-model="comment"></textarea>
      </div>
        <button @click="send">投稿</button>
      </div>
    </div>
  </div>
</div>

</template>
<script>
import firebase from "~/plugins/firebase";
import axios from "axios";
import StarRating from 'vue-star-rating'
import moment from "moment";
export default {
  data () {
    return {
      paramsId: this.$route.params.id || '',
      comment: '',
      rate: 3,
      email: '',
      user: '',
      user_id: '',
      items: [],
      reserves: [],
      nowdate: '',
      nowtime: '',
      checks: [],
    }
  },
  
  methods:{
    date(){
      console.log(moment(new Date()))
    },
    async send(){
      const sendData = {
        rate: this.rate,
        comment: this.comment,
        name: this.user,
        shop_id: this.paramsId,
        user_id: this.user_id,
      };
      if(this.checks.length == 0){
        try{
          console.log(this.user)
        await axios.post("https://vast-sea-00508.herokuapp.com/api/v1/evaluation/", sendData);
        this.getEvaluation();
        this.$router.push('/')
        } catch{
          alert('正しく入力してください')
        }
      } else{
        alert('過去に投稿しています。')
      }
    },
    async getEvaluation(){
      console.log(this.paramsId);
      console.log('パラムスアイディー')
      const sendData={
        shop_id: this.paramsId,
        user_id: this.user_id
      }
      const evaluation = await axios.get("https://vast-sea-00508.herokuapp.com/api/v1/evaluation/" + this.paramsId)
      this.items = evaluation.data.data;
      console.log(evaluation);
      console.log('evaluation')
      console.log(this.items);
      console.log('items')
    },
    async deleteComment(id) {
      await this.$axios.delete("https://vast-sea-00508.herokuapp.com/api/v1/evaluation/" + id);
      this.getEvaluation();
    },
    certification(){
			firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.email = user.email
          this.user = user.displayName
					this.user_id = user.uid
          this.getReserve();
          this.checkComment()
        }
      });
		},
    //個人の予約データをここで取得
    async getReserve() {
      const resData = await axios.get("https://vast-sea-00508.herokuapp.com/api/v1/reserve/" + this.paramsId + '/' + this.user_id );
      this.reserves = resData.data.data;
      this.nowdate = resData.data.date;
      this.nowtime = resData.data.time
      console.log(resData);
      console.log("レスデータ");
      console.log(this.reserves);
      console.log('リザーブ');
    },
    //過去にコメントしたことがあるかを取得する
    async checkComment() {
      const resData = await axios.get("https://vast-sea-00508.herokuapp.com/api/v1/evaluation/" + this.paramsId + '/' + this.user_id);
      this.checks = resData.data.data
      console.log(resData);
      console.log("レスデータ");
      console.log(this.checks);
      console.log('チェック');
    },
  },
  created(){
      this.date();
      this.getEvaluation();
      this.certification()
      this.getReserve();

  },
  filters: {
      moment: function (date) {
          return moment(date).format('YYYY/MM/DD HH:mm');
      }
  },
  //v-forの繰り返し制限を1にする
  computed: {
　　　limitCount() {
　　　　return this.reserves.slice(0,1)
　　　}
  },
  components: {
    StarRating
  }
}
</script>
<style>
.eva-name{
  display: flex;
}
.eva-name img{
  width: 24px;
  height: 24px;
  margin-left: 10px;
  margin-top: 5px;
}
.user-eva{
  border-top: solid 1px #999;
  padding: 20px;
}
.evaluation{
  margin: 0 auto;
  margin-top: 30px;

  width: 80%;
}
.post-eva{
  text-align: center;
}
.ster{
  display: flex;
  justify-content: center;
}
.comment textarea{
  width: 100%;
  resize: none;
  border: solid 1px #999;
  outline: none;
}
.rating{
  margin-top: 30px;
  border-top: solid 1px #999;
  padding-top: 10px;
}
@media screen and (max-width: 768px) {
  .user-eva p{
    font-size: 14px;
  }
}
</style>