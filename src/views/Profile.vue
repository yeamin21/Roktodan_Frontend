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

    <v-row>
      <v-col cols="12" sm="6" md="8"
        ><v-card>
          <v-card-title>Your Responses</v-card-title>
          <v-data-table
            :headers="headers_responses"
            :items="self_blood_responses"
            ><template v-slot:item.created_at="{ item }">
              {{ new Date(item.blood_request.created_at).toLocaleString() }}
            </template>
            <template v-slot:item.needs_on="{ item }">
              {{ new Date(item.blood_request.needs_on).toLocaleString() }}
            </template>
            <template v-slot:item.is_emergency="{ item }">
              {{ item.blood_request.is_emergency === true ? "Yes" : "No" }}
            </template>
            <template v-slot:item.phone_additional="{ item }">
              {{
                item.blood_request.phone_additional
                  ? item.blood_request.phone_additional
                  : "Not Provided"
              }}
            </template>
            <template v-slot:item.bag_managed="{ item }">
              {{
                `${item.blood_request.no_bag_managed || 0}/${
                  item.blood_request.no_bag_required
                }`
              }}
            </template>

            <template v-slot:item.hospital_name="{ item }">
              {{ item.blood_request.hospital_name }} </template
            ><template v-slot:item.hospital_route="{ item }">
              <!-- <v-dialog
                :retain-focus="false"
                v-model="route_dialog"
                width="800"
              >
                <template v-slot:activator="{ on, attrs }"> -->
              <v-btn
                :to="{
                  name: 'Route',
                  params: {
                    address: item.blood_request.hospital_name,
                    city: item.blood_request.hospital_city,
                  },
                }"
                icon
              >
                <v-icon color="green lighten-2">mdi-routes</v-icon>
              </v-btn>
            </template>
          </v-data-table></v-card
        ></v-col
      >
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
      route_dialog: false,
      geojson: {
        type: "FeatureCollection",
        features: [
          {
            bbox: [8.681423, 49.414599, 8.69198, 49.420514],
            type: "Feature",
            properties: {
              segments: [
                {
                  distance: 1603.8,
                  duration: 268.7,
                  steps: [
                    {
                      distance: 1.9,
                      duration: 0.5,
                      type: 11,
                      instruction: "Head west on Gerhart-Hauptmann-Straße",
                      name: "Gerhart-Hauptmann-Straße",
                      way_points: [0, 1],
                    },
                    {
                      distance: 314.0,
                      duration: 75.4,
                      type: 3,
                      instruction: "Turn sharp right onto Wielandtstraße",
                      name: "Wielandtstraße",
                      way_points: [1, 11],
                    },
                    {
                      distance: 737.6,
                      duration: 106.2,
                      type: 1,
                      instruction: "Turn right onto Mönchhofstraße",
                      name: "Mönchhofstraße",
                      way_points: [11, 39],
                    },
                    {
                      distance: 264.3,
                      duration: 41.4,
                      type: 0,
                      instruction:
                        "Turn left onto Handschuhsheimer Landstraße, B 3",
                      name: "Handschuhsheimer Landstraße, B 3",
                      way_points: [39, 57],
                    },
                    {
                      distance: 155.3,
                      duration: 14.0,
                      type: 5,
                      instruction:
                        "Turn slight right onto Handschuhsheimer Landstraße, B 3",
                      name: "Handschuhsheimer Landstraße, B 3",
                      way_points: [57, 61],
                    },
                    {
                      distance: 130.8,
                      duration: 31.4,
                      type: 0,
                      instruction: "Turn left onto Roonstraße",
                      name: "Roonstraße",
                      way_points: [61, 64],
                    },
                    {
                      distance: 0.0,
                      duration: 0.0,
                      type: 10,
                      instruction: "Arrive at Roonstraße, straight ahead",
                      name: "-",
                      way_points: [64, 64],
                    },
                  ],
                },
              ],
              summary: {
                distance: 1603.8,
                duration: 268.7,
              },
              way_points: [0, 64],
            },
            geometry: {
              coordinates: [
                [8.681496, 49.414601],
                [8.68147, 49.414599],
                [8.681488, 49.41465],
                [8.681423, 49.415698],
                [8.681423, 49.415746],
                [8.681427, 49.415802],
                [8.681641, 49.416539],
                [8.681656, 49.41659],
                [8.681672, 49.416646],
                [8.681825, 49.417081],
                [8.681875, 49.417287],
                [8.681881, 49.417392],
                [8.682035, 49.417389],
                [8.682107, 49.41739],
                [8.682461, 49.417389],
                [8.682563, 49.417388],
                [8.682676, 49.417387],
                [8.682781, 49.417388],
                [8.683379, 49.41738],
                [8.683595, 49.417372],
                [8.683709, 49.417368],
                [8.685294, 49.417365],
                [8.685359, 49.417365],
                [8.685442, 49.417365],
                [8.685713, 49.41737],
                [8.686407, 49.417365],
                [8.686717, 49.417366],
                [8.687376, 49.417353],
                [8.687466, 49.417351],
                [8.687547, 49.417349],
                [8.688256, 49.417361],
                [8.688802, 49.417381],
                [8.690001, 49.417413],
                [8.690275, 49.417425],
                [8.690344, 49.417424],
                [8.690434, 49.417417],
                [8.691467, 49.417155],
                [8.691735, 49.417102],
                [8.691957, 49.417117],
                [8.69198, 49.417121],
                [8.691941, 49.41722],
                [8.691931, 49.417235],
                [8.691879, 49.417306],
                [8.691817, 49.417369],
                [8.691427, 49.417726],
                [8.691072, 49.418051],
                [8.690968, 49.418158],
                [8.690936, 49.418188],
                [8.690939, 49.418208],
                [8.690939, 49.418296],
                [8.69092, 49.418378],
                [8.690912, 49.418411],
                [8.69067, 49.418981],
                [8.690664, 49.418992],
                [8.690614, 49.419093],
                [8.690547, 49.419174],
                [8.690479, 49.419204],
                [8.690446, 49.419218],
                [8.690275, 49.419577],
                [8.690123, 49.419833],
                [8.689854, 49.420216],
                [8.689652, 49.420514],
                [8.68963, 49.42051],
                [8.688601, 49.420393],
                [8.687872, 49.420318],
              ],
              type: "LineString",
            },
          },
        ],
        bbox: [8.681423, 49.414599, 8.69198, 49.420514],
        metadata: {
          attribution: "openrouteservice.org | OpenStreetMap contributors",
          service: "routing",
          timestamp: 1640713325240,
          query: {
            coordinates: [
              [8.681495, 49.41461],
              [8.687872, 49.420318],
            ],
            profile: "driving-car",
            format: "json",
          },
          engine: {
            version: "6.6.3",
            build_date: "2021-12-16T11:22:41Z",
            graph_date: "2021-12-23T23:32:17Z",
          },
        },
      },
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

      headers_responses: [
        {
          text: "Posted On",
          value: "created_at",
        },
        {
          text: "Required On",
          value: "needs_on",
        },

        {
          text: "Bags Managed",
          value: "bag_managed",
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
          text: "Hospital",
          value: "hospital_name",
        },
        {
          text: "Hospital Route",
          value: "hospital_route",
        },
      ],
      userData: {},
      phone_share_requests: [],
      self_blood_requests: [],
      self_blood_responses: [],
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
    axiosInstance.get("responses/self_responses/").then((r) => {
      this.self_blood_responses = r.data;
    });
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