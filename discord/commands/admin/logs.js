// logs.js - prints last logs

module.exports = {
  name: 'logs',
  hide: true,
  gate: 9,

  help: {
    head: "~/logs",
    desc: "Prints most recent logs."
  },

  fire: async function (Anni, Msg) {
    let logs = await Anni.Logs()
    return Anni.Reply(Msg, `{{ ${logs} }}`).clean(true)
  }
}