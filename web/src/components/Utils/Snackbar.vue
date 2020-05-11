<template>
  <v-snackbar v-model="show" :timeout="2000">
    {{ content }}
    <v-btn color="blue" text @click="HIDE_SNACKBAR">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Snackbar',
  computed: {
    ...mapState(['snackbar']),
    show: {
      get: function() {
        return this.snackbar.show
      },
      set: function(newValue) {
        if (newValue === false) {
          this.HIDE_SNACKBAR()
        }
      },
    },
    content() {
      return this.snackbar.content
    },
  },
  methods: {
    ...mapMutations(['HIDE_SNACKBAR']),
  },
}
</script>

<style></style>
