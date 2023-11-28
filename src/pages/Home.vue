<script>
import axios from "axios";
import AppPost from "../components/AppPost.vue";
export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async getPosts() {
      this.posts = (await axios.get("http://localhost:5174/posts")).data;
      console.log(this.posts.data);
    },
  },
  created() {
    this.getPosts();
  },
  components: { AppPost },
};
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-center text-4xl font-bold">Benvenuto nel mio blog</h1>
    <div class="postList">
      <AppPost v-for="post in posts.data" :key="post.id" :postData="post" />
    </div>
  </div>
</template>

<style></style>
