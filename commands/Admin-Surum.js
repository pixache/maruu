// Son Güncelleme 0.2.2.1 (12/06)

const Discord = require('discord.js');
const config = require("../data/config.json");

module.exports.run = async(client, message, args) => {
	if(!message.member.hasPermission('ADMINISTRATOR')) return;

	if(message.guild.id === "578239812927225889") {
		message.delete().then(
		message.channel.send({embed: {
			color: 3447003,
			author: {name: 'Maruu ❯ Güncellemeler'},
					fields: [
						{
						name: ":inbox_tray: | Güncelleme 0.2.2.1",
						value:"**Eklenenler:**\n" +
							  "**>** `sunucubilgi` komutu geliştirildi.\n" +
							  "**>** `güncellemeler` komutu eklendi.\n" + 
							  "**>** Tüm komutlara bekleme süresi eklendi.\n\n" + 
							  "**Kaldırılanlar:**\n" +
							  "**>** `sunucuikon` komutu kaldırıldı."
						}
					],
					timestamp: new Date(),
				}}));
	}else {
		message.author.send({embed: {
			color: 3447003,
			author: {name: 'Maruu ❯ Güncellemeler'},
					fields: [
						{
						name: ":inbox_tray: | Güncelleme 0.2.2.1",
						value:"**Eklenenler:**\n" +
							  "**>** `sunucubilgi` komutu geliştirildi.\n" +
							  "**>** `güncellemeler` komutu eklendi.\n" + 
							  "**>** Tüm komutlara bekleme süresi eklendi.\n\n" + 
							  "**Kaldırılanlar:**\n" +
							  "**>** `sunucuikon` komutu kaldırıldı."
						}
					],
					timestamp: new Date(),
				}});
		let m = await message.channel.send(':outbox_tray: | **' + message.author.username + '**, sürüm bilgisini mesaj kutuna bıraktım!')
			.catch(err => m.edit('Sana mesaj gönderemedim, sunucudan mesaj almayı engellemiş olabilir misin?'));
		m.delete(5000)
	}
}

module.exports.help = {
    name: 'güncellemeler'
}