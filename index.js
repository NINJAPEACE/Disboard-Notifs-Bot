const Discord = require("discord.js");
const client = new Discord.Client();
const data = require("./bump.json");

client.on("ready", () => {
   console.log("Bump Reminder ready!");
});

setInterval(async() => {
  let lastBump;
  let bumpChannel = client.channels.resolve(data.bumpChannel);
		
 if(bumpChannel.topic) {
   lastBump = await bumpChannel.messages.fetch(bumpChannel.topic.substr(22));
 }

	if (lastBump && bumpChannel.topic && Date.now() - lastBump.createdTimestamp >= 7200000) {
		bumpChannel.send('Bump Time!');
		return bumpChannel.setTopic('');
	}
}, 10000)

client.on("message", message => {
if (message.author.id === '302050872383242240' && message.embeds[0].description.toLowerCase().includes('bump done')) {
	message.channel.setTopic('Last Bump Message ID: ' + message.id);
   }
});

client.login(data.botToken);
