<template>
  <v-card class="px-4">
    <v-card-title>Filter Requests</v-card-title>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-checkbox label="Emergency" v-model="is_emergency"></v-checkbox>
      </v-col>
      <v-col>
        <v-select
          :items="blood_groups"
          item-text="name"
          v-model="blood_group"
          item-value="id"
          label="Select Blood Group"
        >
        </v-select>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="filter" text color="green"
        ><v-icon left>mdi-magnify</v-icon>Filter</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { axiosInstance } from "../services/backend";
export default {
  data() {
    return { is_emergency: null, blood_groups: [], blood_group: null };
  },
  created() {
    axiosInstance
      .get("/bloodgroups")
      .then((res) => (this.blood_groups = res.data));
  },
  methods: {
    filter() {
      this.$store.dispatch("requests/filter", {
        is_emergency: this.is_emergency,
        blood_group: this.blood_group,
      });
    },
  },
};
</script>

<style>
</style>