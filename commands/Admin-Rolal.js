// Son güncelleme: 0.2.2 (12/06)
// Mesajlar değiştirildi.

const Discord = require("discord.js");
const config = require("../data/config.json");
const emote = require("../data/emotes.json");

function e(color, title) {
	let _embed = new Discord.RichEmbed()
		.setColor(color)
		.setTitle(title)
	return _embed;
}

module.exports.run = async(client, m, args) => {
	let member = m.mentions.members.first();
	let rol = args.slice(1).join(" ");
	let guildrole = m.guild.roles.find(role => role.name === `${rol}`);

	if(!m.member.hasPermission("MANAGE_ROLES")) {
		m.channel.send(e(config.kirmizi, emote["nope"] + " Bu komutu kullanabilmek için **Rolleri Yönet** yetkisi gerekir.")); return;
	}else{
		if(!member) return m.channel.send(e(config.kirmizi, `${emote["nope"]} Lütfen bir üye etiketleyin.`));
		if(!rol) return m.channel.send(e(config.kirmizi, `${emote["nope"]} Lütfen alacağınız rolü belirtin.`));
		if(!guildrole) return m.channel.send(e(config.kirmizi, `${emote["nope"]} ${rol} adında bir rol bulamadım.`));
		if(!member.roles.find(role => role.name === `${rol}`)) return m.channel.send(e(config.kirmizi, `${emote["nope"]} **${member.user.username}** bu role zaten sahip değil.`));

		member.removeRole(guildrole).catch(console.error);
		m.channel.send(e(config.yesil, `${emote["yep"]} **${member.user.username}** üyesinden **${rol}** rolü başarıyla alındı.`));
	}
}

module.exports.help = {
	name: 'rolal'
}
