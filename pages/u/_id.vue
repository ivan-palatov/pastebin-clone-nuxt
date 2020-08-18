<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-avatar color="warning" size="64" class="mr-4">
                <v-icon v-if="!userInfo.photo" dark>
                  mdi-account-circle
                </v-icon>
                <img v-else :src="userInfo.photo" alt="Photo" />
              </v-avatar>
              <b>{{ userInfo.name }}</b>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-list two-line>
              <v-subheader>{{ subheader }}</v-subheader>
              <v-list-item
                v-for="paste in userInfo.pastes"
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
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          <v-icon small class="ml-2">mdi-web</v-icon>
                          <span class="text-caption">{{ paste.lang }}</span>
                        </span>
                      </template>
                      <span>Paste language</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          <v-icon small class="ml-2">mdi-calendar-month</v-icon>
                          <span class="text-caption">{{ paste.timeAgo }}</span>
                        </span>
                      </template>
                      <span>{{ paste.date }}</span>
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
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  async asyncData({ $axios, params, error }) {
    try {
      const userInfo = await $axios.$get(`/users/${params.id}`);
      userInfo.pastes = userInfo.pastes.map((paste) => ({
        ...paste,
        timeAgo: moment(paste.date).locale('ru-ru').fromNow(),
      }));

      return { userInfo }; // also contains pastes
    } catch (e) {
      error(e.response.data);
    }
  },
  computed: {
    ...mapState('user', ['user']),
    subheader() {
      return this.user && this.user.id === parseInt(this.$route.params.id)
        ? 'My latest pastes'
        : this.userInfo.name + "'s latest pastes";
    },
  },
};
</script>
