// Son güncelleme: 0.2.1.4 (24 Mayıs)

const Discord = require("discord.js");
const config = require("../config.json");

function fastembed(icon, color, title, desc, message) {
  let embed = new Discord.RichEmbed()
    .setColor(color)
    .setThumbnail(icon)
    .setTitle(title)
    .setDescription(desc);
  message.delete();
  message.channel.send(embed);
}

module.exports.run = async(client, message, args) => {
    if(!args[0]) return fastembed(client.user.avatarURL, config.mavi, "Maruu > Yardım", `:small_blue_diamond: **m!yardım admin** Admin komutlarını gösterir.\n:small_blue_diamond: **m!yardım bot** Bot komutlarını gösterir.\n:small_blue_diamond: **m!yardım sunucu** Sunucu komutlarını gösterir.\n:small_blue_diamond: **m!yardım üye** Üye komutlarını gösterir.`, message);
    if(args[0] === "admin") fastembed(client.user.avatarURL, config.mavi, "Maruu > Admin Komutları", `${config.at}\n${config.ban}\n${config.rolal}\n${config.rolver}\n${config.sil}`, message);
    if(args[0] === "bot") fastembed(client.user.avatarURL, config.mavi, "Maruu > Bot Komutları", `${config.bilgi}\n${config.davet}\n${config.destek}`, message);
    if(args[0] === "sunucu") fastembed(client.user.avatarURL, config.mavi, "Maruu > Sunucu Komutları", `${config.sunucubilgi}\n${config.sunucuikon}`, message);
    if(args[0] === "üye") fastembed(client.user.avatarURL, config.mavi, "Maruu > Üye Komutları", `${config.ping}\n${config.soyle}\n${config.zar}`, message);
  }

module.exports.help = {
  name: 'yardım'
}
