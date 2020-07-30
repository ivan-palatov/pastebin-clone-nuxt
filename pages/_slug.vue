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
  </v-container>
</template>

<script>
export default {
  async asyncData({ $axios, params, error }) {
    const data = await $axios.$get('/paste/' + params.slug);
    return { paste: data };
  },
  data() {
    return {
      isDark: false,
      paste: {},
    };
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: this.isDark ? '/dark.css' : 'light.css',
        },
      ],
      title: this.paste.title ? this.paste.title : this.paste.text.slice(0, 20),
    };
  },
};
</script>
