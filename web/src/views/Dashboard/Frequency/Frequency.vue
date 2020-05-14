<template>
  <div>
    <DatePicker class="py-3" type="year" @changeDate="year = $event" />
    <v-card>
      <BarChart :chart-data="chartData" />
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import BarChart from '../../../components/Chart/BarChart'
import DatePicker from '../../../components/Utils/DatePicker'
import api from '../../../services/api'

export default {
  name: 'Frequency',
  components: {
    DatePicker,
    BarChart,
  },
  data: () => ({
    year: null,
    chartData: {},
  }),
  watch: {
    year() {
      this.getFrequency()
    },
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    async getFrequency() {
      try {
        const response = await api.get(`/dashboard/frequency/${this.year}`)

        const frequency = response.data.frequency
        const months = frequency.map(({ month }) => month)
        const trainingDays = frequency.map(({ trainingDays }) => trainingDays)
        const daysInMonth = frequency.map(({ daysInMonth }) => daysInMonth)

        this.chartData = {
          labels: months,
          datasets: [
            {
              label: this.$t('views.dashboard.frequency.trained_days'),
              backgroundColor: '#7ba',
              data: trainingDays,
            },
            {
              label: this.$t('views.dashboard.frequency.days_in_month'),
              backgroundColor: '#3f67a8',
              data: daysInMonth,
            },
          ],
        }
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
  },
}
</script>
