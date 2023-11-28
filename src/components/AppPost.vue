<script>
export default {
  props: {
    postData: Object,
  },
};
</script>

<template>
  <div class="card grid grid-cols-2 gap-4 border p-2">
    <div class="grid grid-cols-1">
      <h3 class="text-xl font-bold">{{ postData.title }}</h3>
      <p>{{ postData.content }}</p>
      <div v-if="postData.category">
        <span class="font-semibold">Categoria:</span>
        {{ postData.category.name }}
      </div>
      <div v-if="postData.tags">
        <span class="font-semibold">Tags: </span>
        <span class="mr-2" v-for="tag in postData.tags" :key="tag.name">{{
          tag.name
        }}</span>
      </div>
    </div>
    <img :src="postData.image" alt="" />
  </div>
</template>

<style></style>
