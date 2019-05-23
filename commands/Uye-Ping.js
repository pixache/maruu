const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
	let msg = await message.channel.send("Gecikme hesaplanıyor...");
	let embed = new Discord.RichEmbed().setColor(config.yesil).setTitle("Anlık Gecikmen:").setDescription(`:ping_pong: **Anlık Gecikmen:** ${msg.createdTimestamp - message.createdTimestamp}ms.\n:ping_pong: **Bot Gecikmesi:** ${Math.round(client.ping)}ms`)
    msg.edit(embed)
}

module.exports.help = {
  name: 'ping'
}