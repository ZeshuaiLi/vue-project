<template>
  <div class="fabric_component_container">
    <h1>面料
      <a @click="$emit('removeFabric')" href="javascript: void 0;"></a>
    </h1>
    <p>
      面料:
    </p>
    <x-input required v-model="fabric.fabricDesc" placeholder="请描述面料的成分、纱织密度、克重"></x-input>
    <p>
      面料单价:
    </p>
    <x-input required type="number" v-model="fabric.unitPrice" placeholder="请输入面料单价">
      <span class="input_badge" slot="right">
        元/m
      </span>
    </x-input>
    <p>
      料率
    </p>
    <x-input required type="number" v-model="fabric.fabricRate" placeholder="请输入面料料率">
      <span class="input_badge" slot="right">
        m
      </span>
    </x-input>
    <div class="fabric_cost">
      面料成本:
      <span>￥</span>
      <span>{{ fabric.fabricRate * fabric.unitPrice | fixed}}</span>
    </div>
  </div>
</template>

<script>
import { XInput, XTextarea } from "vux";
export default {
  name: "fabric",
  created() {},
  props: ['fabric'],
  components: {
    XInput,
    XTextarea
  },
  data() {
    return {
      msg: "layout",
      value: ""
    };
  },
  watch: {

  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/less/skin.less";
.fabric_component_container {
  position: relative;
  padding-bottom: 106 / @rem;
  text-align: left;
  font-size: 26 / @rem;
  background-color: @white_bg;
  padding: 12/@rem 24/@rem 0 24/@rem;
  margin-bottom: 20/@rem;
  h1 {
    position: relative;
    height: 88/@rem;
    font-size: 30/@rem;
    line-height: 88/@rem;
    font-weight: 400;
    a {
      width: 88/@rem;
      height: 88/@rem;
      position: absolute;
      right: 0;
      top: 0;
      background: url("/static/images/delete-icon.png") 100% center no-repeat;
      background-size: 26/@rem 26/@rem;
    }
  }
  p {
    line-height: 60 / @rem;
    height: 60 / @rem;
  }
  .red_color {
    line-height: 32 / @rem;
    color: @color_important;
  }
  .vux-x-input.weui-cell,
  .weui-cell.vux-x-textarea {
    border: 1px solid @wx_border;
    &::before {
      display: none;
    }
  }
  .weui-cell.vux-x-textarea {
    height: 150 / @rem;
    textarea {
      height: 150 / @rem;
    }
  }
  .fabric_cost {
    height: 112/@rem;
    line-height: 112/@rem;
    span {
      color: @color_red;
    }
    span:last-child{
      font-size: 34/@rem;
    }
  }
  .input_badge {
    color: @input_badge;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {   
    color: @input_placeholder;
    line-height: 1.6;
  }
}
</style>
