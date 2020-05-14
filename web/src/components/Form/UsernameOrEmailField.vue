<template>
  <v-text-field
    :id="id"
    v-model="usernameOrEmail"
    :label="label"
    :name="id"
    type="text"
    :rules="[usernameOrEmailRules.required]"
    required
  />
</template>

<script>
export default {
  name: 'UsernameOrEmailField',
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
  data: function() {
    return {
      usernameOrEmailRules: {
        required: usernameOrEmail =>
          !!usernameOrEmail ||
          `${this.label} ${this.$t('generics.rules.is_required')}`,
      },
    }
  },
  computed: {
    usernameOrEmail: {
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
