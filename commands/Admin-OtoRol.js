// Son güncelleme: 0.2.1.7 (03/06)

const Discord = require("discord.js");
const config = require("../storages/config.json");
const guildConf = require("../storages/guildConf.json");
const fs = require('fs');

function fastembed(color, desc) {
	let embed = new Discord.RichEmbed()
		.setColor(color)
		.setTitle(desc)
	return embed;
}

module.exports.run = async(client, message, args) => {
    if(message.member.hasPermission('ADMINISTRATOR')) {
        if(!args[0]) return message.channel.send(fastembed(config.kirmizi, "Otomatik verilecek rolü belirtin."));
        if(message.guild.roles.find(x => x.name === args[0])) {
            guildConf[message.guild.id].welcomeRole = args[0];
            message.channel.send(fastembed(config.yesil, ":white_check_mark: | Oto-rol **" + args[0] + "** olarak değiştirildi."));
            fs.writeFile('../Maruu/storages/guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {if(err) console.log(err)});
        }else{
            message.channel.send(fastembed(config.kirmizi, 'Sunucuda böyle bir rol bulamadım.'));
        }
    }else{
        message.channel.send(fastembed(config.kirmizi, 'Bunu yapabilmek için **Yönetici** yetkin olmalı!'));
    }
}

module.exports.help = {
  name: 'otorol'
}
