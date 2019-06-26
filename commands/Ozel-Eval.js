const Discord = require('discord.js');
const config = require("../data/config.json");

function clean(text) {
	if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}

module.exports.run = async(client, message, args) => {
    if(message.author.id !== config.owner) return;
    if(message.content.includes("token")) return message.channel.send("noob");
	try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
        message.channel.send(clean(evaled), {code:"xl"});
    }catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}

module.exports.help = {
	name: 'eval'
}
