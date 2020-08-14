<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" @click="vk" v-on="on">
          <v-icon color="#4A76A8">mdi-vk</v-icon>
        </v-btn>
      </template>
      <span>Vk.com</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" @click="google" v-on="on">
          <v-icon color="#1DA1F2">mdi-google</v-icon>
        </v-btn>
      </template>
      <span>Google</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" @click="github" v-on="on">
          <v-icon color="#24292E">mdi-github</v-icon>
        </v-btn>
      </template>
      <span>Github</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  methods: {
    vk() {
      window.open(
        'http://localhost:4000/api/auth/vk',
        'OAuth',
        `status=no,menubar=no,toolbar=no,location=no,width=400,height=500`
      );
    },
    google() {
      window.open(
        'http://localhost:4000/api/auth/google',
        'OAuth',
        `status=no,menubar=no,toolbar=no,location=no,width=400,height=500`
      );
    },
    github() {
      window.open(
        'http://localhost:4000/api/auth/github',
        'OAuth',
        `status=no,menubar=no,toolbar=no,location=no,width=400,height=500`
      );
    },
  },
};
</script>
