// Son güncelleme: 0.2.1.4 (24 Mayıs)

const Discord = require("discord.js");
const config = require("../data/config.json");

module.exports.run = async(client, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let uptime = `${hours} saat, ${minutes} dakika`;

    let bilgi = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle("Maruu > Bilgiler")
        .setThumbnail(client.user.avatarURL)
        .addField(`Genel Bilgiler`, `**Geliştirici:** Awakai#1586\n**Destek Sunucusu:** [Tıkla ve Gel](https://discord.gg/NBA8wYT)\n**Oy Ver:** [Tıkla](https://discordbots.org/bot/577503350451339285/vote)`, true)
        .addField(`Bot Bilgileri`, `**Sürüm:** v0.2.2 (12/06)\n**Gecikme:** ${Math.floor(client.ping)} milisaniye\n**Online süresi:** ${uptime}`, true)
        .addField(`Sunucu Bilgileri`, `**Sunucular:** ${client.guilds.size}\n**Kanallar:** ${client.channels.size}\n**Kullanıcılar:** ${client.users.size}`, true)
        .addField(`Diğer Bilgiler`, `**Kitaplık:** discord.js\n**Discord.js Sürümü:** 11.3.2\n**NodeJS Sürümü:** 10.15.3`, true)
        .setTimestamp()
        .setFooter(`${message.author.username} tarafından istendi.`, client.user.avatarURL);
    message.channel.send(bilgi);
}

module.exports.help = {
  name: 'bilgi'
}
