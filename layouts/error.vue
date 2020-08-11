<template>
  <v-card class="mx-auto mt-6" max-width="400">
    <v-card-title>
      <v-icon x-large color="warning" class="mr-3">
        mdi-alert-circle-outline
      </v-icon>
      {{ error.error }}
    </v-card-title>
    <v-card-text>{{ error.message }}</v-card-text>
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
  head() {
    return {
      title: this.error.error,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.error.message,
        },
      ],
    };
  },
};
</script>
