const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
    let yardim = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle("Maruu > Yardım")
        .setThumbnail(client.user.avatarURL)
        .setDescription(`${config.at}\n${config.ban}\n${config.bilgi}\n${config.davet}\n${config.ping}\n${config.rolal}\n${config.rolver}\n${config.sil}\n${config.soyle}`)
        .setTimestamp()
    message.channel.send(yardim);
  }

module.exports.help = {
  name: 'yardım'
}