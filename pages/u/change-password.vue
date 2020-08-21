<template>
  <v-card elevation="12" max-width="600" class="mx-auto my-6">
    <v-form @submit.prevent="changePassword">
      <v-card-text>
        <v-text-field
          v-model="currentPassword"
          required
          label="Current Password (leave empty if setting your password for the first time)"
          prepend-icon="mdi-lock"
          :type="showCurrentPassword ? 'text' : 'password'"
          :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showCurrentPassword = !showCurrentPassword"
        />
        <v-text-field
          v-model="newPassword"
          required
          label="New Password"
          :error-messages="newPasswordErrors"
          prepend-icon="mdi-lock"
          :type="showNewPassword ? 'text' : 'password'"
          :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showNewPassword = !showNewPassword"
          @blur="$v.newPassword.$touch()"
        />
        <v-text-field
          v-model="newPassword2"
          required
          label="Confirm new password"
          :error-messages="newPassword2Errors"
          prepend-icon="mdi-lock"
          :type="showNewPassword2 ? 'text' : 'password'"
          :append-icon="showNewPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showNewPassword2 = !showNewPassword2"
          @blur="$v.newPassword2.$touch()"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" type="submit" :loading="loading">
          Change Password
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      newPassword2: '',
      showCurrentPassword: false,
      showNewPassword: false,
      showNewPassword2: false,
      loading: false,
    };
  },
  validations: {
    newPassword: { required, minLength: minLength(6) },
    newPassword2: { required, sameAs: sameAs('newPassword') },
  },
  computed: {
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.minLength &&
        errors.push('Password must be at least 6 characters long');
      !this.$v.newPassword.required && errors.push('Password is required');

      return errors;
    },
    newPassword2Errors() {
      const errors = [];
      if (!this.$v.newPassword2.$dirty) return errors;
      !this.$v.newPassword2.sameAs && errors.push('Passwords must match');
      !this.$v.newPassword2.required &&
        errors.push('Password confirmation is required');

      return errors;
    },
  },
  mounted() {
    if (!this.$store.state.user.user) {
      this.$nuxt.error({
        statusCode: 403,
        error: 'Unauthorized',
        message: 'You are not authorized to edit this profile',
      });
    }
  },
  methods: {
    async changePassword() {
      this.$v.$touch();
      if (this.$v.invalid) {
        return;
      }
      this.loading = true;
      try {
        await this.$axios.patch('/users/change-password', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        });
        window.location.replace(
          'http://localhost:3000/u/' + this.$store.state.user.user.id
        );
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
