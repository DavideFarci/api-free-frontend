<script>
import axios from 'axios';
import { store } from '../store';
export default {
  data() {
    return {
      store,
      arrCategories: [],
      arrTags: [],
      selectedTags: [],
      title: '',
      image: '',
      content: '',
      published: null,
      selectedCategory: null,
      errPostCreate: false,
      postCreated: false,
    };
  },
  methods: {
    async createPost() {
      const newPost = await axios.post('http://localhost:5174/posts', {
        title: this.title,
        image: this.image,
        content: this.content,
        published: this.published,
        categoryId: this.selectedCategory,
        tags: this.selectedTags,
      });

      if (newPost) {
        this.renderPost();
        this.postCreated = true;
        this.title = '';
        this.image = '';
        this.content = '';
        this.selectedCategory = null;
        this.selectedTags = [];
        this.published = null;
      }
    },
    async getCategories() {
      const categories = (await axios.get(store.baseUrl + 'categories')).data;
      this.arrCategories = categories;
    },
    async getTags() {
      const tags = (await axios.get(store.baseUrl + 'tags')).data;
      this.arrTags = tags;
    },
    toggleTag(id) {
      const tagIndex = this.selectedTags.indexOf(id);
      console.log(tagIndex);
      if (!this.selectedTags.includes(id)) {
        this.selectedTags.push(id);
      } else {
        this.selectedTags.splice(tagIndex, 1);
      }
    },
    isSelected(id) {
      return this.selectedTags.includes(id);
    },
    renderPost() {
      this.$emit('renderingPosts');
    },
  },
  created() {
    this.getCategories();
    this.getTags();
  },
};
</script>

<template>
  <form
    @submit.prevent="createPost"
    class="mx-auto flex max-w-2xl flex-col rounded-xl bg-green-200 px-8 py-4 text-left"
  >
    <h2 class="text-2xl font-bold">Nuovo Post</h2>
    <label class="font-semibold" for="title">Titolo</label>
    <input
      class="rounded-md border border-slate-300 p-1"
      v-model="title"
      type="text"
      name="title"
    />

    <label class="font-semibold" for="image">Immagine</label>
    <input
      class="rounded-md border border-slate-300 p-1"
      v-model="image"
      type="text"
      name="image"
    />

    <label class="font-semibold" for="content">Contenuto del post</label>
    <textarea
      class="mb-2 rounded-md border border-slate-300 p-1"
      v-model="content"
      name="content"
      cols="30"
      rows="10"
    ></textarea>

    <select class="mb-2 p-1" v-model="selectedCategory" name="category">
      <option value="null">Seleziona una categoria</option>
      <option
        v-for="category in arrCategories"
        :key="category.slug"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>

    <div class="mb-2">
      <h3 class="font-semibold">Seleziona uno o più tag</h3>
      <template v-for="tag in arrTags" :key="tag.slug">
        <span
          class="mr-2 cursor-pointer hover:text-green-600"
          :class="{ 'text-green-500': isSelected(tag.id) }"
          @click="toggleTag(tag.id)"
        >
          {{ tag.name }}
        </span>
      </template>
    </div>

    <select class="mb-3 p-1" v-model="published" name="public">
      <option value="null">Vuoi rendere il post pubblico?</option>
      <option :value="true">Pubblico</option>
      <option :value="false">Privato</option>
    </select>

    <button
      class="self-center rounded-md bg-green-700 px-4 py-2 font-semibold text-white"
      type="submit"
    >
      Crea
    </button>

    <div v-if="postCreated" class="successPost text-green-600">
      Post creato con successo
    </div>
  </form>
</template>

<style></style>
