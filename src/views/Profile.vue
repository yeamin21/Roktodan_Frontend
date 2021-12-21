<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="8"
        ><v-card>
          <v-card-title>Your Requests</v-card-title>
          <v-data-table :headers="headers" :items="self_blood_requests"
            ><template v-slot:item.created_at="{ item }">
              {{ new Date(item.created_at).toLocaleString() }}
            </template>
            <template v-slot:item.needs_on="{ item }">
              {{ new Date(item.needs_on).toLocaleString() }}
            </template>
            <template v-slot:item.is_emergency="{ item }">
              {{ item.is_emergency === true ? "Yes" : "No" }}
            </template>
            <template v-slot:item.no_bag_managed="{ item }">
              <v-text-field
                type="number"
                :value="item.no_bag_managed || 0"
                :readonly="text_readonly"
                :min="item.no_bag_managed || 0"
                :max="item.no_bag_required"
                v-model="item.no_bag_managed"
                ref="val"
                :append-icon="text_readonly ? 'mdi-pencil' : 'mdi-content-save'"
                @click:append="
                  text_readonly
                    ? (text_readonly = false)
                    : updateBagRequired(item)
                "
              >
              </v-text-field> </template
            ><template v-slot:item.phone_additional="{ item }">
              {{
                item.phone_additional ? item.phone_additional : "Not Provided"
              }} </template
            ><template v-slot:item.actions="{ item }">
              <v-btn
                color="primary"
                icon
                :to="{ name: 'Responses', params: { id: item.id } }"
                ><v-icon>mdi-arrow-top-right</v-icon></v-btn
              >
            </template>
          </v-data-table></v-card
        ></v-col
      >
      <v-col>
        <v-row class="mt-2"
          ><v-col>
            <v-card>
              <v-row>
                <v-col cols="7">
                  <v-card-title>
                    {{
                      `${this.userData.first_name} ${this.userData.last_name}`
                    }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ `@${this.userData.username}` }}
                  </v-card-subtitle>
                  <v-card-text v-if="userData.address">
                    {{ `${this.userData.address}` }}
                  </v-card-text>
                  <v-card-text v-if="userData.user_phone">
                    <v-icon color="green lighten-1">mdi-cellphone</v-icon>
                    {{ `${userData.user_phone}` }}
                    <v-icon color="orange lighten-2">mdi-pencil-circle</v-icon>
                  </v-card-text>
                  <div>
                    <v-card-text class="dense"
                      >Last Donation Date
                      <v-icon color="orange lighten-2"
                        >mdi-pencil-circle</v-icon
                      ></v-card-text
                    >

                    <v-card-text class="dense" v-if="userData.donor_details">
                      <v-icon color="red lighten-1">mdi-calendar-star</v-icon>
                      {{ `${userData.donor_details.last_donation}` }}
                    </v-card-text>
                  </div>
                </v-col>
                <v-divider v-if="userData.user_address" vertical></v-divider>
                <v-col v-if="userData.user_address">
                  <v-card-subtitle
                    ><v-icon color="green lighten-1">mdi-map-marker</v-icon>
                    {{ userData.user_address.address }}
                    <v-btn icon
                      ><v-icon color="orange lighten-2"
                        >mdi-pencil-circle</v-icon
                      ></v-btn
                    ></v-card-subtitle
                  >
                </v-col></v-row
              >
            </v-card>
          </v-col></v-row
        >
        <v-row
          ><v-col><phone-share-requests></phone-share-requests></v-col
        ></v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { axiosInstance } from "../services/backend";

import PhoneShareRequests from "../components/PhoneShareRequests.vue";
export default {
  components: { PhoneShareRequests },
  data() {
    return {
      text_readonly: true,
      response_dialog: false,
      headers: [
        {
          text: "Posted On",
          value: "created_at",
        },
        {
          text: "Required On",
          value: "needs_on",
        },
        {
          text: "Bags Required",
          value: "no_bag_required",
        },
        {
          text: "Bags Managed",
          value: "no_bag_managed",
        },
        {
          text: "Emergency",
          value: "is_emergency",
        },
        {
          text: "Additional Phone",
          value: "phone_additional",
        },
        {
          text: "Responses",
          value: "actions",
        },
      ],
      userData: {},
      phone_share_requests: [],
      self_blood_requests: [],
    };
  },
  created() {
    axiosInstance
      .get("/user")
      .then((res) => (this.userData = res.data))
      .then(() =>
        axiosInstance
          .get("/share_requests")
          .then((res) => (this.phone_share_requests = res.data))
      )
      .then(() =>
        axiosInstance.get("/requests/self_requests").then((res) => {
          this.self_blood_requests = res.data.map((r) => ({
            ...r,
            no_bag_managed: r.no_bag_managed || 0,
          }));
        })
      );
  },
  methods: {
    updateBagRequired({ id, no_bag_managed }) {
      axiosInstance
        .put(`/requests/${id}/`, {
          no_bag_managed: no_bag_managed,
        })
        .then(() => (this.text_readonly = true));
    },
    closeDialog() {
      this.response_dialog = false;
    },
  },
};
</script>

<style>
.dense {
  padding-bottom: 0;
  padding-top: 0;
}
</style>