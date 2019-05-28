// Son güncelleme: 0.2.1.2 (23 Mayıs)

const Discord = require("discord.js");
const config = require("../config.json");

function fastembed(color, title, desc, message) {
	let embed = new Discord.RichEmbed()
		.setColor(color)
		.setTitle(title)
		.setDescription(desc)
	message.delete();
	message.channel.send(embed);
}

module.exports.run = async(client, message, args) => {
	if(!message.member.hasPermission("KICK_MEMBERS")) return fastembed(config.kirmizi, "Hata", ":no_entry: Gereken yetkiye sahip değilsin.", message);

	let member = message.mentions.members.first();
	if(!member) return fastembed(config.kirmizi, "Hata", ":no_entry: Bir kullanıcı etiketleyin.", message);
	if(!member.bannable) return fastembed(config.kirmizi, "Hata", ":no_entry: Bu kullanıcı yasaklanamaz.", message);

	let reason = args.slice(1).join(" ");
	if(!reason) reason = "Sebep belirtilmedi.";

	await member.ban(reason)
		.catch(error => fastembed(config.kirmizi, "Hata", `:question: Kullanıcı yasaklanamadı.\n:arrow_right: Sebep: ${error}.`, message));

	let banned = new Discord.RichEmbed()
		.setColor(config.kirmizi)
		.setTitle("Kullanıcı Yasaklandı")
		.addField(`Yasaklanan:`, `${member.user.tag}`)
		.addField(`Yasaklayan:`, `${message.author.tag}`)
		.addField(`Sebep:`, `${reason}`)
		.setTimestamp();
	message.channel.send(banned);
}

module.exports.help = {
	name: 'ban'
}
