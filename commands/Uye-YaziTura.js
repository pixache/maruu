const Discord = require('discord.js');
const config = require("../config.json");

function fastembed(color, desc) {
  let embed = new Discord.RichEmbed()
    .setColor(color)
    .setDescription(desc);
  return embed;
}

module.exports.run = async(client, msg, args) => {
	let sans = Math.floor(Math.random() * 2 + 1);
	if(sans !== 2) return msg.channel.send(fastembed(config.yesil, ":moneybag: Tura geldi!"));
	if(sans === 2) return msg.channel.send(fastembed(config.yesil, ":moneybag: Yazı geldi!"));
}

module.exports.help = {
	name: 'yazıtura'
}