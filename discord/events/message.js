// message.js - checks messages for commands

module.exports = async (Anni, Msg) => {
  if (!Anni.ready || Msg.author.bot) return

  let message = Msg.content
  let mention = `<@!${Anni.user.id}>`
  let guildID = Msg.guild ? Msg.guild.id : false
  
  // ignore if paused, delete if in paused channel
  let respond = 'Currently working in that channel, please wait a moment.'
  let stopped = guildID ? Anni.Cache.paused(guildID) : false
  let working = stopped == Msg.channel.id
  if (working) { Msg.delete(); Anni.Reply(Msg, respond).dm() }

  // check for mention
  let holler = message.indexOf(mention) === 0
  if (holler)  message = message.split(mention).join('').trim()

  let content = message.split(' ')
  let trigger = content.shift().toLowerCase()

  let prefix = await Anni.Cache.prefix(guildID)
  let suffix = await Anni.Cache.suffix(guildID)
  Msg.prefix = Anni.Commands.prefixed(trigger, prefix)
  Msg.suffix = Anni.Commands.suffixed(trigger, suffix)

  if (guildID && !(holler || Msg.prefix || Msg.suffix)) return
  if (guildID) Anni.Cache.server(Msg.author.id, guildID)

  // if stopped don't allow any commands
  respond = 'Currently busy in this server, please wait a moment.'
  if (stopped) return Anni.Reply(Msg, respond).dm()

  if (Msg.prefix) trigger = trigger.split(prefix).join('')
  if (Msg.suffix) trigger = trigger.split(suffix).join('')

  Msg.perm = Anni.Access.Get(Anni, Msg)
  Msg.auth = Msg.guild || Msg.perm.auth
  Msg.full = content.join(' ')

  let [ exec, flag ] = Anni.Arr.pair(trigger.split('.'))
  Msg.exec = exec; Msg.flag = flag;

  let [ tags, args ] = Anni.Commands.args(Msg.full)
  Msg.tags = tags; Msg.args = args;

  Msg.prefix = Msg.prefix || prefix

  let Command = Anni.Commands.Get(Anni, Msg)
  if (Command) return Command.fire(Anni, Msg)

  let Action = await Anni.Actions.Get(Anni, Msg)
  if (Action) return Anni.Reply(Msg, Action).send()
}