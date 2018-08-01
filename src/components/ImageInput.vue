<template>
  <div class="image_input_container">
    <img class="image-icon" :src="bgi" :alt="placeholder">
    <x-input :type="type" v-model="currentValue" :is-type="validate" :placeholder="placeholder"></x-input>
  </div>
</template>
<script>
  import { XInput } from 'vux'
  import { createNamespacedHelpers } from 'vuex'
  const { mapGetters } = createNamespacedHelpers('title')

  export default {
    name: 'image-input',
    computed: {
      ...mapGetters(['title'])
    },
    // model: {
    //   prop: 'value',
    //   event: 'validetePass'
    // },
    props: [
      'value',
      'type',
      'validateType',
      'placeholder',
      'bgi'
    ],
    created () {
      this.currentValue = this.value || ''
    },
    components: {
      XInput
    },
    data () {
      return {
        currentValue: ''
      }
    },
    methods: {
      validate (value) {
        let result;
        switch (this.validateType) {
          case 'phone':
            result = this.phone(value)
            break
          case 'password':
            result = this.password(value)
            break
          case 'email':
            result = this.email(value)
            break
          case 'emailOrMobile':
            result = this.emailOrMobile(value)
            break
          default:
            result = {
              valid: true,
              msg: ''
            }
        }
        if (result.valid) {
          this.$emit('input', value)
        }
        return result;
      },
      // 手机号验证
      phone (string) {
        return {
          valid: /^1[3456789]\d{9}$/.test(string),
          msg: '请输入正确的手机号'
        }
      },
      // 密码验证
      password (string) {
        return {
          valid: /^\S{6,12}$/.test(string),
          msg: '请输入6-12位密码'
        }
      },
      // 邮箱验证
      email (string) {
        return {
          valid: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(string),
          msg: '请输入正确的邮箱'
        }
      },
      // 邮箱或者手机号
      emailOrMobile (string) {
        return {
          valid: this.phone(string).valid || this.email(string).valid,
          msg: '请输入正确的手机号/邮箱'
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
  .image_input_container {
    position: relative;
    .image-icon {
      position: absolute;
      left: 65/@rem;
      width: 34/@rem;
      height: 34/@rem;
      top: 48/@rem;
      top: 50%;
      margin-top: -21/@rem;
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {   
      color: @input_placeholder;
      line-height: 1.24;
    }
    input {
      width: 502/@rem;
      height: 52/@rem;
      margin-bottom: 8/@rem;
      border: 1px solid @input_border;
      border-radius: 1000px;
      padding: 16/@rem 90/@rem 16/@rem 78/@rem;
      font-size: 26/@rem;
      line-height: 26/@rem;
    }
    .weui-cell__ft {
      position: absolute;
      right: 65/@rem;
      top: 38/@rem;
    }
    .vux-x-input.weui-cell::after,
    .vux-x-input.weui-cell::before {
      display: none;
    }
  }
</style>
