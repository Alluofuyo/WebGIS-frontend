<template>
  <div id="infoContainer">
    <div class="info basic-shadow">
      <el-descriptions title="用户信息" :column="2">
        <template #extra>
          <el-link @click.prevent="showUpdateDialog" type="primary">修改信息</el-link>
        </template>
        <el-descriptions-item label-align="right" class-name="list-content" label-class-name="list-label" label="用户名:">
          {{ userInfo.username }}
        </el-descriptions-item>
        <el-descriptions-item label-align="right" label="昵称:">{{ userInfo.nickname }}</el-descriptions-item>
        <el-descriptions-item label-align="right" label="邮箱:">{{ userInfo.email }}</el-descriptions-item>
        <el-descriptions-item label-align="right" label="性别:">
          {{ userInfo.gender === 0 ? "男" : "女" }}
        </el-descriptions-item>
        <el-descriptions-item label="生日:">
          {{ userInfo.birthday }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
  <el-dialog
      title="修改信息"
      v-model="isUpdate"
      width="30%"
      custom-class="dialog"
      center
      destroy-on-close
  >
    <el-form
        :model="info"
        label-width="100px"
        @keypress.enter="updateInfo"
    >
      <el-form-item label="用户名:">
        <el-input :model-value="info.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称:">
        <el-input v-model="info.nickname"></el-input>
      </el-form-item>
      <el-form-item label="性别:">
        <el-radio-group v-model="info.gender">
          <el-radio-button label="0">男</el-radio-button>
          <el-radio-button label="1">女</el-radio-button>
        </el-radio-group>

      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="info.email"></el-input>
      </el-form-item>
      <el-form-item label="生日:">
        <el-date-picker
            v-model="info.birthday"
            type="date"
            value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
      <el-button @click="isUpdate=false;" round>取 消</el-button>
      <el-button @click="updateInfo" type="primary" round>确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  data() {
    return {
      isUpdate: false,
      info: {
        id: "",
        username: "",
        nickname: "",
        email: "",
        gender: 0,
        birthday: ""
      }
    }
  },
  computed: mapState(["userInfo"]),
  methods: {
    showUpdateDialog() {
      this.isUpdate = true;
      Object.assign(this.info, this.userInfo)
    },
    updateInfo() {
      this.axios.post("/user/updateUserInfo", this.info).then(res => {
        console.log(res)
        if (res.data.status === 0) {
          this.info = res.data.data.user
          this.updateUser(this.info)
          this.$message.success("修改成功")
        } else {
          this.$message.error(res.data.data.msg)
        }
        this.isUpdate = false
      }).catch(err => {
        console.error(err)
        this.$message.error(err)
        this.isUpdate = false
      })
    },
    ...mapMutations(["updateUser"])
  },
};
</script>

<style>


.dialog-footer {
  margin-top: 20px;
  margin-left: 30px;
}

#infoContainer {
  width: 100%;
  height: 100%;
  background: rgb(247, 243, 243);
  display: flex;
}

.dialog {
  min-width: 370px;
}

.el-descriptions__label {
  font-weight: bold;
}

.info {
  margin: 50px auto;
  background: white;
  width: 50vw;
  max-width: 700px;
  padding: 50px;
}
</style>
