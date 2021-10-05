const Discord = require("discord.js");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
});



const { MessageEmbed } = require("discord.js")

const prefix = "$";

Client.on("messageCreate", message => {
    if(message.content === prefix + "zdx"){
         const embed = new Discord.MessageEmbed()
             .setColor("#FF0000")
             .setTitle("C'est le plus beau !")
             .setURL("https://www.youtube.com/channel/UCU9l4coPHxM5PgsxBlC4kLg")
             .setAuthor("Dieu ZDX", "http://image.noelshack.com/fichiers/2014/10/1393976452-p-104-a.jpg")
             .setDescription("faites des dons")
             .setThumbnail("https://www.serieously.com/app/uploads/2021/05/snk-livai-min-1024x577.jpeg")
             .setImage("https://i.ytimg.com/vi/UziKpfOfwzQ/maxresdefault.jpg");
 
 
         message.channel.send({ embeds : [embed]});
     }
 });

 //Welcome embed

    Client.on('guildMemberAdd', member => {
        
        const channel = member.guild.channels.cache.get("886976067976462346")

        const embed = new Discord.MessageEmbed()
            .setTitle(`Bienvenue sur ${member.guild.name}`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
            .setDescription(`Salut <@${member.user.id}>!\n Bienvenue sur **${member.guild.name}**. Merci d'avoir rejoins le discord, nous t'invitons à aller lire les règles!`)
            .setFooter(`Bienvenue ${member.user.username}#${member.user.discriminator}`,member.user.displayAvatarURL({dynamic: true, size: 512}))
            .setColor('RANDOM')
            .setImage("")
        channel.send({ embeds : [embed]});
        
    })

//Au revoir

    Client.on('guildMemberRemove', member => {

        const channel1 = member.guild.channels.cache.get("886976069805162528")

        const leavemessage = `<@${member.id}> Just Left Server.`

        const embed = new Discord.MessageEmbed()
            .setTitle(`Au revoir ;(`)
            .setDescription(`<@${member.user.id}>, nous a quitté ;(`)
            .setFooter(`Bonne continuation ${member.user.username}#${member.user.discriminator}`,member.user.displayAvatarURL({dynamic: true, size: 512}))
            .setColor('RANDOM')
        channel1.send({ embeds : [embed]});
    })

Client.on("ready", () => {

    console.log("bot opérationnel");
});

//Ticket pannel

const {
    Message,
    MessageButton,
    MessageActionRow
} = require('discord.js');


Client.on("messageCreate", message => {
    if(message.member.permissions.has("ADMINISTRATOR")){
    if(message.content === prefix + "ticket"){
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(message.guild.name, message.guild.iconURL({
                dynamic: true
            }))
            .setDescription(
                "__**Comment faire un ticket?**__\n" +


                "> Clique sur la réaction!\n" +

                "> Puis écrivez dans le channel qui vient d'être crée."

            )
            .setTitle('Tickets')


        const bt = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('tic')
                .setLabel('🎫 Faire un ticket!')
                .setStyle('PRIMARY'),
            );

        message.channel.send({embeds: [embed], components: [bt]});
    }
    }
})

//Ticket

Client.on("interactionCreate", async (interaction) => {

    await interaction.deferUpdate();
    if (interaction.isButton()) {
        if (interaction.customId === 'tic') {

            const thread = await interaction.channel.threads.create({
                name: `${interaction.user.tag}`,
                autoArchiveDuration: 1440, // this is 24hrs 60 will make it 1 hr
                //type: 'private_thread', // for private tickets u need server boosted to lvl 1 or 2 ok u need lvl 2, since mine is not boosted i will remove this LINE ONLY!
            });
            await thread.setLocked(true)
            const embed = new MessageEmbed()
                .setTitle('Ticket')
                .setDescription('Bonjour, \n Le personnel sera là dès que possible pour nous faire part de votre problème !\nMerci!')
                .setColor('GREEN')
                .setTimestamp()
                .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                    dynamic: true
                }));

            const del = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('del')
                    .setLabel('🗑️ Supprimer le Ticket!')
                    .setStyle('DANGER'),
                );
            interaction.user.send('Ton ticket a été ouvert!');
            thread.send({
                content: `Bonjour <@${interaction.user.id}>`,
                embeds: [embed],
                components: [del]
            }).then(interaction.followUp({
                content: 'Ticket crée!',
                ephemeral: true
            }))
            console.log(`Created thread: ${thread.name}`);
            setTimeout(() => {
                interaction.channel.bulkDelete(1)
            }, 5000)
        } else if (interaction.customId === 'del') {

            const thread = interaction.channel
            thread.delete();

        }
    }
}) 


