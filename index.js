const { Client, version } = require('discord.js');
const client = new Client();
const config = require('./config.json');
const { MessageEmbed } = require('discord.js');
const prefix = config.prefix
const token = config.token

client.on('ready', () => {
	function randomStatus() {
   let targetguild0 = client.guilds.cache.get("757130479660171334") // server id member
   let status = ["NetBee Manager", `${targetguild0.memberCount} Members`, "'₢ãvalιer Pâradôx#6061", `!help | ping: ${client.ws.ping}ms`, {"url":"https://www.twitch.tv/cavalier_paradox","name":"N E T B E E", type: "STREAMING"}]
   let rstatus = Math.floor(Math.random() * status.length);
   client.user.setActivity(status[rstatus], {type: "LISTENING"});
  }; setInterval(randomStatus, 3000)
    console.log(`${client.user.username} ✅`)
});

client.on("message", msg => {
    let user = msg.mentions.users.first()
    if(!user) user = msg.author;
    if(msg.content.startsWith(`${prefix}avatar`)){
        const embed = new MessageEmbed()
        .setAuthor(`${user.tag}`)
        .setURL(`${user.displayAvatarURL({ format: "png", dynamic: true })}`)
        .setTitle('Avatar Link', user.displayAvatarURL({ dynamic : true}))
        .setImage(user.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
        msg.reply(embed)
    }
});

client.on("message", message => {
    let member = message.mentions.members.first() || message.member;
    if(message.content.startsWith(`${prefix}user`)){
      message.channel.send(
          new MessageEmbed()
          .setColor("RANDOM")
          .setTitle('User Informantion')
          .addField('User tag',  member.user.tag)
          .addField('Nickname', member.nickname || 'None', true)
          .addField('Joined Server', new Date(member.joinedTimestamp).toLocaleDateString(), true)
          .addField('Joined Discord', new Date(member.user.createdTimestamp).toLocaleDateString(), true)
          .addField('Current Server', message.guild.name, true)
          .addField('Role Count', member.roles.cache.size - 1, true)
          .addField('ID', member.user.id, true)
          .setTimestamp()
          .setThumbnail(member.user.displayAvatarURL())
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
          .setImage('https://cdn.discordapp.com/attachments/803942006060613695/804971407472984064/image0.gif')
      )
    }
});

client.on("message", message => {
    if(message.content === `${prefix}server`) {
      message.channel.send(
        new MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Server Informantion')
        .setThumbnail(message.guild.iconURL())
        .addField('Server Name', message.guild.name, true)
        .addField('Server Owner', message.guild.owner, true)
        .addField('Members', message.guild.memberCount, true)
        .addField('Region', message.guild.region, true)
        .addField('AFK Timeout', message.guild.afkTimeout / 60, true)
        .setImage('https://cdn.discordapp.com/attachments/803942006060613695/804971407472984064/image0.gif')
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    )
    }
})

client.on('message', message => {
    if(message.content === `${prefix}help`) {
    const member = message.member;
        message.channel.send(
      new MessageEmbed()
      .setColor("RANDOM")
      .setTitle('Help Menu')
      .setDescription(`Hello ${member.user}
Welcome to Bot The bot commands are described below
${message.guild.name} Server
      `)
      .setAuthor(`${client.user.tag}`, message.guild.iconURL())
      .setThumbnail(member.user.displayAvatarURL({ dynamic : true }))
      .addField('Prefix', `${prefix}`)
      .addField('Receive your chat level', `${prefix}rank`)
      .addField('Get count of alive voice users', `${prefix}vc`)
      .addField('Get information about this server', `${prefix}server`)
      .addField('Get an individual avatar', `${prefix}avatar`)
      .addField('Receive individual account informantion', `${prefix}user`)
      .setImage('https://cdn.discordapp.com/attachments/803942006060613695/804971407472984064/image0.gif')
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
   )
    }
})

client.on('ready', async () => {
    const chid = "801399761395122226" // server voice channel
    const ch = client.channels.cache.get(chid)
    const connection = await ch.join();
    connection.voice.setSelfMute(false);
    connection.voice.setSelfDeaf(true)
})
  
client.on('message', message => {
      if(message.content === `${prefix}ping`) {
        const msg =  message.channel.send(`🏓 Pinging...`)
      message.channel.send(
        new MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`ping: **${client.ws.ping}ms**`)
      )
    }
  
})
client.on("message", message => {
  
    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
      let count = 0;
  
      for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  
      if (message.content === `${prefix}vc`) {
      const vc_alive = new MessageEmbed()
         .setColor('RANDOM')
         .setThumbnail(message.guild.iconURL())
         .setTitle('Alive Voice')
         .addFields(
          { name: 'Count Of Users In Voice :', value: `${count}` },
         )
         .setTimestamp()
         .setFooter(`Requested by ${message.author.username}`);
         message.channel.send(vc_alive);
    }
})

client.on('message', async message => {
	// Voice only works in guilds, if the message does not come from a guild,
	// we ignore it
	if (!message.guild) return;
  
	if (message.content === `${prefix}join`) {
	  // Only try to join the sender's voice channel if they are in one themselves
	  if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    message.reply('Joined voice channel!');
	  } else {
		message.reply('You need to join a voice channel first!');
	  }
	}
})

client.on("message", message => {
    if(message.content === `${prefix}randomavatar`) {
      const user = client.users.cache.random();
      message.channel.send(
        new MessageEmbed()
        .setTitle("Random-Avatar")
        .setColor("RANDOM")
        .setFooter(`${user.tag}'s avatar!`)
        .setImage(user.displayAvatarURL())
    )
    }
})

client.on('message', message => {
	if(message.content === `${prefix}member`) {
        let targetguild0 = client.guilds.cache.get("757130479660171334") // sever id
    message.channel.send(
      new MessageEmbed()
	   .setColor('RANDOM')
	   .setThumbnail(message.guild.iconURL())
	   .setTitle('Alive Member')
       .addFields(
        { name: 'Const of member servers :', value: `${targetguild0.memberCount} Members` },
       )
       .setTimestamp()
       .setFooter(`Requested by ${message.author.username}`)
    )
  }
})

client.on("message", msg => {
    let args = msg.content.substring().split(" ");
    switch(args[0]){
        case '!ban':

        const { member, mentions } = msg;

        const mencion = `<@${member.id}>`;

        if(member.hasPermission("BAN_MEMBERS")){
            const usuario = mentions.users.first()
            if (usuario) {
                const usuariobaneado = msg.guild.members.cache.get(usuario.id)
                usuariobaneado.ban()
                msg.channel.send(`💯${usuario.username} was baned from the server!`)
            } else {
                msg.channel.send(`${mencion} Please specify a member to ban!`)
            }
        } else {
            msg.channel.send(`${mencion} I do not have permission!`)
        }
    }
})

client.on("message", msg => {
    let args = msg.content.substring().split(" ");
    switch(args[0]){
        case '!kick':

        const { member, mentions } = msg;

        const mencion = `<@${member.id}>`;

        if(member.hasPermission("KICK_MEMBERS")){
            const usuario = mentions.users.first()
            if (usuario) {
                const usuariobaneado = msg.guild.members.cache.get(usuario.id)
                usuariobaneado.kick()
                msg.channel.send(`💯${usuario.username} was kicked from the server!`)
            } else {
                msg.channel.send(`${mencion}Please specify a member to kick!`)
            }
        } else {
            msg.channel.send(`${mencion} I do not have permission!`)
        }
    }
})

client.login(token)
