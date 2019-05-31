// Son güncelleme: 0.2.1.5 (31 Mayıs)

const Discord = require('discord.js');
const config = require('../config.json');

function fastembed(color, desc) {
    let embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle(desc);
    return embed;
  }

  
module.exports.run = async(client, message, args) => {
    let member = message.mentions.users.first() || message.author;

    let info = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setThumbnail(member.avatarURL)
        .addField('Kullanıcı Adı', member.tag, true)
        .addField('Kullanıcı ID', member.id, true)
        .addField('Durumu', member.presence.status, true)
        .addField('Ayırıcı', member.discriminator, true)
        .addField('Sunucuya Katıldı', message.member.guild.joinedAt, true)
        .addField("Discord'a Katıldı", member.createdAt, true);

    message.channel.send(info);
}

module.exports.help = {
    name: 'üyebilgi'
}