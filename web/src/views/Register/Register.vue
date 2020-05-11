<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>gym-workout</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="validForm">
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
                    :matchRule="passwordMatchRule"
                    :value.sync="confirmPassword"
                  />
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn @click="register" color="primary" :disabled="!validForm">
                  {{ $t('views.register.sign_up') }}
                </v-btn>
                <v-spacer></v-spacer>
                <p class="mb-0">
                  {{ $t('views.register.question') }}
                  <router-link to="/login">{{
                    $t('views.register.log_in')
                  }}</router-link>
                </p>
              </v-card-actions>
            </v-card>
            <v-alert v-show="alertMessage" class="mt-4" :type="alertType">
              {{ alertMessage }}
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

import UsernameField from '../../components/Form/UsernameField'
import NameField from '../../components/Form/NameField'
import EmailField from '../../components/Form/EmailField'
import PasswordField from '../../components/Form/PasswordField'
import ConfirmPasswordField from '../../components/Form/ConfirmPasswordField'

import passwordMatchRule from '../../helpers/passwordMatchRule'

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
    validForm: false,
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showConfirmPassword: false,
    alertMessage: null,
    alertType: null,
  }),
  computed: {
    passwordMatchRule() {
      return passwordMatchRule.call(this, this.password, this.confirmPassword)
    },
  },
  methods: {
    ...mapActions(['doRegister']),
    async register() {
      this.alertMessage = null
      this.alertType = null

      const { username, name, email, password } = this

      try {
        const response = await this.doRegister({
          username,
          name,
          email,
          password,
        })

        this.alertMessage = response.message
        this.alertType = response.status

        setTimeout(() => this.$router.push('/dashboard'), 1000)
      } catch (error) {
        this.alertMessage = error.message
        this.alertType = error.status
      }
    },
  },
}
</script>
