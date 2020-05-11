<template>
  <v-card>
    <v-card-text>
      <v-form v-model="validForm">
        <UsernameField
          id="username"
          :label="$t('views.account.edit_profile.username')"
          :value.sync="username"
        />
        <NameField
          id="name"
          :label="$t('views.account.edit_profile.name')"
          :value.sync="name"
        />
        <EmailField
          id="email"
          :label="$t('views.account.edit_profile.email')"
          :value.sync="email"
        />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="updateProfile" color="primary" :disabled="!validForm">
        {{ $t('views.account.edit_profile.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import UsernameField from '../../components/Form/UsernameField'
import NameField from '../../components/Form/NameField'
import EmailField from '../../components/Form/EmailField'

import request from '../../services/request'

export default {
  name: 'EditProfile',
  components: {
    UsernameField,
    NameField,
    EmailField,
  },
  data: () => ({
    validForm: false,
    username: '',
    name: '',
    email: '',
  }),
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    ...mapActions(['editProfile']),
    async getProfile() {
      try {
        const response = await request('get', '/users')
        const user = response.data.user

        this.username = user.username
        this.name = user.name
        this.email = user.email
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
    async updateProfile() {
      try {
        const { username, name, email } = this

        const response = await this.editProfile({ username, name, email })

        this.SHOW_SNACKBAR({ show: true, content: response.message })
      } catch (error) {
        this.SHOW_SNACKBAR({ show: true, content: error.message })
      }
    },
  },
  mounted() {
    this.getProfile()
  },
}
</script>

<style></style>
