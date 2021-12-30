<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-center justify-center">
        <v-card elevation="2" outlined width="600px" class="px-4 pb-3">
          <v-card-title>Register</v-card-title>
          <v-divider></v-divider>
          <v-stepper elevation="0" v-model="e1" vertical>
            <v-stepper-step step="1" :complete="e1 > 1"
              >Required Informations</v-stepper-step
            >
            <v-stepper-content step="1">
              <v-form @submit.prevent="register" lazy-validation>
                <v-card elevation="0">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    required
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="first_name"
                    label="Fisrt Name"
                    required
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="last_name"
                    label="Last Name"
                    required
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    label="email"
                    required
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    required
                    :rules="nameRules"
                  />

                  <v-card-actions>
                    <v-btn
                      text
                      outlined
                      color="primary lighten-2"
                      type="submit"
                      :loading="signup_loading"
                    >
                      Register
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-stepper-content>

            <v-stepper-step :complete="e1 > 2" step="2"
              >Add Location</v-stepper-step
            >
            <v-stepper-content step="2">
              <v-card elevation="0">
                <v-text-field
                  label="address"
                  v-model="address.address"
                  :rules="nameRules"
                  ><v-icon
                    slot="append"
                    :color="located ? 'green' : null"
                    @click="locateMe"
                  >
                    mdi-map-marker</v-icon
                  ></v-text-field
                >
                <v-text-field
                  type="number"
                  label="Postcode"
                  v-model="address.postcode"
                  :rules="nameRules"
                ></v-text-field>
                <!-- :items="cities"
                  item-text="name"
                  item-value="name" -->
                <v-text-field
                  v-model="address.city"
                  label="City/State"
                  :rules="nameRules"
                >
                </v-text-field>
                <v-text-field
                  label="District"
                  v-model="address.district"
                  :rules="nameRules"
                >
                </v-text-field>
                <v-card-actions>
                  <v-btn
                    text
                    outlined
                    color="primary lighten-2"
                    @click="addAddress"
                  >
                    Add Address
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <v-stepper-step :complete="e1 > 3" step="3"
              >Complete Donor Profile</v-stepper-step
            >
            <v-stepper-content step="3">
              <v-card elevation="0" class="px-2">
                <v-select
                  label="Blood Group"
                  v-model="blood_group"
                  :items="blood_groups"
                  item-text="name"
                  item-value="id"
                  :rules="nameRules"
                >
                </v-select>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="last_donation_date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="last_donation_date"
                      label="Last Donation Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                     
                    >
                      <v-icon slot="prepend-inner">mdi-calendar</v-icon>
                      <v-icon
                        slot="append-inner"
                        color="red lighten-2"
                        @click="last_donation_date = ''"
                        >mdi-close-circle-outline</v-icon
                      ></v-text-field
                    >
                  </template>
                  <v-date-picker v-model="last_donation_date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text outlined color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(last_donation_date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>

                <v-text-field
                  v-model="phone"
                  label="Phone"
                  type="tel"
                  placeholder="+8801234567891"
                ></v-text-field>
                <v-checkbox
                  v-model="share_phone"
                  label="Share Phone Number"
                ></v-checkbox>
                <v-checkbox
                  v-model="is_donor"
                  label="Register Me as a Donor"
                ></v-checkbox>
                <v-card-actions>
                  <v-btn
                    outlined
                    color="green lighten-2"
                    @click="createDonorProfile"
                    >Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper>

          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { axiosInstance } from "../services/backend";
export default {
  data() {
    return {
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      phone: "",
      share_phone: "true",
      blood_group: "",
      is_donor: true,
      blood_groups: [],
      last_donation_date: "",
      signup_loading: false,
      address: {
        address: "",
        city: "",
        postcode: "",
        district: "",
        country: "",
      },
      show: false,
      eye_color: "green",
      e1: 1,
      modal: false,

      latitude: null,
      longitude: null,
      located: false,

      nameRules: [(v) => !!v || "This field is required"],

      // cities: [
      //   { id: 1, name: "Dhaka" },
      //   { id: 2, name: "Chittagong" },
      // ],
    };
  },
  created() {
    axiosInstance
      .get("/bloodgroups")
      .then((res) => (this.blood_groups = res.data));
  },
  methods: {
    register() {
      this.signup_loading = true;
      axiosInstance
        .post("/users/", {
          username: this.username,
          first_name: this.first_name,
          last_name: this.last_name,
          password: this.password,
          email: this.email,
        })
        .then(() => {
          this.$store
            .dispatch("user/login", {
              username: this.username,
              password: this.password,
            })
            .then(() => {
              this.signup_loading = false;
              this.e1 = 2;
            });
        })
        .catch(() => (this.signup_loading = false));
    },

    addAddress() {
      axiosInstance
        .post("/addresses/", {
          address: this.address.address,
          city: this.address.city,
          postcode: this.address.postcode,
          district: this.address.district,
          country: this.address.country,
        })
        .then(() => (this.e1 = 3));
    },
    createDonorProfile() {
      axiosInstance
        .post("/donors/", {
          blood_group: this.blood_group,
          is_donor: this.is_donor,
          phone: this.phone,
          share_phone: this.share_phone,
          last_donation_date: this.last_donation_date,
        })
        .then(() => (this.e1 = 4))
        .then(() => this.$router.push("/"));
    },
    toggleEye() {
      if (this.field_pass_type == "password") {
        this.field_pass_type = "text";
        this.eye_color = "red";
      } else if (this.field_pass_type == "text") {
        this.eye_color = "green";
        this.field_pass_type = "password";
      }
    },

    locateMe() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.located = true;
          this.getLocationDetails();
        });
      }
    },

    async getLocationDetails() {
      const locationProviderURL = "https://nominatim.openstreetmap.org";
      const dataFormat = "json";
      const locationDetails = await axios.get(
        `${locationProviderURL}/reverse?lat=${this.latitude}&lon=${this.longitude}&format=${dataFormat}`
      );

      const {
        quarter,
        suburb,
        municipality,
        city,
        postcode,
        state_district,
        country,
      } = locationDetails.data.address;

      this.address.address = [quarter && quarter, suburb, municipality]
        .filter(Boolean)
        .join();
      this.address.city = city;
      this.address.postcode = postcode;
      this.address.district = state_district.replace("District", "");
      this.address.country = country;
    },
  },
};
</script>

<style>
</style>