const Discord = require('discord.js');
const bot = new Discord.Client();
var status = 1;
bot.on('ready', function(){
  bot.channels.get('653953027971219456').send('Reconnected.');
  bot.user.setGame('/commands');
});
function convert(number) {
    if (number == 1) return "1⃣";
    if (number == 2) return "2⃣";
    if (number == 3) return "3⃣";
    if (number == 4) return "4⃣";
    if (number == 5) return "5⃣";
    if (number == 6) return "6⃣";
    if (number == 7) return "7⃣";
    if (number == 8) return "8⃣";
    if (number == 9) return "9⃣";
    if (number == 10) return "🔟";
    if (number == 11) return "🅰️";
    if (number == 12) return "🅱️";
}
function convert2(number) {
    if (number == 1) return "644797819169013761";
    if (number == 2) return "644797887498158081";
    if (number == 3) return "644797911733108737";
    if (number == 4) return "644797954632187935";
    if (number == 5) return "644797983333810177";
    if (number == 6) return "644797999242805249";
    if (number == 7) return "644798029068632074";
    if (number == 8) return "644798045862756352";
    if (number == 9) return "644798059473141782";
    if (number == 10) return "644798078217486336";
    if (number == 11) return "644877216752205825";
    if (number == 12) return "644890233279873024";
}
bot.on('message', (message) => {
    if (message.content == '/status') {
        if (status == 0) {
            message.reply('This bot is currently disabled.');
        }
        else if (status == 1) {
            message.reply('This bot is currently enabled.');
        }
    }
    else if (message.content == '/commands') {
        message.reply('List of commands for this bot:\n\nFor everyone\'s use:\n`/status` - Check the status of the bot (enabled/disabled)\n\nFor MC\'s use:\n`/night` - Mute everyone except MC (as night falls)\n`/day` - Unmute everyone except those who are dead (assigned @Dead role)\n`/vote` - creates a vote menu in #voting\n`/removeroles` - Remove roles 1-12號 and dead from all members');
    }
    else if (message.content == '/night' && status == 1) {
        let allowedRole = message.guild.roles.find(role => role.name === "MC");
        if (message.member.roles.has(allowedRole.id)) {
            let channel = message.member.voiceChannel;
            for (let member of channel.members) {
                if (member[1] != message.member) {
                    member[1].setMute(true);
                }
            }
            message.reply('✅ Muted.');
        } 
        else {
           message.reply('You are not allowed to use this command. ||GFY!||');
        }
    }
    else if (message.content == '/day' && status == 1) {
        let MC = message.guild.roles.find(role => role.name === "MC");
        let dead = message.guild.roles.find(role => role.name === "Dead");
        if (message.member.roles.has(MC.id)) {
            let channel = message.member.voiceChannel;
            for (let member of channel.members) {
                if (!member[1].roles.has(dead.id)) {
                    member[1].setMute(false);
                }
            }
            message.reply('✅ Unmuted.');
        }
        else {
           message.reply('You are not allowed to use this command. ||GFY!||');
        }
    }
    else if (message.content == '/vote' && status == 1) {
        let MC = message.guild.roles.find(role => role.name === "MC");
        let dead = message.guild.roles.find(role => role.name === "Dead");
        let channel = bot.channels.get("654262918069878784");
        var players;
        channel.fetchMessages({limit : 1}).then(messages => {
            players = parseInt(messages.first());
        })
        .catch(console.error);
        if (message.member.roles.has(MC.id)) {
            bot.channels.get('644812476382445569').send('-------------------------------\nPlease cast your vote below.').then(async function (message) {
                for (var i = 1; i <= players; i++) {
                    //var temprole = convert2(i);
                    //message.guild.roles.get(temprole).members.forEach(async function () {
                    //    if (!member.roles.has(dead.id)) {
                            await message.react(convert(i));
                    //    }
                    //});
                }
                await message.react('❌');
            });
            message.reply('✅ Created vote menu in #voting.');
        }
        else {
           message.reply('You are not allowed to use this command. ||GFY!||');
        }
    }
    else if (message.content == '/removeroles' && status == 1) {
        let admin = message.guild.roles.find(role => role.name === 'Admin');
        let MC = message.guild.roles.find(role => role.name === 'MC');
        if (message.member.roles.has(admin.id) || message.member.roles.has(MC.id)) {
            message.guild.members.forEach((member) => member.removeRoles(['644797819169013761','644797887498158081','644797911733108737','644797954632187935','644797983333810177','644797999242805249','644798029068632074','644798045862756352','644798059473141782','644798078217486336','644877216752205825','644890233279873024','644821024692764683']));
            message.reply('✅ Removing roles from all members.');
        }
        else {
           message.reply('You are not allowed to use this command. ||GFY!||');
        }
    }
});
bot.login('NjUzOTY4ODg1NzIwMjg1MjA0.Xe-2AA.yaD5OJ6w7Wy5dNA9vZEJ7Sic3xQ');