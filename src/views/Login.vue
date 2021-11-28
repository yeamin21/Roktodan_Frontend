<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-center justify-center">
        <v-card elevation="2" outlined width="600px" class="px-4 pb-3">
          <v-card-title>Login</v-card-title>
          <v-divider></v-divider>
          <v-text-field label="Username" v-model="username"></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field>
          <v-card-actions>
            <v-btn outlined color="green lighten-2" @click="authenticate">
              Login
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red lighten-2" outlined text> Forgot Password?</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return { username: "", password: "" };
  },
  methods: {
    authenticate() {
      console.log(this.$store);
      this.$store.dispatch("user/login", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style>
</style>