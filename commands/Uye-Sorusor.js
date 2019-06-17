// Son güncelleme: 0.2.2.2 (17/06)

const Discord = require("discord.js");
const config = require("../data/config.json");
const emote = require('../data/emotes.json');

function e(color, title) {
	let _embed = new Discord.RichEmbed()
		.setColor(color)
		.setTitle(title)
	return _embed;
}

function doMagic8BallVoodoo() {
    var rand = [
        'Evet.', 
        'Hayır, neden ki?', 
        'Neden diyorsun böyle bir şeyi?', 
        'Bu soruyu sormandaki amaç neydi? Hayır, asla.', 
        'Şans.', 
        'Kesinlikle.', 
        'Neden olmasın?',
        'Bunu biraz düşünmem lazım.',
        'Sanki sen benden daha iyi bilirsin bunu.'
    ];

    return rand[Math.floor(Math.random()*rand.length)];
}

module.exports.run = async(client, message, args) => {
    let arg = args.join(" ");
    
    if(arg) return message.channel.send(e(config.mavi, doMagic8BallVoodoo()));
    if(!arg) return message.channel.send(e(config.kirmizi, emote["nope"] + " Bana bir soru sormalısın."))
}

module.exports.help = {
  name: 'sorusor'
}
