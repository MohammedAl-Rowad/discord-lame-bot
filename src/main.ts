import { config } from 'dotenv';
import { Client, Emoji, Intents } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { COMMANDS } from './commands';
import axios from 'axios';

config();

const { BOT_TOKEN, CLIENT_ID, SERVER_ID } = process.env;

const commands = [
  new SlashCommandBuilder().setName(COMMANDS.PING).setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName(COMMANDS.SERVER).setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName(COMMANDS.USER).setDescription('Replies with user info!'),
  new SlashCommandBuilder().setName(COMMANDS.KANYE).setDescription('Replies with a kanye quote'),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN as string);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID as string, SERVER_ID as string), {
    body: commands,
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});

// const switchMap = (command: keyof typeof COMMANDS) => {}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === COMMANDS.PING) {
    await interaction.reply('Pong!');
  } else if (commandName === COMMANDS.SERVER) {
    await interaction.reply(
      `Server name: ${interaction?.guild?.name}\nTotal members: ${interaction?.guild?.memberCount}`
    );
  } else if (commandName === COMMANDS.USER) {
    await interaction.reply('No');
  } else if (commandName === COMMANDS.KANYE) {
    const data = await axios.get('https://api.kanye.rest/').then(({ data }) => data);
    await interaction.reply(data.quote);
  }
});

client.login(BOT_TOKEN);
