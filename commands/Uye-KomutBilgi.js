// Son güncelleme: 0.2.1.8 (11/06)

const Discord = require("discord.js");
const config = require("../data/config.json");
const commands = require('../data/commands.json');

module.exports.run = async(client, message, args) => {
	if(!args[0]) return message.channel.send("Lütfen bilgilerine bakacağınız komutu girin.");

	let msg = await message.channel.send("Komut bilgisi alınıyor...");
	if(commands[args[0]]) {
		let embed = new Discord.RichEmbed()
			.setColor(config.mavi)
			.setTitle('Komut Bilgileri: ' + args[0])
			.addField('Açıklama', commands[args[0]].desc)
			.addField('Kullanım', commands[args[0]].usage)
			.addField('Yetki', commands[args[0]].perm)
			.addField('Bekleme Süresi', commands["at"].cd)
			.setThumbnail('https://i.imgur.com/Kvol3kE.png')
		msg.edit(embed);
	}else {
		msg.edit("Böyle bir komut bulamadım.")
	}
}

module.exports.help = {
	name: 'komutbilgi',
}
