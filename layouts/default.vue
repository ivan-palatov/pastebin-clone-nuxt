<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped app right>
      <v-list dense subheader nav two-line>
        <v-subheader>Public Pastes</v-subheader>
        <v-list-item
          v-for="paste in pastes"
          :key="paste.shortId"
          :to="'/' + paste.shortId"
          nuxt
        >
          <v-list-item-avatar>
            <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ paste.title ? paste.title : paste.text.slice(0, 20) }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ paste.lang }} | {{ paste.timeAgo }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-right dense color="primary" dark>
      <v-toolbar-title>
        <nuxt-link class="toolbar__title" to="/">
          Pastebin Clone
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text rounded v-bind="attrs" v-on="on" @click="toggleDarkTheme">
            <v-icon v-if="$vuetify.theme.dark">mdi-brightness-5</v-icon>
            <v-icon v-else>mdi-brightness-2</v-icon>
          </v-btn>
        </template>
        <span>Toggle dark theme</span>
      </v-tooltip>
      <span v-if="!user">
        <v-btn nuxt to="/login" text rounded>Login</v-btn>
        <v-btn nuxt to="/register" text rounded>Register</v-btn>
      </span>
      <span v-else>
        {{ user.name }}
        <v-btn text rounded @click="logout">Logout</v-btn>
      </span>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  async fetch() {
    await this.$store.dispatch('paste/fetchPastes');
  },
  data() {
    return {
      drawer: null,
    };
  },
  computed: {
    ...mapState('paste', ['pastes']),
    ...mapState('user', ['user']),
  },
  mounted() {
    const theme = localStorage.getItem('theme');
    if (theme && theme === 'true') {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }

    // Authentication
    if (!localStorage.getItem('token')) {
      return;
    }
    this.$store.dispatch('user/authorize');
  },
  methods: {
    ...mapActions('user', ['logout']),
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('theme', this.$vuetify.theme.dark.toString());
    },
  },
};
</script>

<style scoped>
.toolbar__title {
  color: inherit;
  text-decoration: inherit;
}
</style>
