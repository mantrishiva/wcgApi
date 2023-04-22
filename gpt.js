const express = require('express');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json())
const port = process.env.PORT;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
app.post('/writejs', async (req,res) => {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
        temperature: 1,
        max_tokens: 150,
        top_p: 1
    })
    res.send(response.data.choices[0].text)
})
app.get('/',(req,res) => {
    res.send("hello");
})

app.listen(port, () => {
    console.log("app started successfully");
})