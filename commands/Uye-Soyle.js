// Son güncelleme: 0.2.2.2 (17/06)
// Mesaj değiştirildi.

const Discord = require('discord.js');
const config = require('../data/config.json');
const emote = require('../data/emotes.json')

module.exports.run = async(client, message, args) => {
	let sayMessage = args.join(" ");
	let embed = new Discord.RichEmbed().setColor(config.kirmizi).setTitle(emote["nope"] + " Söylenecek mesajı girmediniz.");
	if(!sayMessage) {
		let m = await message.channel.send(embed).then(message.delete());
		m.delete(4000);
	}else {
		message.delete().catch(O_o=>{});
		message.channel.send(sayMessage);
	}
}

module.exports.help = {
	name: 'söyle'
}
