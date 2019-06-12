// Son güncelleme: 0.2.2 (11/06)
// Mesajlar değiştirildi, emojiler eklendi.
// Komut değiştirildi.

const Discord = require("discord.js");
const config = require("../data/config.json");
const emote = require('../data/emotes.json');

function e(color, title) {
	let _embed = new Discord.RichEmbed()
		.setColor(color)
		.setTitlm.channel.send(title)
	return _embed
}

module.exports.run = async(client, m, args) => {
	if(!m.member.hasPermission("BAN_MEMBERS")) return m.channel.send(e(config.kirmizi, emote["nope"] + " Bu komutu kullanmak için **Kullanıcıları Yasakla** yetkisi gerekir."));

	let member = m.mentions.members.first();
	if(!member) return m.channel.send(e(config.kirmizi, emote["nope"] + " Lütfen bir kullanıcı etiketleyin."));
	if(!member.bannable) return m.channel.send(e(config.kirmizi, emote["nope"] + " Bu kullanıcıyı yasaklayamam."))

	let reason = args.slicm.channel.send(1).join(" ");
	if(!reason) reason = "Sebep belirtilmedi.";

	await member.ban(reason)
		.catch(error => m.channel.send(e(config.kirmizi, emote["nope"] + ` Kullanıcıyı yasaklayamadım: ${error}`)));

	let banned = new Discord.RichEmbed()
		.setColor(config.kirmizi)
		.setTitle("Kullanıcı Yasaklandı")
		.addField(`Yasaklanan:`, `${member.user.tag}`)
		.addField(`Yasaklayan:`, `${m.author.tag}`)
		.addField(`Sebep:`, `${reason}`)
		.setTimestamp();
	m.channel.send(banned);
}

module.exports.help = {
	name: 'yasakla'
}
