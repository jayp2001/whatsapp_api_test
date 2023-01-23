process.env = require('./.env.js')(process.env.NODE_ENV || 'development');
const port = process.env.PORT || 9000;
const express = require('express');
const fs = require('fs');

const key = fs.readFileSync('./private.key');
const cert = fs.readFileSync('./certificate.crt')

// const file = fs.readFileSync('./BF8D769FE83A40712AC4D2C69B355CCC.txt')

const cred = {
    key,
    cert
}

let indexRoutes = require('./routes/index.js');

const main = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.get('/.well-known/pki-validation/BF8D769FE83A40712AC4D2C69B355CCC.txt',(req,res)=>{
        res.sendFile('/home/ubuntu/whatsapp_api_test/BF8D769FE83A40712AC4D2C69B355CCC.txt')
    })
    app.use('/', indexRoutes);
    app.use('*', (req, res) => res.status(404).send('404 Not Found'));
    app.listen(port, () =>
        console.log(`App now running and listening on port ${port}`)
    );

    const httpsServer = https. createServer (cred, app)
    httpsServer. listen (8443)
};
main();