const path = require('path');

const Expense = require('../model/expenseTracker');

exports.getExpense = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'expenseTracker.html'));
};

exports.createExpense = async (req, res, next) => {
    
    const description = req.body.description;
    const amount = req.body.amount;
    const category = req.body.category;
    try{
        if (!category || !amount || !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const expense = await Expense.create({description, amount, category});
        res.status(201).json(expense);
    }
    catch (err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.getAllExpenses = async (req, res, next) => {
    try{
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.getExpenseById = async(req, res, next) => {
    try{
        const id = req.params;
        const expense = await Expense.findByPk(id);
        if(!expense){
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } 
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateExpense = async(req, res, next) => {
    try{
        const id = req.params;
        const description = req.body.description;
        const amount = req.body.amount;
        const category = req.body.category;
        const expense = await Expense.findByPk(id);
        if (!category || !amount || !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        if(!expense){
            return res.status(404).json({ message: 'Expense not found' });
        }
        await expense.update({ description, amount, category});
        res.status(200).json(expense);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteExpense = async(req, res, next) => {
    try{
        const id = req.params;
        const expense = Expense.findByPk(id);
        if(!expense){
            return res.status(404).json({ message: 'Expense not found' });
        }
        await expense.destroy();
        res.status(204).json({ message: 'Expense deleted successfully' });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};