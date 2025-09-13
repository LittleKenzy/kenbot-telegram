const TelegramBot = require("node-telegram-bot-api");
const commands = require("../libs/commands");
const { helpText, invalidCommand } = require("../libs/constant");

class KenBot extends TelegramBot {
    constructor(Token, options) {
        super(Token, options);
        this.on('message', (msg) => {
            const isInCommands = Object.values(commands).some(keyword => keyword.test(msg.text));
            if (!isInCommands) {
                this.sendMessage(msg.from.id, invalidCommand, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Panduan Pengguna',
                                    callback_data: 'go_to_help'
                                }
                            ]
                        ]
                    }
                });
            }
        })
        this.on('callback_query', (callbackQuery) => {
            const callbackName = callbackQuery.data
            if(callbackName == 'go_to_help'){
                this.sendMessage(callbackQuery.from.id, helpText);
            }
        })
    }
    getSticker() {
        this.on("sticker", (msg) => {
            this.sendMessage(msg.from.id, msg.sticker.emoji);
        })
    }
    getGreeting() {
        this.onText(commands.halo, (msg) => {
            this.sendMessage(msg.from.id, 'Halo juga!');
        })
    }
    getFollow() {
        this.onText(commands.follow, (msg, after) => {
            this.sendMessage(msg.from.id, `Makasih udah follow ${after[1]}`);
        })
    }
    getQuotes() {
        this.onText(commands.quote, async (msg) => {
            const quoteEndpoint = 'https://api.kanye.rest/';
            try {
                const apiCall = await fetch(quoteEndpoint);
                const { quote } = await apiCall.json();

                this.sendMessage(msg.from.id, quote);
            } catch (error) {
                console.log(error)
            }
        })
    }
    getnews() {
        this.onText(commands.news, async (msg) => {
            const newsEndpoint = 'https://jakpost.vercel.app/api/category/indonesia'
            this.sendMessage(msg.from.id, 'Sedang mengambil berita terbaru. Mohon tunggu sebentar...');
            try {
                const apiCall = await fetch(newsEndpoint);
                const response = await apiCall.json();
                const maxNews = 4

                for (let i = 0; i < maxNews; i++) {
                    const news = response.data[i];
                    const { title, image, headline } = news;
                    this.sendPhoto(msg.from.id, image, { caption: `${title}\n\n${headline}` });
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
    getQuake() {
        const quakeEndpoint = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json'

        try {
            this.onText(commands.quake, async (msg) => {
                const apiCall = await fetch(quakeEndpoint);
                const response = await apiCall.json();
                const { Tanggal, Jam, Magnitude, Kedalaman, Wilayah, Potensi } = response.Infogempa.gempa;
                const imgSourceUrl = 'https://data.bmkg.go.id/DataMKG/TEWS/' + response.Infogempa.gempa.Shakemap;
                const quakeInfo = `Tanggal: ${Tanggal}\nJam: ${Jam}\nMagnitude: ${Magnitude}\nKedalaman: ${Kedalaman}\nWilayah: ${Wilayah}\nPotensi: ${Potensi}`;
                this.sendPhoto(msg.from.id, imgSourceUrl, { caption: quakeInfo });
            })
        } catch (error) {
            console.log(error)
        }
    }
    getHelp() {
        this.onText(commands.help, async (msg) => {
            const botProfile = await this.getMe();
            this.sendMessage(msg.from.id, helpText);
        })
    }
}

module.exports = KenBot;