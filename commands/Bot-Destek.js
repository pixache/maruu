// Son güncelleme: 0.2.1.4 (24 Mayıs)

const Discord = require("discord.js");
const config = require("./storages/config.json");

module.exports.run = async(client, message, args) => {
    let destek = new Discord.RichEmbed()
    	.setColor(config.yesil)
    	.setTitle("Maruu > Destek")
    	.setDescription("**Geliştirici:** Awakai#1586\n**Destek Sunucusu:** [Katılmak için tıkla](https://discord.gg/NBA8wYT)");
    message.channel.send(destek);
}

module.exports.help = {
  name: 'destek'
}
