<template>
  <Content :key="key">
    <v-tabs v-model="tab" center-active centered>
      <v-tab>{{ $t('views.dashboard.frequency.title') }}</v-tab>
      <v-tab>{{ $t('views.dashboard.muscle_per_month.title') }}</v-tab>
      <v-tab>{{ $t('views.dashboard.muscle_per_year.title') }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="mt-3">
      <v-tab-item>
        <Frequency />
      </v-tab-item>
      <v-tab-item>
        <Muscle type="month" />
      </v-tab-item>
      <v-tab-item>
        <Muscle type="year" />
      </v-tab-item>
    </v-tabs-items>
  </Content>
</template>

<script>
import { mapState } from 'vuex'

import Content from '../../components/Html/Content'

import Frequency from './Frequency/Frequency'
import Muscle from './Muscle/Muscle'

export default {
  name: 'Dashboard',
  components: {
    Content,
    Frequency,
    Muscle,
  },
  data: () => ({
    tab: null,
    key: 1,
  }),
  computed: {
    ...mapState(['user']),
    userLocale() {
      return this.user.locale
    },
  },
  watch: {
    userLocale() {
      if (this.user.token) {
        this.key += 1
      }
    },
  },
}
</script>
