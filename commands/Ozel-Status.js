const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async(client, message, args) => {
    if(message.author.id === "361059389731373066") {
        if(!args) message.channel.send(":x: | Lütfen yeni aktiviteyi belirtin!");

        client.user.setActivity(args);
    }else {
        return;
    }
}

module.exports.help = {
    name: 'aktivite'
}
