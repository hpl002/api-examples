var express = require('express');
var router = express.Router();

var service = require('../service/sbankenapi');

router.get('/api/data', function(req, res, next) {
  service.getAccessToken().then(data => {
    console.log('Key: ', data);
    service.getAccountDetails(data.access_token).then(accountData => {
      console.log('Account data: ', accountData);
      res.json(accountData);
    }, error => {
      res.json({});
    });
  }, error => {
    res.json({});
  });
});


router.get('/api/account/:id', function(req, res, next) {
  service.getAccessToken().then(data => {
    console.log('Key: ', data);
    service.getAccountNumberDetails( req.params.id, data.access_token).then(accountDetails => {
      console.log('Account Details: ', accountDetails);
      res.json(accountDetails);
    }, error => {
      res.json({});
    });
  }, error => {
    res.json({});
  });
});

router.get('/api/transactions/:id', function(req, res, next) {
  service.getAccessToken().then(data => {
    console.log('Key: ', data);
    service.getAccountTransactions( req.params.id, data.access_token).then(transactions => {
      console.log('Account Transactions: ', transactions);
      res.json(transactions);
    }, error => {
      res.json({});
    });
  }, error => {
    res.json({});
  });
});


module.exports = router;
