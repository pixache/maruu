// Son güncelleme: 0.2.1.8 (11/06)

const Discord = require("discord.js");
const config = require("../data/config.json");
const emote = require('../data/emotes.json');

function fastembed(color, desc) {
    let _embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle(desc);
    return _embed;
}
  

module.exports.run = async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(fastembed(config.mor, emote["nope"] + " Bu komutu kullanmak için 'Mesajları Yönet' yetkisi gerekir."));
    
    let msg = await message.channel.send(fastembed(config.mavi, emote["pin"] + " Pekala, şimdi yazacağın mesaj sabitlenecek. 'iptal' yazarak çıkabilirsin."))
        .then(function(){
            message.channel.awaitMessages(response => message.content, {
                max: 1,
                time: 100000000,
                errors: ['time'],
                })
                .then((collected) => {
                    if(collected.first().author === message.author) {
                        if(collected.first().content === "iptal") {
                            message.channel.send(fastembed(config.mavi, emote["yep"] + " Tamam, sabitlemeyi iptal ettim."));
                        }else {
                            collected.first().pin()
                            message.channel.send(fastembed(config.yesil, emote["yep"] + " Mesaj sabitlendi!"));
                        }
                    }
                })
                .catch(function(){
                    message.channel.send(fastembed(config.mor, emote["nope"] + " Süren doldu, hiç mesaj yazmadın."));
            });
        });
}

module.exports.help = {
	name: 'sabitle'
}
