<template>
  <div class="home">
    <div class="header">
      <Header></Header>
      <div class="search">
        <select name="area" id="area" v-model="searchArea" >
          <option value="">全地域</option>
          <option value="東京都">東京都</option>
          <option value="大阪府">大阪府</option>
          <option value="福岡県">福岡県</option>
        </select>
        <p>|</p>
        <select name="genre" id="genre" v-model="searchGenre">
          <option value="">全ジャンル</option>
          <option value="寿司">寿司</option>
          <option value="焼肉">焼肉</option>
          <option value="居酒屋">居酒屋</option>
          <option value="イタリアン">イタリアン</option>
          <option value="ラーメン">ラーメン</option>
        </select>
        <p>|</p>
        <img src="~/assets/search.png" alt="">
        <input type="text" v-model="keyword" name="keyword" placeholder="search..." >
      </div>
    </div>
    <div class="res-search">
        <select name="area" id="area" v-model="searchArea" >
          <option value="">全地域</option>
          <option value="東京都">東京都</option>
          <option value="大阪府">大阪府</option>
          <option value="福岡県">福岡県</option>
        </select>
        <p>|</p>
        <select name="genre" id="genre" v-model="searchGenre">
          <option value="">全ジャンル</option>
          <option value="寿司">寿司</option>
          <option value="焼肉">焼肉</option>
          <option value="居酒屋">居酒屋</option>
          <option value="イタリアン">イタリアン</option>
          <option value="ラーメン">ラーメン</option>
        </select>
        <p>|</p>
        <img src="~/assets/search.png" alt="">
        <input type="text" v-model="keyword" name="keyword" placeholder="search..." >
      </div>

    <div class="card">
      <div class="shop" v-for="(shop,index) in filterdShops" :key="index" >
          <div class="shop-img">
            <img :src="shop.image" >
          </div>
          <div class="detail">
            <p class="shop-name">{{shop.name}}</p>
            <div class="shop-tag">
              <p>#{{shop.area.name}}</p>
              <p>#{{shop.genre.name}}</p>
            </div>
            <div class="shop-btn">
              <NuxtLink :to="{ name: 'detail-id', params:{id: shop.id}}" class="btn" >詳しくみる</NuxtLink>
              <img v-if="shop.isLike == false" src="~/assets/heart.png"  @click.prevent="like(shop.id)" class="like-img">
              <img v-else src="~/assets/heart.png" @click.prevent="unlike(shop.id)"  class="unlike-img">
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import firebase from "~/plugins/firebase";
export default {
  data(){
    return{
      keyword: '',
      likeStatus: [],
      likeShops: [],
      shops: [],
      searchArea: '',
      searchGenre: '',
      user: '',
			email: '',
      user_id: '',
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
        } else {
          this.$router.push("/login");
        }
      });
		},
    async detail(shop){
        this.$router.push({path: '/detail/'+ shop.id});
      },
    async like_check(){
      console.log(this.user_id);
      const resLikeInfo = await axios.get(
        `https://vast-sea-00508.herokuapp.com/api/v1/like?user_id=${this.user_id}`
        );
			console.log(resLikeInfo);
			console.log('ライクインフォ');
			this.likeStatus = resLikeInfo.data.data
      this.likeShops = resLikeInfo.data.shop
			console.log(this.likeStatus);
			console.log("ライクステータス");
			console.log(this.like)
			console.log("ライク");
		},
    async like(id) {
      const addLike = {
        user_id: this.user_id,
				shop_id: id,
      };
      await this.$axios.post("https://vast-sea-00508.herokuapp.com/api/v1/like", addLike);
			this.like_check();
    },
    async unlike(id) {
				await this.$axios.request({
  				method: 'delete',
  				url: 'https://vast-sea-00508.herokuapp.com/api/v1/like/{like}',
  				data: {user_id: this.user_id,  shop_id: id},
				});
				this.like_check();
    },
  },
  created() {
    this.certification();
  },
  computed: {
    filterdShops: function(){
      const likeStatus = [];
      for(const i in this.likeStatus) {
        const shop = this.likeStatus[i];
        if(shop.area.name.indexOf(this.searchArea) !== -1 && shop.genre.name.indexOf(this.searchGenre) !== -1 && shop.name.indexOf(this.keyword) !== -1) {
          likeStatus.push(shop);
        }
      }
      return likeStatus;
    }
  }
}
</script>
<style scoped>
.home{
  background-color: rgb(238, 237, 237);
  margin: 0 auto;
  min-height:100vh
}

.comment{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  text-align: center;
}
.comment p{
  margin-bottom: 20px;
}
.login{
  text-decoration: none;
  border-radius: 10px;
  background-color: rgb(49, 114, 255);
  color: #fff;
  padding: 10px 15px;
  font-size: 20px;
}
.header{
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search{
  margin-top: 40px;
  margin-right: 15%;
  background-color: #fff;
  display: flex;
  height: 40px;
  box-shadow: 2px 2px 4px #000 ;
  color: rgb(196, 196, 196);
}
.res-search{
  display: none;
}
.search img{
  width: 24px;
  height: 24px;
  margin: auto 0;
}
.search p{
  margin: auto 0;
}
.search select, input{
  border: none;
  outline: none;
}
.card{
  display: flex;
  flex-wrap: wrap;
  margin: 0 12%;
  padding-top: 100px;
}
.shop{
  width: 23%;
  height: 100%;
  margin:10px 10px;
}
.shop-tag{
  display: flex;
}
.shop-tag p{
  margin-right: 10px;
  margin-bottom: 20px;
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
@media screen and (max-width: 768px) {
  .search{
    display: none;
  }
  .res-search{
    background-color: #fff;
    display: flex;
    height: 30px;
    width: 90%;
    box-shadow: 2px 2px 4px #000 ;
    color: rgb(196, 196, 196);
    text-align: center;
    margin: 40px auto  auto;

  }
  .res-search img{
    width: 24px;
    height: 24px;
    margin: auto 0;
  }
  .res-search p{
    margin: auto 0;
  }
  .res-search select, input{
    border: none;
    outline: none;
  }
  .res-search input{
    width: 30%;
  }
  .card{
  display: flex;
  flex-wrap: wrap;
  margin: 0 12%;
  padding-top: 30px;
  }
  .shop{
  width: 100%;
  height: 100%;
  margin:10px 10px;
  }
  .btn{
    width: 70%;
  }
  .like-img{
    margin-top: auto;
  }
  .unlike-img{
    margin-top: auto;
  }
  .comment p{
    font-size: 20px;
    text-align: center;
  }
  .comment ul{
    padding: 0;
  }
  .login{
    width: 20px;
  }
}
</style>

