// Son güncelleme: 0.2.1.4 (24 Mayıs)

const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
		let embed = new Discord.RichEmbed()
			.setColor(config.mavi)
			.setTitle(`${message.guild.name} Bilgileri`)
			.setThumbnail(message.guild.iconURL)
			.addField(`Yönetim`, `**Kurucu:** ${message.guild.owner}\n**Oluşturuldu:** ${message.guild.createdAt}`)
			.addField(`Topluluk`, `**Kanallar** ${message.guild.channels.size}\n**Kullanıcılar:** ${message.guild.members.size}\n**Roller:** ${message.guild.roles.size}`)
			.setTimestamp()
			.setFooter("Daha detaylı bilgiler eklenecek.");
		message.channel.send(embed);
	}

module.exports.help = {
  name: 'sunucubilgi'
}
