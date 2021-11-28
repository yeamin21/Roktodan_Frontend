<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main> <router-view /> </v-main><Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
export default {
  components: { Footer, NavBar },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
