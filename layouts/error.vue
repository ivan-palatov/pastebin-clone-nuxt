<template>
  <v-card class="mx-auto mt-6" max-width="400">
    <v-card-title>
      <v-icon x-large color="warning" class="mr-3">
        mdi-alert-circle-outline
      </v-icon>
      {{ errorInfo.title }}
    </v-card-title>
    <v-card-text>{{ errorInfo.text }}</v-card-text>
    <v-card-actions>
      <v-btn text to="/" nuxt>to home page</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorInfo() {
      if (this.error.statusCode === 404) {
        return {
          title: 'Page not found',
          text: 'Page you were looking for does not exist.',
        };
      } else if (this.error.statusCode === 401) {
        return {
          title: 'Access denied',
          text: "You don't have access to this page.",
        };
      }

      return {
        title: 'Server is not responding',
        text:
          'It looks like the server is not available, please check your network and try again later',
      };
    },
  },
  head() {
    return {
      title: this.errorInfo.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.errorInfo.text,
        },
      ],
    };
  },
};
</script>
