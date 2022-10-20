var axios = require('axios');
var qs = require('qs');
var btoa = require('btoa');

const getAccessToken = async () => {
  try {
    const { data } = await axios({
      method: 'post',
      url: 'https://auth.sbanken.no/identityserver/connect/token',
      headers: {
        'Authorization': "Basic " + btoa(encodeURIComponent(process.env.CLIENT_ID) + ":" + encodeURIComponent(process.env.CLIENT_SECRET)),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        'grant_type': 'client_credentials'
      })
    })
    return data.access_token
  } catch (error) {
    throw error
  }
}

const makeRequest = async (url) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: url,
      headers: { 'Authorization': "Bearer " + await getAccessToken() }
    })
    return { data }
  } catch (error) {
    throw error
  }
}

const getAccounts = async () => {
  console.log("Retrieving all accounts");
  return { data } = await makeRequest("https://publicapi.sbanken.no/apibeta/api/v2/accounts/")
}

const getAccountNumberDetails = async (accountNumber) => {
  console.log("Retrieving details for account", accountNumber);
  return { data } = await makeRequest(`https://publicapi.sbanken.no/apibeta/api/v2/accounts/${accountNumber}`)
}

const getAccountTransactions = async (accountNumber) => {
  console.log("Retrieving transaction details for account", accountNumber);
  return { data } = await makeRequest(`https://publicapi.sbanken.no/apibeta/api/v2/transactions/${accountNumber}`)
}

module.exports = {
  getAccounts, getAccountNumberDetails, getAccountTransactions
}