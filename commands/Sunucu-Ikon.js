// Son güncelleme: 0.2.1.4 (24 Mayıs)

const Discord = require("discord.js");
const config = require("../storages/config.json");

module.exports.run = async(client, message, args) => {
	let msg = await message.channel.send(":art: Sunucu ikonu yükleniyor...");
	if(!message.guild.iconURL) return msg.edit(":x: Sunucuya ait bir ikon bulunamadı!");

	await message.channel.send({files: [
	{
		attachment: message.guild.iconURL,
		name: "cokgizli.png"
	}
	]});
	msg.delete();
}

module.exports.help = {
	name: 'sunucuikon'
}
