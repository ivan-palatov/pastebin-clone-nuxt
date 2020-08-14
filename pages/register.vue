<template>
  <v-card elevation="12" class="mx-auto my-6" max-width="400">
    <v-toolbar color="primary" dark flat dense>
      <v-toolbar-title>Register</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="register">
        <v-text-field
          v-model="name"
          required
          label="Name"
          prepend-icon="mdi-account"
          :error-messages="nameErrors"
          :counter="25"
          @blur="$v.name.$touch()"
        />
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
        <v-text-field
          v-model="password2"
          required
          label="Confirm Password"
          :type="showPassword2 ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="password2Errors"
          @click:append="showPassword2 = !showPassword2"
          @blur="$v.password2.$touch()"
        />
      </v-form>
      <v-alert v-model="alert" type="error" outlined dense dismissible>{{
        serverError
      }}</v-alert>
    </v-card-text>
    <v-card-actions>
      <auth-links />
      <v-spacer />
      <v-btn color="primary" :disabled="loading" @click="register">
        Register
      </v-btn>
    </v-card-actions>
    <v-progress-linear v-if="loading" indeterminate color="warning" />
  </v-card>
</template>

<script>
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      loading: false,
      name: '',
      email: '',
      password: '',
      password2: '',
      showPassword: false,
      showPassword2: false,
      serverError: null,
      alert: false,
    };
  },
  validations: {
    name: { required, minLength: minLength(2), maxLength: maxLength(25) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    password2: { required, sameAs: sameAs('password') },
  },
  computed: {
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
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be a valid e-mail');
      !this.$v.email.required && errors.push('Email is required');

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push('Password must be at least 6 characters long');
      !this.$v.password.required && errors.push('Password is required');

      return errors;
    },
    password2Errors() {
      const errors = [];
      if (!this.$v.password2.$dirty) return errors;
      !this.$v.password2.sameAs && errors.push('Passwords must match');
      !this.$v.password2.required &&
        errors.push('Password confirmation is required');

      return errors;
    },
  },
  methods: {
    async register() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.loading = true;
      this.alert = false;
      try {
        await this.$axios.post('/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        this.$router.push('/login');
      } catch (e) {
        this.alert = true;
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
