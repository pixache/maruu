const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const fs = require("fs");
client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0) return console.log("Hiç komut bulamadım.");

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`[KOMUT: ${i + 1}] > ${f}`);

		client.commands.set(props.help.name, props);
		i = i+1;
	});
});

client.on("ready", () => {
	
 
	console.log(`${client.user.username} olarak giriş yapıldı.`);
	client.user.setActivity(` ${config.prefix}yardım | ${client.guilds.size} sunucu - ${client.users.size} kullanıcı`, {type: 'LISTENING'});
});



client.on("guildMemberAdd", member => {
	let role = member.guild.roles.find(x => x.name === "Üye");
	if(role) {
		member.addRole(role).catch(err => console.log(err));
	}
});

client.on("guildMemberAdd", message => {
	let guild = message.guild;
	if(guild.channels.find(x => x.name === "hoşgeldin")) {
		let wlc = new Discord.RichEmbed().setColor(config.yesil).setThumbnail(message.user.avatarURL).setTitle("Hoş Geldin!").setDescription(`:wave: **${message.user.username}** sunucuya katıldı!\n:crown: **${message.guild.name}** sunucusuna hoşgeldin!`).setTimestamp();
		let channel = guild.channels.find(x => x.name === "hoşgeldin").send(wlc);
	}
});

client.on("guildMemberRemove", message => {
	let guild = message.guild;
	if(guild.channels.find(x => x.name === "hoşgeldin")) {
		let wlc = new Discord.RichEmbed().setColor(config.kirmizi).setThumbnail(message.user.avatarURL).setTitle("Güle Güle!").setDescription(`:wave: **${message.user.username}** sunucudan ayrıldı!\n:crown: Geri dönmen dileğiyle!`).setTimestamp();
		let channel = guild.channels.find(x => x.name === "hoşgeldin").send(wlc);
	}
});

client.on("message", async message => {
	if(message.author.bot || message.content.indexOf(config.prefix) !== 0 || message.channel.type === "dm") return;

	let prefix = config.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandfile = client.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(client, message, args);
});

client.login(process.env.BOT_TOKEN);
