// Son güncelleme: 0.2.2.1-fix (17/06)

const Discord = require("discord.js");
const config = require("../data/config.json");
const moment = require('moment');

const regr = {
	"brazil" : ":flag_br: Brezilya",
	"eu-central" : ":flag_eu: Orta Avrupa",
	"eu-west" : ":flag_eu: Batı Avrupa",
	"hongkong" : ":flag_hk: Hong Kong",
	"india" : ":flag_in: Hindistan",
	"japan" : ":flag_jp: Japonya",
	"russia" : ":flag_ru: Rusya",
	"singapore" : ":flag_sg: Singapur",
	"southafrica" : ":flag_za: Güney Afrika",
	"sydney" : ":flag_au: Sydney",
	"us-central" : ":flag_us: Orta Amerika",
	"us-east" : ":flag_us: Doğu Amerika",
	"us-west" : ":flag_us: Batı Amerika",
	"us-south" : ":flag_us: Güney Amerika"
}

module.exports.run = async(client, message, args) => {
	let reg = message.guild.region;
	let verifLevels = ["**[0]** Yok", "**[1]** Düşük", "**[2]** Orta", "**[3]** (╯°□°）╯︵  ┻━┻", "**[4]** ┻━┻ミヽ(ಠ益ಠ)ノ"];
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
		.addField('Güvenlik Seviyesi', verifLevels[message.guild.verificationLevel], true);

	let roller = new Discord.RichEmbed()
		.setColor(config.mavi)
		.setTitle('Roller (' + message.guild.roles.size + ')')
		.setDescription(message.guild.roles.array().sort().join(' **|** '));

	let emojiler = new Discord.RichEmbed()
		.setColor(config.mavi)
		if(message.guild.emojis.size > 1) {
			emojiler.setTitle('Emojiler (' + message.guild.emojis.size + ')')
			emojiler.setDescription(message.guild.emojis.array().sort().join(" "))
		}else {
			emojiler.setTitle('Emojiler (0)')
			emojiler.setDescription('Bu sunucunun hiç emojisi yok.')
		}
	message.channel.send(embed).then(message.channel.send(roller)).then(message.channel.send(emojiler));
}

module.exports.help = {
	name: 'sunucubilgi'
}
