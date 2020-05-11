<template>
  <Content sm="8" md="6" lg="4">
    <DatePicker type="day" @changeDate="day = $event" class="mb-3" />
    <v-alert class="mb-3" v-if="trainedMuscleGroups.length > 0" type="success">
      {{ $t('views.trainings.feedback.positive') }}
    </v-alert>
    <v-alert class="mb-3" v-else type="error">
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

import request from '../../services/request'
import muscleGroups from '../../helpers/muscleGroups'

export default {
  name: 'Trainings',
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
  components: {
    Content,
    DatePicker,
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    async getTrainedMuscleGroups() {
      try {
        const response = await request('get', `/trainings/${this.day}`)
        this.trainedMuscleGroups = response.data.trainedMuscleGroups
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
    async updateTrainedMuscleGroups() {
      try {
        const response = await request('put', `/trainings/${this.day}`, {
          trainedMuscleGroups: this.trainedMuscleGroups,
        })
        this.trainedMuscleGroups = response.data.trainedMuscleGroups
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
  },
  watch: {
    day() {
      this.getTrainedMuscleGroups()
    },
  },
}
</script>
