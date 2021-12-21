<template>
  <v-card class="px-4">
    <v-card-title> Add a Blood Request </v-card-title>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-select
              label="Blood Group"
              v-model="blood_group"
              :items="blood_groups"
              item-text="name"
              item-value="id"
            >
            </v-select>
          </v-col>
          <v-col>
            <v-text-field
              label="No of Bag Required"
              v-model="no_bag_required"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-autocomplete
          label="Hospital"
          :items="hospitals"
          item-text="name"
          item-value="id"
          v-model="hospital"
        ></v-autocomplete>
        <v-text-field
          label="Additional Contact Number"
          v-model="phone_additional"
          type="tel"
        ></v-text-field>
        <v-row>
          <v-col>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Need at Date"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Need at Time"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="time"
                full-width
                ampm-in-title
                format="ampm"
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-checkbox label="Emergency" v-model="is_emergency"></v-checkbox>
      <v-spacer></v-spacer>
      <v-btn text @click="addBloodRequest">Submit</v-btn>
    </v-card-actions>

    <v-snackbar v-model="snackbar" :timeout="2000">
      Request Successfully Added
    </v-snackbar>
  </v-card>
</template>

<script>
import { axiosInstance } from "../services/backend";
export default {
  emits: ["closeDialog"],
  data() {
    return {
      hospitals: [],
      hospital: "",
      no_bag_required: "",
      needs_on: "",
      time: "",
      menu2: false,
      is_emergency: false,
      phone_additional: "",
      date: "",
      menu: false,
      blood_groups: [],
      blood_group: "",
      snackbar: false,
    };
  },
  created() {
    axiosInstance
      .get("/bloodgroups")
      .then((res) => (this.blood_groups = res.data));
    axiosInstance.get("/hospitals").then((res) => (this.hospitals = res.data));
  },
  methods: {
    addBloodRequest() {
      axiosInstance
        .post("/requests/", {
          hospital: this.hospital,
          no_bag_required: this.no_bag_required,
          blood_group: this.blood_group,
          needs_on: this.data && this.time ? `${this.date} ${this.time}` : null,
          is_emergency: this.is_emergency,
          phone_additional: this.phone_additional,
        })
        .then(() => {
          //this.snackbar = true;
          this.$store.dispatch("requests/get");
          this.$emit("closeDialog");
        });
    },
  },
};
</script>

<style>
</style>