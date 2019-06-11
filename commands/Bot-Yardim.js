const Discord = require('discord.js');
const config = require("../config.json");

module.exports.run = async(client, message, args) => {
	message.channel.send({embed: {
	color: 3447003,
	author: {name: 'Maruu ❯ Yardım'},
			fields: [
				{
				name: ":gear: | Admin Komutları",
				value:"`at`, `ayarlar`,  `ban`, `girişkanalı`, `otorol`, `rolal`, `rolver`, `sil`",
				},
				{
				name: ':robot: | Bot Komutları',
				value: "`bilgi`, `davet`, `destek`, `yardım`",
				},
				{
				name: ':file_cabinet: | Sunucu Komutları',
				value: '`sunucubilgi`, `sunucuikon`',
				},
				{
				name: ':spy: | Üye Komutları',
				value: '`avatar`, `bilgi`, `çark`, `ping`, `söyle`, `thanos`, `yazıtura`, `zar`'
				}
			],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: `${message.author.tag} tarafından istendi.`
			}
		}});
}

module.exports.help = {
    name: 'yardım'
}