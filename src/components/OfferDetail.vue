<template>
  <div class="offer_detail_container">
    <div :class="{
      'has-price': data.offerState === 1,
      'no-price': data.offerState === 0,
      'success-price': data.offerState === 2,
      'fail-price': data.offerState === 3
    }" class="offer_detail_header no-price">
      <div class="left">
        <p>分类:
          <span>{{data.title}}</span>
        </p>
        <p>
          预期单价:
          <span v-if="data.budgetStart">{{ data.budgetStart + '-' + data.budgetEnd }}元</span>
          <span v-else>暂无报价</span>
        </p>
        <p>报价:
          <span v-if="data.spRequirementOffer.proofOrderGoodsPrice" class="color_important">{{ data.spRequirementOffer.proofOrderGoodsPrice }}元</span>
          <span v-else>暂无报价</span>
        </p>
      </div>
      <div class="right">
        <p>预期数量:
          <span>{{ data.customizedNum }}</span>
        </p>
        <p>样衣:
          <span>{{ data.needSample? '需要' : '不需要' }}</span>
        </p>
      </div>
    </div>
    <div class="offer_detail_main">
      <div class="offer_detail_describe">
        <p>需求描述:
          <span>{{ data.spRequirementOffer.description }}</span>
        </p>
      </div>
      <h2>
        设计文件
      </h2>
      <ul>
        <li v-for="(file, index) in data.files" :key="file.id">
          {{ file.title }}
          <a @click="check_look(index, data)" class="look" href="javascript: void 0;">点击查看</a>
        </li>
      </ul>
      <h3>
        尺码表:
        <a @click="check_look_one(data.spRequirementOffer.id)" class="look" v-if="data.spRequirementOffer.sizePic" href="javascript: void 0" :data-url="PICTURE + data.spRequirementOffer.sizePic">查看</a>
        <span v-else>暂无</span>
        <button v-if="state === 0 || state === 10">
          <vue-upload-component 
            ref="upload"
            :post-action="UPLOAD_IMAGE"
            accept="image/*"
            @input-file="inputFile"
            >上传尺码表</vue-upload-component>
        </button>
      </h3>
    </div>
    <div class="price_container">
      生产单价(元):
      <span v-if="data.spRequirementOffer.univalence > 0">{{ data.spRequirementOffer.univalence | fixed }}</span>
      <span v-else>暂无</span>
      <button v-if="state === 0 || state === 10" @click="drapOffer">报价</button>
    </div>
    <div class="order_detail_footer">
      <p>生产费合计:
        <strong>{{ (data.spRequirementOffer.customizedNum * data.spRequirementOffer.univalence) | fixed }}</strong>元
      </p>
    </div>
    <!-- <div>
      <x-dialog v-model="show" class="dialog-demo">
        <div class="img-box">
          <img :src="url" style="max-width:100%">
        </div>
        <div @click="show=false">
          <div class="close">关闭</div>
        </div>
      </x-dialog>
      <x-dialog v-model="show_swiper" class="dialog-demo">
        <swiper :list="files"></swiper>
        <div @click="show_swiper=false">
          <div class="close">关闭</div>
        </div>
      </x-dialog>
    </div> -->
  </div>
</template>

<script>
import { XDialog, Swiper } from "vux";
import VueUploadComponent from "vue-upload-component";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("order");

