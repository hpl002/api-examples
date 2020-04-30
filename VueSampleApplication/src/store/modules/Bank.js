import Vue from 'vue'
import * as t from '@/store/types'
import {
  ENDPOINT_ACCOUNTS,
  ENDPOINT_TRANSACTIONS
} from '@/config'

const state = {
  accounts: []
}

const mutations = {
  [t.BANK_SET_ACCOUNTS] (state, data) {
    state.accounts = data
  }
}

const actions = {
  load ({commit}) {
    return Vue.resource(ENDPOINT_ACCOUNTS)
      .get()
      .then(r => {
        return r.status == 200 && !r.body.isError ? (
          commit(t.BANK_SET_ACCOUNTS, r.body.items),
          Promise.resolve()
        ) : (
          Promise.reject(r.body.errorMessage)
        )
      })
  },

  transactions ({commit}, accountId) {
    return Vue.resource(ENDPOINT_TRANSACTIONS)
      .get({
        accountId,
        index: 0,
        length: 10
      })
      .then(r => {
        return r.status == 200 && !r.body.isError ? (
          Promise.resolve(r.body)
        ) : (
          Promise.reject(r.body.errorMessage)
        )
      })
  }
}

const getters = {
  accounts: (state) => {
    return state.accounts
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
