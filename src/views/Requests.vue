<template>
  <v-container>
    <v-col>
      <v-card>
        <v-toolbar color="green lighten-1" dark>
          <v-toolbar-title>Blood Requests</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog_new_req" width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn></template
            >
            <new-blood-request
              @closeDialog="closeNewRequest"
            ></new-blood-request>
          </v-dialog>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row class="px-4 pt-4">
          <v-col v-for="(donor, index) in requests" :key="index">
            <v-card min-width="250px"
              ><v-card-title>{{ donor.name }}</v-card-title>
              <v-card-title>{{ donor.blood_group }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-col></v-container
  >
</template>

<script>
import NewBloodRequest from "../components/NewBloodRequest.vue";
import { axiosInstance } from "../services/backend";
export default {
  components: { NewBloodRequest },
  data() {
    return {
      dialog_new_req: false,
      requests: [
        // { id: 1, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
        // { id: 2, name: "Hasan", blood_group: "O+" },
      ],
    };
  },
  created() {
    axiosInstance.get("/requests").then((res) => (this.requests = res.data));
  },
  methods: {
    closeNewRequest() {
      this.dialog_new_req = false;
    },
  },
};
</script>

<style>
</style>