import { Client, User } from 'discord.js'

export const getUserFromMention = (mention: string, client: Client<boolean>): User | undefined => {
  if (!mention) {
    return
  }

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1)

    if (mention.startsWith('!')) {
      mention = mention.slice(1)
    }

    return client.users.cache.get(mention)
  }
}

export const convertIdToMention = (id: string): string => `<@!${id}>`
