// Son güncelleme: 0.2.2 (12/06)
// Gereksiz satırlar kaldırıldı.
// Mesajlar değiştirildi.
// 4 Saniye sonra silinen silme mesajı eklendi.

const Discord = require('discord.js');
const config = require('../data/config.json');
const emote = require('../data/emotes.json');

function e(color, desc) {
    let _embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle(desc);
    return _embed;
}

module.exports.run = async(client, message, args) => {
	let deleteCount = parseInt(args[0], 10);
	if(!deleteCount || deleteCount < 2 || deleteCount > 100) {
		let msg = await message.channel.send(e(config.mor, emote["nope"] + " Lütfen **2** ile **100** arasında bir sayı girin."));
		msg.delete(5000);
	}else {
		let fetched = await message.channel.fetchMessages({limit: deleteCount});
		let m = await message.channel.send(e(config.mor, emote["yep"] + " Başarıyla **" + deleteCount + "** mesaj silindi."));
	
		message.channel.bulkDelete(fetched).catch(error => message.channel.send(e(config.mor, emote["nope"] + ` Mesajlar silinemedi: ${error}`)));
		m.delete(4000);
	}
}

module.exports.help = {
	name: 'sil'
}
