<template>
  <v-card max-width="400" class="mx-auto my-6">
    <v-form @submit.prevent="editProfile">
      <v-card-text>
        <v-text-field
          v-model="name"
          required
          label="Name"
          type="text"
          :error-messages="nameErrors"
          @blur="$v.name.$touch()"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" type="submit">Update</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      name: this.$store.state.user.user.name,
      loading: false,
    };
  },
  validations: {
    name: { required, minLength: minLength(2), maxLength: maxLength(25) },
  },
  computed: {
    ...mapState('user', ['user']),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push('Name must be at least 2 characters');
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 25 characters');
      !this.$v.name.required && errors.push('Name is required');

      return errors;
    },
  },
  mounted() {
    if (!this.user) {
      this.$nuxt.error({
        statusCode: 403,
        error: 'Unauthorized',
        message: 'You are not authorized to edit this profile',
      });
    }
  },
  methods: {
    async edit() {
      this.$v.touch();
      if (this.$v.invalid) {
        return;
      }
      this.loading = true;
      try {
        await this.$axios.put('/users/' + this.user.id, { name: this.name });
        window.location.reload();
      } catch (e) {
        if (e.response && e.response.data) {
          this.serverError = e.response.data.message;
          return;
        }
        this.serverError = 'Server is not responding.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
