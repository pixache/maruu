// Son Güncelleme 0.2.1.8 (11/06)

const Discord = require("discord.js");
const config = require("../data/config.json");

function fastembed(color, desc) {
    let _embed = new Discord.RichEmbed().setColor(color).setTitle(desc);
    return _embed
}

module.exports.run = async(client, message, args) => {
    let sayi = `${Math.floor(Math.random() * 100 + 1)}`;
    let msg = await message.channel.send(fastembed(config.mavi, "Pekala, **1** ile **100** arasında bir sayı tuttum. **10** saniyen var."))
        .then(function(){
            message.channel.awaitMessages(response => message.content, {
                max: 1,
                time: 10000,
                errors: ['time'],
                })
                .then((collected) => {
                    if(collected.first().content === sayi) {
                        message.channel.send(fastembed(config.yesil, "<:yep:588029697523187763> Tebrikler, tuttuğum sayı **" + sayi + "** idi!"));
                    }else {
                        message.channel.send(fastembed(config.kirmizi, "<:nope:588029658000392213> Maalesef **" + sayi + "** tutmuştum!"));
                    }
                })
                .catch(function(){
                    message.channel.send(fastembed(config.kirmizi, "<:nope:588029658000392213> Süren doldu! **" + sayi + "** tutmuştum."));
            });
        });
}

module.exports.help = {
	name: 'sayıtut'
}
