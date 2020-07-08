<template>
  <v-text-field
    :id="id"
    v-model="email"
    :label="label"
    :name="id"
    type="email"
    required
  />
</template>

<script>
export default {
  name: 'EmailField',
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
    email: {
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
