const Currency = require('../models/currency');
const moment = require('moment');

module.exports.createBankData = async (req,res) => {
    try {
        const date = moment().format('YYYY-MM-DD-HH:mm');
        let {quantity, data} = req;
        if(!quantity || !data || !date) throw new Error('Some Field is empty');
        console.log('***********');
        console.log(quantity);
        console.log(data);
        console.log(date);
        console.log('***********');
        const inserted = await Currency.create({
            quantity,
            data,
            date
        });
        const findCurrencies = await Currency.find();
        if(findCurrencies.length >= 100) await Currency.findOneAndDelete()
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};

module.exports.getAll = async (req,res) => {
  try {
        const currency = await Currency.find({});
        if(!currency) throw new Error('No currency');
        res.json(currency)
  }  catch (e) {
      console.log(e);
      res.status(400).json({
          success: false,
          msg: e.message
      })
  }
};

module.exports.findByQuantityNum = async (req,res) => {
    try {
        let {quantity} = req.params;
        if(!quantity) throw new Error('Some Field is empty');
        const currency = await Currency.find({
            quantity
        });
        if(!currency) throw new Error('No currency for your request');
        res.json(currency);
    } catch (e) {
        console.log(e);
        res.status(400).json({
            success: false,
            msg: e.message
        })
    }
};
