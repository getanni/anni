// star-emoji.js - sets the starboard emoji

module.exports = {
  name: "emoji",
  auth: true,
  args: 1,
  gate: 4,

  help: {
    head: "~/emoji [emoji]",
    desc: [
      "Sets the emoji reaction for starboard.", "",
      "{{ ~/emoji :star: }}"
    ]
  },

  lang: {
    emoji: "Couldn't figure that emoji out, sorry.",
    done: "Set the starboard emoji to `{opts}` in **{guild.name}**"
  },

  fire: async function (Anni, Msg) {
    let emoji = Msg.args[0]
    if (emoji.length != 1) emoji = Anni.Str.strip(emoji)
    if (!emoji) return Anni.reply(Msg, this.lang.emoji).clean()

    let configs = await Anni.$Configs.get(Msg.auth.id)
    configs.emoji = emoji

    await Anni.$Configs.set(configs)
    return Anni.Reply(Msg, this.lang.done).clean()
  }
}