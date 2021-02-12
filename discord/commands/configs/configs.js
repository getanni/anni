// configs.js - returns the guild configs

module.exports = {
  name: "configs",
  auth: true,
  gate: 5,

  help: {
    head: "~/configs",
    desc: [
      "Returns the configs for the server.", "",
      "{{ ~/configs }}"
    ]
  },

  post: {
    head: "~/configs",
    desc: [
      "Current general configuration for {guild.name}.",
      "Use `~/setup` to change options. Check out the [dashboard]({website}/dash) for an easier setup."
    ]
  },

  fire: async function (Anni, Msg) {
    let configs = await Anni.$Configs.get(Msg.auth.id)

    let reminder = Anni.Escape(configs.reminder || 'None')
    let announce = Anni.Escape(configs.announce || 'None')
    let channel  = configs.channel ? `<#${configs.channel}>` : 'None'

    let emoji = configs.emoji || 'None'
    let count = configs.count || 'None'
    let board = configs.board ? `<#${configs.board}>` : 'None'

    let post = Anni.$Copy(this.post)

    post.grid = [
      { text: '***[ Birthday Settings ]***' },
      { name: '~/channel',  text: channel },
      { name: '~/reminder', text: reminder },
      { name: '~/announce', text: announce },
      { text: '***[ Starboard Settings ]***' },
      { name: '~/count', text: count, col: true },
      { name: '~/emoji', text: emoji, col: true },
      { name: '~/board', text: board, col: true }
    ]

    return Anni.Reply(Msg, post).dm()
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
    await Test.Run(Anni, Msg, 'board', Test.data.channel)
    await Test.Run(Anni, Msg, 'count', '1')
    await Test.Run(Anni, Msg, 'emoji', '⭐')
    await Test.Run(Anni, Msg, 'refresh')

    await Msg.react('⭐')
    await Anni.Wait(1000)

    return true
  }
}