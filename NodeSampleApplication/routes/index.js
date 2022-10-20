var express = require('express');
var router = express.Router();

var service = require('../service/index');

// Get all accounts
router.get('/accounts', async (req, res, next) => {
  try {
    const { data } = await service.getAccounts()
    res.send(data)
  } catch (error) {
    next(error)
  }
});

// Get account details
router.get('/accounts/:id', async (req, res, next) => {
  try {
    const { data } = await service.getAccountNumberDetails(req.params.id)
    res.send(data)
  } catch (error) {
    next(error)
  }
});

// Get transaction details
router.get('/transactions/:id', async (req, res, next) => {
  try {
    const { data } = await service.getAccountTransactions(req.params.id)
    res.send(data)
  } catch (error) {
    next(error)
  }
});


module.exports = router;
