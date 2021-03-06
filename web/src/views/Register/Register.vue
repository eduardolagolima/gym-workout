<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>gym-workout</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <UsernameField
                    id="username"
                    :label="$t('views.register.username')"
                    :value.sync="username"
                  />
                  <NameField
                    id="name"
                    :label="$t('views.register.name')"
                    :value.sync="name"
                  />
                  <EmailField
                    id="email"
                    :label="$t('views.register.email')"
                    :value.sync="email"
                  />
                  <PasswordField
                    id="password"
                    :label="$t('views.register.password')"
                    :value.sync="password"
                  />
                  <ConfirmPasswordField
                    id="confirm-password"
                    :label="$t('views.register.confirm_password')"
                    :value.sync="confirmPassword"
                  />
                </v-form>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-btn color="primary" @click="register">
                  {{ $t('views.register.sign_up') }}
                </v-btn>
                <v-spacer />
                <p class="mb-0">
                  {{ $t('views.register.question') }}
                  <router-link to="/login">{{
                    $t('views.register.log_in')
                  }}</router-link>
                </p>
              </v-card-actions>
            </v-card>
            <v-alert v-show="alert.message" class="mt-4" :type="alert.type">
              {{ alert.message }}
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

import ConfirmPasswordField from '../../components/Form/ConfirmPasswordField'
import EmailField from '../../components/Form/EmailField'
import NameField from '../../components/Form/NameField'
import PasswordField from '../../components/Form/PasswordField'
import UsernameField from '../../components/Form/UsernameField'

export default {
  name: 'Register',
  components: {
    UsernameField,
    NameField,
    EmailField,
    PasswordField,
    ConfirmPasswordField,
  },
  data: () => ({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    alert: {
      message: null,
      type: null,
    },
  }),
  methods: {
    ...mapActions(['doRegister']),
    async register() {
      this.alert.message = null
      this.alert.type = null

      const { username, name, email, password, confirmPassword } = this

      try {
        const response = await this.doRegister({
          username,
          name,
          email,
          password,
          confirmPassword,
        })

        this.alert.message = response.message
        this.alert.type = response.status

        setTimeout(() => this.$router.push('/dashboard'), 1000)
      } catch (error) {
        this.alert.message = error.message
        this.alert.type = error.status
      }
    },
  },
}
</script>
