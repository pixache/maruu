// Son güncelleme: 0.2.2 (12/06)
// Davet mesajı değiştirildi.

const Discord = require("discord.js");
const config = require("../data/config.json");

module.exports.run = async(client, message, args) => {
	let davet = new Discord.RichEmbed()
		.setColor(config.mavi)
		.setURL('https://discordapp.com/oauth2/authorize?client_id=577503350451339285&scope=bot&permissions=268692662')
		.setTitle("<:plus:588416438314729476> Beni sunucuna eklemek için tıkla.")      
	message.channel.send(davet);
}

module.exports.help = {
	name: 'davet'
}
