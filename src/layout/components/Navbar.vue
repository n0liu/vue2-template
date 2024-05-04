<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <div style="float:left;margin-right:10px;color: #333;font-weight: 500;">
        <span>欢迎: {{ user.name }}</span>
      </div>
      <template v-if="device!=='mobile'">

        <el-tooltip content="全屏缩放" effect="dark" placement="bottom">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="user.avatarName ? baseApi + '/avatar/' + user.avatarName : Avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/user/center">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link> -->
          <span style="display:block;" @click="updatePassword">
            <el-dropdown-item divided>
              修改密码
            </el-dropdown-item>
          </span>
          <span style="display:block;" @click="open">
            <el-dropdown-item divided>
              退出登录
            </el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-drawer
      title="修改密码"
      :visible.sync="dialogVisible"
      :size="500"
      append-to-body
      @close="close"
    >
      <el-row :gutter="10" class="box-card">
        <el-form ref="form" :model="form" :rules="rules" label-width="90px" @submit.native.prevent>
          <el-form-item label="原密码" prop="oldPwd">
            <el-input v-model="form.oldPwd" type="password" />
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password" />
          </el-form-item>
        </el-form>
      </el-row>
      <div class="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import Avatar from '@/assets/images/avatar.png'
// import { changePassword } from '@/api/users'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  data () {
    return {
      Avatar: Avatar,
      dialogVisible: false,
      form: {
        oldPwd: null, // 原始密码
        password: null, // 新密码
        confirmPassword: null // 确认密码
      },
      rules: {
        oldPwd: [{
          required: true,
          message: '请输入原始密码',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }],
        confirmPassword: [{
          required: true,
          message: '请确认密码',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'user',
      'baseApi'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    open () {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    },
    updatePassword () {
      this.dialogVisible = true
    },
    close () {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    handelConfirm () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        // await changePassword(this.form)
        this.$notify.success({
          title: '完成密码修改'
        })
        this.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.box-card {
  margin-bottom: 10px;
  padding-right: 20px;
  width: 100%;
  padding-left: 10px;
}
.footer {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  padding-left: 90px;
  padding-right: 20px;
  .el-button {
    width: 100%;
  }
}
</style>
