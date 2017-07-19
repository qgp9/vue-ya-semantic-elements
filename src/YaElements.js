function emptyIsTrue (val) {
  return val || val === ''
}

function genMap (list) {
  if (typeof list === 'string') list = list.split(/\s+/)
  if (!Array.isArray(list) && typeof list === 'object') return Object.assign({}, list)
  if (!Array.isArray(list)) return {list: true}
  let map = {}
  list.forEach(v => { map[v] = true })
  return map
}

export const tagMap = {
  button: 'button',
  icon: 'i',
  flag: 'i'
}

const elements =
  'button container divider flag header icon image input label list loader rails reveal segment step'.split(' ')

const tags = 'div a ul li img span i'.split(' ')

let words =
    'ui primary animated labled left center right aligned justified vertical horizontal fluid inverted fitted hidden clearing button tiny mini large icon container divider'.split(' ')

export const componentGenerator = (element, name, options) => ({
  name,
  functional: true,
  render (h, {data, children}) {
    let attrs = {}
    let cls = {}
    let clsDash = {}
    let tag = tag || options.tagMap[element] || 'div'
    if (data.attrs) {
      tag = data.attrs.tag || tag
      delete data.attrs.tag
      let otherAttrs = data.attrs
      for (let key in (otherAttrs || {})) {
        let splitted = key.split('-')
        const isTrigger = options.trigger[splitted[0]]
        const isTag = options.tags[splitted[0]]
        if (splitted.length > 1 && (isTrigger || isTag)) {
          if (isTrigger) {
            splitted = splitted.slice(options.includeTrigger ? 0 : 1)
          } else {
            tag = splitted[0]
            splitted = splitted.slice(1)
          }
          splitted.forEach(k2 => {
            clsDash[k2] = emptyIsTrue(otherAttrs[key])
          })
        } else if (key.match(/^[a-z]+$/) && (options.words[key])) {
          cls[key] = emptyIsTrue(otherAttrs[key])
        } else {
          attrs[key] = otherAttrs[key]
        }
      }
      // Remove used words from attr
      Object.keys(data.attrs || {}).forEach(k => { if (!(k in attrs)) delete data.attrs[k] })
    }

    // Fill Class
    let elementClass = {[element]: options.includeElementName}
    data.class = Object.assign({}, options.baseClass, cls, clsDash, elementClass, data.class)
    return h(tag || tagMap[element] || 'div', data, children)
  }
})

export const defaultYaElementsOptions = {
  baseClass: 'ui',
  custom: {},
  elements,
  includeTrigger: false,
  includeElementName: true,
  prefix: 'ya',
  tagMap,
  tags,
  tagWord: true,
  trigger: 'ui',
  words
}

export default function YaElements (options = {}) {
  options = Object.assign({}, defaultYaElementsOptions, options)
  options.baseClass = genMap(options.baseClass)
  options.elements = genMap(options.elements)
  options.tags = genMap(options.tags)
  options.trigger = genMap(options.trigger)
  options.words = genMap(options.words)

  let components = {}
  let prefix = options.prefix ? options.prefix + '-' : ''
  for (let k in options.elements) {
    components[prefix + k] = componentGenerator(k, prefix + k, options)
  }
  for (let k in options.custom) {
    components[k] = componentGenerator(options.custom[k], k, options)
  }
  return components
}
