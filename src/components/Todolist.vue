<template>
  <li @click="handleItemClick">{{data}}</li>
</template>
<script>
  export default {
    name: 'todolist',
    components: {},
    props: [
      'data',
      'index'
    ],
    data() {
      return {}
    },
    methods: {
      handleItemClick: function () {
        this.$emit("delete", this.index);
      }
    },
    watch: {},
    computed: {}
  }
</script>
