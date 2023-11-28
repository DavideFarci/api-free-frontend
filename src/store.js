import { reactive } from "vue";
const url = "http://localhost:5174/";

export const store = reactive({
  baseUrl: url,
});
