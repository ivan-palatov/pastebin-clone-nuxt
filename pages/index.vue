<template>
  <form class="create-form" @submit.prevent="create">
    <v-container>
      <v-row>
        <v-col>
          <h3 class="mb-3">New Paste</h3>
          <v-textarea v-model="text" rows="10" outlined label="Paste text" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <h3 class="mb-3">Optional Paste Settings</h3>
          <v-text-field v-model="title" label="Paste Title" outlined dense />
          <v-select
            v-model="exposure"
            label="Paste Exposure"
            outlined
            dense
            :items="exposureItems"
          />
          <v-select
            v-model="expiration"
            label="Paste Expiration"
            outlined
            dense
            :items="expirationItems"
          />
          <v-autocomplete
            v-model="lang"
            label="Syntax Highlighting"
            outlined
            dense
          />
          <v-checkbox
            v-if="isAuthorized"
            v-model="asGuest"
            label="Paste as guest"
            dense
          />
          <v-btn type="submit" color="primary">Create New Paste</v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <!-- Authorization stuff goes here -->
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isAuthorized: true, // TODO: change to an actual isAuthorized
      asGuest: true,
      text: '',
      title: '',
      exposure: 'public',
      expiration: 'Never',
      lang: 'None',
      exposureItems: [
        'public',
        'unlisted',
        { value: 'private', text: 'private', disabled: true },
      ],
      expirationItems: [
        'Never',
        '10 Minutes',
        '1 Hour',
        '1 Day',
        '1 Week',
        '2 Weeks',
        '1 Month',
        '6 Months',
        '1 Year',
      ],
    };
  },
};
</script>

<style scoped>
.create-form {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
