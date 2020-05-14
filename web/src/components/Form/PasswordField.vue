<template>
  <v-text-field
    :id="id"
    v-model="password"
    :label="label"
    :name="id"
    :type="showPassword ? 'text' : 'password'"
    :rules="[passwordRules.required]"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    required
    @click:append="showPassword = !showPassword"
  ></v-text-field>
</template>

<script>
export default {
  name: 'PasswordField',
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
      passwordRules: {
        required: password =>
          !!password ||
          `${this.label} ${this.$t('generics.rules.is_required')}`,
      },
      showPassword: false,
    }
  },
  computed: {
    password: {
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
