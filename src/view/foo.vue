<template>
  <div>
    <p>这是一个测试页面</p>
    <p>message is {{message}}</p>
    <p>data1 {{data1}}</p>
    <p>data2 {{data2}}</p>
    <p>{{a}}</p>
    <hellow v-bind:data="templateTest"></hellow>
    <p v-text="htmlText"></p>
    <div v-html="htmlText">33</div>
    <p :class="[{class1:1==state},{class2:2==state},{class3:3==state}]">bind测试</p>
    <input v-on:keyup.enter="addList()" v-model="userName" type='text' placeholder='请输入账号' class='user-number'/>
    <ul>
      <li is="todolist" v-bind:data="item.name"
                v-bind:index="index"
                @delete="handItemDelete"
                v-for="(item, index) in items">
      </li>
    </ul>

    <ul class="ulbox">
      <li v-for="(item, index) in items">
        <input type="checkbox" v-model="item.selected" :id="('item'+index)"/>
        <label :for="('item'+index)" v-on:click="setSelect(index)">{{item.name}}</label>
      </li>
    </ul>
    <h2>选中</h2>
    <ul>
      <li v-for="(item, index) in items" v-if="item.selected">
        {{item.name}}
      </li>
    </ul>
  </div>

</template>

<script>
  import hellow from "@/components/Hellow"
  import todolist from "@/components/Todolist"
  import {Group, XInput, XImg, XButton} from 'vux'
  import {createNamespacedHelpers} from 'vuex'

  const {mapActions, mapState} = createNamespacedHelpers('test')

  import ImageInput from '../components/ImageInput'
  import QRCode from '../components/QRCode'

  export default {
    name: 'foo',
    created() {
      this.getDataInfo2();
      this.dosomething();
    },
    computed: {
      ...mapState({
        data1: state => state.data1,
        data2: state => state.data2
      })
    },
    components: {
      hellow,
      todolist
    },
    data() {
      return {
        a: 2,
        message: 'hello',
        userName: '',
        classA: 'classa',
        classB: 'classb',
        state: 1,
        templateTest: 'hiahia',
        htmlText: '<div>22</div>',
        items: [
          {
            name: '阿萨德',
            selected: true
          },
          {
            name: '熊',
            selected: false
          },
          {
            name: '大熊',
            selected: false
          }
        ]
      }
    },
    beforeUpdate: function () {
      console.log("beforeUpdate")
    },
    updated: function () {
      console.log("updated")
    },
    methods: {
      ...mapActions([
        'logout',
        'getDataInfo2'
      ]),
      dosomething: function () {
        this.a = 'haha';
      },
      setSelect: function (index) {
        console.log(index)
      },
      addList: function () {
        this.items.push({
          name: this.userName,
          selected: true
        })
        this.userName = "";
      },
      handItemDelete: function (index) {
        console.log(index)
        this.items.splice(index, 1)
      }
    },
    watch: {
      'a': function (val, oldval) {
        console.log(val);
        console.log(oldval);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../assets/less/skin.less";

  .class1 {
    color: red;
  }

  .class2 {
    color: blue;
  }

  .class3 {
    color: pink;
  }

  input:active {
    border: none;
  }

  li {
    list-style: none;
  }

  input {
    outline: none;
  }

  .ulbox {
    li {
      text-align: left;
      margin-left: 100rem/@rem;
    }
  }

  .user-number {
    width: 700rem/@rem;
    margin: 0 auto;
    height: 80rem/@rem;
    line-height: 80rem/@rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 40rem/@rem;
    -moz-border-radius: 40rem/@rem;
    border-radius: 40rem/@rem;
    border: 1px solid #cccccc;
    text-align: center;
    margin-top: 2rem;
  }
</style>
