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
            :items="langItems"
          />
          <transition name="slide-fade">
            <v-checkbox
              v-show="isAuthorized && exposure !== 'private'"
              v-model="asGuest"
              label="Paste as guest"
              dense
            />
          </transition>
          <v-btn type="submit" color="primary">Create New Paste</v-btn>
        </v-col>
        <v-col v-if="!isAuthorized" cols="12" sm="5">
          <h3 class="mb-3">User details</h3>
          <v-card class="fl">
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
          </v-card>
          <h4 class="mt-4">
            Or login with socials
          </h4>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="#4A76A8">mdi-vk</v-icon>
              </v-btn>
            </template>
            <span>Vkontakte</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="#1DA1F2">mdi-twitter</v-icon>
              </v-btn>
            </template>
            <span>Twitter</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="#3B5998">mdi-facebook</v-icon>
              </v-btn>
            </template>
            <span>Facebook</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="#24292E">mdi-github</v-icon>
              </v-btn>
            </template>
            <span>Github</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="#FC6D27">mdi-gitlab</v-icon>
              </v-btn>
            </template>
            <span>Gitlab</span>
          </v-tooltip>
        </v-col>

        <v-col v-else cols="12" sm="5">
          <h3 class="mb-3">User details</h3>
          <v-card class="fl">
            <v-avatar color="warning" size="64" class="mr-4">
              <v-icon v-if="!user.avatar" dark>
                mdi-account-circle
              </v-icon>
              <img v-else :src="user.avatar" alt="Avatar" />
            </v-avatar>
            <div class="fl fl-col">
              <strong>{{ user.name }}</strong>
              <nuxt-link :to="'/u/' + user.name">My Pastebin</nuxt-link>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-progress-linear v-if="loading" indeterminate color="warning" />
    </v-container>
  </form>
</template>

<script>
import { pasteSettings } from '@/mixins/pasteSettings';

export default {
  mixins: [pasteSettings],
  data() {
    return {
      loading: false,
      isAuthorized: true, // TODO: change to an actual isAuthorized
      user: {
        name: 'ZVER3D',
      }, // TODO: same as the above
      asGuest: false,
      text: '',
      title: '',
      exposure: 'public',
      expiration: 0,
      lang: 'text',
    };
  },
  methods: {
    create() {
      this.loading = true;
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
