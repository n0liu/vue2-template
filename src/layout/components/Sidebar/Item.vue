<script>
import home from '@/assets/images/sy.png'
import tj from '@/assets/images/tj.png'
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      // vnodes.push(<svg-icon icon-class={icon}/>)
      vnodes.push(<img src={process.env.VUE_APP_BASE_API + '/file/resource/' + icon} width="20px"style="margin: 0 10px" />)
    }

    if (title === '首页') {
      vnodes.push(<img src={home} width="20px" style="margin: 0 10px" />)
    }

    if (title === '数据统计') {
      vnodes.push(<img src={tj} width="20px" style="margin: 0 10px" />)
    }

    if (title) {
      vnodes.push(<span slot='title' style={!icon && title !== '首页' && title !== '数据统计' ? 'margin-left: 30px' : ''}>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
