// help.js - for information/help about anni

module.exports = {
  name: 'help',
  also: ['invite', 'support'],
  gate: 0,

  help: {
    head: "~/help (command)",
    desc: [
      "Without `command`, returns general help.",
      "Otherwise, returns the help text for `command`.", "",
      "{{ ~/help }}",
      "{{ ~/help help }}"
    ]
  },

  post: {
    head: "Anni Help - v{ver}",
    desc: [ 
      "Hello, I'm **Anni** - a profile bot! I track birthdays and timezones, combined starboard stats, and per-server profile fields! [Check out my website for all of my features!]({website})"
    ],
    grid: [
      { text: "**Quick Overview**" },
      { name: "~/setup", text: "Configure your server.", col: 1 },
      { name: "~/commands", text: "Available commands." , col: 1 },
      { name: "~/help command", text: "Helps with **command**.", col: 1 },
      { name: "~/me", text: "View your short profile.", col: 1 },
      { name: "~/profile", text: "View your guild profile.", col: 1 },
      { name: "~/p setup", text: "Update your profile.", col: 1 },
      { name: "~/birthdays", text: "All {guild.name} birthdays.", col: 1 },
      { name: "~/times", text: "All {guild.name} times.", col: 1 },
      { name: "~/actions", text: "All {guild.name} actions.", col: 1 },
      { text: "`dm` - Use this command in a server to associate DM commands with that server. Use in a DM to check which server you're commanding." },
      { text: "**For More:** [Invite Link]({invite}) - [Website Help]({website}) - [Support Server]({server})" }
    ]
  },

  lang: { "setup": "Use ~/setup to configure your server." },

  fire: async function (Anni, Msg) {
    let base = Anni.$Copy(this.post)
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