# Sbanken proxy

**Bootstrapped using Express application generator**
https://expressjs.com/en/starter/generator.html

## Required environment values
```
    export CLIENT_ID="value"
    export CLIENT_SECRET="value"
    export PORT="3001"

```

## Docs
https://publicapi.sbanken.no/openapi/apibeta/index.html

## Endpoints
* GET Account details: /api/accounts
* GET Account number details: /api/accounts/{accountNumber}
* GET Account transactions: api/transactions/{accountNumber}
