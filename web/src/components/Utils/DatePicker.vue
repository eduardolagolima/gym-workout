<template>
  <div class="text-center">
    <v-btn class="mr-3" @click="subtract">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-dialog
      v-if="type === 'day' || type === 'month'"
      v-model="datepicker"
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">{{ format(date) }}</v-btn>
      </template>
      <v-date-picker
        v-model="date"
        :type="type === 'month' ? 'month' : 'date'"
        :max="currentDate().format(type.sys)"
        :locale="user.locale.replace('_', '-')"
        @input="datepicker = false"
      ></v-date-picker>
    </v-dialog>
    <v-btn v-else style="pointer-events: none">
      {{ format(date) }}
    </v-btn>

    <v-btn class="ml-3" :disabled="disableFutureDates()" @click="add">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)

export default {
  name: 'DatePicker',
  props: {
    type: {
      type: String,
      required: true,
      validator: type => ['day', 'month', 'year'].includes(type),
    },
  },
  data: () => ({
    datepicker: false,
    date: null,
    day: {
      sys: 'YYYY-MM-DD',
      ptbr: 'DD/MM/YYYY',
    },
    month: {
      sys: 'YYYY-MM',
      ptbr: 'MM/YYYY',
    },
    year: {
      sys: 'YYYY',
      ptbr: 'YYYY',
    },
  }),
  computed: {
    ...mapState(['user']),
  },
  watch: {
    date() {
      this.$emit('changeDate', this.date)
    },
  },
  mounted() {
    this.date = dayjs().format(this[this.type].sys)
  },
  methods: {
    format(date) {
      return dayjs(date, this[this.type].sys).format(this[this.type].ptbr)
    },
    subtract() {
      this.date = dayjs(this.date, this[this.type].sys)
        .subtract(1, this.type)
        .format(this[this.type].sys)
    },
    add() {
      this.date = dayjs(this.date, this[this.type].sys)
        .add(1, this.type)
        .format(this[this.type].sys)
    },
    disableFutureDates() {
      const date = dayjs(this.date, this[this.type].sys)
      return date.isSameOrAfter(this.currentDate())
    },
    currentDate() {
      return dayjs(dayjs().format(this[this.type].sys), this[this.type].sys)
    },
  },
}
</script>

<style></style>
