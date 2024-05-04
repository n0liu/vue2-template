import store from '@/store'

export const permission = {
  inserted (el, binding, vnode) {
    const { value } = binding
    // console.log(value) // [user:add]
    const roles = store.getters && store.getters.roles
    // console.log(roles)
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      // some -> 有真为真
      // 当前roles 中是否包含 value 中的值
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    }
  }
}
