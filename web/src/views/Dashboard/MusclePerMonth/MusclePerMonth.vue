<template>
  <div>
    <DatePicker class="py-3" type="month" @changeDate="month = $event" />
    <v-card>
      <BarChart :chart-data="chartData" />
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import BarChart from '../../../components/Chart/BarChart'
import DatePicker from '../../../components/Utils/DatePicker'
import muscleGroups from '../../../helpers/muscleGroups'
import request from '../../../services/request'

export default {
  name: 'MusclePerMonth',
  data: () => ({
    month: null,
    chartData: {},
  }),
  computed: {
    muscleGroups() {
      return muscleGroups.call(this)
    },
  },
  components: {
    DatePicker,
    BarChart,
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    async getMusclePerMonth() {
      try {
        const response = await request(
          'get',
          `/dashboard/muscle/month/${this.month}`
        )

        const musclePerMonth = response.data.musclePerMonth

        const quantities = this.muscleGroups.map(({ value }) =>
          musclePerMonth[value] ? musclePerMonth[value] : 0
        )

        this.chartData = {
          labels: this.muscleGroups.map(({ description }) => description),
          datasets: [
            {
              label: this.$t('views.dashboard.muscle_per_month.quantity'),
              backgroundColor: '#3f67a8',
              data: quantities,
            },
          ],
        }
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
  },
  watch: {
    month() {
      this.getMusclePerMonth()
    },
  },
}
</script>
