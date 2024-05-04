
const context = require.context('./', true, /\.vue$/)
const requireAll = context => context.keys().map(context)

const install = Vue => {
  requireAll(context).forEach(({ default: item }) => {
    if (item.name !== 'SvgIcon') {
      // 注册组件
      Vue.component(item.name, item)
    }
  })
}

export default install
