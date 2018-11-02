const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const fs = require('fs');
const Discord = require('discord.js');
const config = require("./config.json");
const bot = new Discord.Client();


fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if(!file.endsWith(".js")) return;
    let eventFunction = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    bot.on(commandName, (...args) => eventFunction.run(bot, ...args));
  });
});
 

// Ready event
bot.on('ready', () => {
    console.log(`${bot.user.username} is ready to help ${bot.users.size} users, in ${bot.channels.size} channels in ${bot.guilds.size} server(s).`);
    console.log(bot.guilds.map(v=>v.name).join('\n'));
   bot.user.setActivity("AHHAHAHAHAHAHAHAHHA!")
})

// Message event

bot.on('message' , (message) => {


});


bot.login(process.env.TOKEN)