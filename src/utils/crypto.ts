/* global Request, DISCORD_PUBLIC_KEY */

import nacl from 'tweetnacl'
import { InteractionStructure } from '../types'

export async function verifySignature (request: Request): Promise<[boolean, InteractionStructure]> {
  const signature = request.headers.get('X-Signature-Ed25519')!
  const timestamp = request.headers.get('X-Signature-Timestamp')!

  const timestampData = new TextEncoder().encode(timestamp)
  const bodyData = new Uint8Array(await request.arrayBuffer())
  const messageData = new Uint8Array(timestampData.length + bodyData.length)

  messageData.set(timestampData)
  messageData.set(bodyData, timestampData.length)

  const signatureData =
    new Uint8Array(signature.match(/.{1,2}/g)!
      .map((byte) => parseInt(byte, 16)))

  const publicKeyData =
    new Uint8Array(DISCORD_PUBLIC_KEY.match(/.{1,2}/g)!
      .map((byte) => parseInt(byte, 16)))

  const isVerified = nacl.sign.detached.verify(messageData, signatureData, publicKeyData)
  const body = JSON.parse(new TextDecoder('utf-8').decode(bodyData))

  return [isVerified, body]
}
