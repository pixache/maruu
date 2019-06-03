const Discord = require('discord.js');
const config = require('../storages/config.json');

module.exports.run = async(client, message, args) => {
    if(message.author.id === "361059389731373066") {
        var list = client.guilds.array().sort();

        let embed = new Discord.RichEmbed()
            .setColor(config.mavi)
            .setTitle('Maruu > Sunucular');

        for(var i in list) {
            embed.addField(`${list[i].name}`, `**Üye:** ${list[i].members.size}\n**Kanal:** ${list[i].channels.size}`);
        }
    
        message.author.send(embed);
    }else {
        return;
    }
}

module.exports.help = {
    name: 'sunucular'
}