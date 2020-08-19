<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <paste-info :paste="paste" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <prism-text :paste="paste" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          rows="10"
          no-resize
          outlined
          label="RAW Paste Data"
          :value="paste.text"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $axios, params, error }) {
    try {
      const paste = await $axios.$get('/pastes/id/' + params.slug);
      return { paste };
    } catch (e) {
      error(e.response.data);
    }
  },
  data() {
    return {
      paste: {},
    };
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: this.$vuetify.theme.dark ? '/dark.css' : 'light.css',
        },
      ],
      title: this.paste.title ? this.paste.title : this.paste.text.slice(0, 20),
    };
  },
};
</script>
