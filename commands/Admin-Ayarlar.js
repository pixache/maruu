const Discord = require('discord.js');
const config = require('../config.json');
const guildConf = require('../guildConf.json');
const fs = require('fs');

module.exports.run = async(client, message, args) => {
    let guild = message.guild;
    if(!guildConf[guild.id]) {
        guildConf[guild.id] = {
            name: guild.name,
            welcomeChannel: 'hoşgeldin',
            welcomeRole: 'Üye'
        }
        fs.writeFile('../guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {
            if(err) console.log(err)
        });
    }
    if(message.member.hasPermission('ADMINISTRATOR') || message.author.id === "361059389731373066") {
        let embed = new Discord.RichEmbed()
            .setColor(config.mavi)
            .setTitle('Maruu > Sunucu Ayarları')
            .setDescription('**Giriş-Çıkış Kanalı:** `' + `${guildConf[guild.id].welcomeChannel}` + '`\n\n' + '**Oto-Rol:** `' + `${guildConf[guild.id].welcomeRole}` + '`')
            .setTimestamp()
            .setFooter('Daha detaylı bilgiler eklenecektir.', message.author.avatarURL);
        message.channel.send(embed);
    }else{
        message.channel.send("Bunun için yetkiniz yok.")
    }
}

module.exports.help = {
    name: 'ayarlar'
}