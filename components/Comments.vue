<template>
<div class="evaluation" id="app">
  <div v-for="item in items" :key="item.id" class="user-eva">
    <h2>{{item.name}}</h2>
    <p>評価：{{item.rate}}</p>
    <p>コメント：{{item.comment}}</p>
  </div>
  <div class="post-eva">
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
      };
				console.log(this.user)
      	await axios.post("http://127.0.0.1:8000/api/v1/evaluation/", sendData);
        this.getEvaluation();
    },
    async getEvaluation(){
      console.log(this.paramsId);
      console.log('パラムスアイディー')
      const sendData={
        shop_id: this.paramsId,
        user_id: this.user_id
      }
      const evaluation = await axios.get("http://127.0.0.1:8000/api/v1/evaluation/" + this.paramsId)
      this.items = evaluation.data.data;
      console.log(evaluation);
      console.log('evaluation')
      console.log(this.items);
      console.log('items')
    },
    certification(){
			firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.email = user.email
          this.user = user.displayName
					this.user_id = user.uid
        }
      });
		},
  },
  created(){
      this.date();
      this.getEvaluation();
      this.certification()
  },
  filters: {
      moment: function (date) {
          return moment(date).format('YYYY/MM/DD HH:mm');
      }
  },
  components: {
    StarRating
  }
}
</script>
<style>
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