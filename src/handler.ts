/* global Request, Response */

import { verifySignature } from './utils/crypto'
import { sendJSON } from './utils/io'

export async function handleRequest (request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const [isVerified, body] = await verifySignature(request)

  if (!isVerified) {
    return new Response('invalid request signature', { status: 401 })
  }

  if (body.type === 1) return sendJSON({ type: 1 })
  if (body.type === 2) {
    if (body.data.name === 'ping') {
      return sendJSON({ type: 4, data: { content: 'pong!' } })
    }
  }

  return new Response('invalid request type', { status: 400 })
}
