<template>
  <v-container>
    <v-row class="mt-4">
      <v-col>
        <v-card>
          <v-toolbar color="green lighten-1" dark>
            <v-toolbar-title>Donors</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
          <v-row class="px-4 pt-4">
            <v-col v-for="(donor, index) in donors" :key="index">
              <v-card min-width="300px" max-width="300px"
                ><v-card-title
                  >{{ donor.first_name }} {{ donor.last_name }}</v-card-title
                >
                <v-card-title
                  >{{ donor.blood_type }}{{ donor.blood_factor }}</v-card-title
                >
                <v-card-actions>
                  <v-btn v-if="donor.phone" icon :href="`tel:${donor.phone}`"
                    ><v-icon>mdi-phone</v-icon></v-btn
                  >
                  <v-btn v-else icon><v-icon>mdi-allergy</v-icon></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col md="3">
        <v-card
          ><v-card-title>Nearby Donors</v-card-title>
          <v-col v-for="(donor, index) in donors" :key="index">
            <v-card width="300px"
              ><v-card-title
                >{{ donor.first_name }} {{ donor.last_name }}</v-card-title
              >
            </v-card>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { axiosInstance } from "../services/backend";
export default {
  data() {
    return {
      donors: [],
    };
  },
  created() {
    axiosInstance.get("/donors").then((res) => (this.donors = res.data));
  },
};
</script>

<style>
</style>