<template>
  <div>
    <h1>{{ test }}</h1>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        test: 'Hello World !',
        message: '这里是排行榜页面'
      }
    }
  }
</script>

<style>
  h1 {
    color: #333;
  }

  h2 {
    color: #980123;
  }
</style>
