<template>
  <div id="container">
    <div id="form" class="basic-shadow el-zoom-in-center">
      <div id="form-header" align="center">
        <text>注册</text>
      </div>
      <el-divider></el-divider>

      <el-form ref="form" :model="registForm" :rules="rules" label-width="110px">
        <el-form-item prop="username" label="账号:" required>
          <el-input v-model="registForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码:" required>
          <el-input v-model="registForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="r_password" label="重复一次密码:" required>
          <el-input v-model="registForm.r_password" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别:" required>
          <el-radio-group v-model="registForm.gender">
            <el-radio-button :label="0">男</el-radio-button>
            <el-radio-button :label="1">女</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="birthday" label="生日:" required>
          <div id="date">
            <el-date-picker v-model="registForm.birthday" placeholder="选择日期"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item prop="email" label="邮箱:" required>
          <el-input v-model="registForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称:" required>
          <el-input v-model="registForm.nickname"></el-input>
        </el-form-item>


        <div align="right">
          <el-space>
            <router-link class="router_link" to="/login">去登录</router-link>
            <el-button type="primary" @click="regist" plain>注册</el-button>
          </el-space>

        </div>
      </el-form>
    </div>
  </div>


</template>

<script>
import axios from "axios";

export default {
  name: "Regist",
  data() {
    return {
      registForm: {
        username: "",
        password: "",
        r_password: "",
        email: "",
        nickname: "",
        gender: 0,
        birthday: ""
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min: 6, max: 20, message: "长度在6到20个字符", trigger: "blur"},
          {pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, message: "用户名为数字和字母的组合", trigger: "blur"}
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
              return this.$data.registForm.password === this.$data.registForm.r_password
            },
            message: "两次密码不匹配",
            trigger: "blur"
          }
        ],
        email: [
          {required: true, message: "请输入邮箱", trigger: "blur"},
          {type: "email", message: "邮箱格式不正确", trigger: "blur"}
        ],
        nickname: [
          {required: true, message: "请输入昵称", trigger: "blur"},
          {max: 16, meesage: "最大长度16", trigger: "blur"}
        ],
        gender: [
          {required: true, message: "请选择性别", trigger: "blur"},
        ],
        birthday: [
          {required: true, message: "请选择生日", trigger: "blur"},
        ]
      }
    }
  },
  methods: {
    regist() {
      this.$refs.form.validate(isPassed => {
        if (isPassed) {
          axios.post("/user/regist", this.registForm)
              .then(res => {
                if (res.data.status != -1) {
                  this.$message.success({
                    message: "注册成功,3秒后跳转到登录界面"
                  })
                  setTimeout(() => {
                    this.$router.push("/login")
                  }, 3000)
                } else {
                  this.$message.error({
                    message: res.data.msg
                  })
                }
              })
        }
      })
    }
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("./../assets/background1.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

#form {
  position: relative;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  width: 40vw;
  max-width: 500px;
  min-width: 220px;
  padding: 20px 50px;
  background: white;
  border-radius: 4px;
}

#form-header {
  font-size: 20px;
  margin-bottom: 20px;
}

#date {
  width: 100%;
}
</style>