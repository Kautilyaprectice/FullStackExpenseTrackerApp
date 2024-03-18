const express = require('express');
const bodyParser = require('body-parser');

const expenseRouter = require('./routes/expenseTracker');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json());

app.use('/expenses',expenseRouter);

(async () => {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync models with the database:', error);
    }
})();

app.listen(3000);



