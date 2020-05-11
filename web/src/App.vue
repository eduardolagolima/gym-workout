<template>
  <v-app>
    <router-view></router-view>
    <Snackbar />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import Snackbar from './components/Utils/Snackbar'

export default {
  components: {
    Snackbar,
  },
  computed: {
    ...mapState(['user']),
    darkMode() {
      return this.user.darkMode
    },
    locale() {
      return this.user.locale
    },
  },
  watch: {
    darkMode() {
      this.$vuetify.theme.dark = this.darkMode
    },
    locale() {
      this.$i18n.locale = this.locale
    },
  },
  created() {
    this.$vuetify.theme.dark = this.darkMode
    this.$i18n.locale = this.locale
  },
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
