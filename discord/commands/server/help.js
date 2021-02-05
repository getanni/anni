// help.js - for information/help about anni

module.exports = {
  name: 'help',
  also: ['invite', 'support'],
  gate: 0,

  help: {
    head: "~/help (command)",
    desc: [
      "Without `command`, returns general help.",
      "Otherwise, returns the help text for `command`.",
      "",
      "{{ ~/help }}",
      "{{ ~/help help }}"
    ]
  },

  info: {
    head: "Anni Help (v{ver})",
    desc: [ 
      "Hello, I'm **Anni!** I'm a profile bot! I track birthdays and timezones, combined starboard stats, and per-server profile fields! [Check out my website for all of my features!]({website})"
    ],
    grid: [
      { text: "**Quick Overview**"  },
      { name: "`~/commands`", text: "Available commands." , col: 1 },
      { name: "`~/help command`", text: "Helps with **command**.", col: 1 },
      { name: "`~/profile`", text: "View your profile.", col: 1 },
      { name: "`~/p setup`", text: "Update your profile.", col: 1 },
      { name: "`~/birthdays`", text: "{guild.name} birthdays.", col: 1 },
      { name: "`~/times`", text: "{guild.name} times.{nl}", col: 1 },
      { name: "For More:", text: "[Invite Link]({invite}) - [Website Help]({website}) - [Support Server]({server})" }
    ]
  },

  lang: { "setup": "Use ~/setup to configure your server." },

  fire: async function (Anni, Msg) {
    let base = Anni.$Copy(this.info)
    if (Msg.perm.level >= 5) base.foot = this.lang.setup
    if (!Msg.args.length) return Anni.Reply(Msg, base).dm()

    // if args, look up that command's help
    // replace - and space with . to find subcommands
    let name = Msg.full.split(' ').join('.').split('-').join('.')
    let _sub = name.indexOf('.') > 0 ? name.split('.')[1] : ''

    let Command = Anni.Commands.Get(Anni, Msg, name)
    if (Command && _sub) name = `${Command.name}-${_sub}`
    if (Command && _sub) Command = Anni.Command.Get(Anni, Msg, name)

    return Command ? Anni.Commands.help(Msg, Command) : false
  },

  test: async function (Anni, Msg, Test) {
    await Test.Run(Anni, Msg, this.name)
    await Test.Run(Anni, Msg, this.name, 'help')
    await Test.Was('General help, command help.')

    return true
  }
}