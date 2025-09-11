require('dotenv').config();
const KenBot = require('./app/KenBot');

const Token = process.env.TELEGRAM_TOKEN;
const options = { polling: true };

const kenbot = new KenBot(Token, options);
kenbot.getSticker();