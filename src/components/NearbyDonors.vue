<template>
  <v-card class="pb-4" outlined elevation="0">
    <v-toolbar elevation="1" color="teal lighten-3" dark outlined>
      <v-toolbar-title>Nearby Donors</v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-col v-for="(donor, index) in nearby_donors" :key="index">
      <v-card>
        <v-row dense>
          <v-col cols="8">
            <v-card-title>
              <v-icon class="mx-2" color="green lighten-1">mdi-account</v-icon
              >{{ donor.first_name }} {{ donor.last_name }}</v-card-title
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
            <v-card-text class="mx-2" v-if="donor.city">
              <v-icon color="blue lighten-3">mdi-crosshairs-gps</v-icon>
              {{ donor.distance }} Km
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

    <v-col xl="12" v-if="!loaded">
      <v-skeleton-loader
        v-for="i in 5"
        :key="i"
        class="mx-auto"
        max-width="300"
        type="card"
      ></v-skeleton-loader>
    </v-col>
  </v-card>
</template>

<script>
import { axiosInstance } from "../services/backend";
export default {
  data() {
    return { nearby_donors: [], loaded: false };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((pos) =>
      axiosInstance
        .get("/donors", {
          params: { lat: pos.coords.latitude, lon: pos.coords.longitude },
        })
        .then((res) => {
          this.nearby_donors = res.data.filter(
            (donor) => donor.distance && donor.distance < 10
          );
          this.loaded = true;
        })
    );
  },
  methods: {
    sendSMS(receiver) {
      axiosInstance.post("/share_requests/", { receiver: receiver });
    },
  },
};
</script>

<style>
</style>