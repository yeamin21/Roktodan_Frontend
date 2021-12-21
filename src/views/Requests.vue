<template>
  <v-container class="requests">
    <v-col>
      <v-card elevation="0" outlined class="pb-4">
        <v-toolbar color="green lighten-1" dark>
          <v-toolbar-title>Blood Requests</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-if="authenticated" v-model="dialog_new_req" width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn></template
            >
            <new-blood-request
              @closeDialog="closeNewRequest"
            ></new-blood-request>
          </v-dialog>

          <v-dialog v-model="dialog_search_req" width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-magnify</v-icon>
              </v-btn></template
            >
            <request-search @closeDialog="closeSearchRequest"></request-search>
          </v-dialog>
        </v-toolbar>
        <v-row class="px-4 pt-4">
          <v-col class="mt-4" v-for="(donor, index) in requests" :key="index">
            <v-card class="mx-auto" width="400px" min-height="370px">
              <v-row>
                <v-col cols="8">
                  <v-card-title>
                    <v-icon class="mx-2" color="orange">mdi-account</v-icon>
                    {{ donor.receiver_full_name }}</v-card-title
                  >
                </v-col>
                <v-col>
                  <v-card-title
                    ><v-icon class="mx-2" color="red lighten-2"
                      >mdi-water-circle</v-icon
                    >
                    {{ donor.blood_group_name }}</v-card-title
                  >
                </v-col>
              </v-row>
              <v-card-subtitle
                ><v-icon class="mx-2" color="blue lighten-2"
                  >mdi-hospital-building</v-icon
                >
                {{ donor.hospital_name }}</v-card-subtitle
              >
              <v-row>
                <v-col>
                  <v-card-text class="dense mx-2 mt-4"
                    >Bag Required</v-card-text
                  >
                  <v-card-text class="dense"
                    ><v-icon class="mx-2" color="red lighten-2"
                      >mdi-numeric</v-icon
                    >
                    {{ donor.no_bag_required }}</v-card-text
                  ></v-col
                >

                <v-col>
                  <v-card-text class="dense mx-2 mt-4">Bag Managed</v-card-text>
                  <v-card-text class="dense">
                    <v-icon class="mx-2" color="green lighten-2"
                      >mdi-numeric</v-icon
                    >
                    {{
                      donor.no_bag_managed ? donor.no_bag_managed : 0
                    }}</v-card-text
                  ></v-col
                >
              </v-row>

              <v-card-text class="dense mx-2 mt-4">Needs on</v-card-text>
              <v-card-text class="dense"
                ><v-icon class="mx-2" color="green lighten-2"
                  >mdi-calendar-clock</v-icon
                >
                {{ new Date(donor.needs_on).toLocaleString() }}</v-card-text
              ><v-card-text
                ><v-icon class="mx-2" color="green lighten-2">mdi-phone</v-icon>
                {{
                  donor.phone_additional
                    ? donor.phone_additional
                    : "No Additional Phone"
                }}</v-card-text
              >
              <v-card-actions>
                <v-badge
                  v-if="donor.is_emergency"
                  color="red lighten-1"
                  class="px-3"
                  :content="donor.is_emergency ? 'Emergency' : null"
                >
                </v-badge>

                <v-spacer></v-spacer>
                <v-btn
                  class="mx-4"
                  color="green"
                  @click="response(donor)"
                  v-if="authenticated"
                  text
                  ><v-icon left color="green lighten-2">mdi-check</v-icon
                  >Respond</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-snackbar v-model="snackbar" timeout="1000">
      {{ this.response_msg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import NewBloodRequest from "../components/NewBloodRequest.vue";
import RequestSearch from "../components/RequestSearch.vue";
import { axiosInstance } from "../services/backend";
export default {
  components: { NewBloodRequest, RequestSearch },
  data() {
    return {
      dialog_search_req: false,
      snackbar: false,
      dialog_new_req: false,
      response_msg: "",
      // requests: [],
    };
  },
  created() {
    this.$store.dispatch("requests/get");
  },
  methods: {
    closeNewRequest() {
      this.dialog_new_req = false;
    },
    closeSearchRequest() {
      this.dialog_search_req = false;
    },

    response({ id }) {
      axiosInstance
        .post("/responses/", { blood_request: id })
        .then(() => {
          this.snackbar = true;
          this.response_msg = "Suceess";
        })
        .catch(() => {
          this.snackbar = true;
          this.response_msg = "Failed";
        });
    },
  },
  computed: {
    // authenticated() {
    //   return this.$store.getters["user/userIsAuthenticated"];
    // },
    ...mapGetters({
      requests: "requests/allRequest",
      authenticated: "user/userIsAuthenticated",
      username: "user/getUsername",
    }),
  },
};
</script>

<style>
.dense {
  padding-top: 0;
  padding-bottom: 0;
}
</style>