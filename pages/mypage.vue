<template>
  <div class="mypage" >
    <Header></Header>
    <div class="contents" v-if="$auth.user">
      <div class="reserve-info">
        <h2>{{$auth.user.name}}さん</h2>
        <h3>予約状況</h3>
        <div v-if="this.status == true">
          <div class="reserve-detail" v-for="(item, index) in contents" :key='index'>
            <div class="reserve-ttl">
              <img src="~/assets/clock.png">
              <p>予約{{index - 1}}</p>
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
                  <td>{{item.date | format-date}}</td>
                </tr>
                <tr>
                  <th>Time</th>
                  <td>{{item.time | omittedText}}</td>
                </tr>
                <tr>
                  <th>Number</th>
                  <td>{{item.number}}人</td>
                </tr>
              </table>

            </div>
          </div>
        </div>
        <div v-else>
          <p class="no-reserve">予約なし</p>
        </div>
      </div>
      <div class="like-info">
        <div class="like-user">
          <h2>{{$auth.user.name}}さん</h2>
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
                  <NuxtLink :to="{ name: 'detail-id', params:{id: content.id}}" class="btn" >詳しくみる</NuxtLink>
                  <img src="~/assets/heart.png" @click.prevent="unlike(content.shop.id)"  class="unlike-img">
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="comment">
      <ul>
        <li>
          <p>ログインして下さい</p>
        </li>
        <li>
          <NuxtLink to="/login" class="login">Login</NuxtLink>
          <NuxtLink to="/register" class="login">Registration</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      user_id: this.$auth.user.id,
      contents: [],
      status: false,
      likeStatus: [],
    }
  },
  methods:{
    async getContent() {
      const resData = await this.$axios.request({
  			method: 'get',
  			url: 'http://127.0.0.1:8000/api/v1/reserve/' + this.user_id,
  			params: {id: this.user_id},
			});
      if(resData.data.data.length !== 0){
        this.status = true
      }
      this.contents = resData.data.data;
      this.time = resData.data.data.time
      console.log(resData);
      console.log("レスデータ");
      console.log(this.contents);
      console.log('コンテンツ');
      console.log(this.time)
    },
    async deleteReserve(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/v1/reserve/" + id);
      this.getContent();
      this.$router.push('/mypage');
    },
    async like_check(){
      const resLikeInfo = await this.$axios.request({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/v1/like/' + this.$auth.user.id,
        params: {user_id: this.$auth.user.id},
			});
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
  				url: 'http://127.0.0.1:8000/api/v1/like/{like}',
  				data: {user_id: this.$auth.user.id,  shop_id: id},
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
    this.getContent();
    this.like_check();

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
  border-radius: 10px;
  height: 300px;
  margin-bottom: 30px;
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
}
</style>