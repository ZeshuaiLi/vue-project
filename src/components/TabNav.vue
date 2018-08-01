<template>
  <div class="tabbar">
    <tabbar slot="bottom">
      <tabbar-item selected>
        <span slot="icon" class="fa fa-home" aria-hidden="true"></span>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/login">
        <span slot="icon" class="fa fa-file" aria-hidden="true"></span>
        <span slot="label">登录</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <span slot="icon" class="fa fa-file-o" aria-hidden="true"></span>
        <span slot="label">vux</span>
      </tabbar-item>
      <tabbar-item badge="1">
        <span slot="icon" class="fa fa-book" aria-hidden="true"></span>
        <span slot="label">other</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  name: 'tabNav',
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  props: [],
  data () {
    return {
      demo01: 0
    }
  },
  methods: {
    consoleIndex () {
      console.log('click demo01', this.demo01)
    }
  },
  watch: {},
  computed: {}
  /*
   beforeCreate () {},
   created () {},
   beforeMount () {},
   mounted () {},
   beforeUpdate () {},
   updated () {},
   activated () {},
   deactivated () {},
   beforeDestroy () {},
   destroyed () {}
   */
}
</script>
<style lang="less">
@import url("../assets/less/skin.less");
.tabbar {
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: @first_bg;
  }
  .fa {
    font-size: 27px;
  }
}
</style>
