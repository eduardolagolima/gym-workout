<template>
  <v-text-field
    :id="id"
    v-model="username"
    :label="label"
    :name="id"
    type="text"
    required
  />
</template>

<script>
export default {
  name: 'UsernameField',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    username: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('update:value', newValue)
      },
    },
  },
}
</script>

<style></style>
