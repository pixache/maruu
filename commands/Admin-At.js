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

	let member = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!member) return fastembed(config.kirmizi, "Hata", ":no_entry: Bir kullanıcı belirtin.", message);
	if(!member.kickable) return fastembed(config.kirmizi, "Hata", ":no_entry: Bu kullanıcıyı atamam.", message);

	let reason = args.slice(1).join(" ");
	if(!reason) reason = "Sebep belirtilmedi.";

	await member.kick(reason)
		.catch(error => fastembed(config.kirmizi, "Hata", `:question: Kullanıcı atılamadı\n:arrow_right: Sebep: ${error}.`, message));

	let kicked = new Discord.RichEmbed()
		.setColor(config.kirmizi)
		.setTitle("Kullanıcı Atıldı")
		.addField(`Atılan:`, `${member.user.tag}`)
		.addField(`Atan:`, `${message.author.tag}`)
		.addField(`Sebep:`, `${reason}`)
		.setTimestamp();
	message.channel.send(kicked).catch(err => console.log(err));
}

module.exports.help = {
	name: 'at'
}
