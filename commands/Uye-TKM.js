// Son güncelleme: 0.2.2.3 (18/06)

const Discord = require("discord.js");
const config = require("../data/config.json");
const emote = require('../data/emotes.json');

const filter = (reaction, user) => {
    return ["✌", '👊', '✋'].includes(reaction.emoji.name) && user.id === message.author.id;
};
let reply = Math.floor(Math.random()*filter.length)

module.exports.run = async(client, message, args) => {
	let replies = ['taş', 'kağıt', 'makas'];
	let consrep = ['Taş', 'Kağıt', 'Makas'];
	let result = Math.floor((Math.random() * consrep.length));
	let uReply = args[0];
        
	if (!uReply) return message.channel.send(`Lütfen birini seçin: \`${replies.join(', ')}\``); 
	if (!replies.includes(uReply)) return message.channel.send(`Sadece oyunda olan seçenekleri seçebilirsin: \`${replies.join(', ')}\``);

	if (replies[result] === uReply) {
		return message.channel.send('It\'s a tie! We had the same choice.');
	} else if (uReply === 'taş') {
		if (replies[result] === 'kağıt') return message.channel.send('Ben kazandım! ' + consrep[result] + ' yapmıştım.');
		else return message.channel.send('Sen kazandın.. ' + consrep[result] + ' yapmıştım.');
	} else if (uReply === 'makas') {
		if (replies[result] === 'taş') return message.channel.send('Ben kazandım! ' + consrep[result] + ' yapmıştım.');
		else return message.channel.send('Sen kazandın.. ' + consrep[result] + ' yapmıştım.');
	} else if (uReply === 'kağıt') {
		if (replies[result] === 'makas') return message.channel.send('Ben kazandım! ' + consrep[result] + ' yapmıştım.');
		else return message.channel.send('Sen kazandın.. ' + consrep[result] + ' yapmıştım.');
	}
}

module.exports.help = {
	name: 'tkm'
}
