<template>
  <v-text-field
    :id="id"
    :label="label"
    :name="id"
    :type="showPassword ? 'text' : 'password'"
    v-model="password"
    :rules="[passwordRules.required]"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="showPassword = !showPassword"
    required
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
