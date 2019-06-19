// Son Güncelleme 0.2.2.2 (17/06)

const Discord = require('discord.js');
const config = require("../data/config.json");
const emote = require('../data/emotes.json')

function e(color, title, desc) {
    let _embed = new Discord.RichEmbed()
      .setColor(color)
      .setTitle(title)
      .setDescription(desc)
    return _embed;
}

module.exports.run = async(client, message, args) => {
    let m = await message.channel.send(e(config.mor, "Bildiri Sistemi", "Lütfen birini seç (1,2,3).\n\n**1) Bug**\n\n**2) İstek**\n\n**3) Diğer**"))
        .then(function(){
            message.channel.awaitMessages(response => message.content, {
                max: 1,
                time: 100000000,
                errors: ['time']
                })
                .then((collected) => {
                    if(collected.first().author === message.author) {
                        if(collected.first().content === "1" || "2" || "3") {
                            if(collected.first().content === "1") {
                                message.channel.send(e(config.mor, "Bug Bildir", "**Bulduğun hatayı yaz.**"))
                                    .then(function(){
                                        message.channel.awaitMessages(res => message.content, {
                                            max: 1,
                                            time: 1000000,
                                            errors: ["time"]
                                        })
                                        .then((colc) => {
                                            if(colc.first().content) {
                                                message.channel.send(e(config.yesil, "Başarılı", "**Bug bildirildi, teşekkürler!**"))
                                                let ch = client.channels.find(x => x.id === "590845436139667457");
                                                ch.send(e(config.mor, message.author.tag + " Tarafından Bug Bildirisi", colc.first().content))
                                            }
                                        }).catch(err => message.channel.send(e(config.kirmizi, "Hata", "Bir hata oluştu:" + err)));
                                    }).catch(err => message.channel.send(e(config.kirmizi, "Hata", "Bir hata oluştu:" + err)));
                            }else if(collected.first().content === "2") {
                                message.channel.send(e(config.mor, "İstek", "**İsteklerini yaz..**"))
                                    .then(function(){
                                        message.channel.awaitMessages(res => message.content, {
                                            max: 1,
                                            time: 1000000,
                                            errors: ["time"]
                                        })
                                        .then((colc) => {
                                            if(colc.first().content) {
                                                message.channel.send(e(config.yesil, "Başarılı", "**İsteğin bize ulaştı, teşekkürler!**"))
                                                let ch = client.channels.find(x => x.id === "590845436139667457");
                                                ch.send(e(config.yesil, message.author.tag + " İsteği", colc.first().content))
                                            }
                                        }).catch(err => message.channel.send(e(config.kirmizi, "Hata", "Bir hata oluştu:" + err)));
                                    }).catch(err => message.channel.send(e(config.kirmizi, "Hata", "Bir hata oluştu:" + err)));
                            }else if(collected.first().content === "3") {
                                message.channel.send(e(config.mor, "Diğer", "**Bize ne bildirmek istersin?**"))
                                    .then(function(){
                                        message.channel.awaitMessages(res => message.content, {
                                            max: 1,
                                            time: 1000000,
                                            errors: ["time"]
                                        })
                                        .then((colc) => {
                                            if(colc.first().content) {
                                                message.channel.send(e(config.yesil, "Başarılı", "**Bildirin bize ulaştı, teşekkürler!**"))
                                                let ch = client.channels.find(x => x.id === "590845436139667457");
                                                ch.send(e(config.mavi, message.author.tag + " Tarafından Bildiri", colc.first().content))
                                            }
                                        }).catch(err => message.channel.send(e(config.kirmizi, "Hata", "Bir hata oluştu:" + err)));
                                    }).catch(err => message.channel.send(e(config.kirmizi, "Hata", "Bir hata oluştu:" + err)));
                            }
                        }else {
                            message.channel.send(e(config.kirmizi, "Hata", "Sadece belirtilen seçenekleri bildirebilirsin."))
                            return;
                        }
                    }else {
                        return;
                    }
                }).catch(err => message.channel.send(e(config.kirmizi, "Hata", "Bir hata oluştu:" + err)));
    });
}

module.exports.help = {
    name: 'bildir'
}