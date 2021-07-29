<template>
  <el-row id="login-container">
    <el-col :sm="{span:18}" :span="0" id="login-left"></el-col>
    <transition name="slide">
      <el-col :sm="{span:6,offset:0}" :span="8" :offset="8" id="login-right" class="form-container">
        <el-card class="box-card">
          <template #header>
            <text><b>登录</b></text>
          </template>
          <el-form class="login-form" label-width="40px" @keypress.enter="login">
            <el-form-item>
              <template #label>
                <font-awesome-icon icon="user" size="lg"/>
              </template>
              <el-input v-model="username" type="text" placeholder="请输入账号">
              </el-input>
            </el-form-item>
            <el-form-item>
              <template #label>
                <font-awesome-icon icon="lock" size="lg"/>
              </template>
              <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <div>
            </div>
            <text>还没有账号?
              <router-link class="router_link" to="/regist">注册</router-link>
            </text>
            <el-button id="login-button" type="primary" plain @click="login">登录</el-button>
          </el-form>
        </el-card>
      </el-col>
    </transition>

  </el-row>
</template>

<script>


import {mapState, mapMutations} from "vuex"

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      if (this.username !== "" && this.password !== "") {
        this.axios.post("/user/login",
            `username=${this.username}&password=${this.password}`,
            {
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              }
            }
        ).then((res) => {
          if (res.data.status === -1) {
            this.$message.error({
              message: res.data.msg,
              duration: 1000
            })
          } else {
            window.localStorage.setItem("token", res.data.data.token)
            this.setLogin(res.data.data)
            console.log(this.$store)
            console.log(this.$router)
            this.$router.push("/index")
          }
        }).catch(err => {
          console.error(err)
        })
      }
    },
    ...mapMutations({setLogin: "login"})
  }
}
</script>

<style scoped>
#login-container {
  height: 100vh;
  background-image: url("./../assets/background1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}


@media screen and (min-width: 768px) {
  .form-container:before {
    filter: blur(20px);
  }

  .form-container {
    background: rgba(49, 46, 46, 0.6);
    padding: 10px;
  }
}


.box-card {
  margin-top: 25vh;

}


#login-button {
  float: right;
}

.login-form .el-input, .el-button {
  margin-bottom: 10px;
}

.login-form text {
  display: inline-block;
  margin-top: 15px;
  line-height: 1.5;
}


.login-form .el-button {
  margin-top: 10px;
}

</style>