// message.js - checks messages for commands

module.exports = async (Anni, Msg) => {
  if (!Anni.ready || Msg.author.bot) return

  let message = Msg.content
  let guildID = Msg.guild ? Msg.guild.id : false
  
  // ignore if paused, delete if in paused channel
  let respond = 'Currently working in that channel, please wait a moment.'
  let stopped = guildID ? Anni.Cache.paused(guildID) : false
  let working = stopped == Msg.channel.id
  if (working) { 
    Msg.delete(); 
    return Anni.Reply(Msg, respond).dm() 
  }

  // check for mention
  let ping1 = `<@${Anni.user.id}>`
  let ping2 = `<@!${Anni.user.id}>`
  let ding1 = message.indexOf(ping1) === 0
  let ding2 = message.indexOf(ping2) === 0
  if (ding1)  message = message.split(ping1).join('').trim()
  if (ding2)  message = message.split(ping2).join('').trim()

  // split trigger from content
  let content = message.split(' ')
  let trigger = content.shift().toLowerCase()

  // get cached config, note any prefixes used 
  let config = await Anni.Cache.config(guildID)
  Msg.prefix = Anni.Commands.prefixed(trigger, config.prefix)
  Msg.suffix = Anni.Commands.suffixed(trigger, config.suffix)
  Msg.employ = Anni.$list(config.employ)

  // if no prefixes/suffixes/mentions - not a command
  if (guildID && !(ding1 || ding2 || Msg.prefix || Msg.suffix)) return
  // if we're in a guild, relate that guild to user for DM commands
  if (guildID) Anni.Cache.server(Msg.author.id, guildID)

  // if we do have prefixes, remove them from the trigger
  if (Msg.prefix) trigger = trigger.split(Msg.prefix).join('')
  if (Msg.suffix) trigger = trigger.split(Msg.suffix).join('')

  // get permissions and guild auth
  Msg.perm = Anni.Access.Get(Anni, Msg)
  Msg.auth = Msg.guild || Msg.perm.auth
  Msg.full = content.join(' ')

  // split out any flags (subcommands) (anni.cmd.sub)
  let [ exec, flag ] = Anni.Arr.pair(trigger.split('.'))
  Msg.exec = exec; Msg.flag = flag;

  // convert the message into a list of arguments
  let [ tags, args ] = Anni.Commands.args(Msg.full)
  Msg.tags = tags; Msg.args = args;

  // if command exists, fire it
  let Command = Anni.Commands.Get(Anni, Msg)
  if (Command) return Command.fire(Anni, Msg)

  // if no command, try finding an action
  let Action = await Anni.Actions.Get(Anni, Msg)
  if (Action) return Anni.Reply(Msg, Action).send()
}