<template>
  <router-view v-slot="{Component,route}">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <keep-alive>
        <component
            :is="Component"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {store} from "./config/store";

export default defineComponent({
  name: 'App',
  created() {
    let token = window.localStorage.getItem("token")
    if (token) {
      store.commit("setToken", token)
      this.axios.get("/user/getUserInfo").then(res=>{
        store.commit("updateUser",res.data.data.user)
        this.$router.replace("/index")
      })
    }
  }
})
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
