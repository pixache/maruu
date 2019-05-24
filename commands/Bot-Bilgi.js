// Son güncelleme: 0.2.1.2 (23 Mayıs)

const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    //totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let uptime = `${hours} saat, ${minutes} dakika`;

    let bilgi = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle("Maruu > Bilgiler")
        .setThumbnail(client.user.avatarURL)
        .addField(`Destek`, `**Bot Kodlayıcısı:** Xuance#1586\n**Destek Sunucusu:** [Katılmak için tıkla](https://discord.gg/NBA8wYT)`, true)
        .addField(`Bot Bilgileri`, `**Sürüm:** v0.2.1.3\n**Gecikme:** ${client.ping} milisaniye\n**Online süresi:** ${uptime}`, true)
        .addField(`Sunucu Bilgileri`, `**Sunucular:** ${client.guilds.size}\n**Kanallar:** ${client.users.size}\n**Kullanıcılar:** ${client.channels.size}`, true)
        .addField(`Diğer Bilgiler`, `**Kitaplık:** discord.js\n**Discord.js Sürümü:** 11.3.2\n**NodeJS Sürümü:** 10.5.0`, true)
        .setTimestamp()
        .setFooter(`${message.author.username} tarafından istendi.`, client.user.avatarURL);
    message.channel.send(bilgi);
}

module.exports.help = {
  name: 'bilgi'
}
