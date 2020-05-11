<template>
  <v-text-field
    :id="id"
    :label="label"
    :name="id"
    type="text"
    v-model="username"
    :rules="[usernameRules.required, usernameRules.valid]"
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
    },
  },
  data: function() {
    return {
      usernameRules: {
        required: username =>
          !!username ||
          `${this.label} ${this.$t('generics.rules.is_required')}`,
        valid: username =>
          /^[a-z0-9]+$/.test(username) ||
          `${this.label} ${this.$t('generics.rules.only_letters_and_numbers')}`,
      },
    }
  },
  computed: {
    username: {
      get() {
        return this.value || ''
      },
      set(newValue) {
        this.$emit('update:value', newValue)
      },
    },
  },
}
</script>

<style></style>
