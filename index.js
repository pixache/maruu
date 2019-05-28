const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) return console.log("No commands found.");

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`Loaded command: ${f}`);

    client.commands.set(props.help.name, props);
  });
});

client.on("ready", () => {
  console.log(`${client.user.username} olarak giriş yapıldı.`);
  client.user.setActivity(`m!yardım`);
});

client.on("guildMemberAdd", message => {
    if(message.guild.id !== '264445053596991498') {
      let wlc = new Discord.RichEmbed().setColor(config.yesil).setTitle("Hoş Geldin!").setDescription(`:wave: **${message.user.username}** sunucuya katıldı!\n:crown: **${message.guild.name}** sunucusuna hoşgeldin!`).setTimestamp();
      let channel = message.guild.channels.find("name", "general").send(wlc);
    }
});

client.on("guildMemberRemove", message => {
  if(message.guild.id !== '264445053596991498') {
    let wlc = new Discord.RichEmbed().setColor(config.kirmizi).setTitle("Güle güle!").setDescription(`:wave: **${message.user.username}** sunucudan ayrıldı!\nUmarız tekrar geri göndersin!`).setTimestamp();
    let channel = message.guild.channels.find("name", "general").send(wlc);
  }
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  if(message.channel.type === "dm") return;
  if(message.guild.id === '264445053596991498') return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client, message, args);


});

client.login(process.env.BOT_TOKEN);
