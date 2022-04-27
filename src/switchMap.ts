// type Commands = keyof typeof COMMANDS

import { CacheType, CommandInteraction, User } from 'discord.js'
import axios from 'axios'
import { COMMANDS } from './commands'
import { convertIdToMention, getUserFromMention } from './helpers'

type SwitchMap = (interaction: CommandInteraction<CacheType>) => {
  [s: string]: () => Promise<void | any>
}

export const switchMap: SwitchMap = (interaction: CommandInteraction<CacheType>) => ({
  [COMMANDS.PING]: () => interaction.reply('Pong!'),
  [COMMANDS.SERVER]: () =>
    interaction.reply(
      `Server name: ${interaction?.guild?.name}\nTotal members: ${interaction?.guild?.memberCount}`
    ),
  [COMMANDS.USER]: () => interaction.reply('No'),
  [COMMANDS.KANYE]: async () => {
    const data = await axios.get('https://api.kanye.rest/').then(({ data }) => data)
    return interaction.reply(data.quote)
  },
  [COMMANDS.ACTIVITY]: async () => {
    const data = await axios.get('https://www.boredapi.com/api/activity/').then(({ data }) => data)
    return interaction.reply(data.activity)
  },
  [COMMANDS.DAD_JOKE]: async () => {
    const data = await axios
      .get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } })
      .then(({ data }) => data)
    return interaction.reply(data.joke)
  },
  [COMMANDS.GEEK_JOKE]: async () => {
    const data = await axios
      .get('https://geek-jokes.sameerkumar.website/api?format=json')
      .then(({ data }) => data)
    return interaction.reply(data.joke)
  },
  [COMMANDS.TRUMP]: async () => {
    const data = await axios.get('https://api.tronalddump.io/random/quote').then(({ data }) => data)
    return interaction.reply(data.value)
  },
  [COMMANDS.ASSHOLE]: async () => {
    const name = interaction.options.get('name')?.value

    const author = interaction.member?.user
    const authorMention = convertIdToMention(author?.id as string)

    return interaction.reply(
      `Hey ${name} see this link from ${authorMention} 💖 https://foaas.com/asshole/${author?.username}`
    )
  },
  [COMMANDS.WHY_ASSHOLE]: async () => {
    const name = interaction.options.get('name')?.value

    const author = interaction.member?.user
    const authorMention = convertIdToMention(author?.id as string)

    return interaction.reply(
      `Hey ${name} ${authorMention} wants to answer your very important question checkout this link => https://foaas.com/because/${author?.username}`
    )
  },
  [COMMANDS.THANKS]: async () => {
    const name = interaction.options.get('name')?.value

    const author = interaction.member?.user
    const authorMention = convertIdToMention(author?.id as string)

    return interaction.reply(
      `Hey ${name}, ${authorMention} wants to thank you 😌!, please see this link => https://foaas.com/thanks/${author?.username}`
    )
  },
  [COMMANDS.RANDOM_BS]: async () => {
    const randomBsLinks = ['http://www.gtfoparrot.com/']
    const item = randomBsLinks[Math.floor(Math.random() * randomBsLinks.length)]

    return interaction.reply(`Hey checkout this ${item}`)
  },
  [COMMANDS.FIGLET]: async () => {
    const randomfiglets = [
      `╭∩╮( ͡⚆ ͜ʖ ͡⚆)╭∩╮`,
      `╭∩╮（︶_︶）╭∩╮`,
      `╭∩╮(꘠◞ ꘠)╭∩╮`,
      `(◉ ³◉)╭∩╮`,
      `╭∩╮(・Ѡ・)╭∩╮`,
      `(👁️Д👁️)╭∩╮`,
      `(ತ:ತ)╭∩╮`,
    ]
    const item = randomfiglets[Math.floor(Math.random() * randomfiglets.length)]

    return interaction.reply(`${item}`)
  },
  [COMMANDS.FACT]: async () => {
    const randomEndpoints = [
      'https://some-random-api.ml/facts/dog',
      'https://some-random-api.ml/facts/cat',
      'https://some-random-api.ml/facts/panda',
      'https://some-random-api.ml/facts/fox',
      'https://some-random-api.ml/facts/bird',
      'https://some-random-api.ml/facts/koala',
    ]
    const endpoint = randomEndpoints[Math.floor(Math.random() * randomEndpoints.length)]
    const data = await axios.get(endpoint).then(({ data }) => data)

    return interaction.reply(data.fact)
  },
})
