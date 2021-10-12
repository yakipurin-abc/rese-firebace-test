<template>
  <div id="app">
    <div class="menu">
      <label for="rose"><img class="menu-btn" @click="openDrawerMenu" src="~assets//menu.png"></label>
      <h2 id="rose" class="rose">Rese</h2>
    </div>
    <transition name="right">
      <div v-if="drawerFlg" class="drawer-menu-wrapper">
        <img src="~assets//cross.png" @click="closeDrawerMenu" class="cross">
        <div class="drawer-menu">
          <ul>
            <li>
              <NuxtLink  to="/" class="btn menu-list"  >Home</NuxtLink>
            </li>
            <li v-if="$auth.loggedIn">
              <p @click="logout" class="menu-list">Logout</p>
            </li>
            <li v-else>
              <NuxtLink  to="/register" class="btn menu-list"  >Registration</NuxtLink>
            </li>
            <li v-if="$auth.loggedIn && $auth.user.name != 'admin'">
              <NuxtLink to="/mypage" class="btn menu-list">Mypage</NuxtLink>
            </li>
            <li v-if="$auth.loggedIn"></li>
            <li v-else>
              <NuxtLink to="/login" class="btn menu-list">Login</NuxtLink>
            </li>
            <li v-if="$auth.loggedIn">
              <div v-if="$auth.user.name == 'admin'">
                <NuxtLink to="/management_user" class="btn menu-list">UserManagement</NuxtLink>
              </div>
            </li>
            <li v-if="$auth.loggedIn">
              <div v-if="$auth.user.name == 'admin' || $auth.user.name == 'owner'">
                <NuxtLink to="/management_shop" class="btn menu-list">ShopManagement</NuxtLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      drawerFlg: false
    };
  },
  methods: {
    openDrawerMenu() {
      this.drawerFlg = true;
    },
    closeDrawerMenu() {
      this.drawerFlg = false;
    },
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style>
.app{
  width: 40%;

}
.right-enter-active, .right-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}
.right-enter, .right-leave-to {
  transform: translateX(100vw) translateX(0px);
}

.drawer-menu-wrapper {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0 ;
  width: 100%;
  height: 100%;
  background-color: white;
}
.drawer-menu {
  padding: 24px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
}
.menu{
  display: flex;
  margin-left: 30px;
  padding-top: 30px;
}
.menu h2{
  margin-top: 10px;
  margin-left: 10px;
}
.rose{
  color: rgb(49, 114, 255);
}
.cross{
  width: 48px;
  padding-top: 30px;
  margin-left: 30px;
}
li{
  list-style: none;
  
}
.menu-list{
  color: rgb(49, 114, 255);
  text-decoration: none;
  cursor: pointer;
}
@media screen and (max-width: 768px){
  .menu{
    margin-left: 10px;
    padding-top: 30px;
  }
}
</style>