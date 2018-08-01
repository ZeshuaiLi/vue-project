<template>
  <div class="accessories_component_container">
    <h1>辅料
      <a  @click="$emit('removeAccessories')" href="javascript: void 0;"></a>
      <span>根据款式不同、可不填</span>
    </h1>
    <p>
      辅料:
    </p>
    <x-input required v-model="accessories.accessoriesName" placeholder="请描述面料的成分、纱织密度、克重"></x-input>
    <p>
      辅料成本:
    </p>
    <x-input type="number" required v-model="accessories.accessoriesPrice" placeholder="请输入成本价格">
      <span class="input_badge" slot="right">
        元
      </span>
    </x-input>
    <div class="fabric_cost">
      辅料成本:
      <span>￥</span>
      <span>{{ accessories.accessoriesPrice | fixed }}</span>
    </div>
  </div>
</template>

<script>
import { XInput, XTextarea } from "vux";
export default {
  name: "accessories",
  created() {
  },
  props: ['accessories'],
  components: {
    XInput,
    XTextarea
  },
  data() {
    return {
      price: ''
    };
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../assets/less/skin.less";
.accessories_component_container {
  position: relative;
  padding-bottom: 106/@rem;
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
    span{
      color: @color_888;
      font-size: 24/@rem;
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
