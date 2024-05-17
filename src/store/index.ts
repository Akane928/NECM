import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";
export { useUserStore } from "./modules/user";

const pinia = createPinia();

pinia.use(persist);

export default pinia;
