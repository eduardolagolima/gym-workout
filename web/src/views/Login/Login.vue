<template>
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
                <UsernameOrEmailField
                  id="username-or-email"
                  :label="$t('views.login.username_or_email')"
                  :value.sync="usernameOrEmail"
                />
                <PasswordField
                  id="password"
                  :label="$t('views.login.password')"
                  :value.sync="password"
                />
              </v-form>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-btn color="primary" @click="login">
                {{ $t('views.login.log_in') }}
              </v-btn>
              <v-spacer />
              <p class="mb-0">
                {{ $t('views.login.question') }}
                <router-link to="/register">{{
                  $t('views.login.sign_up')
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
</template>
<script>
import { mapActions } from 'vuex'

import PasswordField from '../../components/Form/PasswordField'
import UsernameOrEmailField from '../../components/Form/UsernameOrEmailField'

export default {
  name: 'Login',
  components: {
    UsernameOrEmailField,
    PasswordField,
  },
  data: () => ({
    usernameOrEmail: '',
    password: '',
    alert: {
      message: null,
      type: null,
    },
  }),
  methods: {
    ...mapActions(['doLogin']),
    async login() {
      this.alert.message = null
      this.alert.type = null

      const { usernameOrEmail, password } = this

      try {
        await this.doLogin({ usernameOrEmail, password })
        this.$router.push('/dashboard')
      } catch (error) {
        this.alert.message = error.message
        this.alert.type = error.status
      }
    },
  },
}
</script>
