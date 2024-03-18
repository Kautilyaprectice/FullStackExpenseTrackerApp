const express = require('express');

const expenseController = require('../controller/expenseTracker');

const router = express.Router();

router.get('/',expenseController.getExpense);
router.post('/',expenseController.createExpense);
router.get('/',expenseController.getAllExpenses);
router.get('/:id', expenseController.getExpenseById);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;