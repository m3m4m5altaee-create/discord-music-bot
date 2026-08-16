require('dotenv').config();

const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection
} = require('discord.js');

const { DisTube } = require('distube');
const fs = require('fs');
const path = require('path');

const PREFIX = process.env.PREFIX || '!';

// =========================
// Discord Client
// =========================

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],

    partials: [
        Partials.Channel
    ]
});

// =========================
// DisTube
// =========================

client.distube = new DisTube(client);

// =========================
// Commands
// =========================

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');

if (fs.existsSync(commandsPath)) {
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        try {
            const command = require(path.join(commandsPath, file));

            if (command.names && Array.isArray(command.names)) {
                for (const name of command.names) {
                    client.commands.set(name, command);
                }
            } else if (command.name) {
                client.commands.set(command.name, command);
            }

        } catch (error) {
            console.error(`❌ Failed to load command ${file}:`, error);
        }
    }
}

// =========================
// Bot Ready
// =========================

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log(`🎵 Music bot is online!`);
});

// =========================
// Messages
// =========================

client.on('messageCreate', async (message) => {

    if (message.author.bot) return;

    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content
        .slice(PREFIX.length)
        .trim()
        .split(/ +/);

    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.commands.get(commandName);

    if (!command) return;

    try {

        if (typeof command.execute === 'function') {
            await command.execute(message, args, client);
        }

    } catch (error) {

        console.error(`❌ Error in command ${commandName}:`, error);

        try {
            await message.reply('❌ حدث خطأ أثناء تنفيذ الأمر.');
        } catch {}
    }
});

// =========================
// DisTube Events
// =========================

client.distube
    .on('playSong', (queue, song) => {
        console.log(`🎵 Playing: ${song.name}`);
    })

    .on('addSong', (queue, song) => {
        console.log(`➕ Added: ${song.name}`);
    })

    .on('error', (channel, error) => {
        console.error('❌ DisTube Error:', error);
    });

// =========================
// Login
// =========================

if (!process.env.TOKEN) {
    console.error('❌ TOKEN is missing from environment variables.');
    process.exit(1);
}

client.login(process.env.TOKEN);