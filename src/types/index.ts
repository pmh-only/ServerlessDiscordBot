/* eslint-disable no-unused-vars */
declare global {
  const DISCORD_PUBLIC_KEY: string
  const DISCORD_BOT_TOKEN: string
}

export interface InteractionStructure {
  type: number
  token: string
  data: {
    name: string
  }
}
