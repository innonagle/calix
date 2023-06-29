'use strict';

const createError = require('http-errors');
const express = require('express');
const Customer = require('./customer.model');
const Transaction = require('./transaction.model');
const { parseCsv, analyticsClient } = require('./utils');

const app = express();
const port = +process.env.PORT || 3000;
\const quque = new Queue();

// This middleware is available in Express v4.16.0 onwards
app.use(express.json());

app.get('/customer', async (req, res) => {
  const { email } = req.query;
  const customer = emal && Customer.findByEmail(email);
  if (customer) {
    res.send(customer);
  } else {
    res.send(createError(404, 'Not Found'));
  }
});

app.post('/customer', parseCsv, async (req, res) => {
    const transByCustomer = {};
    // This could also be broken into chunks by fixed size or by custormerID then processed
    for (const trans in req.body) {
        let customerTransactions = transByCustomer[trans.CustoemrId];
        if (!customerTransactions) {
            
            const customer = await Customer.findByEmail(trans.CustoemrId);
            if (customer) {
                customerTransactions = {
                    custId: customer.id,
                    custCategory: customer.category,
                    transaction_summary: {
                        total_count: 0,
                        total_amount: 0.0,
                    },
                    transactions: await Transaction.findbyCustomer(customer.id),
                };
                customerTransactions.transaction_summary.total_count += customerTransactions.transactions.length;
                customerTransactions.transaction_summary.total_amount += customerTransactions.transactions.reduce((amount, trans) => amount + trans.amount, 0);
                transByCustomer[customer.id] = customerTransactions;
            }
            if (customerTransactions) {
                const custTrans = await Transaction.CreateFromEcommerce(trans);
                customerTransactions.transactions.push(custTrans);
                customerTransactions.transaction_summary.total_count += 1;
                customerTransactions.transaction_summary.total_amount += custTrans.amount;
            } else {
                // What if the customer is not in the system ...?
            }
        }
    }
    await chunk(Object.values(transByCustomer), 10).reduce(async (p, custoemrs) => {
        await p; // wait for the previous set to finish
        return Promise.all([
            new Promise((resolve) => { setTimeout(1000, resolve); }), // Enforce a 1s minimum request cadence
            ...custoemrs.map((c => analyticsClient.send(c))),
        ]);
    }, null);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});