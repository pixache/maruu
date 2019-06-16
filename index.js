const Discord = require("discord.js");
const client = new Discord.Client({fetchAllMembers: true, disableEveryone: true});
const config = require("./data/config.json");
const emote = require('./data/emotes.json');
const fs = require("fs");
const talkedRecently = new Set();
client.commands = new Discord.Collection();

function e(color, title) {
	let _embed = new Discord.RichEmbed()
		.setColor(color)
		.setTitle(title)
	return _embed;
}

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

client.on('UnhandledPromiseRejectionWarning', err => {
	console.log(err)
});

client.on("ready", () => {
	console.log(`${client.user.username} olarak giriş yapıldı.`);
	client.user.setActivity(`${config.prefix}yardım - ${client.guilds.size} sunucu`, {type: 'LISTENING'});
});

client.on('guildCreate', guild => {
	client.user.setActivity(`${config.prefix}yardım - ${client.guilds.size} sunucu`);
	let ch = client.channels.find(x => x.name === "maruu-sunucular");

	if(ch) {
		let embd = new Discord.RichEmbed()
			.setColor(config.yesil)
			.setTitle('Yeni Sunucu Eklendi')
			.setThumbnail(guild.iconURL)
			.addField('Sunucu Adı', guild.name, true)
			.addField('Üye Sayısı', guild.memberCount, true)
			.addField('Kanal Sayısı', guild.channels.size, true)
			.addField('Rol Sayısı', guild.roles.size, true)
		ch.send(embd);
	}

	let embed = new Discord.RichEmbed()
		.setColor(config.mavi)
		.setTitle('Sunucuya Eklediğiniz İçin Teşekkürler!')
		.setThumbnail(client.user.avatarURL)
		.addField('Bilgi', "Beni sunucuya eklediğiniz için teşekkürler.\n Verilenleri yaparsanız daha iyi performans sağlarım.")
		.addField('Hoşgeldin Kanalı', "hoşgeldin")
		.addField('Yeni Üye Rolü', "Üye")
		.setTimestamp()
		.setFooter('Maruu v0.2.1.7', client.user.avatarURL);
	guild.owner.send(embed);
});

client.on('guildDelete', guild => {
	client.user.setActivity(`${config.prefix}yardım - ${client.guilds.size} sunucu`);
	let ch = client.channels.find(x => x.name === "maruu-sunucular");
	if(ch) {
		let embd = new Discord.RichEmbed()
			.setColor(config.kirmizi)
			.setTitle('Sunucudan Atıldım')
			.setThumbnail(guild.iconURL)
			.addField('Sunucu Adı', guild.name, true)
			.addField('Üye Sayısı', guild.memberCount, true)
			.addField('Kanal Sayısı', guild.channels.size, true)
			.addField('Rol Sayısı', guild.roles.size, true)
		ch.send(embd);
	}
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
	const prefixes = ['m!', 'm:', 'm@'];
	let prefix = false;
	for(const thisPrefix of prefixes) {
	  if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
	}

	if(!prefix || message.author.bot || message.content.includes(prefixes.some) || message.channel.type === "dm") return;

	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	
	let commandfile = client.commands.get(cmd.slice(prefix.length));
	if(commandfile) {
		if (talkedRecently.has(message.author.id)) {
			let a = await message.channel.send(e(config.mavi, ":clock10: Her **4** saniyede bir komut kullanabilirsin."));
			a.delete(2000);
    	} else {
			commandfile.run(client, message, args);
			talkedRecently.add(message.author.id);
			setTimeout(() => {
				talkedRecently.delete(message.author.id);
			}, 4000);
    }
	}	
});

client.login(process.env.BOT_TOKEN);