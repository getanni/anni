// star-board.js - sets the starboard channel

module.exports = {
  name: "board",
  auth: true,
  args: 1,
  gate: 4,

  help: {
    head: "~/board [#channel]",
    desc: [
      "Sets the channel for starboard.",
      "You can pass `off` to disable.", "",
      "{{ ~/board #general-chat }}"
    ]
  },

  lang: {
    off: "Disabled the starboard in **{guild.name}**",
    chan: "Sorry, couldn't find the channel `{opts}` in {guild.name}",
    done: "Set your starboard in **{guild.name}** to <#{channel}>"
  },

  fire: async function (Anni, Msg) {
    let disable = Anni.Str.isN(Msg.args[0])
    let channel = Anni.Bot.Channel(Msg, Msg.args[0], Msg.auth.id)
    if (!disable && !channel) return Anni.Reply(Msg, this.lang.chan).clean()
    else if (channel) channel = channel.id

    let message = disable ? this.lang.off : this.lang.done
    let configs = await Anni.$Configs.get(Msg.auth.id)
    
    configs.board = disable ? '' : channel
    await Anni.$Configs.set(configs)
    
    return Anni.Reply(Msg, message, { channel }).clean()
  }
}