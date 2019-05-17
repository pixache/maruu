const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "m!";

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size - 1} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  console.log('https://discordapp.com/oauth2/authorize?client_id=577503350451339285&scope=bot&permissions=8');
  client.user.setActivity(`${client.guilds.size} sunucuda takılıyor...`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`${client.guilds.size} sunucuda takılıyor...`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`${client.guilds.size} sunucuda takılıyor...`);
});

client.on('guildMemberAdd', member => {
    member.guild.channels.get(config.channel).send(`**${member}** sunucuya katıldı, hoş geldin!`); 
});

client.on("message", async message => {
  const denied = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle(`${message.author.tag}`)
    .setDescription(':x: Bu komutu kullanamazsın!');

  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "bilgi") {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${days} gün, ${hours} saat, ${minutes} dakika ${seconds} saniye`;

    let exampleEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('MaruuBot Bilgileri')
        .setThumbnail(client.user.avatarURL)
        .addField('Bot Kodlayıcısı', 'Xuance#1586', true)
        .addField('Sürüm', 'beta build 0.0.433', true)
        .addField('Son Güncelleme', 'May 17 - rol komutları', true)
        .addField('Oluşturuldu', '13 May 2019 GMT+3', true)
        .addField('Kitaplık', 'discord.js', true)
        .addField('Online Süresi', uptime)
        .setTimestamp()
        .setFooter(`Komutlar için m!komutlar`, message.author.avatarURL);

    message.channel.send(exampleEmbed);

  }

  if(command === "komutlar") {

    let exampleEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('MaruuBot Komutları')
        .setThumbnail(client.user.avatarURL)
        .addField('m!ping', 'Gecikmenizi ölçer', true)
        .addField('m!söyle', 'Verilen mesajı söyler', true)
        .addField('m!rolver <üye> <rol>', 'Oyuncuya rol verir.', true)
        .addField('m!rolal <üye> <rol>', 'Oyuncunun rolunu alır.', true)
        .addField('m!gay [<oyuncu>]', 'Ne kadar gaysınız?', true)
        .addField('m!at <oyuncu>', 'Belirtilen oyuncuyu atar.', true)
        .addField('m!ban <oyuncu>', 'Oyuncuyu yasaklar.', true)
        .addField('m!sil <sayı>', 'Kanaldan mesaj siler', true)
        .setTimestamp()
        .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL);

    message.channel.send(exampleEmbed);

  }

  if(command === "ping") {
    const msg = await message.channel.send("Gecikme hesaplanıyor...");
    msg.edit(`${message.author.username}, anlık gecikmen ${msg.createdTimestamp - message.createdTimestamp}ms. Bot gecikmesi ise ${Math.round(client.ping)}ms`)
  }
  
  if(command === "söyle") {
    const sayMessage = args.join(" ");
    if(!sayMessage) return message.channel.send("Söylenecek mesajı girmediniz.");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }

  if(command === "rolver") {
    let member = message.mentions.members.first();
    let rol = args.slice(1).join(' ');
    let guildrole = message.guild.roles.find(role => role.name === `${rol}`);

    if(message.member.hasPermission('ADMINISTRATOR')) {
      if(!member) return message.channel.send("Lütfen sunucunun bir üyesini belirtin.");
      if(!rol) return message.channel.send(`Lütfen vereceğiniz rolü belirtin.`);
      if(!guildrole) return message.channel.send(`**${rol}** adında bir rol bulunamadı, lütfen oluşturun.`);
      if(member.roles.find(role => role.name === `${rol}`)) return message.channel.send(`**${member}**, **${rol}** rolüne zaten sahip.`)
      else {
        member.addRole(guildrole).catch(console.error);
        message.channel.send(`**${member}** üyesine **${rol}** rolü verildi.`);
      }
    }
    if(!message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.send(denied);
    }
  }

  if(command === "rolal") {
    let member = message.mentions.members.first();
    let rol = args.slice(1).join(' ');
    let guildrole = message.guild.roles.find(role => role.name === `${rol}`);

    if(message.member.hasPermission('ADMINISTRATOR')) {
      if(!member) return message.channel.send("Lütfen sunucunun bir üyesini belirtin.");
      if(!rol) return message.channel.send(`Lütfen vereceğiniz rolü belirtin.`);
      if(!guildrole) return message.channel.send(`**${rol}** adında bir rol bulunamadı, lütfen oluşturun.`);
      if(!member.roles.find(role => role.name === `${rol}`)) return message.channel.send(`**${member}**, **${rol}** rolüne zaten sahip değil.`)
      else {
        member.removeRole(guildrole).catch(console.error);
        message.channel.send(`**${member}** üyesinden **${rol}** rolü alındı.`);
      }
    }
    if(!message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.send(denied);
    }  
  }

  if(command === "gay") {
    let member = message.mentions.members.first();
    let prc = Math.floor(Math.random() * 100)
    let reply = new Discord.RichEmbed()
      .setColor('#009684')
      .setTitle('Gay ölçer')
      if(!member) {reply.setDescription(`Sen **${prc}%** gaysın.`);}
      else {reply.setDescription(`${member} **${prc}%** gay.`);}
      if(prc >= "80") {
        reply.setFooter("Bu cidden gay be");
      }

    message.channel.send(reply);
  }

  if(command === "at") {
    if(!message.member.roles.some(r=>["Boss", "Godfather"]) )
      return message.channel.send(denied);

   let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.channel.send("Lütfen geçerli bir üye girin.");
    if(!member.kickable) 
      return message.channel.send("Bu kullanıcı atılamaz.");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Sebep belirtilmedi.";
    
    await member.kick(reason)
      .catch(error => message.channel.send(`Üzgünüm ${message.author} atılamaz: ${error}`));
    message.channel.send(`${member.user.tag}, ${message.author.tag} tarafından atıldı, çünkü: ${reason}`);

  }
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Boss"]))
      return message.channel.send(denied);
    
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send("Lütfen bu sunucunun bir üyesini belirtin.");
    if(!member.bannable) 
      return message.channel.send("Bu kullanıcı atılamaz.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Sebep belirtilmedi.";
    
    await member.ban(reason)
      .catch(error => message.channel.send(`Üzgünüm, ${message.author} yasaklanamaz: ${error}`));
    message.channel.send(`${member.user.tag} ${message.author.tag} tarafından yasaklandı. Sebep: ${reason}`);
  }
  
  if(command === "sil") {    
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send("Lütfen 2 ile 100 arası bir sayı belirtin.");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Mesajları silemedim, çünkü: ${error}`));
  }
});

client.login(process.env.BOT_TOKEN);
