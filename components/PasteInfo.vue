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
      <h1 class="text-h6 mb-3">{{ title }}</h1>
      <div class="fl cont-info">
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
              <span class="text-caption">{{ date }}</span>
            </span>
          </template>
          <span>{{ fullDate }}</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon small class="ml-2">mdi-eye</v-icon>
              <span class="text-caption">{{ paste.views }}</span>
            </span>
          </template>
          <span>Amount of visits to this paste</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-icon small class="ml-2">mdi-timer</v-icon>
              <span class="text-caption">{{ expiresIn }}</span>
            </span>
          </template>
          <span>When this paste gets automaicaly deleted</span>
        </v-tooltip>
      </div>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment';

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
    date() {
      return new Date(this.paste.date).toLocaleString(['ru-RU', 'en-US'], {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },
    fullDate() {
      return new Date(this.paste.date).toLocaleString(['ru-RU', 'en-US']);
    },
    expiresIn() {
      if (!this.paste.expiresIn) {
        return 'НИКОГДА';
      }

      return moment(this.paste.expiresIn).locale('ru-ru').fromNow();
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

.cont-info {
  flex-wrap: wrap;
}
</style>
