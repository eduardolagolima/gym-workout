<template>
  <v-menu v-model="menu" top offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on">
        <v-icon left small>mdi-translate</v-icon>
        <span class="text-capitalize">{{ userLanguage.name }}</span>
        <v-icon right>mdi-menu-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="language of languages"
        :key="language.locale"
        @click="locale(language.locale)"
      >
        <v-list-item-title>{{ language.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'LanguageSelector',
  data: () => ({
    languages: [
      {
        locale: 'en',
        name: 'English',
      },
      {
        locale: 'pt_BR',
        name: 'Português',
      },
    ],
    menu: false,
  }),
  computed: {
    ...mapState(['user']),
    userLanguage() {
      return this.languages.find(({ locale }) => locale === this.user.locale)
    },
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    ...mapActions(['changeLocale']),
    async locale(locale) {
      try {
        await this.changeLocale(locale)
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
  },
}
</script>

<style></style>