//Ban

 Client.on("messageCreate", message => {
     if(message.member.permissions.has("ADMINISTRATOR")){
         if(message.content.startsWith(prefix + "ban")){
             let mention = message.mentions.members.first();

             if(mention == undefined){
                 message.reply("Veuillez mentionner un membre!");
             }
             else {
                 if(mention.bannable){
                    mention.ban();
                    const embed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle("**Le marteau du bannissement a encore frappé !**")
                        .setFooter(`Adieu`)
                        .setDescription(mention.displayName + ` a été banni du serveur!`)

 
 
         message.channel.send({ embeds : [embed]});
                 }
                 else {
                     message.reply("Impossible de bannir ce membre!");
                 }
             }
         }
     }
 })

 //Kick

 Client.on("messageCreate", message => {
    if(message.member.permissions.has("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Veuillez mentionner un membre!");
            }
            else {
                if(mention.kickable){
                   mention.kick();
                   const embed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle("**La prochaine fois c'est ban!**")
                        .setFooter(`A bientôt`)
                        .setDescription(mention.displayName + ` a été kick du serveur!`)

            message.channel.send({ embeds : [embed]});
                }
                else {
                    message.reply("Impossible de kick ce membre!");
                }
            }
        }
    }
})

//Mute

Client.on("messageCreate", message => {
    if(message.member.permissions.has("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Veuillez mentionner un membre!");
            }
            else {
                mention.roles.add('887088762679603281');
                   const embed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle("**Tais-toi ça nous fera des vacances!**")
                        .setFooter(`A bientôt`)
                        .setDescription(mention.displayName + ` a été mute du serveur!`)

            message.channel.send({ embeds : [embed]});
            }
        }
    }
});

//Unmute

Client.on("messageCreate", message => {
    if(message.member.permissions.has("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Veuillez mentionner un membre!");
            }
            else {
                mention.roles.remove('887088762679603281');
                   const embed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle("**Attention!**")
                        .setFooter(`Tu peux de nouveau parler, mais fais attention à respecter les règles maintenant !`)
                        .setDescription(mention.displayName + ` a été unmute du serveur!`)

            message.channel.send({ embeds : [embed]});
            }
        }
    }
});


//TempMute

Client.on("messageCreate", message => {
    if(message.member.permissions.has("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Veuillez mentionner un membre!");
            }
            else {
                let args = message.content.split(" ");

                
                mention.roles.add('887088762679603281');
                setTimeout(function(){
                    mention.roles.remove('887088762679603281');
                    const embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle("**Attention!**")
                    .setFooter(`Tu peux de nouveau parler, mais fais attention à respecter les règles maintenant !`)
                    .setDescription(mention.displayName + ` a été unmute du serveur!`)

        message.channel.send({ embeds : [embed]});
                }, args[2] * 1000);
            }
        }
    }
});

//Clear

Client.on("messageCreate", message => {
    if(message.member.permissions.has("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "clear")){
            let nb = message.content.split(" ");
            
            if(nb[1] == undefined){
                message.reply('Nombre de message non défini.');
            }
            else {
                let number = parseInt(nb[1]);

                if(isNaN(number)){
                    message.reply('Nombre de message non défini.');
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log('Suppression de ' + messages.size + "messages réussi !");
                    }).catch(err => {
                        console.log('Erreur de clear :' +err);
                    });
                }
            }
        }
    }
});













Client.login(process.env.BOT_TOKEN);