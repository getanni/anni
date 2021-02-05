// logs.js - prints last logs

module.exports = {
  name: 'logs',
  gate: 9,
  hide: true,

  help: {
    head: "~/logs",
    desc: [ "Prints most recent logs." ]
  },

  fire: async function (Anni, Msg) {
    let logs = await Anni.Logs()
    return Anni.Reply(Msg, `{{ ${logs} }}`).clean()
  }
}