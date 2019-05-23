const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
	if(message.channel.type !== "dm") {
		let embed = new Discord.RichEmbed()
			.setColor(config.mavi)
			.setTitle(`${message.guild.name} Bilgileri`)
			.setThumbnail(message.guild.iconURL)
			.addField(`Yönetim`, `**Kurucu:** ${message.guild.owner}\n**Oluşturuldu:** ${message.guild.createdAt}`)
			.addField(`Topluluk`, `**Kanallar** ${message.guild.channels.size}\n**Kullanıcılar:** ${message.guild.members.size}\n**Roller:** ${message.guild.roles.size}`)
			.setTimestamp()
			.setFooter("Daha detaylı bilgiler eklenecek.");
		message.channel.send(embed);
	}else {
		message.channel.send("Bu komut sadece sunucu içinde kullanılabilir.");
	}
}

module.exports.help = {
  name: 'sunucu'
}
