// star-count.js - sets the starboard reaction threshold

module.exports = {
  name: "count",
  also: [ "amount" ],
  auth: true,
  args: 1,
  gate: 4,

  help: {
    head: "~/amount [num]",
    desc: [
      "Sets the number of reactions to post to the starboard.", "",
      "{{ ~/amount 6 }}"
    ]
  },

  lang: {
    num: "Amount must be a number.",
    done: "Set starboard amount to `{opts}` in **{guild.name}**."
  },

  fire: async function (Anni, Msg) {
    // make sure it's actually a number
    let count = parseInt(Msg.args[0])
    if (!count) return Anni.Reply(Msg, this.lang.num).clean()

    let configs = await Anni.$Configs.get(Msg.auth.id)
    configs.count = count

    await Anni.$Configs.set(configs)
    return Anni.Reply(Msg, this.lang.done).clean()
  }
}