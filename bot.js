const Discord = require('discord.js');
const bot = new Discord.Client();
var status = 1;
var save = 1, poison = 1, checkstatus = 1, cankill = 1;
var kill;
var dead = [-1, -1, -1];
var day = 0;
var daycnt = 0;
var wolves = [];
var msgid, msgid2, msgid3, msgid4, msgid5;
var witch;
var hunter;
var idiot, idiotstatus = 0, knight, knightstatus = 0;
var vcnt = 0, gcnt = 0, wcnt = 0;
var isG = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var isV = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var isW = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var vlist = [];
var wolfking;
var isDead = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var vote = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], votei = [];
var witchchannel, seerchannel, hunterchannel, wkchannel, knightchannel;
var players;
var endvotebool = 0, votebool = 0, revotebool = 0, endrevotebool = 0;
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
function convert4(number) { //int to channel ID
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
function convert5(number) { //channel ID to int
    if (number == "645881484049383425") return 1;
    if (number == "645135904591183872") return 2;
    if (number == "645136023646502922") return 3;
    if (number == "645136088700026901") return 4;
    if (number == "645136140768116746") return 5;
    if (number == "645136257969553419") return 6;
    if (number == "645136355655024651") return 7;
    if (number == "645136517097979916") return 8;
    if (number == "645136584907292711") return 9;
    if (number == "645136642851602442") return 10;
    if (number == "645142473915498505") return 11;
    if (number == "645143428585226250") return 12;
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
    else if (message.content.includes('!role')) {
        let channel2 = bot.channels.get("654262918069878784");
        channel2.fetchMessages({limit : 1}).then(messages => {
            players = parseInt(messages.first());
            vcnt = players;
        })
        .catch(console.error);
    }
    else if (message.content == '/night' && status == 1) {
        let allowedRole = message.guild.roles.find(role => role.name === "MC");
        if (message.member.roles.has(allowedRole.id)) {
            day = 0;
            checkstatus = 1;
            cankill = 1;
            dead = [-1, -1, -1];
            let channel = message.member.voiceChannel;
            if (channel == undefined) {
                message.reply('🚫 You have not joined a VC yet.');
                return;
            }
            for (let member of channel.members) {
                if (member[1] != message.member) {
                    member[1].setMute(true);
                }
            }
            let botroles2 = bot.channels.get("677883179649990656");
            botroles2.fetchMessages({limit : 1}).then(messages2 => {
                var rolelist = messages2.first().toString();
                var windex = rolelist.indexOf('witch');
                var sindex = rolelist.indexOf('seer');
                var hindex = rolelist.indexOf('hunter');
                var wkindex = rolelist.indexOf('wolf king');
                var iindex = rolelist.indexOf('idiot');
                var kindex = rolelist.indexOf('knight');
                console.log('Wkindex:'+wkindex);
                var flag = 1;
                if (windex != -1) {
                    if (daycnt == 0) gcnt++;
                    while (windex--) {
                        if (flag == 0) break;
                        if (rolelist[windex] == '.') {
                            var tempr = windex;
                            while (tempr--) {
                                if (rolelist[tempr] == '\n') {
                                    witchchannel = convert4(parseInt(rolelist.substr(tempr + 1, 3))).toString();
                                    witch = parseInt(rolelist.substr(tempr + 1, 3));
                                    console.log('Witchchannel:'+witchchannel);
                                    isG[witch] = 1;
                                    isV[witch] = 0;
                                    flag = 0;
                                    break;
                                }
                                else if (tempr == 0) {
                                    witchchannel = convert4(parseInt(rolelist.substr(tempr, 3))).toString();
                                    witch = parseInt(rolelist.substr(tempr, 3));
                                    console.log('Witchchannel:'+witchchannel);
                                    isG[witch] = 1;
                                    isV[witch] = 0;
                                    flag = 0;
                                    break;
                                }
                            }
                        }
                    }
                }
                flag = 1;
                if (sindex != -1) {
                    if (daycnt == 0) gcnt++;
                    while (sindex--) {
                        if (flag == 0) break;
                        if (rolelist[sindex] == '.') {
                            var temps = sindex;
                            while (temps--) {
                                if (rolelist[temps] == '\n') {
                                    seerchannel = convert4(parseInt(rolelist.substr(temps + 1, 3))).toString();
                                    console.log('Seerchannel:'+seerchannel);
                                    flag = 0;
                                    isG[parseInt(rolelist.substr(temps + 1, 3))] = 1;
                                    isV[parseInt(rolelist.substr(temps + 1, 3))] = 0;
                                    break;
                                }
                                else if (temps == 0) {
                                    seerchannel = convert4(parseInt(rolelist.substr(temps, 3))).toString();
                                    console.log('Seerchannel:'+seerchannel);
                                    isG[parseInt(rolelist.substr(temps + 1, 3))] = 1;
                                    isV[parseInt(rolelist.substr(temps + 1, 3))] = 0;
                                    flag = 0;
                                    break;
                                }
                            }
                        }
                    }
                }
                flag = 1;
                if (hindex != -1) {
                    if (daycnt == 0) gcnt++;
                    while (hindex--) {
                        if (flag == 0) break;
                        if (rolelist[hindex] == '.') {
                            var temph = hindex;
                            while (temph--) {
                                if (rolelist[temph] == '\n') {
                                    hunterchannel = convert4(parseInt(rolelist.substr(temph + 1, 3))).toString();
                                    hunter = parseInt(rolelist.substr(temph + 1, 3));
                                    isG[hunter] = 1;
                                    isV[hunter] = 0;
                                    flag = 0;
                                    break;
                                }
                                else if (temph == 0) {
                                    hunterchannel = convert4(parseInt(rolelist.substr(temph, 3))).toString();
                                    hunter = parseInt(rolelist.substr(temph, 3));
                                    isG[hunter] = 1;
                                    isV[hunter] = 0;
                                    flag = 0;
                                    break;
                                }
                            }
                        }
                    }
                }
                flag = 1;
                if (wkindex != -1) {
                    while (wkindex--) {
                        if (flag == 0) break;
                        if (rolelist[wkindex] == '.') {
                            var tempwk = wkindex;
                            while (tempwk--) {
                                if (rolelist[tempwk] == '\n') {
                                    wkchannel = convert4(parseInt(rolelist.substr(tempwk + 1, 3))).toString();
                                    wolfking = parseInt(rolelist.substr(tempwk + 1, 3));
                                    isW[wolfking] = 1;
                                    isV[wolfking] = 0;
                                    flag = 0;
                                    break;
                                }
                                else if (tempwk == 0) {
                                    wkchannel = convert4(parseInt(rolelist.substr(tempwk, 3))).toString();
                                    wolfking = parseInt(rolelist.substr(tempwk, 3));
                                    isW[wolfking] = 1;
                                    isV[wolfking] = 0;
                                    flag = 0;
                                    break;
                                }
                            }
                            console.log('Wolfking:' +wolfking);
                        }
                    }
                }
                flag = 1;
                if (iindex != -1) {
                    if (daycnt == 0) gcnt++;
                    while (iindex--) {
                        if (flag == 0) break;
                        if (rolelist[iindex] == '.') {
                            var tempi = iindex;
                            while (tempi--) {
                                if (rolelist[tempi] == '\n') {
                                    idiot = parseInt(rolelist.substr(tempi + 1, 3));
                                    flag = 0;
                                    isG[idiot] = 1;
                                    isV[idiot] = 0;
                                    break;
                                }
                                else if (tempi == 0) {
                                    idiot = parseInt(rolelist.substr(tempi, 3));
                                    flag = 0;
                                    isG[idiot] = 1;
                                    isV[idiot] = 0;
                                    break;
                                }
                            }
                            console.log('Idiot:' +idiot);
                        }
                    }
                }
                flag = 1;
                if (kindex != -1) {
                    if (daycnt == 0) gcnt++;
                    while (kindex--) {
                        if (flag == 0) break;
                        if (rolelist[kindex] == '.') {
                            var tempk = kindex;
                            while (tempk--) {
                                if (rolelist[tempk] == '\n') {
                                    knightchannel = convert4(parseInt(rolelist.substr(tempk, 3))).toString();
                                    knight = parseInt(rolelist.substr(tempk + 1, 3));
                                    flag = 0;
                                    isG[knight] = 1;
                                    isV[knight] = 0;
                                    break;
                                }
                                else if (tempk == 0) {
                                    knightchannel = convert4(parseInt(rolelist.substr(tempk, 3))).toString();
                                    knight = parseInt(rolelist.substr(tempk, 3));
                                    flag = 0;
                                    isG[knight] = 1;
                                    isV[knight] = 0;
                                    break;
                                }
                            }
                            console.log('Knight:' +knight);
                            console.log('Knightchannel:' +knightchannel);
                        }
                    }
                }
                var wolf1 = rolelist.indexOf('wolf');
                var wolf2 = rolelist.indexOf('wolf', (wolf1 + 1));
                var wolf3 = wolf2 == -1 ? -1 : rolelist.indexOf('wolf', (wolf2 + 1));
                var wolf4 = wolf3 == -1 ? -1 : rolelist.indexOf('wolf', (wolf3 + 1));
                flag = 1;
                if (daycnt == 0) wcnt = 2;
                while (wolf1--) {
                    if (flag == 0) break;
                    if (rolelist[wolf1] == '.') {
                        var temp1 = wolf1;
                        while (temp1--) {
                            if (rolelist[temp1] == '\n') {
                                wolves[0] = parseInt(rolelist.substr(temp1 + 1, 3));
                                flag = 0;
                                isW[wolves[0]] = 1;
                                isV[wolves[0]] = 0;
                                break;
                            }
                            else if (temp1 == 0) {
                                wolves[0] = parseInt(rolelist.substr(temp1, 3));
                                isW[wolves[0]] = 1;
                                isV[wolves[0]] = 0;
                                flag = 0;
                                break;
                            }
                        }
                    }
                }
                flag = 1;
                while (wolf2--) {
                    if (flag == 0) break;
                    if (rolelist[wolf2] == '.') {
                        var temp2 = wolf2;
                        while (temp2--) {
                            if (rolelist[temp2] == '\n') {
                                wolves[1] = parseInt(rolelist.substr(temp2 + 1, 3));
                                isW[wolves[1]] = 1;
                                isV[wolves[1]] = 0;
                                flag = 0;
                                break;
                            }
                            else if (temp2 == 0) {
                                wolves[1] = parseInt(rolelist.substr(temp2, 3));
                                isW[wolves[1]] = 1;
                                isV[wolves[1]] = 0;
                                flag = 0;
                                break;
                            }
                        }
                    }
                }flag = 1;
                if (wolf3 != -1) {
                    if (daycnt == 0) wcnt++;
                    while (wolf3--) {
                        if (flag == 0) break;
                        if (rolelist[wolf3] == '.') {
                            var temp3 = wolf3;
                            while (temp3--) {
                                if (rolelist[temp3] == '\n') {
                                    wolves[2] = parseInt(rolelist.substr(temp3 + 1, 3));
                                    isW[wolves[2]] = 1;
                                    isV[wolves[2]] = 0;
                                    flag = 0;
                                    break;
                                }
                                else if (temp3 == 0) {
                                    wolves[2] = parseInt(rolelist.substr(temp3, 3));
                                    isW[wolves[2]] = 1;
                                    isV[wolves[2]] = 0;
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
                    if (daycnt == 0) wcnt++;
                    while (wolf4--) {
                        if (flag == 0) break;
                        if (rolelist[wolf4] == '.') {
                            var temp4 = wolf4;
                            while (temp4--) {
                                if (rolelist[temp4] == '\n') {
                                    wolves[3] = parseInt(rolelist.substr(temp4 + 1, 3));
                                    isW[wolves[3]] = 1;
                                    isV[wolves[3]] = 0;
                                    flag = 0;
                                    break;
                                }
                                else if (temp4 == 0) {
                                    wolves[3] = parseInt(rolelist.substr(temp4, 3));
                                    isW[wolves[3]] = 1;
                                    isV[wolves[3]] = 0;
                                    flag = 0;
                                    break;
                                }
                            }
                        }
                    }
                }
                else wolves[3] = -1;
                if (daycnt == 0) {
                    vcnt -= gcnt + wcnt;
                    console.log('players: ' + players);
                    console.log('vcnt: ' + vcnt);
                    console.log('wcnt: ' + wcnt);
                    console.log('gcnt: ' + gcnt);
                }
            })
            .catch(console.error);
            message.reply(' ✅ Muted.');
        } 
        else {
           message.reply(' 🚫 Access denied.');
           return;
        }
    }
    else if (message.content == '/day' && status == 1) {
        let MC = message.guild.roles.find(role => role.name === "MC");
        let dee = message.guild.roles.find(role => role.name === "Dead");
        if (message.member.roles.has(MC.id)) {
            day = 1;
            daycnt++;
            votebool = 0;
            endvotebool = 0;
            revotebool = 0;
            endrevotebool = 0;
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
           return;
        }
        if (dead[0] == -1 && dead[1] == -1) {
            bot.channels.get('644812476382445569').send('--------------------------------------------------------\n<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚是平安夜');
        }
        else {
            if (dead[1] == -1 && dead[0] != -1) {
                bot.channels.get('644812476382445569').send('--------------------------------------------------------\n<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚**'+dead[0]+'號**被殺死');
                message.guild.roles.get(convert2(dead[0])).members.forEach(async function (member) {
                    member.addRole('644821024692764683').catch(console.error);
                });
                isDead[dead[0]] = 1;
            }
            else if (dead[1] != -1 && dead[0] == -1) {
                bot.channels.get('644812476382445569').send('--------------------------------------------------------\n<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚**'+dead[1]+'號**被殺死');
                message.guild.roles.get(convert2(dead[1])).members.forEach(async function (member) {
                    member.addRole('644821024692764683').catch(console.error);
                });
                isDead[dead[1]] = 1;
            }
            else if (dead[1] != -1 && dead[0] != -1 && dead[1] > dead[0]) {
                bot.channels.get('644812476382445569').send('--------------------------------------------------------\n<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚**'+dead[0]+'號**、**'+dead[1]+'號**被殺死');
                message.guild.roles.get(convert2(dead[0])).members.forEach(async function (member) {
                    member.addRole('644821024692764683').catch(console.error);
                });
                message.guild.roles.get(convert2(dead[1])).members.forEach(async function (member) {
                    member.addRole('644821024692764683').catch(console.error);
                });
                isDead[dead[1]] = 1;
                isDead[dead[0]] = 1;
            }
            else if (dead[1] != -1 && dead[0] != -1 && dead[1] < dead[0]) {
                bot.channels.get('644812476382445569').send('--------------------------------------------------------\n<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚**'+dead[1]+'號**、**'+dead[0]+'號**被殺死');
                message.guild.roles.get(convert2(dead[0])).members.forEach(async function (member) {
                    member.addRole('644821024692764683').catch(console.error);
                });
                message.guild.roles.get(convert2(dead[1])).members.forEach(async function (member) {
                    member.addRole('644821024692764683').catch(console.error);
                });
                isDead[dead[1]] = 1;
                isDead[dead[0]] = 1;
            }
            else if (dead[1] == dead[0] && dead[1] != -1) {
                bot.channels.get('644812476382445569').send('--------------------------------------------------------\n<@&644797819169013761> <@&644797887498158081> <@&644797911733108737> <@&644797954632187935> <@&644797983333810177> <@&644797999242805249> <@&644798029068632074> <@&644798045862756352> <@&644798059473141782> <@&644798078217486336> <@&644877216752205825> <@&644890233279873024> \n昨晚**'+dead[0]+'號**被殺死');
                message.guild.roles.get(convert2(dead[0])).members.forEach(async function (member) {
                    member.addRole('644821024692764683').catch(console.error);
                });
                isDead[dead[0]] = 1;
            }
        }
        if (wcnt == 0) {
            bot.channels.get('644812476382445569').send('**🎉 遊戲結束 好人獲勝 🎉**');
            return;
        }
        else if (gcnt == 0 || vcnt == 0) {
            bot.channels.get('644812476382445569').send('**🎉 遊戲結束 狼人獲勝 🎉**');
            return;
        }
        else if (dead[0] == hunter) {
            bot.channels.get('644812476382445569').send('<@&'+convert2(hunter)+'> 啟動角色技能 選擇你要帶走的對象');
            bot.channels.get(hunterchannel).send('<@&'+convert2(hunter)+'> 啟動獵人技能 選擇你要射殺的對象').then(async function (messages) {
                msgid3 = messages.id;
                for (var i = 1; i <= players; i++) {
                    if (!isDead[i]) await messages.react(convert(i));
                }
                await messages.react('❌');
            });
        }
    }
    else if (message.content == '/vote' && status == 1) {
        if (votebool == 1) {
            message.reply(' 🚫 Access denied.');
            return;
        }
        let MC = message.guild.roles.find(role => role.name === "MC");
        if (message.member.roles.has(MC.id)) {
            votebool = 1;
            for (var i = 1; i <= players; i++) {
                if (idiotstatus == 1 && i == idiot) {
                    bot.channels.get(convert4(i)).send('🚫你不能投票');
                }
                else {
                    if (!isDead[i]) {
                        bot.channels.get(convert4(i)).send('🗳️請投票').then(async function (messages) {
                            for (var j = 1; j <= players; j++) {
                                if (!isDead[j]) await messages.react(convert(j));
                            }
                            await messages.react('❌');
                        });
                    }
                }
            }
            bot.channels.get('644812476382445569').send('🗳️請在各自頻道內投票');
        }
        else {
           message.reply(' 🚫 Access denied.');
           return;
        }
    }
    else if (message.content == '/endvote' && status == 1) {
        let MC = message.guild.roles.find(role => role.name === "MC");
        if (votebool == 0 || endvotebool == 1 || !message.member.roles.has(MC.id)) {
            message.reply(' 🚫 Access denied.');
            return;
        }
        endvotebool = 1;
        var vmax = -999, vi = -999;
        for (var i = 1; i <= players; i++) {
            console.log('vote['+i+'] = ' + vote[i] + ', vmax = '+vmax);
            if (vote[i] > vmax) {
                vmax = vote[i];
                vi = i;
            }
        }
        if (vmax == -1 && vi == -1) {
            bot.channels.get('644812476382445569').send('🗳️投票結束\n**全部人棄票**');
        }
        else {
            //check if 平票
            var ev = 0;
            vlist[0] = vi;
            for (var i = 1; i <= players; i++) {
                if (vote[i] == vmax && i != vi) {
                    ev++;
                    vlist[ev] = i;
                }
            }
            if (ev > 0) {
                var votemsg = '🗳️投票結束\n<@&'+convert2(vi)+'>';
                for (var i = 1; i <= ev; i++) {
                    votemsg += ' 、<@&'+convert2(vlist[i])+'>';
                }
                votemsg += '平票\n'+vi+'號開始辯論\n\n__投票結果：__\n';
                for (var i = 0; i <= players; i++) {
                    var hasVotes = 0;
                    var templist = [];
                    for (var j = 1; j <= players; j++) {
                        if (votei[j] == i) {
                            templist[hasVotes] = j;
                            hasVotes++;
                        }
                    }
                    if (hasVotes > 0) {
                        if (i == 0) votemsg += '\n**棄票** - ';
                        else votemsg += '\n**' + i + '號** - ';
                        votemsg += templist[0];
                        if (hasVotes != 1) {
                            for (var j = 1; j < hasVotes; j++) {
                                votemsg += ','+templist[j];
                            }
                        }
                    }
                }
                bot.channels.get('644812476382445569').send(votemsg);
            }
            else {
                var votemsg;
                if (isW[vi]) wcnt--;
                else if (isV[vi]) vcnt--;
                else if (isG[vi]) gcnt--;
                if (vcnt == 0 || gcnt == 0 || wcnt == 0) votemsg = '🗳️投票結束\n<@&'+convert2(vi)+'>淘汰\n\n__投票結果：__\n';
                else if (vi != idiot) votemsg = '🗳️投票結束\n<@&'+convert2(vi)+'>淘汰 請發表遺言\n\n__投票結果：__\n';
                else votemsg = '🗳️投票結束\n<@&'+convert2(vi)+'>是白癡\n\n__投票結果：__\n';
                for (var i = 0; i <= players; i++) {
                    var hasVotes = 0;
                    var templist = [];
                    for (var j = 1; j <= players; j++) {
                        if (votei[j] == i) {
                            templist[hasVotes] = j;
                            hasVotes++;
                        }
                    }
                    if (hasVotes > 0) {
                        if (i == 0) votemsg += '\n**棄票** - ';
                        else votemsg += '\n**' + i + '號** - ';
                        votemsg += templist[0];
                        if (hasVotes != 1) {
                            for (var j = 1; j < hasVotes; j++) {
                                votemsg += ','+templist[j];
                            }
                        }
                    }
                }
                bot.channels.get('644812476382445569').send(votemsg);
                if (wcnt == 0) {
                    bot.channels.get('644812476382445569').send('**🎉 遊戲結束 好人獲勝 🎉**');
                    return;
                }
                if (vcnt == 0 || gcnt == 0) {
                    bot.channels.get('644812476382445569').send('**🎉 遊戲結束 狼人獲勝 🎉**');
                    return;
                }
                if (vi != idiot) {
                    message.guild.roles.get(convert2(vi)).members.forEach(async function (member) {
                        member.addRole('644821024692764683').catch(console.error);
                    });
                    isDead[vi] = 1;
                }
                else {
                    idiotstatus = 1;
                }
                if (vi == hunter) {
                    bot.channels.get('644812476382445569').send('<@&'+convert2(hunter)+'> 啟動角色技能 選擇你要帶走的對象');
                    bot.channels.get(hunterchannel).send('<@&'+convert2(hunter)+'> 啟動獵人技能 選擇你要射殺的對象').then(async function (messages) {
                        msgid3 = messages.id;
                        for (var i = 1; i <= players; i++) {
                            if (!isDead[i]) await messages.react(convert(i));
                        }
                        await messages.react('❌');
                    });
                }
                if (vi == wolfking) {
                    bot.channels.get('644812476382445569').send('<@&'+convert2(wolfking)+'> 啟動角色技能 選擇你要帶走的對象');
                    bot.channels.get(wkchannel).send('<@&'+convert2(wolfking)+'> 啟動狼王技能 選擇你要帶走的對象').then(async function (messages) {
                        msgid4 = messages.id;
                        for (var i = 1; i <= players; i++) {
                            if (!isDead[i]) await messages.react(convert(i));
                        }
                        await messages.react('❌');
                    });
                }
            }
        }
        vote = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], votei = [];
    }
    else if (message.content == '/revote' && status == 1) {
        let MC = message.guild.roles.find(role => role.name === "MC");
        if (endvotebool == 0 || revotebool == 1 || votebool == 0 || !message.member.roles.has(MC.id)) {
            message.reply(' 🚫 Access denied.');
            return;
        }
        revotebool = 1;
        if (message.member.roles.has(MC.id)) {
            for (var i = 1; i <= players; i++) {
                if (vlist.includes(i)) {
                    bot.channels.get(convert4(i)).send('🚫你不能重新投票');
                }
                else if (idiotstatus == 1 && i == idiot) {
                    bot.channels.get(convert4(i)).send('🚫你不能投票');
                }
                else {
                    if (!isDead[i]) {
                        bot.channels.get(convert4(i)).send('🗳️請重新投票').then(async function (messages) {
                            for (var j = 0; j < vlist.length; j++) {
                                if (!isDead[vlist[j]]) await messages.react(convert(vlist[j]));
                            }
                            await messages.react('❌');
                        });
                    }
                }
            }
            bot.channels.get('644812476382445569').send('🗳️請在各自頻道內重新投票');
        }
        else {
           message.reply(' 🚫 Access denied.');
           return;
        }
    }
    else if (message.content == '/endrevote' && status == 1) {
        let MC = message.guild.roles.find(role => role.name === "MC");
        if (revotebool == 0 || votebool == 0 || endvotebool == 0 || endrevotebool == 1 || !message.member.roles.has(MC.id)) {
            message.reply(' 🚫 Access denied.');
            return;
        }
        endrevotebool = 1;
        var vmax = -1, vi = -1;
        for (var i = 1; i <= players; i++) {
            console.log('vote['+i+'] = ' + vote[i] + ', vmax = '+vmax);
            if (vote[i] > vmax) {
                vmax = vote[i];
                vi = i;
            }
        }
        if (vmax == -1 && vi == -1) {
            bot.channels.get('644812476382445569').send('🗳️投票結束\n**全部人棄票**');
        }
        else {
            //check if 平票
            var ev = 0;
            vlist[0] = vi;
            for (var i = 1; i <= players; i++) {
                if (vote[i] == vmax && i != vi) {
                    ev++;
                    vlist[ev] = i;
                }
            }
            if (ev > 0) {
                var votemsg = '🗳️投票結束\n<@&'+convert2(vi)+'>';
                for (var i = 1; i <= ev; i++) {
                    votemsg += ' 、<@&'+convert2(vlist[i])+'>';
                }
                votemsg += '平票\n天黑請閉眼\n\n__投票結果：__\n';
                for (var i = 0; i <= players; i++) {
                    var hasVotes = 0;
                    var templist = [];
                    for (var j = 1; j <= players; j++) {
                        if (votei[j] == i) {
                            templist[hasVotes] = j;
                            hasVotes++;
                        }
                    }
                    if (hasVotes > 0) {
                        if (i == 0) votemsg += '\n**棄票** - ';
                        else votemsg += '\n**' + i + '號** - ';
                        votemsg += templist[0];
                        if (hasVotes != 1) {
                            for (var j = 1; j < hasVotes; j++) {
                                votemsg += ','+templist[j];
                            }
                        }
                    }
                }
                bot.channels.get('644812476382445569').send(votemsg);
                vote = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], votei = [];
            }
            else {
                var votemsg;
                if (isW[vi]) wcnt--;
                else if (isV[vi]) vcnt--;
                else if (isG[vi]) gcnt--;
                if (vcnt == 0 || gcnt == 0 || wcnt == 0) votemsg = '🗳️投票結束\n<@&'+convert2(vi)+'>淘汰\n\n__投票結果：__\n';
                else if (vi != idiot) votemsg = '🗳️投票結束\n<@&'+convert2(vi)+'>淘汰 請發表遺言\n\n__投票結果：__\n';
                else votemsg = '🗳️投票結束\n<@&'+convert2(vi)+'>是白癡\n\n__投票結果：__\n';
                for (var i = 0; i <= players; i++) {
                    var hasVotes = 0;
                    var templist = [];
                    for (var j = 1; j <= players; j++) {
                        if (votei[j] == i) {
                            templist[hasVotes] = j;
                            hasVotes++;
                        }
                    }
                    if (hasVotes > 0) {
                        if (i == 0) votemsg += '\n**棄票** - ';
                        else votemsg += '\n**' + i + '號** - ';
                        votemsg += templist[0];
                        if (hasVotes != 1) {
                            for (var j = 1; j < hasVotes; j++) {
                                votemsg += ','+templist[j];
                            }
                        }
                    }
                }
                bot.channels.get('644812476382445569').send(votemsg);
                if (wcnt == 0) {
                    bot.channels.get('644812476382445569').send('**🎉 遊戲結束 好人獲勝 🎉**');
                    return;
                }
                if (vcnt == 0 || gcnt == 0) {
                    bot.channels.get('644812476382445569').send('**🎉 遊戲結束 狼人獲勝 🎉**');
                    return;
                }
                if (vi != idiot) {
                    message.guild.roles.get(convert2(vi)).members.forEach(async function (member) {
                        member.addRole('644821024692764683').catch(console.error);
                    });
                }
                else {
                    idiotstatus = 1;
                }
                vote = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], votei = [];
                if (vi == hunter) {
                    bot.channels.get('644812476382445569').send('<@&'+convert2(hunter)+'> 啟動角色技能 選擇你要帶走的對象');
                    bot.channels.get(hunterchannel).send('<@&'+convert2(hunter)+'> 啟動獵人技能 選擇你要射殺的對象').then(async function (messages) {
                        msgid3 = messages.id;
                        for (var i = 1; i <= players; i++) {
                            if (!isDead[i]) await messages.react(convert(i));
                        }
                        await messages.react('❌');
                    });
                }
                if (vi == wolfking) {
                    bot.channels.get('644812476382445569').send('<@&'+convert2(wolfking)+'> 啟動角色技能 選擇你要帶走的對象');
                    bot.channels.get(wkchannel).send('<@&'+convert2(wolfking)+'> 啟動狼王技能 選擇你要帶走的對象').then(async function (messages) {
                        msgid4 = messages.id;
                        for (var i = 1; i <= players; i++) {
                            if (!isDead[i]) await messages.react(convert(i));
                        }
                        await messages.react('❌');
                    });
                }
            }
        }
        vote = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], votei = [];
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
           return;
        }
    }
    else if (message.content == '/ping'  && status == 1) {
        message.channel.send("<@&668003114858577920>");
        message.channel.send("<@&668003114858577920>");
        message.channel.send("<@&668003114858577920>");
        message.channel.send("<@&668003114858577920>");
        message.channel.send("<@&668003114858577920>");
    }
    else if (message.content.includes('/kill') && status == 1) {
        if (message.member.id == '653535759508439051' || message.member.id == '677378738228559873') return;
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
            if (isW[kill]) wcnt--;
            else if (isV[kill]) vcnt--;
            else if (isG[kill]) gcnt--;
            cankill = 0;
            if (save == 1) {
                if (kill != witch || (kill == witch && day == 0)) {
                    bot.channels.get(witchchannel).send('昨晚**'+kill+'號**被殺死，你要救他嗎？\n救:✅ 不救:❎').then(async function (message6) {
                        msgid = message6.id;
                        await message6.react('✅');
                        await message6.react('❎');
                    });
                }
                else if (kill == witch && daycnt > 0 && poison == 1) {
                    bot.channels.get(witchchannel).send('昨晚**你**被殺死了，你**不能自救**。選擇你要投毒的對象').then(async function (message7) {
                        msgid2 = message7.id;
                        for (var i = 1; i <= players; i++) {
                            if (!isDead[i]) await message7.react(convert(i));
                        }
                        await message7.react('❌');
                    }); 
                }
                else if (kill == witch && daycnt > 0 && poison == 0) {
                    bot.channels.get(witchchannel).send('昨晚**你**被殺死了，你**不能自救**。'); 
                }
                else if (kill == witch && daycnt > 0 && poison == 0) {
                    bot.channels.get(witchchannel).send('昨晚**你**被殺死了，你**不能自救**。');
                }
            }
            else {
                dead[0] = kill;
                if (poison == 1) {
                    bot.channels.get(witchchannel).send('選擇你要投毒的對象').then(async function (message7) {
                        msgid2 = message7.id;
                        for (var i = 1; i <= players; i++) {
                            if (!isDead[i]) await message7.react(convert(i));
                        }
                        await message7.react('❌');
                    }); 
                }
            }
        }
    }
    else if (message.content.includes('/check') && status == 1) {
        if (message.member.id == '653535759508439051' || message.member.id == '677378738228559873') return;
        if (message.channel.id != seerchannel || checkstatus == 0 || day == 1) {
            message.reply(' 🚫 Access denied.');
            return;
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
    else if (message.content == '/knight' && status == 1) {
        let MC = message.guild.roles.find(role => role.name === "MC");
        if (message.member.id == '653535759508439051' || message.member.id == '677378738228559873') return;
        if (knightstatus == 1 || day == 0 || !message.member.roles.has(convert2(knight)) || !message.member.roles.has(MC.id)) {
            message.reply(' 🚫 Access denied.');
            return;
        }
        else {
            bot.channels.get('644812476382445569').send('<@&'+convert2(knight)+'> ⚔️ 啟動騎士技能 選擇你要查驗的對象');
            bot.channels.get(knightchannel).send('<@&'+convert2(knight)+'> ⚔️ 啟動騎士技能 選擇你要查驗的對象').then(async function (messagesss) {
                msgid5 = messagesss.id;
                for (var i = 1; i <= players; i++) {
                    if (i == knight) continue;
                    if (!isDead[i]) await messagesss.react(convert(i));
                }
            });
        }
    }
    else if (message.content.includes('!endgame') && status == 1) {
        let MC = message.guild.roles.find(role => role.name === "MC");
        if (!message.member.roles.has(MC.id)) {
            save = 1;
            poison = 1;
            checkstatus = 1;
            day = 0;
            daycnt = 0;
            wolves = [];
            vlist = [];
            idiotstatus = 0;
            knightstaus = 0;
            isDead = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            isG = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            isV = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
            isW = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            wcnt = 0, vcnt = 0, gcnt = 0;
            votebool = 0, revotebool = 0, endvotebool = 0, endrevotebool = 0;
        }
        else {
            message.reply('🚫 Access denied.');
        }
    }
    else if (message.content == '/togglepoison' && status == 1) {
        if (message.member.id == '653535759508439051' || message.member.id == '677378738228559873') return;
        let MC = message.guild.roles.find(role => role.name === 'MC');
        if (!message.member.roles.has(MC.id)) {
            message.reply(' 🚫 Access denied.');
            return;
        }
        else {
            if (poison == 1) {
                poison = 0;
                message.reply('Set poison to 0');
            }
            else if (poison == 0) {
                poison = 1;
                message.reply('Set poison to 1');
            }
        }
    }
    else if (message.content == '/togglesave' && status == 1) {
        if (message.member.id == '653535759508439051' || message.member.id == '677378738228559873') return;
        let MC = message.guild.roles.find(role => role.name === 'MC');
        if (!message.member.roles.has(MC.id)) {
            message.reply(' 🚫 Access denied.');
            return;
        }
        else {
            if (save == 1) {
                save = 0;
                message.reply('Set save to 0');
            }
            else if (save == 0) {
                save = 1;
                message.reply('Set save to 1');
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
                if (emojiKey == '✅' && userr.id != '653968885720285204' && userr.id != '677378738228559873') {
                    channelr.fetchMessage(msgid).then(msg => msg.delete());
                    save = 0;
                    bot.channels.get(witchchannel).send('✅已使用救藥('+kill+'號)');
                    if (isW[kill]) wcnt++;
                    else if (isV[kill]) vcnt++;
                    else if (isG[kill]) gcnt++;
                }
                else if (emojiKey == '❎' && userr.id != '653968885720285204' && userr.id != '677378738228559873' && poison == 1) {
                    channelr.fetchMessage(msgid).then(msg => msg.delete());
                    dead[0] = kill;
                    if (poison == 1) {
                        bot.channels.get(witchchannel).send('選擇你要投毒的對象').then(async function (message) {
                            msgid2 = message.id;
                            for (var i = 1; i <= players; i++) {
                                if (i == witch) continue;
                                if (!isDead[i]) await message.react(convert(i));
                            }
                            await message.react('❌');
                        }); 
                    }
                }
                else if (emojiKey == '❎' && userr.id != '653968885720285204' && userr.id != '677378738228559873' && poison == 0) {
                    channelr.fetchMessage(msgid).then(msg => msg.delete());
                }
            }
        }
    }
    else if (messager.id == msgid2) {
        if (event.t === "MESSAGE_REACTION_ADD") {
            if (messager.content.includes('投毒的對象') && userr.id != '653968885720285204' && userr.id != '677378738228559873') {
                var targetr = convert3(emojir.toString());
                console.log(emojir);
                console.log(targetr);
                if (targetr != -1) {
                    channelr.fetchMessage(msgid2).then(msg => msg.delete());
                    poison = 0;
                    bot.channels.get(witchchannel).send('✅**'+targetr+'號**已被毒死');
                    if (isW[kill]) wcnt--;
                    else if (isV[kill]) vcnt--;
                    else if (isG[kill]) gcnt--;
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
            if (messager.content.includes('射殺的') && userr.id != '653968885720285204' && userr.id != '677378738228559873') {
                var targeth = convert3(emojir.toString());
                if (targeth != -1) {
                    channelr.fetchMessage(msgid3).then(msg => msg.delete());
                    bot.channels.get(hunterchannel).send('✅**'+targeth+'號**已被帶走'); 
                    bot.channels.get('644812476382445569').send('<@&'+convert2(targeth)+'>'+'淘汰');
                    messager.guild.roles.get(convert2(targeth)).members.forEach(async function (member) {
                        member.addRole('644821024692764683').catch(console.error);
                    });
                    isDead[targeth] = 1;
                    if (isW[targeth]) wcnt--;
                    else if (isV[targeth]) vcnt--;
                    else if (isG[targeth]) gcnt--;
                    if (wcnt == 0) {
                        bot.channels.get('644812476382445569').send('**🎉 遊戲結束 好人獲勝 🎉**');
                        return;
                    }
                    if (vcnt == 0 || gcnt == 0) {
                        bot.channels.get('644812476382445569').send('**🎉 遊戲結束 狼人獲勝 🎉**');
                        return;
                    }
                    if (targeth == wolfking) {
                        bot.channels.get('644812476382445569').send('<@&'+convert2(wolfking)+'> 啟動角色技能 選擇你要帶走的對象');
                        bot.channels.get(wkchannel).send('<@&'+convert2(wolfking)+'> 啟動狼王技能 選擇你要帶走的對象').then(async function (messagess) {
                            msgid4 = messagess.id;
                            for (var i = 1; i <= players; i++) {
                                if (!isDead[i]) await messagess.react(convert(i));
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
            if (messager.content.includes('帶走的') && userr.id != '653968885720285204' && userr.id != '677378738228559873') {
                var targetwk = convert3(emojir.toString());
                if (targetwk != -1) {
                    channelr.fetchMessage(msgid4).then(msg => msg.delete());
                    bot.channels.get(wkchannel).send('✅**'+targetwk+'號**已被帶走'); 
                    bot.channels.get('644812476382445569').send('<@&'+convert2(targetwk)+'>'+'淘汰');
                    messager.guild.roles.get(convert2(targetwk)).members.forEach(async function (member) {
                        member.addRole('644821024692764683').catch(console.error);
                    });
                    isDead[targetwk] = 1;
                    if (isW[targetwk]) wcnt--;
                    else if (isV[targetwk]) vcnt--;
                    else if (isG[targetwk]) gcnt--;
                    if (wcnt == 0) {
                        bot.channels.get('644812476382445569').send('**🎉 遊戲結束 好人獲勝 🎉**');
                        return;
                    }
                    if (vcnt == 0 || gcnt == 0) {
                        bot.channels.get('644812476382445569').send('**🎉 遊戲結束 狼人獲勝 🎉**');
                        return;
                    }
                    if (targetwk == hunter) {
                        bot.channels.get('644812476382445569').send('<@&'+convert2(hunter)+'> 啟動角色技能 選擇你要帶走的對象');
                        bot.channels.get(hunterchannel).send('<@&'+convert2(hunter)+'> 啟動獵人技能 選擇你要射殺的對象').then(async function (messagess) {
                            msgid3 = messagess.id;
                            for (var i = 1; i <= players; i++) {
                                if (!isDead[i]) await messagess.react(convert(i));
                            }
                            await messagess.react('❌');
                        });
                    }
                }
                else {
                    channelr.fetchMessage(msgid4).then(msg => msg.delete());
                }
            }
        }
    }
    else if (messager.id == msgid5) {
        if (event.t === "MESSAGE_REACTION_ADD") {
            if (messager.content.includes('騎士') && userr.id != '653968885720285204' && userr.id != '677378738228559873') {
                var targetk = convert3(emojir.toString());
                var isWolf2 = 0;
                for (var i = 0; i <= 3; i++) {
                    if (wolves[i] == targetk) {
                        isWolf2 = 1;
                    }
                }
                if (isWolf2) {
                    channelr.fetchMessage(msgid5).then(msg => msg.delete());
                    bot.channels.get(knightchannel).send('🔎 <@&'+convert2(targetk)+'> **是狼人**');
                    bot.channels.get('644812476382445569').send('🔎 <@&'+convert2(targetk)+'> **是狼人**');
                    messager.guild.roles.get(convert2(targetk)).members.forEach(async function (member) {
                        member.addRole('644821024692764683').catch(console.error);
                    });
                    isDead[targetk] = 1;
                    wcnt--;
                    if (wcnt == 0) {
                        bot.channels.get('644812476382445569').send('**🎉 遊戲結束 好人獲勝 🎉**');
                        return;
                    }
                    if (targetk == wolfking) {
                        bot.channels.get('644812476382445569').send('<@&'+convert2(wolfking)+'> 啟動角色技能 選擇你要帶走的對象');
                        bot.channels.get(wkchannel).send('<@&'+convert2(wolfking)+'> 啟動狼王技能 選擇你要帶走的對象').then(async function (messagess) {
                            msgid4 = messagess.id;
                            for (var i = 1; i <= players; i++) {
                                if (!isDead[i]) await messagess.react(convert(i));
                            }
                            await messagess.react('❌');
                        });
                    }
                }
                else {
                    bot.channels.get(knightchannel).send('🔎 <@&'+convert2(targetk)+'> **不是狼人**\n騎士以死謝罪');
                    bot.channels.get('644812476382445569').send('🔎 <@&'+convert2(targetk)+'> **不是狼人**\n騎士以死謝罪');
                    message.guild.roles.get(convert2(knight)).members.forEach(async function (member) {
                        member.addRole('644821024692764683').catch(console.error);
                    });
                    isDead[knight] = 1;
                    gcnt--;
                    if (gcnt == 0) {
                        bot.channels.get('644812476382445569').send('**🎉 遊戲結束 狼人獲勝 🎉**');
                        return;
                    }
                }
                knightstatus = 1;
            }
        }
    }
    else if (event.t === "MESSAGE_REACTION_ADD") {
        if (messager.content == '🗳️請投票' && userr.id != '653968885720285204' && userr.id != '677378738228559873') {
            var targetv = convert3(emojir.toString());
            if (targetv != -1) {
                messager.delete();
                bot.channels.get(data.channel_id).send('✅已投票給**'+targetv+'號**'); 
                vote[targetv]++;
                console.log('Total number of votes for '+targetv+' is '+vote[targetv]);
                console.log('Added vote for '+targetv+' from ' + convert5(data.channel_id));
                votei[convert5(data.channel_id)] = targetv;
            }
            else {
                messager.delete();
                bot.channels.get(data.channel_id).send('✅已選擇**棄票**'); 
                console.log('Total number of votes for '+targetv+' is '+vote[targetv]);
                console.log('Added vote for '+targetv+' from ' + convert5(data.channel_id));
                vote[0]++;
                votei[convert5(data.channel_id)] = 0;
            }
        }
        if (messager.content == '🗳️請重新投票' && userr.id != '653968885720285204' && userr.id != '677378738228559873') {
            var targetv = convert3(emojir.toString());
            if (targetv != -1) {
                messager.delete();
                bot.channels.get(data.channel_id).send('✅已投票給**'+targetv+'號**'); 
                vote[targetv]++;
                console.log('Total number of votes for '+targetv+' is '+vote[targetv]);
                console.log('Added vote for '+targetv+' from ' + convert5(data.channel_id));
                votei[convert5(data.channel_id)] = targetv;
            }
            else {
                messager.delete();
                bot.channels.get(data.channel_id).send('✅已選擇**棄票**'); 
                console.log('Total number of votes for '+targetv+' is '+vote[0]);
                console.log('Added vote for '+targetv+' from ' + convert5(data.channel_id));
                vote[0]++;
                votei[convert5(data.channel_id)] = 0;
            }
        }
    }
    else {
        return;
    }
});
bot.login('NjUzOTY4ODg1NzIwMjg1MjA0.Xl97pA.62fLLPdtbK1cX8yA2pvohcTN6Ew');