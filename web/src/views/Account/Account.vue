<template>
  <Content :key="key" sm="8" md="6" lg="4">
    <v-tabs v-model="tab" center-active centered>
      <v-tab>{{ $t('views.account.edit_profile.title') }}</v-tab>
      <v-tab>{{ $t('views.account.change_password.title') }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="mt-3">
      <v-tab-item>
        <EditProfile />
      </v-tab-item>
      <v-tab-item>
        <ChangePassword />
      </v-tab-item>
    </v-tabs-items>
  </Content>
</template>

<script>
import { mapState } from 'vuex'

import Content from '../../components/Html/Content'

import ChangePassword from './ChangePassword/ChangePassword'
import EditProfile from './EditProfile/EditProfile'

export default {
  name: 'Account',
  components: {
    Content,
    EditProfile,
    ChangePassword,
  },
  data: () => ({
    tab: null,
    key: 1,
  }),
  computed: {
    ...mapState(['user']),
    userLocale() {
      return this.user.locale
    },
  },
  watch: {
    userLocale() {
      if (this.user.token) {
        this.key += 1
      }
    },
  },
}
</script>
