<template>
  <Content :key="key">
    <v-tabs v-model="tab" center-active centered>
      <v-tab>{{ $t('views.dashboard.frequency.title') }}</v-tab>
      <v-tab>{{ $t('views.dashboard.muscle_per_month.title') }}</v-tab>
      <v-tab>{{ $t('views.dashboard.muscle_per_year.title') }}</v-tab>
    </v-tabs>

    <v-tabs-items class="mt-3" v-model="tab">
      <v-tab-item>
        <Frequency />
      </v-tab-item>
      <v-tab-item>
        <MusclePerMonth />
      </v-tab-item>
      <v-tab-item>
        <MusclePerYear />
      </v-tab-item>
    </v-tabs-items>
  </Content>
</template>

<script>
import { mapState } from 'vuex'

import Content from '../../components/Html/Content'

import Frequency from './Frequency/Frequency'
import MusclePerMonth from './MusclePerMonth/MusclePerMonth'
import MusclePerYear from './MusclePerYear/MusclePerYear'

export default {
  name: 'Dashboard',
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
  components: {
    Content,
    Frequency,
    MusclePerMonth,
    MusclePerYear,
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
