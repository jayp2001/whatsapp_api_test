'use strict';
const router = require('express').Router();

const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');
const Whatsapp = new WhatsappCloudAPI({
    accessToken: process.env.Meta_WA_accessToken,
    senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
    WABA_ID: process.env.Meta_WA_wabaId, 
    graphAPIVersion: 'v15.0'
});

router.get('/hello',(req,res)=>{
    res.json("hello world !!!")
})

router.get('/meta_wa_callbackurl', (req, res) => {
    try {
        console.log('GET: Someone is pinging me!');

        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];

        if (
            mode &&
            token &&
            mode === 'subscribe' &&
            process.env.Meta_WA_VerifyToken === token
        ) {
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }

    } catch (error) {
        console.error({error})
        return res.sendStatus(500);
    }
});



router.post('/meta_wa_callbackurl', async (req, res) => {
    try {
        console.log('POST: Someone is pinging me!');

        let data = Whatsapp.parseMessage(req.body);

        if (data?.isMessage) {
            let incomingMessage = data.message;
            let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
            let recipientName = incomingMessage.from.name;
            let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
            let message_id = incomingMessage.message_id; // extract the message id

            if (typeOfMsg === 'text_message') {
                await Whatsapp.sendSimpleButtons({
                    message: `Hey ${recipientName}, \nYou are speaking to a chatbot.\nWhat do you want to do next?`,
                    recipientPhone: recipientPhone, 
                    listOfButtons: [
                        {
                            title: 'Send PDF',
                            id: 'send_pdf',
                        },
                    ],
                });
            }

            if (typeOfMsg === 'simple_button_message') {
                let button_id = incomingMessage.button_reply.id;
            
                if (button_id === 'send_pdf') {
                    await Whatsapp.sendDocument({
                        recipientPhone: "9825312229",
                        file_path: `../document_recipt/recipte.pdf`,
                    });
                }
            };
    }

        return res.sendStatus(200);
    } catch (error) {
                console.error({error})
        return res.sendStatus(500);
    }
});

module.exports = router;