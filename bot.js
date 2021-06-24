const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
let lastDoorSlam = 0;
let justNickname = true;
let delay = 3600000; //60 Minutes
client.on("ready", () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on("message", (msg) => {

    if(msg.content.toLowerCase().startsWith("!getmilk")){
        lastDoorSlam = Date.now();
        msg.reply("Goodbye, son. I'm just leaving to get some milk.");
        return;
    }
    if(msg.content.toLowerCase().startsWith("!wonlottery")){
        lastDoorSlam = 0;
        msg.reply("Hey son, I'm back!");
        return;
    }
    if(msg.content.toLowerCase().startsWith("!reply_too")){
        justNickname = false;
        msg.reply("Okay sport, I'll reply now.");
        return;
    }
    if(msg.content.toLowerCase().startsWith("!reply_off")){
        justNickname = true;
        msg.reply("Alright kiddo, I'll stay quiet.");
        return;
    }
    if(lastDoorSlam >= (Date.now() - delay)){
        return;
    }
    let match = msg.content.toLowerCase().match(/(?:^|\s)(im |i'm |i am |i m )(.+)(?:$|\s)/m);
    if (match != null && !msg.author.bot){
        let re = new RegExp("[.!?\\-]");
        let name = ((match[2].split(re, 1))[0]).trim();
        let member = msg.member;
        console.log(name);
        if (msg.guild.me.hasPermission("MANAGE_NICKNAMES")){
            member.setNickname(name.substr(0, 32)).catch((error) =>
                console.log(error)
            );
        }
        if(!justNickname){
            msg.reply("Hi, " + name + ", I'm dad." );
        }
    }
 });

client.login(config.token);