<script>
import axios from "axios";
import { store } from "../store";
export default {
  data() {
    return {
      store,
      arrCategories: [],
      arrTags: [],
      selectedTags: [],
      title: "",
      image: "",
      content: "",
      published: null,
      selectedCategory: null,
      errPostCreate: false,
      postCreated: false,
    };
  },
  methods: {
    async createPost() {
      const newPost = await axios.post("http://localhost:5174/posts", {
        title: this.title,
        image: this.image,
        content: this.content,
        published: this.published,
        categoryId: this.selectedCategory,
        tags: this.selectedTags,
      });

      if (newPost) {
        this.getPosts();
        this.postCreated = true;
      }
    },
    async getPosts() {
      this.posts = (await axios.get("http://localhost:5174/posts")).data.data;
    },
    async getCategories() {
      const categories = (await axios.get(store.baseUrl + "categories")).data;
      this.arrCategories = categories;
    },
    async getTags() {
      const tags = (await axios.get(store.baseUrl + "tags")).data;
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
    class="flex flex-col mx-auto text-left px-8 py-4 max-w-2xl rounded-xl bg-green-200"
  >
    <h2 class="text-2xl font-bold">Nuovo Post</h2>
    <label class="font-semibold" for="title">Titolo</label>
    <input
      class="border border-slate-300 rounded-md p-1"
      v-model="title"
      type="text"
      name="title"
    />

    <label class="font-semibold" for="image">Immagine</label>
    <input
      class="border border-slate-300 rounded-md p-1"
      v-model="image"
      type="text"
      name="image"
    />

    <label class="font-semibold" for="content">Contenuto del post</label>
    <textarea
      class="border border-slate-300 rounded-md p-1 mb-2"
      v-model="content"
      name="content"
      cols="30"
      rows="10"
    ></textarea>

    <select class="p-1 mb-2" v-model="selectedCategory" name="category">
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

    <select class="p-1 mb-3" v-model="published" name="public">
      <option value="null">Vuoi rendere il post pubblico?</option>
      <option :value="true">Pubblico</option>
      <option :value="false">Privato</option>
    </select>

    <button
      class="self-center rounded-md text-white font-semibold px-4 py-2 bg-green-700"
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
