<template>
  <v-text-field
    :id="id"
    v-model="confirmPassword"
    :label="label"
    :name="id"
    :type="showConfirmPassword ? 'text' : 'password'"
    :rules="[confirmPasswordRules.required, matchRule]"
    :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
    required
    @click:append="showConfirmPassword = !showConfirmPassword"
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
      default: '',
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
