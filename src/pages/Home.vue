<script>
import axios from 'axios';
import AppPost from '../components/AppPost.vue';
import AppCreate from '../components/AppCreate.vue';
export default {
  components: { AppPost, AppCreate },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async getPosts() {
      this.posts = (await axios.get('http://localhost:5174/posts')).data.data;
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<template>
  <div class="container mx-auto py-8 text-center">
    <h1 class="mb-8 text-center text-4xl font-bold">Benvenuto nel mio blog</h1>
    <div class="grid grid-cols-2">
      <div>
        <!-- Creazione di un nuovo post  -->
        <AppCreate @renderingPosts="getPosts" />
      </div>

      <!-- Lista dei post -->
      <div>
        <h2 class="mt-8 text-4xl font-bold">I miei Post</h2>
        <div class="mt-8">
          <AppPost
            class="mb-8"
            v-for="post in posts"
            :key="post.id"
            :postData="post"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
