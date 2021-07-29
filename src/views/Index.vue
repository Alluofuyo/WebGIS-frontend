<template>
  <el-container>
    <el-header height="100px">
      <div id="header">
        <el-image
            class="header_img"
            :src="'/src/assets/header.png'"
        ></el-image>
        <div class="more">
          <el-avatar :src="'http://localhost:8080/user/getAvatar/'+$store.state.userInfo.username"></el-avatar>
          <el-link>{{ $store.state.userInfo.nickname }}</el-link>
          <el-dropdown class="drop">
            <i class="el-icon-more moreIcon"></i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push('/index/info');">个人信息</el-dropdown-item>
                <el-dropdown-item @click="changePass">修改密码</el-dropdown-item>
                <el-dropdown-item @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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

  <el-dialog
      title="提示"
      v-model="changeVisivle"
      width="30%"
      :before-close="handleClose">
    <el-form label-position="right" label-width="80px" :model="passwordInfo" :rules="rules">
      <el-form-item label="旧密码" prop="o_password">
        <el-input v-model="passwordInfo.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="passwordInfo.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码" prop="r_password">
        <el-input v-model="passwordInfo.repeatPassword"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </template>
  </el-dialog>

</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "Index",
  data() {
    return {
      changeVisivle: false,
      passwordInfo: {
        oldPassword: "",
        newPassword: "",
        repeatPassword: ""
      },
      rules: {
        o_passwprd: [
          {required: true, message: "请输入旧密码", trigger: "blur"},
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur"},
          {pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: "密码为数字和字母的组合", trigger: "blur"}

        ],
        r_password: [
          {required: true, message: "请再次输入密码", trigger: "blur"},
          {
            validator: () => {
              return this.$data.passwordInfo.repeatPassword === this.$data.passwordInfo.newPassword
            },
            message: "两次密码不匹配",
            trigger: "blur"
          }
        ],
      }
    }
  },
  methods: {
    changePass() {
      this.changeVisivle = true
    },
    logout() {
      this.clearLogin()
      let token = window.localStorage.getItem("token")
      if (token) {
        window.localStorage.removeItem("token")
      }
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

.moreIcon:hover {
  color: rgb(102, 177, 255);
  cursor: pointer;
}

.moreIcon {
  font-size: 20px;
  padding: 2px;
}

.more {
  display: flex;
  align-items: center;
  align-self: flex-end;
}

.more > *:not(.drop) {
  margin-right: 10px;
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