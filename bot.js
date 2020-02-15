const Discord = require('discord.js');
const bot = new Discord.Client();
var status = 1;
var save = 1, poison = 1, checkstatus = 1, cankill = 1;
var kill;
var dead = [-1, -1, -1];
var day = 0;
var daycnt = 0;
var wolves = [];
var msgid, msgid2, msgid3, msgid4;
var witch;
var hunter;
var wolfking;
var witchchannel, seerchannel, hunterchannel, wkchannel;
var players;
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd'
};
bot.on('ready', function(){
  bot.channels.get('653953027971219456').send('Reconnected.');
  bot.user.setGame('/commands');
});
function convert(number) { //int to emoji
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
function convert2(number) { //role id
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
function convert3(number) { //emoji id to int
    if (number == '1⃣') return 1;
    if (number == '2⃣') return 2;
    if (number == '3⃣') return 3;
    if (number == '4⃣') return 4;
    if (number == '5⃣') return 5;
    if (number == '6⃣') return 6;
    if (number == '7⃣') return 7;
    if (number == '8⃣') return 8;
    if (number == '9⃣') return 9;
    if (number == '🔟') return 10;
    if (number == '🅰️') return 11;
    if (number == '🅱️') return 12;
    if (number == '❌') return -1;
}
function convert4(number) { //channel ID
    if (number == 1) return "645881484049383425";
    if (number == 2) return "645135904591183872";
    if (number == 3) return "645136023646502922";
    if (number == 4) return "645136088700026901";
    if (number == 5) return "645136140768116746";
    if (number == 6) return "645136257969553419";
    if (number == 7) return "645136355655024651";
    if (number == 8) return "645136517097979916";
    if (number == 9) return "645136584907292711";
    if (number == 10) return "645136642851602442";
    if (number == 11) return "645142473915498505";
    if (number == 12) return "645143428585226250";
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
        message.reply('List of commands for this bot:\n\nFor everyone\'s use:\n`/status` - Check the status of the bot (enabled/disabled)\n`/ping` - pings @Active WW member 5 times (please do not abuse or you will lose access to this command)\n\nFor MC\'s use:\n`/night` - Mute everyone except MC (as night falls)\n`/day` - Unmute everyone except those who are dead (assigned @Dead role)\n`/vote` - creates a vote menu in #voting\n`/removeroles` - Remove roles 1-12號 and dead from all members');
    }
    else if (message.content == '/night' && status == 1) {
        day = 0;
        checkstatus = 1;
        cankill = 1;
        let allowedRole = message.guild.roles.find(role => role.name === "MC");
        if (message.member.roles.has(allowedRole.id)) {
            let channel = message.member.voiceChannel;
            for (let member of channel.members) {
                if (member[1] != message.member) {
                    member[1].setMute(true);
                }
            }
            let channel2 = bot.channels.get("654262918069878784");
            channel2.fetchMessages({limit : 1}).then(messages => {
                players = parseInt(messages.first());
            })
            .catch(console.error);
            let botroles2 = bot.channels.get("677883179649990656");
            botroles2.fetchMessages({limit : 1}).then(messages2 => {
                var rolelist = messages2.first().toString();
                var windex = rolelist.indexOf('witch');
                var sindex = rolelist.indexOf('seer');
                var hindex = rolelist.indexOf('hunter');
                var wkindex = rolelist.indexOf('wolf king');
                console.log('Wkindex:'+wkindex);
                var flag = 1;
                while (windex--) {
                    if (flag == 0) break;
                    if (rolelist[windex] == '.') {
                        var tempr = windex;
                        while (tempr--) {
                            if (rolelist[tempr] == '\n') {
                                witchchannel = convert4(parseInt(rolelist.substr(tempr + 1, 3))).toString();
                                witch = parseInt(rolelist.substr(tempr + 1, 3));
                                console.log('Witchchannel:'+witchchannel);
                                flag = 0;
                                break;
                            }
                            else if (tempr == 0) {
                                witchchannel = convert4(parseInt(rolelist.substr(tempr, 2))).toString();
                                witch = parseInt(rolelist.substr(tempr, 3));
                                console.log('Witchchannel:'+witchchannel);
                                flag = 0;
                                break;
                            }
                        }
                    }
                }
                flag = 1;
                while (sindex--) {
                    if (flag == 0) break;
                    if (rolelist[sindex] == '.') {
                        var temps = sindex;
                        while (temps--) {
                            if (rolelist[temps] == '\n') {
                                seerchannel = convert4(parseInt(rolelist.substr(temps + 1, 2))).toString();
                                console.log('Seerchannel:'+seerchannel);
                                flag = 0;
                                break;
                            }
                            else if (temps == 0) {
                                seerchannel = convert4(parseInt(rolelist.substr(temps, 2))).toString();
                                console.log('Seerchannel:'+seerchannel);
                                flag = 0;
                                break;
                            }
                        }
                    }
                }
                flag = 1;
                while (hindex--) {
                    if (flag == 0) break;
                    if (rolelist[hindex] == '.') {
                        var temph = hindex;
                        while (temph--) {
                            if (rolelist[temph] == '\n') {
                                hunterchannel = convert4(parseInt(rolelist.substr(temph + 1, 2))).toString();
                                hunter = parseInt(rolelist.substr(temph + 1, 3));
                                flag = 0;
                                break;
                            }
                            else if (temph == 0) {
                                hunterchannel = convert4(parseInt(rolelist.substr(temph, 2))).toString();
                                hunter = parseInt(rolelist.substr(temph, 3));
                                flag = 0;
                                break;
                            }
                        }
                    }
                }
                flag = 1;
                while (wkindex--) {
                    if (flag == 0) break;
                    if (rolelist[wkindex] == '.') {
                        var temph = wkindex;
                        while (temph--) {
                            if (rolelist[temph] == '\n') {
                                wkchannel = convert4(parseInt(rolelist.substr(temph + 1, 2))).toString();
                                wolfking = parseInt(rolelist.substr(temph + 1, 3));
                                flag = 0;
                                break;
                            }
                            else if (temph == 0) {
                                wkchannel = convert4(parseInt(rolelist.substr(temph, 2))).toString();
                                wolfking = parseInt(rolelist.substr(temph, 3));
                                flag = 0;
                                break;
                            }
                        }
                    }
                }
                var wolf1 = rolelist.indexOf('wolf');
                var wolf2 = rolelist.indexOf('wolf', (wolf1 + 1));
                var wolf3 = wolf2 == -1 ? -1 : rolelist.indexOf('wolf', (wolf2 + 1));
                var wolf4 = wolf3 == -1 ? -1 : rolelist.indexOf('wolf', (wolf3 + 1));
                flag = 1;
                while (wolf1--) {
                    if (flag == 0) break;
                    if (rolelist[wolf1] == '.') {
                        var temp1 = wolf1;
                        while (temp1--) {
                            if (rolelist[temp1] == '\n') {
                                wolves[0] = parseInt(rolelist.substr(temp1 + 1, 2));
                                flag = 0;
                                break;
                            }
                            else if (temp1 == 0) {
                                wolves[0] = parseInt(rolelist.substr(temp1, 2));
                                flag = 0;
                                break;
                            }
                        }
                    }
                }flag = 1;
                while (wolf2--) {
                    if (flag == 0) break;
                    if (rolelist[wolf2] == '.') {
                        var temp2 = wolf2;
                        while (temp2--) {
                            if (rolelist[temp2] == '\n') {
                                wolves[1] = parseInt(rolelist.substr(temp2 + 1, 2));
                                flag = 0;
                                break;
                            }
                            else if (temp2 == 0) {
                                wolves[1] = parseInt(rolelist.substr(temp2, 2));
                                flag = 0;
                                break;
                            }
                        }
                    }
                }flag = 1;
                if (wolf3 != -1) {
                    while (wolf3--) {
                        if (flag == 0) break;
                        if (rolelist[wolf3] == '.') {
                            var temp3 = wolf3;
                            while (temp3--) {
                                if (rolelist[temp3] == '\n') {
                                    wolves[2] = parseInt(rolelist.substr(temp3 + 1, 2));
                                    flag = 0;
                                    break;
                                }
                                else if (temp3 == 0) {
                                    wolves[2] = parseInt(rolelist.substr(temp3, 2));
                                    flag = 0;
                                    break;
                                }
                            }
                        }
                    }
                }
                else wolves[2] = -1;
                flag = 1;
                if (wolf4 != -1) {
                    while (wolf4--) {
                        if (flag == 0) break;
                        if (rolelist[wolf4] == '.') {
                            var temp4 = wolf4;
                            while (temp4--) {
                                if (rolelist[temp4] == '\n') {
                                    wolves[3] = parseInt(rolelist.substr(temp4 + 1, 2));
                                    flag = 0;
                                    break;
                                }
                                else if (temp4 == 0) {
                                    wolves[3] = parseInt(rolelist.substr(temp4, 2));
                                    flag = 0;
                                    break;
                                }
                            }
                        }
                    }
                }
                else wolves[3] = -1;
            })
            .catch(console.error);
            message.reply(' ✅ Muted.');
        } 
        else {
           message.reply(' 🚫 Access denied.');
        }
    }
    else if (message.content == '/day' && status == 1) {
        day = 1;
        daycnt++;
        let MC = message.guild.roles.find(role => role.name === "MC");
        let dee = message.guild.roles.find(role => role.name === "Dead");
        if (message.member.roles.has(MC.id)) {
            let channel = message.member.voiceChannel;
            for (let member of channel.members) {
                if (!member[1].roles.has(dee.id)) {
                    member[1].setMute(false);
                }
            }
            message.reply(' ✅ Unmuted.');
        }
        else {
           message.reply(' 🚫 Access denied.');
        }
        if (dead[0] == -1 && dead[1] == -1) {
            bot.channels.get('644812476382445569').send('<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚是平安夜');
        }
        else {
            if (dead[1] == -1 && dead[0] != -1) {
                bot.channels.get('644812476382445569').send('<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚**'+dead[0]+'號**被殺死');
            }
            else if (dead[1] != -1 && dead[0] == -1) {
                bot.channels.get('644812476382445569').send('<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚**'+dead[1]+'號**被殺死');
            }
            else if (dead[1] != -1 && dead[0] != -1 && dead[1] > dead[0]) {
                bot.channels.get('644812476382445569').send('<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚**'+dead[0]+'號**、 **'+dead[1]+'號**被殺死');
            }
            else if (dead[1] != -1 && dead[0] != -1 && dead[1] < dead[0]) {
                bot.channels.get('644812476382445569').send('<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚**'+dead[1]+'號**、 **'+dead[0]+'號**被殺死');
            }
            else if (dead[1] == dead[0] && dead[1] != -1) {
                bot.channels.get('644812476382445569').send('<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚**'+dead[0]+'號**被殺死');
            }
        }
        if (dead[0] == hunter) {
            bot.channels.get('644812476382445569').send('<@&'+convert2(hunter)+'> 啟動角色技能 選擇你要帶走的對象');
            bot.channels.get(hunterchannel).send('<@&'+convert2(hunter)+'> 啟動獵人技能 選擇你要射殺的對象').then(async function (messages) {
                msgid3 = messages.id;
                for (var i = 1; i <= players; i++) {
                    await messages.react(convert(i));
                }
                await messages.react('❌');
            });
        }
    }
    else if (message.content == '/vote' && status == 1) {
        let MC = message.guild.roles.find(role => role.name === "MC");
        let dead = message.guild.roles.find(role => role.name === "Dead");
        if (message.member.roles.has(MC.id)) {
            bot.channels.get('644812476382445569').send('-------------------------------\nPlease cast your vote below.').then(async function (messages) {
                for (var i = 1; i <= players; i++) {
                    //var temprole = convert2(i);
                    //message.guild.roles.get(temprole).members.forEach(async function () {
                    //    if (!member.roles.has(dead.id)) {
                            await messages.react(convert(i));
                    //    }
                    //});
                }
                await messages.react('❌');
            });
            message.reply(' ✅ Created vote menu in #voting.');
        }
        else {
           message.reply(' 🚫 Access denied.');
        }
    }
    else if (message.content == '/removeroles' && status == 1) {
        let admin = message.guild.roles.find(role => role.name === 'Admin');
        let MC = message.guild.roles.find(role => role.name === 'MC');
        if (message.member.roles.has(admin.id) || message.member.roles.has(MC.id)) {
            message.guild.members.forEach((member) => member.removeRoles(['644797819169013761','644797887498158081','644797911733108737','644797954632187935','644797983333810177','644797999242805249','644798029068632074','644798045862756352','644798059473141782','644798078217486336','644877216752205825','644890233279873024','644821024692764683']));
            message.reply(' ✅ Removing roles from all members.');
        }
        else {
           message.reply(' 🚫 Access denied.');
        }
    }
    else if (message.content == '/ping'  && status == 1) {
        message.channel.send("<@&&668003114858577920>");
        message.channel.send("<@&&668003114858577920>");
        message.channel.send("<@&&668003114858577920>");
        message.channel.send("<@&&668003114858577920>");
        message.channel.send("<@&&668003114858577920>");
    }
    else if (message.content.includes('/kill') && status == 1) {
        if (message.member.id == '653535759508439051') return;
        if (message.channel.id != '644797493476851713' || day == 1 || cankill == 0) {
            message.reply(' 🚫 Access denied.');
        }
        else {
            if (message.content.substr(6, message.content.length) < 1) {
                message.reply(' 🚫 Invalid input.');
                return;
            }
            kill = parseInt(message.content.substr(6, message.content.length));
            if (kill < 1 || kill > players) {
                message.reply(' 🚫 Invalid input.');
                return;
            }
            message.reply(' ✅ 已處決' + kill + '號');
            cankill = 0;
            if (save == 1) {
                if (kill != witch) {
                    bot.channels.get(witchchannel).send('昨晚**'+kill+'號**被殺死，你要救他嗎？\n救:✅ 不救:❎').then(async function (message6) {
                        msgid = message6.id;
                        await message6.react('✅');
                        await message6.react('❎');
                    });
                }
                else if (kill == witch && daycnt > 0 && poison == 1) {
                    bot.channels.get(witchchannel).send('昨晚**你**被殺死了，你**不能自救**。選擇你要投毒的對象\n\n(Reactions not showing up? Type /poison <no.>)').then(async function (message7) {
                        msgid2 = message7.id;
                        for (var i = 1; i <= players; i++) {
                            await message7.react(convert(i));
                        }
                        await message7.react('❌');
                    }); 
                }
                else if (kill == witch && daycnt > 0 && poison == 0) {
                    bot.channels.get(witchchannel).send('昨晚**你**被殺死了，你**不能自救**。');
                }
            }
            else {
                dead[0] = kill;
                if (poison == 1) {
                    bot.channels.get(witchchannel).send('選擇你要投毒的對象\n\n(Reactions not showing up? Type /poison <no.>)').then(async function (message7) {
                        msgid2 = message7.id;
                        for (var i = 1; i <= players; i++) {
                            await message7.react(convert(i));
                        }
                        await message7.react('❌');
                    }); 
                }
            }
        }
    }
    else if (message.content.includes('/check') && status == 1) {
        if (message.member.id == '653535759508439051') return;
        if (message.channel.id != seerchannel || checkstatus == 0 || day == 1) {
            message.reply(' 🚫 Access denied.');
        }
        else {
            if (message.content.substr(7, message.content.length) < 1) {
                message.reply(' 🚫 Invalid input.');
                return;
            }
            var check = parseInt(message.content.substr(7, message.content.length));
            if (check < 1 || check > players) {
                message.reply(' 🚫 Invalid input.');
                return;
            }
            else {
                var isWolf = 0;
                for (var i = 0; i <= 3; i++) {
                    if (wolves[i] == check) {
                        isWolf = 1;
                    }
                }
                if (isWolf) message.channel.send({files: ["https://i.imgur.com/kAlUCuW.png"]});
                else message.channel.send({files: ["https://i.imgur.com/Xar8UpZ.png"]});
                checkstatus = 0;
            }
        }
    }
    else if (message.content.includes('!endgame') && status == 1) {
        save = 1;
        poison = 1;
        checkstatus = 1;
        day = 0;
        daycnt = 0;
        wolves = [];
    }
    else if (message.content.includes('/poison') && status == 1) {
        if (message.member.id == '653968885720285204') return;
        if (message.channel.id != witchchannel || poison == 0 || day == 1) {
            message.reply(' 🚫 Access denied.');
        }
        else {
            if (message.content.substr(8, message.content.length) < 1) {
                message.reply(' 🚫 Invalid input.');
                return;
            }
            var targett = parseInt(message.content.substr(8, message.content.length));
            if (targett < 1 || targett > players) {
                message.reply(' 🚫 Invalid input.');
                return;
            }
            else {
                dead[1] = targett;
                message.channel.fetchMessage(msgid2).then(msg => msg.delete());
                bot.channels.get(witchchannel).send('✅**'+targett+'號**已被毒死').then(async function (message) {
                    poison = 0;
                }); 
            }
        }
    }
});
bot.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const userr = bot.users.get(data.user_id);
    const channelr = bot.channels.get(data.channel_id);

    const messager = await channelr.fetchMessage(data.message_id);
    const emojir = data.emoji.name;
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    let reactionr = messager.reactions.get(emojiKey);

    if (!reactionr) {
        const emoji = new Emoji(bot.guilds.get(data.guild_id), data.emoji);
        reactionr = new MessageReaction(messager, emoji, 1, data.user_id === bot.user.id);
    }
    if (messager.id == msgid) {
        console.log('msgid = ' + msgid);
        if (event.t === "MESSAGE_REACTION_ADD") {
            console.log('Message = ' + messager.content);
            if (messager.content.includes('被殺死')) {
                if (emojiKey == '✅' && userr.id != '653968885720285204') {
                    channelr.fetchMessage(msgid).then(msg => msg.delete());
                    bot.channels.get(witchchannel).send('✅已使用救藥('+kill+'號)').then(function () {
                        save = 0;
                    }); 
                }
                else if (emojiKey == '❎' && userr.id != '653968885720285204' && poison == 1) {
                    channelr.fetchMessage(msgid).then(msg => msg.delete());
                    dead[0] = kill;
                    if (poison == 1) {
                        bot.channels.get(witchchannel).send('選擇你要投毒的對象\n\n(Reactions not showing up? Type /poison <no.> or click ❌ to abort)').then(async function (message) {
                            msgid2 = message.id;
                            for (var i = 1; i <= players; i++) {
                                await message.react(convert(i));
                            }
                            await message.react('❌');
                        }); 
                    }
                }
            }
        }
    }
    else if (messager.id == msgid2) {
        if (event.t === "MESSAGE_REACTION_ADD") {
            if (messager.content.includes('投毒的對象') && userr.id != '653968885720285204') {
                var targetr = convert3(emojir.toString());
                console.log(emojir);
                console.log(targetr);
                if (targetr != -1) {
                    channelr.fetchMessage(msgid2).then(msg => msg.delete());
                    bot.channels.get(witchchannel).send('✅**'+targetr+'號**已被毒死').then(async function (message) {
                        poison = 0;
                    }); 
                    dead[1] = targetr;
                }
                else {
                    channelr.fetchMessage(msgid2).then(msg => msg.delete());
                }
            }
        }
    }
    else if (messager.id == msgid3) {
        if (event.t === "MESSAGE_REACTION_ADD") {
            if (messager.content.includes('射殺的') && userr.id != '653968885720285204') {
                var targeth = convert3(emojir.toString());
                if (targeth != -1) {
                    channelr.fetchMessage(msgid3).then(msg => msg.delete());
                    bot.channels.get(hunterchannel).send('✅**'+targeth+'號**已被帶走'); 
                    bot.channels.get('644812476382445569').send('<@&'+convert2(targeth)+'>'+'淘汰');
                    if (targeth == wolfking) {
                        bot.channels.get('644812476382445569').send('<@&'+convert2(wolfking)+'> 啟動角色技能 選擇你要帶走的對象');
                        bot.channels.get(wkchannel).send('<@&'+convert2(wolfking)+'> 啟動狼王技能 選擇你要帶走的對象').then(async function (messagess) {
                            msgid4 = messagess.id;
                            for (var i = 1; i <= players; i++) {
                                await messagess.react(convert(i));
                            }
                            await messagess.react('❌');
                        });
                    }
                }
                else {
                    channelr.fetchMessage(msgid3).then(msg => msg.delete());
                }
            }
        }
    }
    else if (messager.id == msgid4) {
        if (event.t === "MESSAGE_REACTION_ADD") {
            if (messager.content.includes('帶走的') && userr.id != '653968885720285204') {
                var targetwk = convert3(emojir.toString());
                if (targetwk != -1) {
                    channelr.fetchMessage(msgid4).then(msg => msg.delete());
                    bot.channels.get(wkchannel).send('✅**'+targetwk+'號**已被帶走'); 
                    bot.channels.get('644812476382445569').send('<@&'+convert2(targetwk)+'>'+'淘汰');
                }
                else {
                    channelr.fetchMessage(msgid4).then(msg => msg.delete());
                }
            }
        }
    }
    else {
        return;
    }
});
bot.login('NjUzOTY4ODg1NzIwMjg1MjA0.XkTppQ._C_WYVGyhO9EXtfQzYqaLmsQ_P4');