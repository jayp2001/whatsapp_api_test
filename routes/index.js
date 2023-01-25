'use strict';
const router = require('express').Router();
const axios=require("axios");

// const WhatsappCloudAPI = require('../whatsappcloudapi_wrapper');
// const Whatsapp = new WhatsappCloudAPI({
//     accessToken: process.env.Meta_WA_accessToken,
//     senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
//     WABA_ID: process.env.Meta_WA_wabaId, 
//     graphAPIVersion: 'v15.0'
// });

router.get('/hello',(req,res)=>{
    res.json("hello world !!!")
})

router.get('/meta_wa_callbackurl', (req, res) => {
    console.log(">>>")
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
    console.log(">>><<<")
    try {
        console.log('POST: Someone is pinging me!');

    //     let data = Whatsapp.parseMessage(req.body);

    //     if (data && data.isMessage) {
    //         let incomingMessage = data.message;
    //         let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
    //         let recipientName = incomingMessage.from.name;
    //         let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
    //         let message_id = incomingMessage.message_id; // extract the message id

    //         if (typeOfMsg === 'text_message') {
    //             await Whatsapp.sendSimpleButtons({
    //                 message: `Hey ${recipientName}, \nYou are speaking to a chatbot.\nWhat do you want to do next?`,
    //                 recipientPhone: recipientPhone, 
    //                 listOfButtons: [
    //                     {
    //                         title: 'Send PDF',
    //                         id: 'send_pdf',
    //                     },
    //                 ],
    //             });
    //         }

    //         if (typeOfMsg === 'simple_button_message') {
    //             let button_id = incomingMessage.button_reply.id;
            
    //             if (button_id === 'send_pdf') {
    //                 await Whatsapp.sendDocument({
    //                     recipientPhone: "9825312229",
    //                     file_path: `../document_recipt/recipte.pdf`,
    //                 });
    //             }
    //         };
    // }

    let body_param=req.body;

    console.log(JSON.stringify(body_param,null,2));

    if(body_param.object){
        console.log("inside body param");
        if(body_param.entry && 
            body_param.entry[0].changes && 
            body_param.entry[0].changes[0].value.messages && 
            body_param.entry[0].changes[0].value.messages[0]  
            ){
               let phon_no_id=body_param.entry[0].changes[0].value.metadata.phone_number_id;
               let from = body_param.entry[0].changes[0].value.messages[0].from; 
               let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

               console.log("phone number "+phon_no_id);
               console.log("from "+from);
               console.log("boady param "+msg_body);
                
               axios({
                   method:"POST",
                   url:"https://graph.facebook.com/v13.0/"+phon_no_id+"/messages?access_token="+'EAAZA6LBt0ZBJQBAC7UP00V7AZA2iJlUGLPZBf1zDS3MDZCznHABDXr2SnN2iJLxIOw0NJZCooWUHFzi0KORYyY75lYXTAgSiqTavPw67VwZCdM1ld7YGSHaB0DQXESjIHFhM98cSQDusysLwLWjHXmpXv8WG71yP7GG8O6gk6JJoAgluGS5bj7XZC91a1BXVhRWm8hzi9Ew2DgZDZD',
                   data:{
                       messaging_product:"whatsapp",
                       to:from,
                       text:{
                           body:"Hi.. I'm Prasath, your message is "+msg_body
                       }
                   },
                   headers:{
                       "Content-Type":"application/json"
                   }

               })
               .then(
                res.sendStatus(200)
                )
               .catch(
                
               )
            }else{
                res.sendStatus(404);
            }

    }

        // return res.sendStatus(200);
    } catch (error) {
                console.error({error})
        return res.sendStatus(500);
    }
});

module.exports = router;