const express = require('express');
const app = express();
const mongoose = require('mongoose');
const request = require('request');
const {createBankData} = require('./controllers/exchangeRate');

const currency = require('./routes/currency');
const userRouter = require('./routes/userRouter');

mongoose.connect('mongodb//localhost:27017/evneTask',{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
let num = 0;
function takeDataFromBank (){
    const url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
    request({
        url: url,
        json: true
    }, async function (error, response, body) {

        if (!error && response.statusCode === 200) {
            const filteredBankData = body.filter((element) => {
                return element.ccy !== 'BTC'
            }); // Filter and Print the json response
            const BankData = {data: filteredBankData, quantity: num};
            await createBankData(BankData);
        }
    });
    ++num;
    console.log(num);
}
function callEveryHour() {
    setInterval(takeDataFromBank, 1000 * 60 * 60);
}
callEveryHour();

app.use('/money', currency);
app.use('/user', userRouter);

app.get('/', (req, res, next) => {
    res.end('HELLO!');
});
app.use('*', (req, res) => {
    res.status(404).json('PAGE NOT FOUND!')
});
app.listen(3000, () => console.log('LISTENING...'));
