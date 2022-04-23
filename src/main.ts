import { config } from 'dotenv'
import { CacheType, Client, CommandInteraction, Intents } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { COMMANDS } from './commands'
import { switchMap } from './switchMap'

config()

const { BOT_TOKEN, CLIENT_ID, SERVER_ID } = process.env

const commands = [
  new SlashCommandBuilder().setName(COMMANDS.PING).setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName(COMMANDS.SERVER).setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName(COMMANDS.USER).setDescription('Replies with user info!'),
  new SlashCommandBuilder().setName(COMMANDS.KANYE).setDescription('Replies with a kanye quote'),
  new SlashCommandBuilder()
    .setName(COMMANDS.ACTIVITY)
    .setDescription('Replies with a lame activity to do'),
  new SlashCommandBuilder()
    .setName(COMMANDS.DAD_JOKE)
    .setDescription('Replies with a lame dad joke'),
  new SlashCommandBuilder()
    .setName(COMMANDS.GEEK_JOKE)
    .setDescription('Replies with a lame geek joke'),
  new SlashCommandBuilder()
    .setName(COMMANDS.TRUMP)
    .setDescription('Replies with a lame trump quote'),
  new SlashCommandBuilder()
    .setName(COMMANDS.ASSHOLE)
    .setDescription('Replies with a gift link')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('The person name to gift the asshole gift')
        .setRequired(true)
    ),
].map((command) => command.toJSON())

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN as string)

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID as string, SERVER_ID as string), {
    body: commands,
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const { commandName } = interaction
  try {
    return await switchMap(interaction)[commandName]()
  } catch (error) {
    console.log(error)
    return interaction.reply(
      'A lame generic BS error message to tell you that something went wrong (ノಠ益ಠ)ノ彡┻━┻, and we really do not care'
    )
  }
})

client.login(BOT_TOKEN)
