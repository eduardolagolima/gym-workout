<template>
  <v-text-field
    :id="id"
    :label="label"
    :name="id"
    type="text"
    v-model="name"
    :rules="[nameRules.required]"
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
    },
  },
  data: function() {
    return {
      nameRules: {
        required: name =>
          !!name || `${this.label} ${this.$t('generics.rules.is_required')}`,
      },
    }
  },
  computed: {
    name: {
      get: function() {
        return this.value || ''
      },
      set: function(newValue) {
        this.$emit('update:value', newValue)
      },
    },
  },
}
</script>

<style></style>
