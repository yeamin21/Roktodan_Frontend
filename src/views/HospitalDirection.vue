<template>
  <l-map :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-geo-json :geojson="geojson"></l-geo-json>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
import { axiosInstance } from "../services/backend";

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      geojson: null,
      dest_lat: "",
      dest_long: "",
      api_key: "5b3ce3597851110001cf6248b8a71494db804507aabc7b0d9cfe4428",
    };
  },
  async created() {
    if ("geolocation" in navigator) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      this.center = [position.coords.latitude, position.coords.longitude];
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    }

    const hospital_location = await axiosInstance.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          street: this.$route.params.address,
          city: this.$route.params.city,
          format: "json",
        },
      }
    );
    this.dest_lat = hospital_location.data[0].lat;
    this.dest_long = hospital_location.data[0].lon;

    const geodata = await axiosInstance.get(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        params: {
          api_key: this.api_key,
          start: `${this.longitude},${this.latitude}`,
          end: `${this.dest_long},${this.dest_lat}`,
        },
      }
    );
    this.geojson = geodata.data;
  },
};
</script>
