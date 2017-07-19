import YaElements from './YaElements'

const plugin = YaElements

plugin.version = '__VERSION__'

plugin.install = function (Vue, options) {
  const components = YaElements(options || {})
  Object.keys(components).forEach(k => {
    Vue.component(k, components[k])
  })
}

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
