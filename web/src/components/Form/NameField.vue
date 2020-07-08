<template>
  <v-text-field
    :id="id"
    v-model="name"
    :label="label"
    :name="id"
    type="text"
    required
  />
</template>

<script>
export default {
  name: 'NameField',
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
    name: {
      get: function() {
        return this.value
      },
      set: function(newValue) {
        this.$emit('update:value', newValue)
      },
    },
  },
}
</script>

<style></style>
