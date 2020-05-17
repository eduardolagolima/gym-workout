<template>
  <div>
    <DatePicker class="py-3" :type="type" @changeDate="date = $event" />
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
import api from '../../../services/api'

export default {
  name: 'Muscle',
  components: {
    DatePicker,
    BarChart,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: type => ['month', 'year'].includes(type),
    },
  },
  data: () => ({
    date: null,
    chartData: {},
  }),
  computed: {
    muscleGroups() {
      return muscleGroups.call(this)
    },
  },
  watch: {
    date() {
      this.getMuscle()
    },
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    async getMuscle() {
      try {
        const response = await api.get(
          `user/dashboard/muscle/${this.type}/${this.date}`
        )

        const muscle = response.data.muscle

        const quantities = this.muscleGroups.map(({ value }) =>
          muscle[value] ? muscle[value] : 0
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
}
</script>
