<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container">
          <p>削除してもよろしいですか?</p>
          <button @click="$emit('close')">
            キャンセル
          </button>
          <button @click="userDelete(val.id)">削除</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      // 受け取る属性名を指定
      val: Object // オブジェクトのみ受け取る
    },
    methods:{
      async userDelete(id) {
				await this.$axios.request({
  				method: 'delete',
  				url: 'https://vast-sea-00508.herokuapp.com/api/v1/user/{user}',
  				data: {id: id},
				});
        location.reload();
    	},
    }
  }
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 70%;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    color: black;
    text-align: center;
  }
</style>