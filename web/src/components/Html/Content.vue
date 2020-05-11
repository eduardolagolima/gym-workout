<template>
  <div>
    <Header />
    <v-content>
      <v-container fluid>
        <v-row no-gutters justify="center">
          <v-col cols="12" :sm="sm" :md="md" :lg="lg">
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Header from './Header'

export default {
  name: 'Content',
  props: ['sm', 'md', 'lg'],
  components: {
    Header,
  },
}
</script>

<style></style>
