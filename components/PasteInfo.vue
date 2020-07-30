<template>
  <v-card raised class="fl pa-4">
    <div class="mr-4">
      <v-avatar color="warning" size="64">
        <v-icon v-if="!paste.author || !paste.author.avatar" dark>
          mdi-account-circle
        </v-icon>
        <img v-else :src="paste.author.avatar" alt="Avatar" />
      </v-avatar>
    </div>
    <div class="cont">
      <h1 class="text-h6">{{ title }}</h1>
      <div>
        <v-icon small>mdi-account</v-icon>
        <nuxt-link
          v-if="paste.author"
          class="text-caption"
          :to="'/u/' + paste.author.name"
          >{{ paste.author.name }}</nuxt-link
        >
        <span v-else class="text-caption">A GUEST</span>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon small class="ml-2">mdi-calendar-month</v-icon>
              <span class="text-caption">21.12.1995 (EDITED)</span>
            </span>
          </template>
          <span>21.12.1995 full date stuff</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon small class="ml-2">mdi-eye</v-icon>
              <span class="text-caption">105</span>
            </span>
          </template>
          <span>Amount of visits to this paste</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon small class="ml-2">mdi-timer</v-icon>
              <span class="text-caption">1 HOUR</span>
            </span>
          </template>
          <span>When this paste gets automaicaly deleted</span>
        </v-tooltip>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'PasteInfo',
  props: {
    paste: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      return this.paste.title ? this.paste.title : 'Untitled';
    },
  },
};
</script>

<style scoped>
.fl {
  display: flex;
  align-items: center;
}

.cont {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
