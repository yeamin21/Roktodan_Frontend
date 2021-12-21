<template>
  <v-card>
    <v-card-title>Phone Share Requests</v-card-title>
    <v-data-table
      :headers="headers"
      :items="share_requests"
      :items-per-page="5"
    >
      <template v-slot:item.receiver="{ item }">{{
        `${item.sender_first_name} ${item.sender_last_name}`
      }}</template
      ><template v-slot:item.created_at="{ item }">{{
        new Date(item.created_at).toLocaleString()
      }}</template
      ><template v-slot:item.actions="{ item }"
        ><v-btn icon @click="addResponse(item, true)"
          ><v-icon color="green">mdi-check-circle</v-icon></v-btn
        ><v-btn icon @click="addResponse(item, false)"
          ><v-icon color="red lighten-2">mdi-close-circle</v-icon></v-btn
        ></template
      >
    </v-data-table>
  </v-card>
</template>

<script>
import { axiosInstance } from "../services/backend";
export default {
  data() {
    return {
      headers: [
        { text: "Requested User", value: "receiver" },
        { text: "Requested at", value: "created_at" },
        { text: "Respond", value: "actions" },
      ],
      share_requests: [],
    };
  },
  mounted() {
    axiosInstance
      .get("/share_requests")
      .then((res) => (this.share_requests = res.data));
  },
  methods: {
    addResponse({ id }, action) {
      console.log(id, action);
    },
  },
};
</script>

<style>
</style>