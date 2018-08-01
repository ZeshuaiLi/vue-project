<template>
  <div class="order_container">
    <router-link :to="{ path: '/order/detail', query: { id: data.id }}">
      <div class="order_header">
        <div class="left">
          订单号:
          <span>{{ data.reqInfoNo }}</span>
        </div>
        <div class="right">
          状态:
          <span v-if="data.state === 0 || data.state === 10">报价中</span>
          <span v-if="data.state === 1">已公布</span>
        </div>
      </div>
      <div class="order_main">
        <ul class="order_list">
          <li 
          :class="{
            'has-price': data.offerState === 1,
            'no-price': data.offerState === 0,
            'success-price': data.offerState === 2,
            'fail-price': data.offerState === 3
          }" v-for="item in data.requirementOfferCategorys" :key="item.id" class="order_item">
              <div class=""></div>
              <div class="order_right">
                <p>预期数量:
                  <span>{{ item.customizedNum }}</span>
                </p>
                <p>样衣:
                  <span>{{ item.needSample? '需要' : '不需要' }}</span>
                </p>
              </div>
              <div class="order_left">
                <p>分类:
                  <span>{{item.title}}</span>
                </p>
                <p>预期单价:
                  <span v-if="item.budgetStart">{{ item.budgetStart + '-' + item.budgetEnd }}元</span>
                  <span v-else>暂无报价</span>
                </p>
                <p>报价:
                  <span v-if="item.spRequirementOffer.proofOrderGoodsPrice" class="color_important">{{ item.spRequirementOffer.proofOrderGoodsPrice }}元</span>
                  <span v-else>暂无报价</span>
                </p>
              </div>
          </li>
        </ul>
        <div class="order_info">
          <p>交付日期:
            <span>{{ data.deliveryDate }}</span>
          </p>
          <p>送货地址:
            <span>{{ data.location }}</span>
          </p>
          <p>发票要求:
            <span v-if="data.invoiceType === 0">不开发票</span>
            <span v-if="data.invoiceType === 1">普通发票</span>
            <span v-if="data.invoiceType === 2">增值税发票</span>
          </p>
        </div>
        <!-- <div v-if="data.state === 0 && data.endOfferTime" class="order_footer">
          <p class="right">{{ data.startOfferTime | format }}</p>
          <p v-if="data.endOfferTime">
            距离报价结束:
            <span class="color_important">{{ data.endOfferTime | over_time_hour }}</span>
            小时
            <span class="color_important">{{ data.endOfferTime | over_time_minute }}</span>
            分钟
          </p>
        </div> -->
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "order",
  props: [
    'data'
  ],
  data() {
    return {};
  },
  filters: {
    over_time_hour (n) {
      const arr = n.slice(0, -2).split('小时');
      return arr[0]
    },
    over_time_minute (n) {
      const arr = n.slice(0, -2).split('小时');
      return arr[1]
    },
    format (n) {
      if (n) {
        var date = new Date(+n);
        var year = date.getFullYear();
        var mouth = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes()
        return `${year}-${mouth}-${day} ${hours}:${minutes}`
      } else {
        return ''
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../assets/less/skin.less";
.order_container {
  margin-top: 20 / @rem;
  .color_important {
    color: @color_important;
  }
  .order_header {
    height: 72 / @rem;
    background-color: @title_bg;
    font-size: 24 / @rem;
    line-height: 72 / @rem;
    padding: 0 24 / @rem;
    clear: both;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
  p {
    line-height: 40 / @rem;
    font-size: 24 / @rem;
    min-height: 40 / @rem;
  }
  .order_main {
    .order_list {
      list-style-type: none;
      overflow: hidden;
      .order_item {
        padding: 20 / @rem 24 / @rem 20 / @rem 64 / @rem;
        overflow: hidden;
        background: @white_bg;
        background-repeat: no-repeat;
        background-position: 14/@rem 20/@rem;
        background-size: 38/@rem;
        border-bottom: 1px solid @wx_border;
        .order_left {
          float: left;
          p {
            text-align: left;
          }
        }
        .order_right {
          float: right;
          p {
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
    }
    .order_info, .order_footer {
      background-color: @white_bg;
      padding: 20 / @rem 24 / @rem 20 / @rem 64 / @rem;
      border-bottom: 1px solid @wx_border;
      p {
        text-align: left;
      }
    }
    .order_footer {
      overflow: hidden;
      .right {
        float: right;
      }
    }
  }
}
</style>
