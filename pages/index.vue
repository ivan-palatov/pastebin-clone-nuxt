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
        <v-col cols="12" sm="7">
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
            v-model="expiresIn"
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
            :items="langItems"
          />
          <transition name="slide-fade">
            <v-checkbox
              v-show="user && exposure !== 'private'"
              v-model="asGuest"
              label="Paste as guest"
              dense
            />
          </transition>
          <v-alert v-model="alert" type="error" outlined dense dismissible>{{
            serverError
          }}</v-alert>
          <v-btn type="submit" color="primary">Create New Paste</v-btn>
        </v-col>
        <v-col v-if="!user" cols="12" sm="5">
          <h3 class="mb-3">User details</h3>
          <v-card>
            <v-card-text class="fl">
              <v-avatar color="warning" size="64" class="mr-4">
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
              <div class="fl fl-col">
                <span>Hello, <strong>Guest</strong></span>
                <span>
                  <nuxt-link to="/login">Login</nuxt-link> or
                  <nuxt-link to="/register">Register</nuxt-link>
                </span>
              </div>
            </v-card-text>
            <v-card-actions>
              <auth-links class="ml-2" />
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col v-else cols="12" sm="5">
          <h3 class="mb-3">User details</h3>
          <v-card>
            <v-card-text class="fl">
              <v-avatar color="warning" size="64" class="mr-4">
                <v-icon v-if="!user.photo" dark>
                  mdi-account-circle
                </v-icon>
                <img v-else :src="user.photo" alt="Photo" />
              </v-avatar>
              <div class="fl fl-col">
                <strong>{{ user.name }}</strong>
                <nuxt-link :to="'/u/' + user.id">My Pastebin</nuxt-link>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-progress-linear v-if="loading" indeterminate color="warning" />
    </v-container>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { pasteSettings } from '@/mixins/pasteSettings';

export default {
  mixins: [pasteSettings],
  data() {
    return {
      loading: false,
      asGuest: false,
      text: '',
      title: '',
      exposure: 'PUBLIC',
      expiresIn: null,
      lang: 'text',
      alert: false,
      serverError: '',
    };
  },
  computed: mapState('user', ['user']),
  methods: {
    async create() {
      this.alert = false;
      this.loading = true;
      try {
        const { shortId } = await this.$axios.$post('/pastes', {
          title: this.title,
          text: this.text,
          exposure: this.exposure,
          expiresIn: this.expiresIn,
          lang: this.lang,
          asUser: !this.asGuest,
        });
        this.$router.push(`/${shortId}`);
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

<style scoped>
.create-form {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.fl {
  display: flex;
}

.fl-col {
  flex-direction: column;
  justify-content: space-evenly;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
