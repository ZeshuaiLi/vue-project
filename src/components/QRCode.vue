<template>
  <div :gutter="0" class="qr-code-container">
    <div class="first">
      <div class="image-input">
        <img class="image-icon" src="/static/images/qr-code-icon.png" alt="验证码">
        <x-input v-model="currentValue" :is-type="validate" placeholder="验证码" maxlength="4"></x-input>
      </div>
    </div>
    <div class="last">
      <img @click="changeImage" :src="qrcodeSrc" alt="">
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
import { XInput, Flexbox, FlexboxItem } from "vux";
import { throttle } from "lodash";
export default {
  name: "qr-code",
  computed: {},
  props: {
    value: ''
  },
  components: {
    XInput
  },
  created() {
    this.currentValue = this.value;
    this.getImage();
  },
  data() {
    return {
      qrcodeSrc: "",
      authCodeId: ""
    };
  },
  methods: {
    validate(value) {
      const result = {
        valid: /^\S{4}$/.test(value),
        msg: "请输入正确的验证码"
      };
      if (result.valid) {
        this.$emit('validerSuccess', {
          code: value,
          id: this.authCodeId
        })
      }
      return result;
    },
    getImage() {
      const timestamp = +new Date();
      this.$http.post('/authCode/getImageAuthCode?' + timestamp).then(data => {
        if (data.code === 0) {
          this.qrcodeSrc = data.object.imgBase64Src;
          this.authCodeId = data.object.authCodeId;
        }
      });
    },
    changeImage() {
      if (this.ajax) {
        return false;
      } else {
        this.ajax = true;
        this.getImage();
        setTimeout(() => {
          this.ajax = false;
        }, 500);
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
};
</script>
<style lang="less">
@import url("../assets/less/skin.less");
.qr-code-container {
  .clear {
    clear: both;
  }
  .first {
    float: left;
    padding-left: 3px;
    width: 430/@rem;
    .image-input {
      position: relative;
      .image-icon {
        position: absolute;
        left: 60 / @rem;
        width: 34 / @rem;
        height: 34 / @rem;
        top: 50%;
        margin-top: -18/@rem;
      }
      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        color: @input_placeholder;
        font-family: "SimHei", "Microsoft YaHei";
      }
      input {
        width: 282 / @rem;
        height: 52 / @rem;
        margin-bottom: 8 / @rem;
        border: 1px solid @input_border;
        border-radius: 1000px;
        padding: 16 / @rem 40 / @rem 16 / @rem 78 / @rem;
        font-size: 26 / @rem;
        line-height: 26 / @rem;
      }
      .weui-cell__ft {
        position: absolute;
        right: 65 / @rem;
        top: 38 / @rem;
      }
      .vux-x-input.weui-cell::after,
      .vux-x-input.weui-cell::before {
        display: none;
      }
    }
  }
  .last {
    float: left;
    margin-left: 30/@rem;
    margin-top: 20/@rem;
    width: 240/@rem;
    img {
      width: 238 / @rem;
      height: 88 / @rem;
    }
  }
}
</style>