export default {
  name: "offer-detail",
  components: {
    XDialog,
    VueUploadComponent,
    Swiper
  },
  props: ["data", "isTraders", "state"],
  computed: {
    PICTURE () {
      return PICTURE_HOST
    },
    UPLOAD_IMAGE () {
      return UPLOAD_IMAGE
    }
  },
  data() {
    return {
      show: false,
      show_swiper: false,
      file: null,
      files: [],
      index: 0,
      url: ""
    };
  },
  methods: {
    ...mapActions(['setDetailSizeTable']),
    check_look(index, data) {
      const id = this.$route.query.id;
      return this.$router.push({
        path: '/order/swiper',
        query: {
          id: id,
          c_id: data.id,
          index: index
        }
      })
      // this.files = data.files.map(file => {
      //   return {
      //     url: 'javascript:',
      //     img: this.PICTURE + file.url,
      //     title: file.title
      //   }
      // });
      // this.index = index;
      // this.show_swiper = true;
    },
    check_look_one (s_id) {
      const id = this.$route.query.id;
      console.log(id, s_id)
      return this.$router.push({
        path: '/order/size',
        query: {
          id: id,
          s_id: s_id
        }
      })
      // this.show = true;
      // this.url = event.target.dataset.url
    },
    inputFile(newFile, oldFile, prevent) {
      if (newFile.success) {
        // 上传成功
        this.setDetailSizeTable({
          id: this.$route.query.id,
          sizePic: newFile.response.data.filePath,
          type: 2,
          sp_id: this.data.spRequirementOffer.id
        })
      } else {
        // 激活上传
        this.$refs.upload.active = true;
      }
    },
    drapOffer() {
      const id = this.$route.query.id;
      const offerCategoryId = this.data.spRequirementOffer.offerCategoryId;
      if (this.isTraders) {
        return this.$router.push({
          path: "/order/simple",
          query: { id, c_id: offerCategoryId }
        });
      } else {
        return this.$router.push({
          path: "/order/complex",
          query: { id, c_id: offerCategoryId }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/less/skin.less";
.offer_detail_container {
  margin-top: 25 / @rem;
  background-color: @white_bg;
  box-shadow: 0 1px 10px 0 rgba(158, 52, 52, 0.2);
  p {
    line-height: 40 / @rem;
    font-size: 24 / @rem;
    min-height: 40 / @rem;
  }
  .offer_detail_header {
    padding: 20 / @rem 24 / @rem 20 / @rem 64 / @rem;
    overflow: hidden;
    background: @white_bg;
    background-repeat: no-repeat;
    background-position: 14 / @rem 20 / @rem;
    background-size: 38 / @rem;
    .left {
      float: left;
      padding: 0;
      border: none;
    }
    .right {
      float: right;
      > p {
        text-align: right;
      }
    }
    &.no-price {
      background-image: url(/static/images/no-price.png);
    }
    &.has-price {
      background-image: url(/static/images/has-price.png);
    }
    &.success-price {
      background-image: url(/static/images/success-price.png);
    }
    &.fail-price {
      background-image: url(/static/images/fail-price.png);
    }
  }
  .offer_detail_main {
    padding: 0 24 / @rem 20 / @rem 64 / @rem;
    .offer_detail_describe {
      padding: 20 / @rem 30 / @rem;
      background-color: @body_bg;
      font-size: 26 / @rem;
    }
    h2 {
      font-size: 24 / @rem;
      font-weight: 400;
      text-align: left;
      line-height: 114 / @rem;
      height: 114 / @rem;
    }
    ul {
      list-style-type: none;
      border: 1px solid @wx_border;
      li:not(:last-child) {
        border-bottom: 1px solid @wx_border;
      }
      li {
        position: relative;
        padding-left: 75 / @rem;
        padding-right: 134 / @rem;
        height: 98 / @rem;
        line-height: 100 / @rem;
        font-size: 26 / @rem;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;
        .look {
          position: absolute;
          color: @color_orange;
          height: 100%;
          right: 30 / @rem;
          top: 0;
          width: 104 / @rem;
        }
        background: url(/static/images/file-icon.png) 22 / @rem center no-repeat;
        background-size: 39 / @rem;
      }
    }
    h3 {
      position: relative;
      padding: 25 / @rem 0;
      height: 34 / @rem;
      font-size: 26 / @rem;
      text-align: left;
      line-height: 66 / @rem;
      font-weight: 400;
      a {
        color: @color_orange;
      }
      button {
        position: absolute;
        width: 236 / @rem;
        right: 0;
        top: 25 / @rem;
        height: 64 / @rem;
        border: 1px solid @c_border;
        background-color: @white_button;
        outline: none;
        label {
          display: block;
          width: 100%;
          height: 100%;
          line-height: 64 / @rem;
        }
        &:active {
          background-color: @wx_button;
        }
      }
    }
  }
  .price_container {
    position: relative;
    height: 66 / @rem;
    padding: 24 / @rem 24 / @rem 24 / @rem 64 / @rem;
    border-top: 1px solid @wx_border;
    border-bottom: 1px solid @wx_border;
    text-align: left;
    line-height: 80 / @rem;
    font-size: 26 / @rem;
    button {
      color: @white_color;
      font-weight: bolder;
      position: absolute;
      width: 236 / @rem;
      height: 100%;
      right: 25 / @rem;
      top: 25 / @rem;
      height: 64 / @rem;
      border-radius: 6 / @rem;
      background-image: linear-gradient(
        0,
        @orange_rgba_start 0%,
        @orange_rgba_end 100%
      );
      background-color: @orange_bg;
    }
  }
  .order_detail_footer {
    height: 116 / @rem;
    p {
      padding-right: 24 / @rem;
      line-height: 116 / @rem;
      font-size: 26 / @rem;
      text-align: right;
      strong {
        color: @color_important;
        font-size: 36 / @rem;
        font-weight: 500;
      }
    }
  }
  .close {
    height: 60 / @rem;
    line-height: 60 / @rem;
  }
}
</style>
