// Son güncelleme: 0.2.1.4 (24 Mayıs)

const Discord = require("discord.js");
const config = require("../data/config.json");

module.exports.run = async(client, message, args) => {
	let msg = await message.channel.send(":game_die: Zar sallanıyor..");
  let zar = Math.floor(Math.random() * 6 + 1);
	let embed = new Discord.RichEmbed().setColor(config.yesil).setTitle("Zar Sallandı").setDescription(`:game_die: **Salladın:** ${zar}`)
  msg.edit(embed);
}

module.exports.help = {
  name: 'zar'
}