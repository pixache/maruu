// Son güncelleme: 0.2.1.6 (01/06)

const Discord = require('discord.js');
const config = require('../config.json');
const moment = require('moment');
let stlist = {
	"online" : "Çevrimiçi",
	"offline" : "Çevrimdışı",
	"dnd" : "Rahatsız Etmeyin",
	"idle" : "Müsait",
	"streaming" : "Yayında"
}

module.exports.run = async(client, message, args) => {
	let member = message.mentions.users.first() || message.author;

	let st = member.presence.status;
	if(st === "dnd" || "online" || "offline" || "idle" || "streaming") {
		st_dr = stlist[st]
	}

    let info = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setThumbnail(member.avatarURL)
		.addField('Kullanıcı Adı', member.tag, true)
        .addField('Kullanıcı ID', member.id, true)
        .addField('Durumu', st_dr, true)
		.addField('Ayırıcı', member.discriminator, true)
        .addField('Sunucuya Katıldı', moment(message.member.guild.joinedAt).format('DD/MM/YYYY hh:mm:ss'), true)
        .addField("Discord'a Katıldı", moment(member.createdAt).format('DD/MM/YYYY hh:mm:ss'), true);

    message.channel.send(info);
}

module.exports.help = {
    name: 'üyebilgi'
}