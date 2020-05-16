<template>
  <Content sm="8" md="6" lg="4">
    <DatePicker type="day" class="mb-3" @changeDate="day = $event" />
    <v-alert v-if="trainedMuscleGroups.length > 0" class="mb-3" type="success">
      {{ $t('views.trainings.feedback.positive') }}
    </v-alert>
    <v-alert v-else class="mb-3" type="error">
      {{ $t('views.trainings.feedback.negative') }}
    </v-alert>
    <v-card>
      <v-list subheader>
        <v-subheader>{{ $t('views.trainings.question') }}</v-subheader>
        <template v-for="muscleGroup in muscleGroups">
          <v-list-item :key="muscleGroup.value">
            <v-list-item-action>
              <v-checkbox
                v-model="trainedMuscleGroups"
                :value="muscleGroup.value"
                color="ligth"
                @change="updateTrainedMuscleGroups"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{
                muscleGroup.description
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </Content>
</template>

<script>
import { mapMutations } from 'vuex'

import Content from '../../components/Html/Content'
import DatePicker from '../../components/Utils/DatePicker'
import muscleGroups from '../../helpers/muscleGroups'
import api from '../../services/api'

export default {
  name: 'Trainings',
  components: {
    Content,
    DatePicker,
  },
  data() {
    return {
      day: null,
      trainedMuscleGroups: [],
    }
  },
  computed: {
    muscleGroups() {
      return muscleGroups.call(this)
    },
  },
  watch: {
    day() {
      this.getTrainedMuscleGroups()
    },
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    async getTrainedMuscleGroups() {
      try {
        const response = await api.get(`/trainings/${this.day}`)
        this.trainedMuscleGroups = response.data.trainedMuscleGroups
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
    async updateTrainedMuscleGroups() {
      try {
        await api.put(`/trainings/${this.day}`, {
          trainedMuscleGroups: this.trainedMuscleGroups,
        })
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
  },
}
</script>
