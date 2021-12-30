<template>
  <v-container>
    <v-row class="d-flex justify-content-center">
      <v-col>
        <v-card outlined elevation="0" class="pb-4">
          <v-toolbar elevation="1" color="green lighten-2" dark outlined>
            <v-toolbar-title>Donors</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer> <v-spacer></v-spacer>
            <v-select
              single-line
              class="mt-6"
              width="20px"
              :append-outer-icon="blood_group ? 'mdi-close' : null"
              label="Select Donor Blood Group"
              v-model="blood_group"
              :items="blood_groups"
              item-text="name"
              item-value="id"
              @click:append-outer="blood_group = ''"
            ></v-select>
            <!-- <v-dialog v-model="dialog_search_donor" width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn></template
              >
              <SearchDonor @closeDialog="closeSearchDonor"></SearchDonor>
            </v-dialog> -->
          </v-toolbar>
          <v-row class="px-4 mt-4 pt-4">
            <v-col v-for="(donor, index) in filteredDonors" :key="index">
              <v-card class="mx-auto" width="360" min-height="160">
                <v-row dense>
                  <v-col cols="8">
                    <v-card-title>
                      <v-icon class="mx-2" color="green lighten-1"
                        >mdi-account</v-icon
                      >{{ donor.first_name }}
                      {{ donor.last_name }}</v-card-title
                    >
                  </v-col>
                  <v-col>
                    <v-card-title
                      ><v-icon class="mx-2" color="red lighten-2"
                        >mdi-water-circle</v-icon
                      >{{ donor.blood_type.toUpperCase()
                      }}{{ donor.blood_factor }}</v-card-title
                    >
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col>
                    <v-card-text class="px-2" v-if="donor.city">
                      <v-icon class="px-2" color="orange lighten-2"
                        >mdi-city</v-icon
                      >{{ donor.city }}
                    </v-card-text>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col align-self="center">
                    <v-btn
                      class="mx-2"
                      v-if="donor.phone"
                      text
                      color="green lighten-2"
                      :href="`tel:${donor.phone}`"
                      ><v-icon left>mdi-phone</v-icon>Call</v-btn
                    >
                    <v-btn
                      class="mx-2"
                      align-self="center"
                      color="purple lighten-2"
                      text
                      v-else
                      @click="sendSMS(donor.user)"
                      ><v-icon left>mdi-allergy</v-icon>Request</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col md="3"><nearby-donors></nearby-donors></v-col>
    </v-row>
  </v-container>
</template>

<script>
import NearbyDonors from "../components/NearbyDonors.vue";

import { axiosInstance } from "../services/backend";
export default {
  components: { NearbyDonors },
  data() {
    return {
      donors: [],
      blood_groups: [],
      blood_group: "",
      dialog_search_donor: false,
    };
  },
  async created() {
    const donor_response = await axiosInstance.get("/donors");
    this.donors = donor_response.data;
    const blood_groups = await axiosInstance.get("/bloodgroups");
    this.blood_groups = blood_groups.data;
  },
  methods: {
    sendSMS(receiver) {
      axiosInstance.post("/share_requests/", { receiver: receiver });
    },
    closeSearchDonor() {
      this.dialog_search_donor = false;
    },
  },
  computed: {
    filteredDonors() {
      return this.blood_group
        ? this.donors.filter((item) => item.blood_group === this.blood_group)
        : this.donors;
    },
  },
};
</script>

<style scoped>
</style>