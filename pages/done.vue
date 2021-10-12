<template>
  <div class="thanks">
    <Header></Header>
    <div class="card">
      <div class="ttl">
        <h2>ご予約ありがとうございます</h2>
        <br/>
        <NuxtLink to="/" class="btn">戻る</NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style scoped>
.thanks{
  background-color: rgb(238, 237, 237);
  margin: 0 auto;
  min-height: 100vh;
}
.card{
  box-shadow: 3px 3px 3px #000;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 300px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  color: #fff;
}
.ttl{
  color: #000;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  text-align: center;
  margin-top: 30px;
}
.btn{
  background-color: rgb(49, 114, 255);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  text-decoration: none;
  display: inline-block;
  margin-top: 40px;
}
@media screen and (max-width: 768px) {
  .card{
    width: 70%;
    font-size: 10px;
    height: 30%;
  }

}
</style>
