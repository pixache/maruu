// Son Güncelleme 0.2.2.2 (17/06)

const Discord = require('discord.js');
const config = require("../data/config.json");
const emote = require('../data/emotes.json')

function e(color, desc) {
    let _embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle(desc);
    return _embed;
}

let embed = new Discord.RichEmbed()
	.setColor(config.mor)
	.setTitle('Maruu ❯ Güncellemeler')
	.addField(':inbox_tray: | Güncelleme 0.2.2.3',
			"**Eklenenler:**\n" +
			"**>** `tkm` komutu eklendi.\n" +
			"**>** `bildir` komutu eklendi.\n\n" + 
			"**İyileştirme:**\n" +
			"**>** Bekleme süresi hatası düzeltildi."
			);

module.exports.run = async(client, message, args) => {
	if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(e(config.kirmizi, emote["nope"] + "Bu komutu kullanabilmek için **Yönetici** yetkisi gerekir."));

	if(message.guild.id === "578239812927225889") {
		message.delete().then(message.channel.send(embed));
	}else {
		message.author.send(embed);
		let m = await message.channel.send(':outbox_tray: | **' + message.author.username + '**, sürüm bilgisini mesaj kutuna bıraktım!')
			.catch(err => m.edit('Sana mesaj gönderemedim, sunucudan mesaj almayı engellemiş olabilir misin?'));
		m.delete(5000)
	}
}

module.exports.help = {
    name: 'güncellemeler'
}