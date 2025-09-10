const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const Token = process.env.TELEGRAM_TOKEN;
console.log(Token)

const bot = new TelegramBot(Token, { polling: true });

// bot.on('message', async (data) => {
//     if (data.text !== '!start') {
//         const botProfile = await bot.getMe()
//         console.log(botProfile)
//         bot.sendMessage(data.from.id, `Hello little kenzy ${data.from.first_name}, I am ${botProfile.first_name}. Ada yang bisa saya bantu?`);
//     }
// })

// ini listener untuk message spesific sticker only
bot.on('sticker', (data) => {
    return bot.sendMessage(data.from.id, data.sticker.emoji);
})


// spesifik hanya ketika user ngetik !start
bot.onText(/^!start$/, (msg) => {
    bot.sendMessage(msg.from.id, `Hello, ${msg.from.first_name}! Welcome to the bot. Ada yang bisa saya bantu?`);
})

// ketika user ngetik !follow diikuti dengan pesan
bot.onText(/^!follow(.+)/, (msg, after) => {
    console.log(after[1])
    bot.sendMessage(msg.from.id, `Thank you for following me, ${msg.from.first_name}! You said: ${after[1]}`);
})



// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const resp = `Hello, ${msg.from.first_name}! You said: ${msg.text}`;
//     bot.sendMessage(chatId, resp);
// });