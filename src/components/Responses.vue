<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar color="teal lighten-2" dark>Responses</v-toolbar>
          <v-data-table :headers="headers" :items="responses">
            <template v-slot:item.respondent="{ item }">{{
              `${item.first_name} ${item.last_name}`
            }}</template>
            <template v-slot:item.fullfilled="{ item }"
              ><v-select
                :readonly="select_readonly"
                :items="select_values"
                item-text="name"
                item-value="value"
                v-model="item.fullfilled"
                :append-icon="
                  select_readonly ? 'mdi-pencil' : 'mdi-content-save'
                "
                @click:append="
                  select_readonly
                    ? (select_readonly = false)
                    : updateFullfilled(item)
                "
              ></v-select
            ></template>
          </v-data-table>
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
      select_values: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
      select_readonly: true,
      headers: [
        { text: "Respondent", value: "respondent" },
        { text: "Phone", value: "phone" },
        { text: "Fulfilled", value: "fullfilled" },
        { text: "Track", value: "track" },
      ],
      responses: [],
    };
  },
  created() {
    axiosInstance
      .get("/responses/", { params: { request_id: this.$route.params.id } })
      .then((r) => (this.responses = r.data));
  },
  methods: {
    updateFullfilled({ id, fullfilled }) {
      axiosInstance
        .put(`/responses/${id}/`, {
          fullfilled: fullfilled,
        })
        .then(() => (this.select_readonly = true));
    },
  },
};
</script>

<style>
</style>