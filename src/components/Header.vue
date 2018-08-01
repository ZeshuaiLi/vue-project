<template>
  <div class="header">
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">{{ title }}</x-header>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="menu_handler" show-cancel></actionsheet>
    </div>
  </div>
</template>
<script>
  import { XHeader, Actionsheet, TransferDom } from 'vux'
  import { createNamespacedHelpers } from 'vuex'
  const { mapGetters } = createNamespacedHelpers('title')

  export default {
    name: '',
    computed: {
      ...mapGetters(['title'])
    },
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet
    },
    props: [],
    data () {
      return {
        menus: [{
          label: '登录',
          type: 'primary',
          value: 1
        }, {
          label: '注册',
          type: 'warn',
          value: 2
        }],
        showMenus: false
      }
    },
    methods: {
      menu_handler (data) {
        switch (data) {
          case 1:
            this.$store.dispatch('login_action', this.user)
            break
          case 2: break
          default: break
        }
      }

    },
    watch: {}
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
  @import url('../assets/less/skin.less');
  .header {
      .vux-header {
        background-color: @first_bg !important;
      }
      .vux-header-left > a, .left-arrow, .vux-header-more {
        color: @first_color !important;
      }
      .left-arrow::before {
        border-color: @first_color !important;
      }
  }
</style>
