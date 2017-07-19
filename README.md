# vue-ya-semantic-elements



[![npm](https://img.shields.io/npm/v/vue-ya-semantic-elements.svg)](https://www.npmjs.com/package/vue-ya-semantic-elements)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

Yet another semantic-ui elements component for Vue2


## Setup
```js
import YaElements from 'vue-ya-semantic-elements'

Vue.use(YaElements)
```

## Usage

This components provide two simple way to put semantic-ui classes. Also they are fully customisable

* As props/attributes
```html
<ya-button left primary big>Big Button</ya-button>
```

* With dash-linked attribute
```html
<ya-button ui-left-primary-big>Big Button</ya-button>
```
![BOOYAH](http://i.imgur.com/JoeKDOC.png)

### Avaliable elements
`ya-`
```
button container divider flag header icon image input label list loader rails reveal segment step'
```
The prefix(`ya-`) and list of elements are also customisable.

### As props/attriutes
This could keep nice style. However those are just plain word, so not easy to distingush with casual HTML attributes.

Currently possible words are
```
ui primary animated labled left center right aligned justified vertical horizontal fluid inverted fitted hidden clearing button tiny mini large icon container divider
```

This is very small part of whole possible list, but simpley I tired while listed and checked them. :)

But I told you, you can custoise this also. And please update good lists back to here. (PROFIT!)

### With dash-linked attributed
This doesn't looks as good as a previous form, but safe and secure. And still good in my eyes.
Basically you can put any word since I didn't put any validator for this, but naturaly now special charactor
The order of each word doesn't matter but the trigger at first is important.

you can choose one of several triggers at the same time

1. Configured trigger. default is 'ui' or your own.
```
<ya-icon ui-add-to-calendar-big/>
will be
<i class="ui add to calendar big icon></i>
```
2. Or tag name
```html
<ya-icon div-add-to-calendar-big/>
```

I don't knw a result, but anyway it will be converted to
```html
<div class="ui add to calendar big icon"></div>
```


## Customazation
One can customize `YaElements` globally
```js
Vue.use(YaElements, options)
```
Or locally in each component
```js
import YaElements from 'vue-ya-semantic-elements'
export default {
  name: 'MyComponent',
  Props: ['myprop'],
  ...
  components: {
    ...YaElements(options1),
    ...YaElements(options2)
  }
}
```

### Default options are
```js
  baseClass: 'ui',
  custom: {},
  elements,
  includeTrigger: false,
  includeElementName: true,
  prefix: 'ya',
  tagMap,
  tags,
  trigger: 'ui',
  words

```
Let's see one by one. All your options will override correspond default value by key name.

* `baseClass` : A list of classes which are always included in class.
* `prefix` : A prefix of tagname. This should be a one single alphabetical word without space, number, underbar.
* `elements` : Possible elements. This can be an array or a space separated string.
* `words`: Possible words in single attribute style. This can be an array or a space separated string.
* `trigger` : A leading word in dash-linked style. This can be an array or a space separated string.
* `tags` : These are also leading words in dash-linked style. But additionally this word will be applied to real tag.
* `includeTrigger`: If true, trigger word is included in the class. Duplications with `baseClass` are allowed
* `includeElementName: If true a element name(ex: `button` of `<ya-button>` will be included in the class
* `tagMap`: Object. This decide a html tag for a certain element. Overrided by 'tags' (and tag prop). Defaults values are mostly `div` and
```js
const tagMap = {
  button: 'button',
  icon: 'i',
  flag: 'i'
}
```
* `custom`: You can put your own names.
```js
custom: {
	'my-funny-name': 'button'
}
```

Please tell me if I missed anything.


All `list`(baseClass, elements, tags, trigger, words) can be an array or a space separated string.




## :scroll: Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/qgp9/vue-ya-semantic-elements/blob/dev/CHANGELOG.md).


## Acknowledge
This project is strongly inspired from https://github.com/vouill/vue-bulma-components also many of codes :)



## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
