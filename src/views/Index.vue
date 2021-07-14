<template>
  <el-container>
    <el-header height="100px">
      <div id="header">
        <el-image
            class="header_img"
            :src="'/src/assets/header.png'"
        ></el-image>
        <div class="more">
          <el-link>{{ $store.state.userInfo.nickname }}</el-link>
          <text style="font-size: 16px;color: white">,你好,</text>
          <el-link @click="signout">注销</el-link>
        </div>
      </div>
    </el-header>
    <el-main>
      <div id="sidebar">
        <el-menu
            mode="vertical"
            :router="true"
            :default-active="$route.fullPath==='/index'?'/index/map':$route.fullPath"
            :collapse="true"
        >
          <el-menu-item index="/index/map">
            <i class="el-icon-location"></i>

            <template #title>
              <span>分享地图</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/index/info">
            <i class="el-icon-user-solid"></i>
            <template #title>
              <span>个人信息</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/index/about">
            <i class="el-icon-info"></i>
            <template #title>
              <span>关于</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "Index",
  methods: {
    logout() {
      this.logout()
      this.$router.replace("/login")
    },
    ...mapMutations({
      clearLogin: "logout"
    })
  }
}
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
}

.more {
  align-self: flex-end;
}

.el-container {
  background: #42b983;
  height: 100%;
}

.el-header {
  background: white;
  box-shadow: 0 5px 1px 5px black;
}

.header_img {
  margin-top: 20px;
}

#sidebar {
  background: #e6a23c;
  height: 100%;
}

#sidebar .el-menu {
  height: 100%;
}

.el-main {
  background: #d94b84;
  padding: 0;
  display: flex;
  flex-grow: 1;
}

.el-footer {
  background: #303133;
}


</style>