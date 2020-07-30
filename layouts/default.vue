<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped app right>
      <v-list dense>
        <v-list-item v-for="link in links" :key="link.text" link>
          <v-list-item-action>
            <v-icon>mdi-clipboard-text-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-right dense color="primary" dark>
      <v-toolbar-title>
        Pastebin Clone
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      links: [{ text: 'Link 1' }, { text: 'Link 2' }],
    };
  },
};
</script>
