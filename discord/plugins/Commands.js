// commands.js - the command handler

module.exports = Anni => {
  Anni.Commands = {
    Get: function (Anni, Msg, name) {
      let trigger = name || Msg.exec.split('.')[0]
      let Command = this.find(trigger)
      let allowed = this.can(Msg, Command)
      if (allowed)  return Command
      else return false
    },
    Sub: function (Anni, Msg, parent) {
      if (!Msg.flag && !Msg.args.length) return false
      let argcopy = [ ...Msg.args ]
      let trigger = Msg.flag || argcopy.shift().toLowerCase()
      let Command = this.find(`${parent}-${trigger}`)
      let allowed = this.can(Msg, Command)
      if (Command && !allowed) return { error: true }
      if (Command && !Msg.flag) Msg.args.shift()
      return Command
    },

    log: function (Msg) {
      let name = Msg.guild ? Msg.guild.name : 'DM' 
      let exec = Msg.flag ? `${Msg.exec}.${Msg.flag}` : Msg.exec
      if (Msg.auth) name += `:${Msg.auth.name}`
      let send = Msg.tests ? Anni.LogTests : Anni.Log
      return send(`<${name}> ${exec} ${Msg.err || Msg.full}`)
    },

    find: function (trigger) {
      let alias = Anni.Aliased[trigger]
      return Anni.Command[trigger] || Anni.Command[alias]
    },

    all: function (Msg) {
      let list = []; for (let name in Anni.Command) {
        let Command = Anni.Command[name]
        let allowed = Command.gate <= Msg.perm.level
        let visible = allowed && !Command.hide
        let  access = Anni.Access.badge(Command.gate).name
        if (visible)  list.push({ ...Command, access })
      } return list;
    },
    can: function (Msg, Command) {
      if (!Msg || !Command) return false

      let tags = `[Err: Tags: ${Msg.tags.length}/${Command.tags || 0}]`
      let args = `[Err: Args: ${Msg.args.length}/${Command.args || 0}]`
      let gate = `[Err: Gate: ${Msg.perm.level}/${Command.gate}]`

      if (Command.auth && !Msg.auth)             Msg.err = 'auth'
      if (Command.nodm && !Msg.guild)            Msg.err = 'dm'
      if (Command.gate > Msg.perm.level)         Msg.err = gate
      if ((Command.tags || 0) > Msg.tags.length) Msg.err = tags
      if ((Command.args || 0) > Msg.args.length) Msg.err = args

      if (Msg.err) {
        let message = this.$lang[Msg.err], has = !!message
        if (has) { Msg.err = message; Anni.Reply(Msg, message).dm() }
        if ([ tags, args ].includes(Msg.err)) this.help(Msg, Command)
      } else {
        // notify of guild auth in DMs
        let isSub = Command.name.indexOf('-') > 0
        let inDMs = Command.auth && Msg.auth && !Msg.guild
        if (inDMs && !isSub) Anni.Reply(Msg, this.$lang.where).dm()
      }
      // Log the command
      this.log(Msg)
      return !Msg.err
    },

    args: function (str) {
      let tags = str.split('-').map(s => s.trim())
      let args = tags.shift().split(' ').filter(Boolean)
      return [ tags, args ]
    },

    help: function (Msg, Command) {
      let help = { ...Command.help }, level = Msg.perm.level
      if (help.user && level > 0) help = { ...help.user }
      if (help.mods && level > 2) help = { ...help.mods }
      if (help.conf && level > 4) help = { ...help.conf }
      if (Command.also) {
        let alias = "`~/" + [ ...Command.also ].join('` , `~/') + "`"
        help.grid = [{ text: `*Also Works:* ${alias}` }]
      }
      return Anni.Reply(Msg, help).dm()
    },
    clear: function (Msg, force) {
      if (!Msg.guild) return
      let can = Anni.Bot.Can.Clean(Msg) && (!Msg.tests || force)
      return can ? Msg.delete() : false
    },
    prefixed: function (str, prefix) {
      if (!prefix || str.length < prefix.length) return ''
      
      str = str.toLowerCase() 
      prefix = prefix.toLowerCase()

      let prefixed = str.indexOf(prefix) === 0
      return prefixed ? prefix : ''
    },
    suffixed: function (str, suffix) {
      if (!suffix || str.length < suffix.length) return ''
      let location = str.length - suffix.length
      let suffixed = str.indexOf(suffix) === location
      return suffixed ? suffix : ''
    },

    Test: async function (Anni, Msg, cmd, str = '') {
      let [ tags, args ] = this.args(str)
      let [ exec, flag ] = Anni.Arr.pair(cmd.split('.'))
      Msg.exec = exec; Msg.flag = flag;
      Msg.tags = tags; Msg.args = args;
      Msg.full = str; Msg.content = str;
      Msg.perm = Anni.Access.forge(Msg.perm.level, Msg.auth)

      let desc = `{{ Fired: ${exec} {msg} }}`

      let Command = this.Get(Anni, Msg)
      if (Command) Anni.Reply(Msg, { desc }).send()
      if (Command) return Command.fire(Anni, Msg)

      let Action = await Anni.Actions.Get(Anni, Msg)
      if (Action) Anni.Reply(Msg, { desc }).send()
      if (Action) return Anni.Reply(Msg, Action).send()
    },

    $lang: {
      dm:    "Sorry this command won't work in DMs.",
      auth:  "You need to run `anni.dm` in a server first.",
      where: "*Command via {guild.name}*"
    }
  }
}