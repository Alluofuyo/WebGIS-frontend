<template>

</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "ShareCard",
  props: {
    info: {
      username: String,
      avatar: String,
      content: String,
      position: String,
      time: String
    }

  }
})
</script>

<style scoped>

</style>