// Son güncelleme: 0.2.1.6 (01/06)

const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
  let msg = await message.channel.send(":art: Avatar yükleniyor...");
  let target = message.mentions.users.first() || message.author;

  await message.channel.send({files: [
    {
      attachment: target.displayAvatarURL,
      name: "avatar.png"
    }
  ]});

  msg.delete();
}

module.exports.help = {
	name: 'avatar'
}
