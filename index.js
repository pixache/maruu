// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const prefix = "m!"
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size - 1} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  console.log('https://discordapp.com/oauth2/authorize?client_id=577503350451339285&scope=bot&permissions=8');
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`${client.guilds.size} sunucuda takılıyor...`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`${client.guilds.size} sunucuda takılıyor...`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`${client.guilds.size} sunucuda takılıyor...`);
});

client.on("message", async message => {
  const denied = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle(`${message.author.tag}`)
    .setDescription(':x: Bu komutu kullanamazsın!');
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  if(command === "yardım") {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let uptime = `${days} gün, ${hours} saat, ${minutes} dakika ${seconds} saniye`;

    let exampleEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('MaruuBot Bilgileri')
        .setThumbnail(client.user.avatarURL)
        .addField('Bot Kodlayıcısı', 'Xuance#1586', true)
        .addField('Sürüm', 'beta build 0.0.416', true)
        .addField('Son Güncelleme', 'May 17 - hosting', true)
        .addField('Oluşturuldu', '13 May 2019 GMT+3', true)
        .addField('Kitaplık', 'discord.js', true)
        .addField('Online Süresi', Math.floor(uptime))
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
        .addField('m!rolver <oyuncu>', 'Oyuncuya rol verir.', true)
        .addField('m!rolal <oyuncu>', 'Oyuncunun rolunu alır.', true)
        .addField('m!gay [<oyuncu>]', 'Ne kadar gaysınız?', true)
        .addField('m!at <oyuncu>', 'Belirtilen oyuncuyu atar.', true)
        .addField('m!ban <oyuncu>', 'Oyuncuyu yasaklar.', true)
        .addField('m!sil <sayı>', 'Kanaldan mesaj siler', true)
        .setTimestamp()
        .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL);

    message.channel.send(exampleEmbed);

  }

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const msg = await message.channel.send("Gecikme hesaplanıyor...");
    msg.edit(`${message.author.username}, anlık gecikmen ${msg.createdTimestamp - message.createdTimestamp}ms. Bot gecikmesi ise ${Math.round(client.ping)}ms`)
  }
  
  if(command === "söyle") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    if(!sayMessage) return message.channel.send("You didn\'t entered any arguments.");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }

  if(command === "rolver") {
    if(message.member.roles.some === ["Executioner", "Boss", "Godfather", "Serial Killer", "Mafioso"]) {
      message.channel.send("başarılı");
      /*
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      let role = args.slice(1).join(' ');
      if(!member) return message.channel.send("Please enter a member of this guild.");
      if(!message.guild.roles.find.some(role)) return message.channel.send(`You need to create a role called ${role} first.`);

      member.addRole(role).catch(console.error);
    */}
  }

  if(command === "rolal") {
    if(!message.member.roles.some(r=>["Boss", "Godfather"]) )
      message.delete();
      return message.channel.send(denied);

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let role = message.guild.roles.find(role => role.name === "Godfather");
    if(!member) return message.channel.send("Please enter a member of this guild.");
    if(!role) return message.channel.send("You need to create a role called 'Godfather' first.");

    member.removeRole(role).catch(console.error);  
  }

  if(command === "gay") {

    // Üye, yüzdelik ve mesaj embedini oluşturduk.
    let member = message.mentions.members.first();
    let prc = Math.floor(Math.random() * 100)
    let reply = new Discord.RichEmbed()
      // Embed'in özelliklerini belirledik.
      .setColor('#009684')
      .setTitle('Gay hesaplayıcı')
      // Eğer üye girilmemiş ise mesajı atan kişinin, girili ise o kişinin adı geçer.
      if(!member) {reply.setDescription(`Sen **${prc}%** gaysın.`);}
      else {reply.setDescription(`${member} **${prc}%** gay.`);}
      if(prc >= "80") {
        // Eğer yüzdelik 80'den büyükse footer olarak mesaj ekledik.
        reply.setFooter("Bu cidden gay be");
      }

    message.channel.send(reply);
  }

  if(command === "at") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Boss", "Godfather"]) )
      return message.channel.send(denied);
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.channel.send("Lütfen geçerli bir üye girin.");
    if(!member.kickable) 
      return message.channel.send("Bu kullanıcı atılamaz.");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Sebep girilmedi.";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.channel.send(`Üzgünüm ${message.author} atılamadı çünkü: ${error}`));
    message.channel.send(`${member.user.tag}, ${message.author.tag} tarafından atıldı, çünkü: ${reason}`);

  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Boss"]))
      return message.channel.send(denied);
    
    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.channel.send("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "sil") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(process.env.BOT_TOKEN);
