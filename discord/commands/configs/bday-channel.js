// bday-channel.js - sets the channel for birthday reminders

module.exports = {
  name: "channel",
  auth: true,
  args: 1,
  gate: 4,

  help: {
    head: "~/channel [#channel]",
    desc: [
      "Sets the channel for birthday reminders/announcements.",
      "You can also pass `off` to disable all reminders.", "",
      "{{ ~/channel #general-chat }}"
    ]
  },

  lang: {
    chan: "Couldn't find the channel `{opts}` in **{guild.name}**.",
    done: "Set your birthday channel in **{guild.name}** to <#{channel}>.",
    off: "Disabled the birthday announcements in **{guild.name}**."
  },

  fire: async function (Anni, Msg) {
    let disable = Anni.Str.isN(Msg.args[0])
    let channel = Anni.Bot.Channel(Msg, Msg.args[0], Msg.auth.id)
    if (!disable && !channel) return Anni.Reply(Msg, this.lang.chan).clean()
    else if (channel) channel = channel.id

    let message = disable ? this.lang.off : this.lang.done
    let configs = await Anni.$Configs.get(Msg.auth.id)
    configs.birthday = disable ? '' : channel

    await Anni.$Configs.set(configs)
    return Anni.Reply(Msg, message, { channel }).clean()
  }
}