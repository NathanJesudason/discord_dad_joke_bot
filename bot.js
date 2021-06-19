const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
var lastDoorSlam = 0;
var justNickname = true;
var delay = 3600000; //60 Minutes
client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {

    if(msg.content.toLowerCase().startsWith('!getmilk')){
        lastDoorSlam = Date.now();
        msg.reply("Goodbye, son. I'm just leaving to get some milk.")
        return;
    }
    if(msg.content.toLowerCase().startsWith('!wonlottery')){
        lastDoorSlam = 0;
        msg.reply("Hey son, I'm back!");
        return;
    }
    if(msg.content.toLowerCase().startsWith('!reply_too')){
        justNickname = false;
        msg.reply("Okay sport, I'll reply now.")
        return;
    }
    if(msg.content.toLowerCase().startsWith('!reply_off')){
        justNickname = true;
        msg.reply("Alright kiddo, I'll stay quiet.");
        return;
    }
    if(lastDoorSlam >= (Date.now() - delay)){
        return;
    }
    var index = Math.max(msg.content.toLowerCase().lastIndexOf("i'm "), msg.content.toLowerCase().lastIndexOf("i am "), msg.content.toLowerCase().lastIndexOf("im "), msg.content.toLowerCase().lastIndexOf("i m "));
    if (index != -1 && !msg.author.bot){
        var substring = msg.content.substr(index); //Store as string
        let mRe = new RegExp("m ")
        substring = substring.split(mRe, 2)[1];
        let re = new RegExp("[.!?\\-]");
        var name = substring.split(re, 1)[0];
        let member = msg.member;
        console.log(member);
        if (msg.guild.me.hasPermission('MANAGE_NICKNAMES')){
            member.setNickname(name.substr(0, 32)).catch(error => console.log(error));                                  //Hello {name}, I'm a dad joke
        }
        if(!justNickname){                                                       //split with regex for punctuation
            msg.reply('Hi, ' + name + ", I'm dad." );
        }
    }
 });

client.login(config.token);