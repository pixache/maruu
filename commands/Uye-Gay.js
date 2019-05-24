const Discord = require("discord.js");
const config = require("../config.json");

function fastembed(color, title, desc, message) {
  let embed = new Discord.RichEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(desc)
  return embed;
}

module.exports.run = async(client, message, args) => {
    let uye = message.mentions.members.first() || message.author;
    let oran = Math.floor(Math.random() * 100 + 1);
    message.channel.send(fastembed(config.mavi, "Gay ölçer", `${uye.username} **${oran}%** gay.`));
}

module.exports.help = {
  name: 'gay'
}
