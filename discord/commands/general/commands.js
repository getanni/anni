// commands.js - lists available commands

module.exports = {
  name: "commands",
  also: [ "cmds" ],
  gate: 0,

  help: {
    head: "~/commands",
    desc: "Lists the commands you have access to."
  },

  post: {
    head: "Anni Command ({perm})",
    desc: [ 
      "Below is a list of all the commands you have access to.",
      "Commands marked with (*) are only available in a server."
    ],
    grid: []
  },

  lang: {
    footer: "Use `~/help command` for more info.",
    prefix: "**{guild.name} Prefix:** `{prefix}`",
    authed: "Use `dm` in a server to access commands from that server."
  },

  fire: async function (Anni, Msg) {
    let post = Anni.$Copy(this.post)
    let cats = {}, perm = Msg.perm.name

    // sort commands by categories
    let list = Anni.Commands.all(Msg)
    let cmds = Anni.Arr.sort(list)
    for (let cmd of cmds) {
      cats[cmd.access] = cats[cmd.access] || ''
      cats[cmd.access] += `${cmd.name}${cmd.nodm ? '*' : ''}\n`
    }

    for (let name in cats) {
      post.grid.push({ name, text: cats[name], col: 1 })
    }

    let prefix = Msg.prefix
    let footer = this.lang.footer
    if (prefix)    footer += `\n${this.lang.prefix}`
    if (!Msg.auth) footer += `\n${this.lang.authed}`

    post.grid.push({ text: footer })

    return Anni.Reply(Msg, post, { perm, prefix }).dm(true)
  },

  test: async function (Anni, Msg, Test) {
    await Test.Run(Anni, Msg, this.name)

    Msg.perm.level = 1
    await Test.Run(Anni, Msg, this.name)

    Msg.perm.level = 3
    await Test.Run(Anni, Msg, this.name)

    Msg.perm.level = 5
    await Test.Run(Anni, Msg, this.name)

    await Test.Was('Variable Command Lists.')

    return true
  }
}