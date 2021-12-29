<template>
  <div>
    <l-map :zoom="zoom" :center="[latitude, longitude]">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-geo-json :geojson="geojson"></l-geo-json>
    </l-map>
  </div>
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
      des_lat:"",
      des_lon:"",
      latitude: "",
      longitude: "",
      located: false,
      api_key: "5b3ce3597851110001cf6248b8a71494db804507aabc7b0d9cfe4428",
      geojson: null,
    };
  },
  beforeMount() {},
  created() {
    
    axiosInstance.get('https://nominatim.openstreetmap.org/search.php',{params:{
      street: this.$route.params.address,
      city: this.$route.params.city,  
      format: 'json',
    }}).then((r)=>{
      this.des_lat = r.data.lat
      this.des_lon = r.data.lon
    }).then(()=>this.locateMe())
    
  },
  computed: {
    center() {
      return [this.latitude, this.longitude];
    },
  },
  methods: {
    locateMe() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.located = true;
          axiosInstance
            .get("https://api.openrouteservice.org/v2/directions/driving-car", {
              params: {
                api_key: this.api_key,
                start: `${position.coords.longitude},${position.coords.latitude}`,
                end:`${this.des_lon},${this.des_lat}`,,
              },
            })
            .then((response) => (this.geojson = response.data));

          // this.latitude = position.coords.latitude;
          // this.longitude = position.coords.longitude;
          // this.located = true;
        });
      }
    },
  },
};
</script>