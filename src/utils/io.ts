/* global Response, DISCORD_BOT_TOKEN */

export function sendJSON (body: any) {
  return new Response(JSON.stringify(body), {
    headers: {
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json'
    }
  })
}
