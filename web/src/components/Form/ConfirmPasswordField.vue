<template>
  <v-text-field
    :id="id"
    :label="label"
    :name="id"
    :type="showConfirmPassword ? 'text' : 'password'"
    v-model="confirmPassword"
    :rules="[confirmPasswordRules.required, matchRule]"
    :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="showConfirmPassword = !showConfirmPassword"
    required
  ></v-text-field>
</template>

<script>
export default {
  name: 'ConfirmPasswordField',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    matchRule: {
      type: Function,
      required: true,
    },
    value: {
      type: String,
    },
  },
  data: function() {
    return {
      confirmPasswordRules: {
        required: confirmPassword =>
          !!confirmPassword ||
          `${this.label} ${this.$t('generics.rules.is_required')}`,
      },
      showConfirmPassword: false,
    }
  },
  computed: {
    confirmPassword: {
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
