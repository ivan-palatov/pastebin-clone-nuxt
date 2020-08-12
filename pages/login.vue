<template>
  <v-card elevation="12" class="mx-auto my-6" max-width="400">
    <v-toolbar color="primary" dark flat dense>
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="email"
          required
          label="Email"
          type="email"
          prepend-icon="mdi-email"
          :error-messages="emailErrors"
          @blur="$v.email.$touch()"
        />
        <v-text-field
          v-model="password"
          required
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="passwordErrors"
          @click:append="showPassword = !showPassword"
          @blur="$v.password.$touch()"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" :disabled="loading" @click="login">
        Login
      </v-btn>
    </v-card-actions>
    <v-progress-linear v-if="loading" indeterminate color="warning" />
  </v-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      showPassword: false,
    };
  },
  validations: {
    email: { required },
    password: { required },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('Email is required');

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required');

      return errors;
    },
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.loading = true;
      await this.$store.dispatch('user/login', {
        email: this.email,
        password: this.password,
      });
      this.loading = false;
      this.$router.push('/');
    },
  },
};
</script>
