// Son Güncelleme 0.2.2 (12/06)
// Mesaj artık kullanıcıya özel olarak gidiyor.

const Discord = require('discord.js');
const config = require("../data/config.json");

module.exports.run = async(client, message, args) => {
	message.author.send({embed: {
	color: 3447003,
	author: {name: 'Maruu ❯ Yardım'},
			fields: [
				{
				name: ":gear: | Admin Komutları",
				value:"`at`, `ban`, `başlık`, `güncellemeler`, `rolal`, `rolver`, `sabitle`, `sil`",
				},
				{
				name: ':robot: | Bot Komutları',
				value: "`bilgi`, `davet`, `destek`, `yardım`",
				},
				{
				name: ':file_cabinet: | Sunucu Komutları',
				value: '`sunucubilgi`',
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

	let m = await message.channel.send(':mailbox: | **' + message.author.username + '**, mesaj kutunu kontrol et!')
		.catch(err => m.edit('Sana mesaj gönderemedim, sunucudan mesaj almayı engellemiş olabilir misin?'));
	m.delete(5000)
}

module.exports.help = {
    name: 'yardım'
}