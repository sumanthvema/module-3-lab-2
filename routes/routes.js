const express = require('express');
const router = express.Router();
const loanController = require('../controller/loanController');

router.get('/getLoanByCustomerId', loanController.getLoanByCustomerId)
router.post('/insertData', loanController.insertData)
router.patch('/updateCustomerLoan/:id', loanController.updateCustomerLoan)
router.delete('/deleteLoanById', loanController.deleteLoanById)

module.exports = router;
