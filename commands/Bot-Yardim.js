// Son Güncelleme 0.2.1.8 (11/06)

const Discord = require('discord.js');
const config = require("../data/config.json");

module.exports.run = async(client, message, args) => {
	message.channel.send({embed: {
	color: 3447003,
	author: {name: 'Maruu ❯ Yardım'},
			fields: [
				{
				name: ":gear: | Admin Komutları",
				value:"`at`, `ban`, `rolal`, `rolver`, `sabitle`, `sil`",
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
				value: '`avatar`, `bilgi`, `çark`, `komutbilgi`, `ping`, `sayıtut`, `söyle`, `thanos`, `yazıtura`, `zar`'
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