const TelegramBot = require("node-telegram-bot-api");

class KenBot extends TelegramBot {
    constructor(Token, options) {
        super(Token, options);
    }
    getSticker() {
        this.on("sticker", (msg) => {
            this.sendMessage(msg.from.id, msg.sticker.emoji);
        })
    }
}

module.exports = KenBot;