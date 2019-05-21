const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log("https://discordapp.com/oauth2/authorize?client_id=577503350451339285&scope=bot&permissions=8");
  client.user.setActivity(`m!yardım`);
});

client.on("guildMemberAdd", message => {
    let wlc = new Discord.RichEmbed().setColor(config.yesil).setTitle("Hoş Geldin!").setDescription(`:wave: **${message.user.username}** sunucuya katıldı!\n:crown: **${message.guild.name}** sunucusuna hoşgeldin!`).setTimestamp();
    let channel = message.guild.channels.find("name", "general").send(wlc);
});

client.on("guildMemberRemove", message => {
    let wlc = new Discord.RichEmbed().setColor(config.kirmizi).setTitle("Güle güle!").setDescription(`:wave: **${message.user.username}** sunucudan ayrıldı!\nUmarız tekrar geri göndersin!`).setTimestamp();
    let channel = message.guild.channels.find("name", "general").send(wlc);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "at") {
    let denied = new Discord.RichEmbed().setColor(config.kirmizi).setTitle(`${message.author.tag}`).setDescription(":x: Bu komutu kullanamazsın!");
    if(!message.member.hasPermission("KICK_MEMBERS") )
      return message.channel.send(denied);

   let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member) return message.channel.send("Lütfen geçerli bir üye girin.");
    if(!member.kickable) return message.channel.send("Bu kullanıcıyı atamam.");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "Sebep belirtilmedi.";

    await member.kick(reason)
      .catch(error => message.channel.send(`Üzgünüm ${message.author} atılamaz: ${error}`));

    let kicked = new Discord.RichEmbed()
      .setColor(config.kirmizi)
      .setTitle("Kullanıcı Atıldı")
      .addField(`Atılan:`, `${member.user.tag}`)
      .addField(`Atan:`, `${message.author.tag}`)
      .addField(`Sebep:`, `${reason}`)
      .setTimestamp();
    message.channel.send(kicked).catch(err => console.log(err));
  }

  if(command === "ban") {
    let denied = new Discord.RichEmbed().setColor(config.kirmizi).setTitle(`${message.author.tag}`).setDescription(":x: Bu komutu kullanamazsın!");
    if(!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"])) return message.channel.send(denied);

    let member = message.mentions.members.first();
    if(!member) return message.channel.send("Lütfen bu sunucunun bir üyesini belirtin.");
    if(!member.bannable) return message.channel.send("Bu kullanıcı atılamaz.");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "Sebep belirtilmedi.";

    await member.ban(reason)
      .catch(error => message.channel.send(`Üzgünüm, ${message.author} yasaklanamaz: ${error}`));

    let banned = new Discord.RichEmbed()
      .setColor(config.kirmizi)
      .setTitle("Kullanıcı Yasaklandı")
      .addField(`Yasaklanan:`, `${member.user.tag}`)
      .addField(`Yasaklayan:`, `${message.author.tag}`)
      .addField(`Sebep:`, `${reason}`)
      .setTimestamp();
    message.channel.send(banned);
  }

  if(command === "bilgi") {
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let uptime = `${hours} saat, ${minutes} dakika`;

    let bilgi = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle("Maruu > Bilgiler")
        .addField(`Destek`, `**Geliştirici:** Xuance#1586\n**Destek Sunucusu:** [Katılmak için tıkla](https://discord.gg/NBA8wYT)`, true)
        .addField(`Bot Durumu`, `**Gecikme:** ${Math.floor(client.ping)}\n**Online süresi:** ${uptime}`, true)
        .addField(`Sunucu Bilgileri`, `**Sunucular:** ${client.guilds.size}\n**Kanallar:** ${client.channels.parent}\n**Kullanıcılar:** ${client.users.size - 1}`, true)
        .addField(`Diğer Bilgiler`, `**Kitaplık:** discord.js\n**Discord.js Sürümü:** 11.3.2\n**NodeJS Sürümü:** 10.15.3`, true)
        .setTimestamp()
        .setFooter(`Maruu v0.1.2`, client.user.avatarURL);
    message.channel.send(bilgi);
  }

  if(command === "davet") {
    let davet = new Discord.RichEmbed().setColor(config.yesil).setTitle("Beni davet edin!").setDescription("[Sunucuna davet etmek için tıkla!](https://discordapp.com/oauth2/authorize?client_id=577503350451339285&scope=bot&permissions=8)");
    message.channel.send(davet);
  }

  if(command === "destek") {
    let destek = new Discord.RichEmbed().setColor(config.yesil).setTitle("Destek mi lazım?").setDescription("**Bot Kodlayıcısı:** Xuance#1586\n**Destek Sunucusu:** [Katılmak için tıkla](https://discord.gg/NBA8wYT)");
    message.channel.send(destek);
  }

  if(command === "ping") {
    let msg = await message.channel.send("Gecikme hesaplanıyor...");
    msg.edit(`${message.author.username}, anlık gecikmen ${msg.createdTimestamp - message.createdTimestamp}ms. Bot gecikmesi ise ${Math.round(client.ping)}ms`)
  }

  if(command === "rolal") {
    let member = message.mentions.members.first();
    let rol = args.slice(1).join(" ");
    let guildrole = message.guild.roles.find(role => role.name === `${rol}`);

    if(message.member.hasPermission("MANAGE_ROLES")) {
      if(!member) return message.channel.send("Lütfen sunucunun bir üyesini belirtin.");
      if(!rol) return message.channel.send(`Lütfen vereceğiniz rolü belirtin.`);
      if(!guildrole) return message.channel.send(`**${rol}** adında bir rol bulunamadı, lütfen oluşturun.`);
      if(!member.roles.find(role => role.name === `${rol}`)) return message.channel.send(`:no_entry: **Hata:** ${member.user.username}, ${rol} rolüne zaten sahip değil.`)
      else {
        member.removeRole(guildrole).catch(console.error);
        message.channel.send(`**${member}** üyesinden **${rol}** rolü alındı.`);
      }
    }
    if(!message.member.hasPermission("MANAGE_ROLES")) {
      message.channel.send(denied);
    }
  }

  if(command === "rolver") {
    let member = message.mentions.members.first();
    let rol = args.slice(1).join(" ");
    let guildrole = message.guild.roles.find(role => role.name === `${rol}`);

    if(message.member.hasPermission("MANAGE_ROLES")) {
      if(!member) return message.channel.send("Lütfen sunucunun bir üyesini belirtin.");
      if(!rol) return message.channel.send(`Lütfen vereceğiniz rolü belirtin.`);
      if(!guildrole) return message.channel.send(`**${rol}** adında bir rol bulunamadı, lütfen oluşturun.`);
      if(member.roles.find(role => role.name === `${rol}`)) return message.channel.send(`:no_entry: **Hata:** ${member.user.username}, ${rol} rolüne zaten sahip.`)
      else {
        member.addRole(guildrole).catch(console.error);
        message.channel.send(`**${member}** üyesine **${rol}** rolü verildi.`);
      }
    }
    if(!message.member.hasPermission("MANAGE_ROLES")) {
      message.channel.send(denied);
    }
  }

  if(command === "sil") {
    let deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100) return message.channel.send("Lütfen 2 ile 100 arası bir sayı belirtin.");

    let fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Mesajları silemedim, çünkü: ${error}`));
  }

  if(command === "söyle") {
    let sayMessage = args.join(" ");
    if(!sayMessage) return message.channel.send("Söylenecek mesajı girmediniz.");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if(command === "yardım") {
    let yardim = new Discord.RichEmbed()
        .setColor(config.mavi)
        .setTitle("Maruu > Yardım")
        .setThumbnail(client.user.avatarURL)
        .setDescription(`${config.at}\n${config.ban}\n${config.bilgi}\n${config.davet}\n${config.destek}\n${config.ping}\n${config.rolal}\n${config.rolver}\n${config.sil}\n${config.soyle}`)
        .setTimestamp()
    message.channel.send(yardim);
  }
});

client.login(process.env.BOT_TOKEN);
