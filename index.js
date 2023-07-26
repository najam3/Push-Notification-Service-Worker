const express = require('express');
const app = express();
const cors = require('cors');
const webPush = require('web-push')
const port = 5000;
const path = require('path');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());


const publicKey = 'BN__vMGH1IW8UTQ1kjXZ8K20pWAzQohBlTjFEVk6R7pEBUfg11ZFq7ZISEbSLYdjqhihXtazXeznLvfd6RyMciA';
const privateKey = 'o6UNx4ETCICnsup1Y5cPVNP3p5ywV2d8z5BR1Y3UT6w';




webPush.setVapidDetails('mailto:test@test.com', publicKey, privateKey);

app.post('/subscribe', (req, res) => {
    // recieve the subscription object sent from the client.
    const subscription = req.body;

    // send 201 response resource created
    res.status(201).json({
        message: 'API Hit successful'
    });          
    console.log(subscription)
    // create the payload
    const payload = JSON.stringify({title: 'Sending in the payload'});

    webPush.sendNotification(subscription, payload).catch(err => console.error(err))
})



app.listen(port, () => {
    console.log(`app listening at port ${port}`);
})