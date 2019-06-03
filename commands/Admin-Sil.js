// Son güncelleme: 0.2.1.5 (25 Mayıs)
// Silme mesajı artık gönderilmiyor.

const Discord = require("discord.js");
const config = require("../storages/config.json");

module.exports.run = async(client, message, args) => {
	let deleteCount = parseInt(args[0], 10);
	if(!deleteCount || deleteCount < 2 || deleteCount > 100) return message.channel.send("Lütfen 2 ile 100 arası bir sayı belirtin.");

	let fetched = await message.channel.fetchMessages({limit: deleteCount});
	message.channel.bulkDelete(fetched)
		.catch(error => message.channel.send(`:no_entry: **Hata:** Mesajlar silinemedi: ${error}`));
}

module.exports.help = {
	name: 'sil'
}
