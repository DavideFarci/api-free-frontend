<script>
export default {
  props: {
    postData: Object,
  },
};
</script>

<template>
  <div class="card">
    <h3>{{ postData.title }}</h3>
    <p>{{ postData.content }}</p>
  </div>
</template>

<style></style>
