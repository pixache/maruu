const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
    let yardim = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle("Maruu > Yardım")
        .setThumbnail(client.user.avatarURL)
        .setDescription(`:small_blue_diamond: **m!yardım admin** Admin komutlarını gösterir.\n:small_blue_diamond: **m!yardım bot** Bot komutlarını gösterir.\n:small_blue_diamond: **m!yardım sunucu** Sunucu komutlarını gösterir.\n:small_blue_diamond: **m!yardım üye** Üye komutlarını gösterir.`)
        .setTimestamp();
    let admin = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle("Maruu > Admin Komutları")
        .setThumbnail(client.user.avatarURL)
        .setDescription(`${config.at}\n${config.ban}\n${config.rolal}\n${config.rolver}\n${config.sil}`)
        .setTimestamp();
    let bot = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle("Maruu > Bot Komutları")
        .setThumbnail(client.user.avatarURL)
        .setDescription(`${config.bilgi}\n${config.davet}\n${config.destek}`)
        .setTimestamp();
    let sunucu = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle("Maruu > Admin Komutları")
        .setThumbnail(client.user.avatarURL)
        .setDescription(`${config.sunucu}`)
        .setTimestamp()
        .setFooter("Komutlar henüz geliştirme aşamasındadır.");
    let uye = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle("Maruu > Üye Komutları")
        .setThumbnail(client.user.avatarURL)
        .setDescription(`${config.ping}\n${config.soyle}\n${config.zar}`)
        .setTimestamp();

    if(!args[0]) return message.channel.send(yardim);
    if(args[0] === "admin") return message.channel.send(admin);
    if(args[0] === "bot") return message.channel.send(bot);
    if(args[0] === "sunucu") return message.channel.send(sunucu);
    if(args[0] === "üye") return message.channel.send(uye);
  }

module.exports.help = {
  name: 'yardım'
}
