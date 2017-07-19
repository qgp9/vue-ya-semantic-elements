/*!
 * vue-ya-semantic-elements v0.0.0 
 * (c) 2017 qgp9
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueYaSemanticElements = factory());
}(this, (function () { 'use strict';

function emptyIsTrue (val) {
  return val || val === ''
}

function genMap (list) {
  if (typeof list === 'string') { list = list.split(/\s+/); }
  if (!Array.isArray(list) && typeof list === 'object') { return Object.assign({}, list) }
  if (!Array.isArray(list)) { return {list: true} }
  var map = {};
  list.forEach(function (v) { map[v] = true; });
  return map
}

var tagMap = {
  button: 'button',
  icon: 'i',
  flag: 'i'
};

var elements =
  'button container divider flag header icon image input label list loader rails reveal segment step'.split(' ');

var tags = 'div a ul li img span i'.split(' ');

var words =
    'ui primary animated labled left center right aligned justified vertical horizontal fluid inverted fitted hidden clearing button tiny mini large icon container divider'.split(' ');

var componentGenerator = function (element, name, options) { return ({
  name: name,
  functional: true,
  render: function render (h, ref) {
    var data = ref.data;
    var children = ref.children;

    var attrs = {};
    var cls = {};
    var clsDash = {};
    var tag = tag || options.tagMap[element] || 'div';
    if (data.attrs) {
      tag = data.attrs.tag || tag;
      delete data.attrs.tag;
      var loop = function ( key ) {
        var splitted = key.split('-');
        var isTrigger = options.trigger[splitted[0]];
        var isTag = options.tags[splitted[0]];
        if (splitted.length > 1 && (isTrigger || isTag)) {
          if (isTrigger) {
            splitted = splitted.slice(options.includeTrigger ? 0 : 1);
          } else {
            tag = splitted[0];
            splitted = splitted.slice(1);
          }
          splitted.forEach(function (k2) {
            clsDash[k2] = emptyIsTrue(otherAttrs[key]);
          });
        } else if (key.match(/^[a-z]+$/) && (options.words[key])) {
          cls[key] = emptyIsTrue(otherAttrs[key]);
        } else {
          attrs[key] = otherAttrs[key];
        }
      };

      for (var key in (otherAttrs || {})) loop( key );
      // Remove used words from attr
      Object.keys(data.attrs || {}).forEach(function (k) { if (!(k in attrs)) { delete data.attrs[k]; } });
    }

    // Fill Class
    var elementClass = {};
    elementClass[element] = options.includeElementName;
    data.class = Object.assign({}, options.baseClass, cls, clsDash, elementClass, data.class);
    return h(tag || tagMap[element] || 'div', data, children)
  }
}); };

var defaultYaElementsOptions = {
  baseClass: 'ui',
  custom: {},
  elements: elements,
  includeTrigger: false,
  includeElementName: true,
  prefix: 'ya',
  tagMap: tagMap,
  tags: tags,
  tagWord: true,
  trigger: 'ui',
  words: words
};

function YaElements (options) {
  if ( options === void 0 ) options = {};

  options = Object.assign({}, defaultYaElementsOptions, options);
  options.baseClass = genMap(options.baseClass);
  options.elements = genMap(options.elements);
  options.tags = genMap(options.tags);
  options.trigger = genMap(options.trigger);
  options.words = genMap(options.words);

  var components = {};
  var prefix = options.prefix ? options.prefix + '-' : '';
  for (var k in options.elements) {
    components[prefix + k] = componentGenerator(k, prefix + k, options);
  }
  for (var k$1 in options.custom) {
    components[k$1] = componentGenerator(options.custom[k$1], k$1, options);
  }
  return components
}

var plugin = YaElements;

plugin.version = '0.0.0';

plugin.install = function (Vue, options) {
  var components = YaElements(options || {});
  Object.keys(components).forEach(function (k) {
    Vue.component(k, components[k]);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

return plugin;

})));
