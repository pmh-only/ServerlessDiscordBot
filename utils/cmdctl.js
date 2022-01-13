#!/bin/node

// cmdctl.js
// Application Command Control

const yargs = require('yargs/yargs')
const fetch = require('node-fetch')
const { hideBin } = require('yargs/helpers')

const BASE_URL = 'https://discord.com/api/v9'

yargs(hideBin(process.argv))
  .command('list', 'List all application commands', {}, (argv) => {
    if (!argv.token) {
      console.error('You must provide a token with --token')
      process.exit(1)
    }

    if (!argv.id) {
      console.error('You must provide a application id with --id')
      process.exit(1)
    }

    fetch(`${BASE_URL}/applications/${argv.id}${argv.guild ? '/guilds/' + argv.guild : ''}/commands`, {
      headers: { Authorization: `Bot ${argv.token}` }
    }).then((res) => res.json())
      .then(console.log)
  })
  .command('create <name> <description> [options]', 'Create application command', (yargs) =>
    yargs
      .positional('name', { describe: 'Command name', type: 'string' })
      .positional('description', { describe: 'Command description', type: 'string' })
      .positional('options', { describe: 'Command options (json)', type: 'string', default: '[]' })
  , (argv) => {
    if (!argv.token) {
      console.error('You must provide a token with --token')
      process.exit(1)
    }

    if (!argv.id) {
      console.error('You must provide a application id with --id')
      process.exit(1)
    }

    fetch(`${BASE_URL}/applications/${argv.id}${argv.guild ? '/guilds/' + argv.guild : ''}/commands`, {
      method: 'POST',
      headers: {
        Authorization: `Bot ${argv.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: argv.name,
        description: argv.description,
        options: JSON.parse(argv.options)
      })
    }).then((res) => res.json())
      .then(console.log)
  })
  .command('update <name> <description> <commandId> [options]', 'Create application command', (yargs) =>
    yargs
      .positional('name', { describe: 'Command name', type: 'string' })
      .positional('description', { describe: 'Command description', type: 'string' })
      .positional('commandId', { describe: 'Command id', type: 'string' })
      .positional('options', { describe: 'Command options (json)', type: 'string', default: '[]' })
  , (argv) => {
    if (!argv.token) {
      console.error('You must provide a token with --token')
      process.exit(1)
    }

    if (!argv.id) {
      console.error('You must provide a application id with --id')
      process.exit(1)
    }

    fetch(`${BASE_URL}/applications/${argv.id}${argv.guild ? '/guilds/' + argv.guild : ''}/commands/${argv.commandId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bot ${argv.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: argv.name,
        description: argv.description,
        options: JSON.parse(argv.options)
      })
    }).then((res) => res.json())
      .then(console.log)
  })
  .command('delete <commandId>', 'Delete application command', (yargs) =>
    yargs
      .positional('commandId', { describe: 'Command id', type: 'string' })
  , (argv) => {
    if (!argv.token) {
      console.error('You must provide a token with --token')
      process.exit(1)
    }

    if (!argv.id) {
      console.error('You must provide a application id with --id')
      process.exit(1)
    }

    fetch(`${BASE_URL}/applications/${argv.id}${argv.guild ? '/guilds/' + argv.guild : ''}/commands/${argv.commandId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bot ${argv.token}`
      }
    }).then((res) => {
      if (res.status === 204) {
        console.log('Command deleted')
        return { then: () => {} }
      }

      return res.json()
    }).then(console.log)
  })
  .option('guild', {
    alias: 'g',
    type: 'string',
    description: 'guild id'
  })
  .option('id', {
    alias: 'i',
    type: 'string',
    requiresArg: true,
    description: 'application id'
  })
  .option('token', {
    alias: 't',
    type: 'string',
    requiresArg: true,
    description: 'application token'
  })
  .parse()
