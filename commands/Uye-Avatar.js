// Son güncelleme: 0.2.1.7 (03/06)
// Mesaj embed içine alındı.

const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
  let target = message.mentions.users.first() || message.author;

  let embed = new Discord.RichEmbed()
    .setColor(config.mavi)
    .setDescription(":art: **Avatar yükleniyor...**")

  let msg = await message.channel.send(embed);

  msg.edit(embed.setTitle(target.username + " Avatarı").setDescription(" ").setImage(target.displayAvatarURL));
}

module.exports.help = {
	name: 'avatar'
}
