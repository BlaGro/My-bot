const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} jest online!`);

  bot.user.setActivity("Ładowanie...", {type: "Widze cie"})

  bot.user.setGame("by FrOsT | BETA");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}ogloszenie`){
    let reason = args.join(" ").slice(22);
    let embed = new Discord.RichEmbed()
    .setDescription("Ogłoszenie")
    .setColor("#4286f4")
    .addField("Treść", reason
    .addField("Ogłoszone przez", message.author)
    .addField("Z góry dzięki za przeczytanie");
    client.channel.get("462667425339539458").send({embed})
  }


  if(cmd === "Cześć"){
    return message.channel.send("Witaj");
  }

if(cmd === `${prefix}powiedz`){
  const sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  message.channel.send(sayMessage);

}

  if(cmd === `${prefix}wyrzuc`){

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Nie znaleziono użytkownika!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nope");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie można wyrzucić tego użytkownika");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Wyrzucanie~")
    .setColo("#00f6ff")
    .addField("Wyrzucony użytkownik", `${kUser} z ID: ${kUser.id} `)
    .addField("Wyrzucony przez", `<@${message.author.id}> z ID ${message.author.id}`)
    .addField("Wyrzucony w", message.channel)
    .addField("Czas", message.createdAt)
    .addField("Powód", kReason);

    let kickChannel = message.guild.channels.find(`name`, "kicki-i-bany");
    if(!kickChannel) return message.channel.send("Nie znaleziono kanału.");

    message.guild.member(kUser).kick(kReason)
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Nie znaleziono użytkownika");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Zgloszenia")
    .setColor("#f44242")
    .addField("Zgłoszony użytkownik", `${rUser} z ID: ${rUser.id}`)
    .addField("Zgłoszony przez", `${message.author} z ID: ${message.author.id}`)
    .addField("Kanał", message.channel)
    .addField("Czas", message.createdAt)
    .addField("Powód", reason);

    let reportschannel = message.guild.channels.find(`name`, "zgloszenia");
    if(!reportschannel) return message.channel.send("Nie znaleziono kanału #zgloszenia");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }




  if(cmd === `${prefix}witam`){
    return message.channel.send("Witaj");
  }

  if(cmd === `${prefix}bot`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Info o bocie")
    .setColor("#0061ff")
    .setThumbnail(bicon)
    .addField("Nazwa bota", bot.user.username)
    .addField("Stworzony", bot.user.createdAt)
    .addField("Id bota", bot.user.id)
    .addField("Tag bota", bot.user.tag);

    return message.channel.send(botembed);
  }

});

bot.login(botconfig.token)
