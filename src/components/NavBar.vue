<template>
  <div>
    <v-app-bar app color="red lighten-2" dark>
      <div class="d-flex align-center">
        <!-- <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          /> -->

        <v-app-bar-title
          ><v-btn text to="/"
            ><v-icon left class="px-2" x-large color="white lighten-1"
              >mdi-water-circle</v-icon
            >
            <a id="title" class="hidden-sm-and-down mx-2">Roktodan</a>
          </v-btn></v-app-bar-title
        >
        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
      </div>

      <v-spacer></v-spacer>

      <div v-if="authenticated">
        <v-btn text to="/profile">{{ this.username }}</v-btn>
        <v-btn text @click="logout">Logout</v-btn>
      </div>
      <div v-else>
        <v-btn v-for="nav in nav_user" :key="nav.name" :to="nav.path" text>
          {{ nav.name }}
        </v-btn>
      </div>

      <v-divider vertical class="mx-2"></v-divider>
      <div class="hidden-sm-and-down">
        <v-btn v-for="nav in navs" :key="nav.name" :to="nav.path" text>
          <span class="mr-2">{{ nav.name }}</span>
        </v-btn>
      </div>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        :hidden="sidebar"
        @click="sidebar = true"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="sidebar" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <!-- <v-list-item
            v-for="nav in nav_user"
            :key="nav.name"
            :to="nav.path"
            text
          >
            <span class="mr-2">{{ nav.name }}</span>
          </v-list-item> -->

          <v-list-item v-for="nav in navs" :key="nav.name" :to="nav.path" text>
            <span class="mr-2">{{ nav.name }}</span>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      sidebar: false,
      navs: [
        { path: "/requests", name: "Requests" },
        { path: "/donors", name: "Donors" },

        {
          path: "/track",
          name: "Track",
        },
      ],
      nav_user: [
        {
          path: "/login",
          name: "Login",
        },
        {
          path: "/register",
          name: "Register",
        },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("user/validate");
  },
  computed: {
    // authenticated() {
    //   return this.$store.getters["user/userIsAuthenticated"];
    // },
    ...mapGetters({
      authenticated: "user/userIsAuthenticated",
      username: "user/getUsername",
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    },
  },
};
</script>

<style>
#title {
  color: white;
}
</style>