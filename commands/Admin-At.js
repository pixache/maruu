// Son güncelleme: 0.2.2 (12/06)
// Mesajlar değiştirildi, emojiler eklendi, mantık hataları giderildi.

const Discord = require("discord.js");
const config = require("../data/config.json");
const emote = require('../data/emotes.json');

function e(color, title) {
	let _embed = new Discord.RichEmbed()
		.setColor(color)
		.setTitle(title)
	return _embed;
}

module.exports.run = async(client, m, args) => {
	if(!m.member.hasPermission("KICK_MEMBERS")) return m.channel.send(e(config.mor, emote["nope"] + " Bu komutu kullanmak için **Kullanıcıları At** yetkisi gerekir."));

	let member = m.mentions.members.first();
	if(!member) return m.channel.send(e(config.mor, emote["nope"] + " Lütfen bir kullanıcı etiketleyin."));
	if(!member.kickable) return m.channel.send(e(config.mor, emote["nope"] + " Bu kullanıcıyı atamam."))

	let reason = args.slice(1).join(" ");
	if(!reason) reason = "Sebep belirtilmedi.";

	await member.kick(reason)
		.catch(error => m.channel.send(e(config.mor, emote["nope"] + `Kullanıcıyı atamadım: ${err}`)));

	let kicked = new Discord.RichEmbed()
		.setColor(config.mor)
		.setTitle("Kullanıcı Atıldı")
		.addField(`Atılan:`, `${member.user.tag}`)
		.addField(`Atan:`, `${m.author.tag}`)
		.addField(`Sebep:`, `${reason}`)
		.setTimestamp();
	m.channel.send(kicked).catch(err => console.log(err));
}

module.exports.help = {
	name: 'at',
}
