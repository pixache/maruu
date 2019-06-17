// Son güncelleme: 0.2.2 (12/06)

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
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(fastembed(config.mor, emote["nope"] + " Bu komutu kullanmak için 'Mesajları Yönet' yetkisi gerekir."));
    
    let komut = args[0];
    if(komut === "sıfırla") {
        message.channel.setTopic("").then(message.channel.send(fastembed(config.yesil, emote["yep"] + " Kanal başlığı sıfırlandı!")))
        return;
    }else if(komut === "ayarla") {
        let msg = await message.channel.send(fastembed(config.mavi, emote["pin"] + " Pekala, şimdi yazacağın mesaj kanal başlığı olacak. **iptal** yazarak çıkabilirsin."))
        .then(function(){
            message.channel.awaitMessages(response => message.content, {
                max: 1,
                time: 100000000,
                errors: ['time'],
                })
                .then((collected) => {
                    if(collected.first().author === message.author) {
                        if(collected.first().content === "iptal") {
                            message.channel.send(fastembed(config.mavi, emote["yep"] + " Tamam, başlık düzenleme iptal edildi."));
                        }else {
                            collected.first().channel.setTopic(collected.first().content)
                            message.channel.send(fastembed(config.yesil, emote["yep"] + " Kanal başlığı ayarlandı!"));
                        }
                    }
                })
                .catch(function(){
                    message.channel.send(fastembed(config.mor, emote["nope"] + " Süren doldu, hiç mesaj yazmadın."));
            });
        });
    }else if(komut === "bak" || !komut) {
        if(message.channel.topic) return message.channel.send("**Kanal başlığı:** ```\n" + message.channel.topic + "\n```");
        else return message.channel.send(fastembed(config.mor, emote["nope"] + " Bu kanalın başlığı yok."));
    }
}

module.exports.help = {
	name: 'başlık'
}
