const Discord = require('discord.js');
const config = require('../config.json');
const chs = require(`../channels.json`);
const fs = require('fs');

module.exports.run = async(client, message, args) => {
	if(!args[0]) return message.reply("Please define a channel that counting will be in.");
	if(message.guild.channels.get("name", args[0])) return message.reply("This channel doesn't exist, does it?");

	fs.writeFile(`../channels.json`, JSON.stringify(client.chs, null, 4), err => {
		throw err;
	})
}

module.exports.help = {
	name: 'test'
}