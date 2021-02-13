// bot-suffix.js - sets the guild suffix

module.exports = {
  name: "suffix",
  auth: true,
  args: 1,
  gate: 4,

  help: {
    head: "~/suffix [suffix]",
    desc: [
      "Sets a command suffix for your server. This is separate and novel from the command prefix. Pass `off` to disable.",
      "This is off by default.", "",
      "{{ ~/suffix .exe }}",
      "{{ ~/suffix .cmd }}",
      "*Note: suffix cannot contain spaces.*"
    ]
  },

  lang: { done: "Successfully set the suffix for **{guild.name}** to `{suffix}`." },

  fire: async function (Anni, Msg) {
    // update local suffix cache
    let disable = Anni.Str.isN(Msg.args[0])
    let suffix  = disable ? '' : Msg.args[0]
    let configs = await Anni.$Configs.get(Msg.auth.id)

    configs.suffix = suffix
    await Anni.$Configs.set(configs)
    Anni.Cache.config(Msg.auth.id, true)

    return Anni.Reply(Msg, this.lang.done, { suffix }).clean()
  }
}