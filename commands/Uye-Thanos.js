const Discord = require('discord.js');
const config = require('./storages/config.json');

function fastembed(color, desc) {
  let embed = new Discord.RichEmbed()
    .setColor(color)
    .setDescription(desc);
  return embed;
}

module.exports.run = async(client, msg, args) => {
	let sans = Math.floor(Math.random() * 2 + 1);
	if(sans !== 2) return msg.channel.send(fastembed(config.kirmizi, ":skull: **Thanos'un** şıklatması seni de toza çevirdi!"));
	if(sans = 2) return msg.channel.send(fastembed(config.yesil, ":heart: Şansa bak, evrenin **diğer yarısındansın!**"));
}

module.exports.help = {
	name: 'thanos'
}