<template lang="pug">
#bank(v-if="accounts.length > 0")
  md-list.md-double-line.md-elevation-1
    md-list-item(
      v-for="(item, i) in accounts"
      :key="i"
      md-expand
      :md-expanded.sync="expanded"
      @click="fetchTransactions(item.accountId)"
    )
      md-avatar.md-avatar-icon.md-accent {{ initials }}
      .md-list-item-text
        span {{ item.name }}
        span {{ item.accountNumber }}
      
      md-list.md-dense.md-scrollbar(slot="md-expand")
        md-list-item(v-if="transactions.length <= 0")
          .md-list-item-text
            span No transactions
        md-list-item(
          v-for="(transaction, j) in transactions"
          :key="j"
        )
          md-icon settings_ethernet
          .md-list-item-text
            span {{ transaction.transactionId }}
            span {{ transaction.amount }} NOK
</template>

<script>
export default {
  name: 'Bank',
  data: () => ({
    expanded: false,
    transactions: []
  }),
  computed: {
    accounts () {
      return this.$store.getters['Bank/accounts']
    },
    initials () {
      const data = this.$store.getters['Customers/data']
      return data == null ? null : data.firstName.substr(0, 1) + data.lastName.substr(0, 1)
    }
  },
  methods: {
    fetchTransactions (accountId) {
      if (this.expanded)
        return

      this.$store.dispatch('Bank/transactions', accountId)
        .then(list => this.transactions = list.items)
    }
  }
}
</script>

<style lang="scss" scoped>
#bank {
  .md-scrollbar {
    max-height: 220px;
    overflow-y: scroll;
  }
}
</style>
