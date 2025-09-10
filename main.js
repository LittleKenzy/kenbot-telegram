const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const Token = process.env.TELEGRAM_TOKEN;
console.log(Token)

const bot = new TelegramBot(Token, { polling: true });

bot.on('message', (data) => {
    if (data.text == '/start') {
        return bot.sendMessage(data.from.id, `Welcome, ${data.from.first_name}! How can I assist you today?`);
    } else {
        bot.sendMessage(data.from.id, `Hello, ${data.from.first_name}! You said: ${data.text}`);
    }
})

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const resp = `Hello, ${msg.from.first_name}! You said: ${msg.text}`;
//     bot.sendMessage(chatId, resp);
// });