const Discord = require("discord.js");
const config = require("../config.json");

function fastembed(color, title, desc, message) {
  let embed = new Discord.RichEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(desc)

  message.delete();
  message.channel.send(embed);
}

module.exports.run = async(client, message, args) => {
    let member = message.mentions.members.first();
    let rol = args.slice(1).join(" ");
    let guildrole = message.guild.roles.find(role => role.name === `${rol}`);

    if(message.member.hasPermission("MANAGE_ROLES")) {
      if(!member) return fastembed(config.kirmizi, "Hata", `Lütfen sunucunun bir üyesini belirtin.`, message);
      if(!rol) return fastembed(config.kirmizi, "Hata", `Lütfen vereceğiniz rolü belirtin.`, message);
      if(!guildrole) return fastembed(config.kirmizi, "Hata", `${rol} adında bir rol bulunamadı.`, message);
      if(member.roles.find(role => role.name === `${rol}`)) return fastembed(config.kirmizi, "Hata", `**${member.user.username}**, **${rol}** rolüne zaten sahip.`, message);

      member.addRole(guildrole).catch(console.error);
      fastembed(config.yesil, "Rol Verildi", `Rol Verildi: ${member}\nVerilen Rol: ${rol}\nRolü Veren: ${message.author.username}`, message);
    }else{
    	fastembed(config.kirmizi, "Hata", ":no_entry: Bu komutu kullanamazsınız.");
    }
}

module.exports.help = {
  name: 'rolver'
}
