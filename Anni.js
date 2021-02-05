/*************************************/
/**   Anni | The Profile Bot        **/
/**---------------------------------**/
/**   Track birthdays, timezones,   **/
/**   and custom server profiles.   **/
/**---------------------------------**/
/*************************************/

const Discord = require('discord.js')
const intents = new Discord.Intents([ 
  Discord.Intents.NON_PRIVILEGED, 'GUILD_MEMBERS'
])

const Anni = new Discord.Client({ ws: { intents } })
const Load = require('./Loader.js')

Anni.Wait  = require('util').promisify(setTimeout)
Anni.Exec  = require('child_process').exec

Anni.Command = {}; Anni.Aliased = {}

const initAnni = async () => {

  await Load.Utility(Anni)

  let events  = await Load.Scripts('./discord/events')
  let plugins = await Load.Scripts('./discord/plugins')
  let command = await Load.Scripts('./discord/commands')

  for (let file of plugins) file.load(Anni)

  for (let file of events) {
    Anni.on(file.name, file.load.bind(null, Anni))
  }
  
  for (let file of command) {
    let fire = file.load, name = fire.name

    Anni.Command[name] = fire
    if (fire.also) for (let a of fire.also) Anni.Aliased[a] = fire.name
  }

  process.on('uncaughtException',  err => Anni.Error(err, 'Exception'))
  process.on('unhandledRejection', err => Anni.Error(err, 'Rejection'))

  Anni.State(`Logging into Discord ...`)
  Anni.login(Anni.bot.token)
}

initAnni()