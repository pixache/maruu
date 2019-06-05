const Discord = require('discord.js');
const config = require('../config.json');
const guildConf = require('../guildConf.json');
const fs = require('fs');

module.exports.run = async(client, message, args) => {

    if(message.author.id === "361059389731373066") {
        let embed = new Discord.RichEmbed()
            .setColor(config.mavi)
            .setTitle('Maruu > Sunucu Ayarları')
            .setDescription('**Giriş-Çıkış Kanalı:** `' + `${guildConf[guild.id].welcomeChannel}` + '`\n\n' + '**Oto-Rol:** `' + `${guildConf[guild.id].welcomeRole}` + '`')
            .setTimestamp()
            .setFooter('Daha detaylı bilgiler eklenecektir.', message.author.avatarURL);
        message.channel.send(embed);
    }else{
        return;
    }
}

module.exports.help = {
    name: 'ayarlar'
}
