import Vue from 'vue'
import Vuex from 'vuex'

import api from '../services/api'

Vue.use(Vuex)

const getDefaultUserInformation = () => {
  return {
    name: null,
    token: null,
    darkMode: true,
    locale: 'pt_BR',
  }
}

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      content: null,
    },
    user: getDefaultUserInformation(),
  },
  mutations: {
    SHOW_SNACKBAR: (state, { show, content }) => {
      state.snackbar.show = show
      state.snackbar.content = content
    },
    HIDE_SNACKBAR: state => {
      state.snackbar.show = false
      state.snackbar.content = null
    },
    SET_USER_INFORMATION: (state, { name, token, darkMode, locale }) => {
      if (name !== undefined) {
        state.user.name = name
      }

      if (token !== undefined) {
        state.user.token = token
      }

      if (darkMode !== undefined) {
        state.user.darkMode = darkMode
      }

      if (locale !== undefined) {
        state.user.locale = locale
      }
    },
  },
  actions: {
    async getUser({ commit }) {
      commit(
        'SET_USER_INFORMATION',
        JSON.parse(localStorage.getItem('user')) || {}
      )
    },
    async doRegister({ commit }, { username, name, email, password }) {
      const response = await api.post('/users', {
        username,
        name,
        email,
        password,
      })

      localStorage.setItem('user', JSON.stringify(response.data))
      commit('SET_USER_INFORMATION', response.data)

      return response
    },
    async doLogin({ commit }, { usernameOrEmail, password }) {
      const response = await api.post('/users/login', {
        usernameOrEmail,
        password,
      })

      localStorage.setItem('user', JSON.stringify(response.data))
      commit('SET_USER_INFORMATION', response.data)
    },
    async doLogout({ commit }) {
      await api.post('/users/logout')

      localStorage.removeItem('user')
      commit('SET_USER_INFORMATION', getDefaultUserInformation())
    },
    async editProfile({ commit }, { username, name, email }) {
      const response = await api.put('/users', {
        username,
        name,
        email,
      })

      localStorage.setItem('user', JSON.stringify(response.data))
      commit('SET_USER_INFORMATION', response.data)

      return response
    },
    async toggleDarkMode({ commit }, darkMode) {
      const response = await api.put('/users', { darkMode })

      localStorage.setItem('user', JSON.stringify(response.data))
      commit('SET_USER_INFORMATION', response.data)
    },
    async changeLocale({ commit }, locale) {
      const response = await api.put('/users', { locale })

      localStorage.setItem('user', JSON.stringify(response.data))
      commit('SET_USER_INFORMATION', response.data)
    },
  },
})
