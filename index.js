import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const autoMessages = [
  "Rawr", "gRawr", "!daily", "dynos", "need win", "blackjack so hard",
  "lose streak", "lmao", "lol i lost", "!arena", "let's fight", "revenge time!", 
  "bring it on!", "GG wp", "I smell victory", "back to back wins!"
];

// Ambil semua bot berdasarkan urutan TOKEN_x
const bots = [];

for (let i = 1; i <= 10; i++) {
  const token = process.env[`TOKEN_${i}`];
  const channelRaw = process.env[`CHANNELS_${i}`]; // format: channelId:interval

  if (!token || !channelRaw) continue;

  const [channelId, interval] = channelRaw.split(':');
  bots.push({ token, channelId, interval: parseInt(interval) });
}

bots.forEach(({ token, channelId, interval }, idx) => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  client.once('ready', () => {
    console.log(`✅ Bot ${idx + 1} logged in as ${client.user.tag}`);

    const sendRandomMessage = async () => {
      try {
        const channel = await client.channels.fetch(channelId);
        const message = autoMessages[Math.floor(Math.random() * autoMessages.length)];
        await channel.send(message);
      } catch (err) {
        console.error(`❌ Error Bot ${idx + 1}:`, err.message);
      }
    };

    // Mulai interval kirim pesan
    setInterval(sendRandomMessage, interval);
  });

  client.login(token);
});
