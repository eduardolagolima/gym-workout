<template>
  <v-text-field
    :id="id"
    :label="label"
    :name="id"
    type="email"
    v-model="email"
    :rules="[emailRules.required, emailRules.valid]"
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
    },
  },
  data: function() {
    return {
      emailRules: {
        required: email =>
          !!email || `${this.label} ${this.$t('generics.rules.is_required')}`,
        valid: email =>
          /.+@.+\..+/.test(email) ||
          `${this.label} ${this.$t('generics.rules.must_be_valid')}`,
      },
    }
  },
  computed: {
    email: {
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
