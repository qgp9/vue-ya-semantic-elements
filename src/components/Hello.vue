<template>
  <div class="hello">
    <ya-container ui-text>
    <button class="ui primary button">usual button</button>
    <ya-divider/>
      <ya-button primary :test-prop="{some: {complex: {data: 1}}}">primary</ya-button>
    <ya-button ui-primary> ui-primary</ya-button>
    <yb-button primary>yb-button with primary</yb-button>
    <yc-button my-primary>yc-button with my-primary</yc-button>
    <yc-button a-primary src="https://google.com">with tag a</yc-button>
    <ya-divider/>
      <ya-flag ui-fr/><ya-flag ui-kr/>
      <ya-icon ui-add-to-calendar-big/>
    </ya-container>

  </div>
</template>

<script>
import YaElements from 'vue-ya-semantic-elements'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    ...YaElements({prefix: 'yb'}),
    ...YaElements({prefix: 'yc', trigger: 'my'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
