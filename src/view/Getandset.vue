<template>
  <div>
    <p>get和set</p>
    <input v-on:keyup.enter="setInput()" v-model="userName" type='text' placeholder='请输入账号' class='user-number'/>
    <p>{{fullName}}</p>
    <template v-for="(item,key,index) of fullname2">
      <p>{{key}}--{{item}}--{{index}}</p>
    </template>
    <button @click="dosomething()">操作</button>
    <div>

    </div>
  </div>

</template>

<script>
  import todolist from "@/components/Todolist"
  import {Group, XInput, XImg, XButton} from 'vux'
  import {createNamespacedHelpers} from 'vuex'

  const {mapActions, mapState} = createNamespacedHelpers('test')

  import ImageInput from '../components/ImageInput'
  import QRCode from '../components/QRCode'

  export default {
    name: 'getandset',
    created() {
      this.getDataInfo2();
    },
    computed: {
      ...mapState({
        data1: state => state.data1,
        data2: state => state.data2
      }),
      fullName: {
        get: function () {
          return this.firstName + " " + this.lastName;
        },
        set: function (value) {
          console.log(value);
          console.log(this.firstName);
        }
      }
    },
    components: {},
    data() {
      return {
        a: 2,
        message: 'hello',
        userName: '',
        templateTest: 'hiahia',
        firstName: 'li',
        lastName: 'shuai',
        fullname2: {
          id: 2,
          name: 'lizeshuai',
          sex: "男",
          age: "18"
        }
      }
    },
    methods: {
      ...mapActions([
        'logout',
        'getDataInfo2'
      ]),
      dosomething: function () {
        console.log(22)
        // this.fullname2.aa = 'haha';
        this.$set(this.fullname2, "aa", "haha")
      },
      setSelect: function (index) {
        console.log(index)
      },
      setInput: function () {
        this.firstName = this.userName;
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

  button {
    width: 300rem/@rem;
    line-height: 50rem/@rem;
    font-size: 28rem/@rem;
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
