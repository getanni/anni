// dm.js - cache and DM a user

module.exports = {
  name: 'dm',
  gate: 0,
  auth: true,

  help: {
    head: "~/dm",
    desc: [
      "Sends you a DM to use commands via the server."
    ]
  },

  info: {
    title: "Hello From {guild.name}!",
    description: "Any commands used in this DM will execute via {guild.name}"
  },

  fire: async function (Anni, Msg) {
    Anni.Reply(Msg, this.info).dm()
    Anni.Commands.clear(Msg)
  }
}