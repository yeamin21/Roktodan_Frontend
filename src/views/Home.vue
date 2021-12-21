<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col class="d-flex align-center justify-center">
        <v-card hover to="/donors" width="400px" height="320px">
          <v-card-title>Find Donors Nearby</v-card-title>
          <v-divider></v-divider>
          <v-card-text
            >You can view list of donors nearby. Just share your location to use
            this feature. No login needed</v-card-text
          ><v-card-subtitle
            >Closer persons are the first to response.</v-card-subtitle
          >
          <v-card-actions class="justify-center">
            <v-btn
              to="/donors"
              class="ma-2"
              fab
              elevation="0"
              color="green lighten-2"
            >
              <v-icon color="white">mdi-arrow-right-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="d-flex align-center justify-center">
        <v-card hover to="/requests" width="400px" height="320px">
          <v-card-title>Make Request</v-card-title>
          <v-divider> </v-divider>
          <v-card-text
            >Login and make request for donation. Remember to add additional
            contact number, this might come in handy</v-card-text
          >
          <v-card-subtitle> You can schedule for a later date</v-card-subtitle>

          <v-card-actions class="justify-center">
            <v-btn
              to="/requests"
              class="ma-2"
              fab
              elevation="0"
              color="orange lighten-2"
            >
              <v-icon color="white">mdi-arrow-right-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-card
          hover
          :to="authenticated ? '/requests' : '/login'"
          width="400px"
          height="320px"
        >
          <v-card-title>Respond to Request</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            Be as reponsive as you can. Blood donation is a great virtue. Dont
            miss a chance to help another brother in need.
          </v-card-text>
          <v-card-subtitle
            >A brother in need is a brother indeed</v-card-subtitle
          >
          <v-card-actions class="justify-center">
            <v-btn
              :to="authenticated ? '/requests' : '/login'"
              class="ma-2"
              fab
              elevation="0"
              color="purple lighten-2"
            >
              <v-icon color="white">mdi-arrow-right-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",

  components: {},
  computed: {
    // authenticated() {
    //   return this.$store.getters["user/userIsAuthenticated"];
    // },
    ...mapGetters({
      authenticated: "user/userIsAuthenticated",
      username: "user/getUsername",
    }),
  },
};
</script>
