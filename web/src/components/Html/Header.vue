<template>
  <div>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title to="/">gym-workout</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      fixed
      disable-resize-watcher
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ $t('components.header.welcome') }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ user.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <HeaderItem
          icon="mdi-view-dashboard"
          :title="$t('components.header.dashboard')"
          to="/dashboard"
        />
        <HeaderItem
          icon="mdi-dumbbell"
          :title="$t('components.header.trainings')"
          to="/trainings"
        />
        <HeaderItem
          icon="mdi-account"
          :title="$t('components.header.account')"
          to="/account"
        />
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-item @click="logout" link>
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{
              $t('components.header.logout')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider />
        <div class="px-4 py-2 d-flex">
          <ButtonDarkMode />
          <v-spacer />
          <LanguageSelector />
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import HeaderItem from './HeaderItem'

import ButtonDarkMode from '../Utils/ButtonDarkMode'
import LanguageSelector from '../Utils/LanguageSelector'

export default {
  name: 'Header',
  components: {
    HeaderItem,
    ButtonDarkMode,
    LanguageSelector,
  },
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    ...mapActions(['doLogout']),
    async logout() {
      try {
        await this.doLogout()
        this.$router.push('/login')
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
  },
}
</script>
