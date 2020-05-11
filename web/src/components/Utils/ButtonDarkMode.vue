<template>
  <v-btn @click="darkMode" icon>
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ButtonDarkMode',
  computed: {
    ...mapState(['user']),
    icon() {
      return this.user.darkMode ? 'mdi-brightness-4' : 'mdi-brightness-7'
    },
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    ...mapActions(['toggleDarkMode']),
    async darkMode() {
      try {
        await this.toggleDarkMode(!this.user.darkMode)
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
  },
}
</script>
