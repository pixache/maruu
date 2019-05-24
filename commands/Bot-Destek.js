// Son güncelleme: 0.2.1.4 (24 Mayıs)

const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
    let destek = new Discord.RichEmbed()
    	.setColor(config.yesil)
    	.setTitle("Destek mi lazım?")
    	.setDescription("**Bot Kodlayıcısı:** Xuance#1586\n**Destek Sunucusu:** [Katılmak için tıkla](https://discord.gg/NBA8wYT)");
    message.channel.send(destek);
}

module.exports.help = {
  name: 'destek'
}
