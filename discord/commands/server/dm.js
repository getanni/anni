// dm.js - cache and DM a user

module.exports = {
  name: 'dm',
  gate: 0,

  help: {
    head: "~/dm",
    desc: [
      "Sends you a DM to use commands via the server."
    ]
  },

  lang: {
    curr: "Commands executing via {name}.",
    none: "No server selected. Run `anni.dm` in desired server."
  },

  info: {
    title: "Hello From {guild.name}!",
    description: "Any commands used in this DM will execute via {guild.name}"
  },

  fire: async function (Anni, Msg) {
    if (!Msg.guild) {
      let data = Anni.Cache.server(Msg.author.id)
      let name = data ? data.name : false
      let auth = name ? this.lang.curr : this.lang.none
      return Anni.Reply(Msg, auth, { name }).send()
    } else {
      await Anni.Reply(Msg, this.info).dm()
      Anni.Commands.clear(Msg)
    }
  }
}