// Son güncelleme: 0.2.1.7 (03/06)
// Tarih yazımı değiştirildi.

const Discord = require("discord.js");
const config = require("../config.json");
const moment = require('moment');

module.exports.run = async(client, message, args) => {
	let embed = new Discord.RichEmbed()
		.setColor(config.mavi)
		.setTitle(`${message.guild.name} Bilgileri`)
		.setThumbnail(message.guild.iconURL)
		.addField(`Yönetim`, `**Kurucu:** ${message.guild.owner}\n**Oluşturuldu:** ${moment(message.guild.createdAt).format('DD/MM/YYYY hh:mm:ss')}`)
		.addField(`Topluluk`, `**Kanallar:** ${message.guild.channels.size}\n**Kullanıcılar:** ${message.guild.members.size}\n**Roller:** ${message.guild.roles.size}`)
		.setTimestamp()
		.setFooter("Daha detaylı bilgiler eklenecek.");
	message.channel.send(embed);
}

module.exports.help = {
	name: 'sunucubilgi'
}
