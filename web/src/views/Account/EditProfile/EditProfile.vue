<template>
  <v-card>
    <v-card-text>
      <v-form>
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
    <v-divider />
    <v-card-actions>
      <v-btn color="primary" @click="updateProfile">
        {{ $t('views.account.edit_profile.save') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import EmailField from '../../../components/Form/EmailField'
import NameField from '../../../components/Form/NameField'
import UsernameField from '../../../components/Form/UsernameField'
import api from '../../../services/api'

export default {
  name: 'EditProfile',
  components: {
    UsernameField,
    NameField,
    EmailField,
  },
  data: () => ({
    username: '',
    name: '',
    email: '',
  }),
  mounted() {
    this.getProfile()
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
    ...mapActions(['editProfile']),
    async getProfile() {
      try {
        const response = await api.get('/users/profile')
        this.username = response.data.username
        this.name = response.data.name
        this.email = response.data.email
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
}
</script>

<style></style>
