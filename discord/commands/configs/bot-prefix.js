// bot-prefix.js - sets the guild prefix

module.exports = {
  name: "prefix",
  auth: true,
  args: 1,
  gate: 4,

  help: {
    head: "~/prefix [prefix]",
    desc: [
      "Sets the command prefix for your server.",
      "This is `anni.` by default.", "",
      "{{ ~/prefix ! }}",
      "{{ ~/prefix ? }}",
      "*Note: prefix cannot contain spaces.*"
    ]
  },

  lang: { done: "Successfully set the prefix for **{guild.name}** to `{prefix}`." },

  fire: async function (Anni, Msg) {
    let prefix  = Msg.args[0]
    let configs = await Anni.$Configs.get(Msg.auth.id)

    configs.prefix = prefix
    await Anni.$Configs.set(configs)
    Anni.Cache.config(Msg.auth.id, configs)

    return Anni.Reply(Msg, this.lang.done, { prefix }).clean()
  }
}