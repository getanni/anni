// setup.js - DMs info on setting up the guild

module.exports = {
  name: 'setup',
  gate: 5,
  auth: true,

  help: {
    head: "~/setup",
    desc: [ "Returns info for setting up the server config." ]
  },

  info: {
    head: "Anni Setup Menu - v{ver}",
    desc: [
      "`~/setup birthdays` - Birthday Announcements & Reminders",
      "`~/setup starboard` - Channel, Reaction Amount, and Emoji",
      "`~/setup profiles ` - Server-Specific User Profile Options", "{_}"
    ],
    grid: [
      {
        name: "Changing Your Server Prefix",
        text: "{{ ~/prefix a! }}{_}"
      }
    ],
    foot: "You can respond to this DM with the above commands."
  },

  fire: async function (Anni, Msg) {
    // fire our subcommand if any, or return for misfire
    let sub = Anni.Commands.Sub(Anni, Msg, this.name)
    if (sub) return sub.fire ? sub.fire(Anni, Msg) : false
      
    return Anni.Reply(Msg, this.info).dm()
  },

  test: async function (Anni, Msg, Test) {
    await Test.Run(Anni, Msg, this.name)
    await Test.Run(Anni, Msg, 'prefix', Test.data.prefix)
    await Test.Run(Anni, Msg, 'suffix', 'off')
    await Test.Run(Anni, Msg, 'suffix', '.exe')
    await Test.Run(Anni, Msg, 'channel', 'off')
    await Test.Run(Anni, Msg, 'channel', Test.data.channel)
    await Test.Run(Anni, Msg, 'reminder', 'off')
    await Test.Run(Anni, Msg, 'reminder', Test.data.reminder)
    await Test.Run(Anni, Msg, 'announce', 'off')
    await Test.Run(Anni, Msg, 'announce', Test.data.announce)
    await Test.Run(Anni, Msg, 'refresh')

    return true
  }
}