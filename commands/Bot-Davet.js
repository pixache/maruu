// Son güncelleme: 0.2.1.4 (24 Mayıs)

const Discord = require("discord.js");
const config = require("./storages/config.json");

module.exports.run = async(client, message, args) => {
    let davet = new Discord.RichEmbed()
    	.setColor(config.yesil)
    	.setTitle("Beni davet edin!")
    	.setDescription("[Sunucuna davet etmek için tıkla!](https://discordapp.com/oauth2/authorize?client_id=577503350451339285&scope=bot&permissions=268692662)");
    message.channel.send(davet);
}

module.exports.help = {
  name: 'davet'
}
