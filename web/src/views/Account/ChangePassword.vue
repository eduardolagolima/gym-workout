<template>
  <v-card>
    <v-card-text>
      <v-form v-model="validForm">
        <PasswordField
          id="current-password"
          :label="$t('views.account.change_password.current_password')"
          :value.sync="currentPassword"
        />
        <PasswordField
          id="new-password"
          :label="$t('views.account.change_password.new_password')"
          :value.sync="newPassword"
        />
        <ConfirmPasswordField
          id="confirm-new-password"
          :label="$t('views.account.change_password.confirm_new_password')"
          :matchRule="passwordMatchRule"
          :value.sync="confirmNewPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="changePassword" color="primary" :disabled="!validForm">
        {{ $t('views.account.change_password.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

import PasswordField from '../../components/Form/PasswordField'
import ConfirmPasswordField from '../../components/Form/ConfirmPasswordField'

import request from '../../services/request'

import passwordMatchRule from '../../helpers/passwordMatchRule'

export default {
  name: 'ChangePassword',
  components: {
    PasswordField,
    ConfirmPasswordField,
  },
  data: () => ({
    validForm: false,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }),
  computed: {
    passwordMatchRule() {
      return passwordMatchRule.call(
        this,
        this.newPassword,
        this.confirmNewPassword
      )
    },
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    async changePassword() {
      try {
        const { currentPassword, newPassword, confirmNewPassword } = this

        const response = await request('put', '/users/password/change', {
          currentPassword,
          newPassword,
          confirmNewPassword,
        })

        this.SHOW_SNACKBAR({ show: true, content: response.message })
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
  },
}
</script>

<style></style>
