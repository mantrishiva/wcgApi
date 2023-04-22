const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const client = new Client();
// Get QR code to scan WhatsAPP
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message', message => {
    console.log(message.body);
});

let msge;
let response;
client.on('message', async  message => {
  try{
    if(message.body.includes("gpt:")){
      msge = message.body.slice(4);
      response = await axios.post('http://localhost:4000/writejs',{
        "prompt": msge
    });
    message.reply(response.data);
    }
  }catch(err){
    console.log(err);
  }
});

client.initialize();