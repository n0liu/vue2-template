// import { login, getInfo, logout } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 登录
    Login ({ commit, dispatch }, userInfo) {
      const rememberMe = userInfo.rememberMe
      console.log(rememberMe)
      return new Promise((resolve, reject) => {
        // login(userInfo.username, userInfo.password).then(res => {
        //   setToken(res.token, rememberMe)
        //   commit('SET_TOKEN', res.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // getInfo().then(res => {
        //   setUserInfo(res, commit)
        //   resolve(res)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        // logout().then(res => {
        //   logOut(commit)
        //   resolve()
        // }).catch(error => {
        //   logOut(commit)
        //   reject(error)
        // })
      })
    }
  }
}

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  removeToken()
}

export const setUserInfo = (res, commit) => {
  console.log('res', res)
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.anData.length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT', 'un:auth'])
  } else {
    commit('SET_ROLES', [...res.anData, 'un:auth'])
  }
  commit('SET_USER', res)
}

export default user
