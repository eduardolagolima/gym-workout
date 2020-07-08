<template>
  <div>
    <Header />
    <v-main>
      <v-container fluid>
        <v-row no-gutters justify="center">
          <v-col cols="12" :sm="sm" :md="md" :lg="lg">
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Header from './Header'

export default {
  name: 'Content',
  components: {
    Header,
  },
  props: {
    sm: {
      type: String,
      default: null,
    },
    md: {
      type: String,
      default: null,
    },
    lg: {
      type: String,
      default: null,
    },
  },
}
</script>

<style></style>
