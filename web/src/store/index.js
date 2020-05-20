import Vue from 'vue'
import Vuex from 'vuex'

import api from '../services/api'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    snackbar: {
      show: false,
      content: null,
    },
    user: {
      name: null,
      token: null,
      darkMode: true,
      locale: 'pt_BR',
    },
  }
}

export default new Vuex.Store({
  state: getDefaultState(),
  mutations: {
    SHOW_SNACKBAR: (state, { show, content }) => {
      state.snackbar.show = show
      state.snackbar.content = content
    },
    HIDE_SNACKBAR: state => {
      state.snackbar.show = getDefaultState().snackbar.show
      state.snackbar.content = getDefaultState().snackbar.content
    },
    SET_USER: (state, { name, token, darkMode, locale }) => {
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
      commit('SET_USER', JSON.parse(localStorage.getItem('user')) || {})
    },
    async doRegister({ commit, state }, { username, name, email, password }) {
      const response = await api.post('/users/create', {
        username,
        name,
        email,
        password,
      })

      commit('SET_USER', response.data)
      localStorage.setItem('user', JSON.stringify(state.user))

      return response
    },
    async doLogin({ commit, state }, { usernameOrEmail, password }) {
      const response = await api.post('/users/login', {
        usernameOrEmail,
        password,
      })

      commit('SET_USER', response.data)
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    async doLogout({ commit }) {
      await api.post('/users/logout')

      commit('SET_USER', getDefaultState().user)
      localStorage.removeItem('user')
    },
    async editProfile({ commit, state }, { username, name, email }) {
      const response = await api.put('/users/profile/edit', {
        username,
        name,
        email,
      })

      commit('SET_USER', { username, name, email })
      localStorage.setItem('user', JSON.stringify(state.user))

      return response
    },
    async toggleDarkMode({ commit, state }, darkMode) {
      await api.put('/users/darkmode/toggle', { darkMode })

      commit('SET_USER', { darkMode })
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    async changeLocale({ commit, state }, locale) {
      await api.put('/users/locale/change', { locale })

      commit('SET_USER', { locale })
      localStorage.setItem('user', JSON.stringify(state.user))
    },
  },
})
