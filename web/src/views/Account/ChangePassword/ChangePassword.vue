<template>
  <v-card>
    <v-card-text>
      <v-form ref="form">
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
          :value.sync="confirmNewPassword"
        />
      </v-form>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="primary" @click="changePassword">
        {{ $t('views.account.change_password.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

import ConfirmPasswordField from '../../../components/Form/ConfirmPasswordField'
import PasswordField from '../../../components/Form/PasswordField'
import api from '../../../services/api'

export default {
  name: 'ChangePassword',
  components: {
    PasswordField,
    ConfirmPasswordField,
  },
  data: () => ({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }),
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    async changePassword() {
      try {
        const { currentPassword, newPassword, confirmNewPassword } = this

        const response = await api.put('/users/password/change', {
          currentPassword,
          newPassword,
          confirmNewPassword,
        })

        this.$refs.form.reset()
        this.SHOW_SNACKBAR({ show: true, content: response.message })
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
  },
}
</script>

<style></style>
