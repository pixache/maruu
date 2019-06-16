// Son güncelleme: 0.2.2.1 (16/06)
// Bölge, roller ve emojiler eklendi.
// Kanal sayısı detaylandırıldı.
// Kullanıcı sayıso detaylandırıldı.

const Discord = require("discord.js");
const config = require("../data/config.json");
const moment = require('moment');

const regr = {
	"brazil" : "Brezilya",
	"eu-central" : "Orta Avrupa",
	"eu-west" : "Batı Avrupa",
	"hongkong" : "Hong Kong",
	"india" : "Hindistan",
	"japan" : "Japonya",
	"russia" : "Rusya",
	"singapore" : "Singapur",
	"southafrica" : "Güney Afrika",
	"sydney" : "Sydney",
	"us-central" : "Orta Amerika",
	"us-east" : "Doğu Amerika",
	"us-west" : "Batı Amerika",
	"us-south" : "Güney Amerika"
}

module.exports.run = async(client, message, args) => {
	let reg = message.guild.region;
	if(reg) {
		reg = reg.replace(reg, regr[reg])
	}

	let embed = new Discord.RichEmbed()
		.setColor(config.mavi)
		.setTitle(`${message.guild.name} Bilgileri`)
		.setThumbnail(message.guild.iconURL)
		.addField(`Kurucu`, message.guild.owner, true)
		.addField('Kuruluş Tarihi', moment(message.guild.createdAt).format('DD/MM/YYYY hh:mm:ss'), true)
		.addField(`Kullanıcılar (` + message.guild.members.size + ')', `**Çevrimiçi:** ${message.guild.members.filter(m => m.presence.status !== "offline").size}\n**Çevrimdışı:** ${message.guild.members.filter(m => m.presence.status === "offline").size}\n**Bot:** ${message.guild.members.filter(m => m.user.bot).size}`, true)
		.addField('Kanallar (' + message.guild.channels.size + ')', '**Kategori:** ' + message.guild.channels.filter(x => x.type === "category").size + '\n**Sohbet:** ' + message.guild.channels.filter(x => x.type === "text").size + '\n**Ses:** ' + message.guild.channels.filter(x => x.type === "voice").size, true)
		.addField('Bölge', reg, true)
		.addField('Roller (' + message.guild.roles.size + ')', message.guild.roles.array().sort().join(' **|** '), true);
		if(message.guild.emojis.size > 1) {
			embed.addField('Emojiler (' + message.guild.emojis.size + ')', message.guild.emojis.array().sort().join(" "), true)
		}else {
			embed.addField('Emojiler (0)', 'Bu sunucunun hiç emojisi yok.', true)
		}
		embed.setTimestamp()
	message.channel.send(embed);
}

module.exports.help = {
	name: 'sunucubilgi'
}
