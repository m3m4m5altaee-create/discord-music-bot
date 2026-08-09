require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { DisTube } = require('@hunghg255/distube');

const PREFIX = process.env.PREFIX || '!';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
});

const fs = require('fs');
const path = require('path');
client.commands = new Map();
const commandFiles = fs
  .readdirSync(path.join(__dirname, 'commands'))
  .filter((f) => f.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, 'commands', file));
  for (const name of command.names) {
    client.commands.set(name, command);
  }
}

client.once('ready', () => {
  console.log(`✅ البوت شغال باسم: ${client.user.tag}`);
  client.user.setActivity(`${PREFIX}ش | موسيقى`, { type: 2 });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift();
  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (err) {
    console.error(err);
    message.channel.send('❌ صار خطأ وأنا منفذ الأمر.');
  }
});

client.distube
  .on('playSong', (queue, song) => {
    queue.textChannel?.send(`🎶 تشغيل الآن: **${song.name}** | \`${song.formattedDuration}\``);
  })
  .on('addSong', (queue, song) => {
    queue.textChannel?.send(`➕ تمت الإضافة للقائمة: **${song.name}**`);
  })
  .on('error', (channel, e) => {
    console.error(e);
    channel?.send('❌ صار خطأ بالتشغيل، جرب مرة ثانية.');
  })
  .on('empty', (queue) => {
    queue.textChannel?.send('👋 الروم فاضي، طالع منه.');
  })
  .on('finish', (queue) => {
    queue.textChannel?.send('✅ خلصت القائمة.');
  });

client.login(process.env.DISCORD_TOKEN);
