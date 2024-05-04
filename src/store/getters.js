const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  user: state => state.user.user,
  sidebarRouters: state => state.permission.sidebarRouters,
  roles: state => state.user.roles
}
export default getters
