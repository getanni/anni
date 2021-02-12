// option-rem.js - removes a server profile option

module.exports = {
  name: "option-rem",
  auth: true,
  hide: true,
  args: 1,
  gate: 5,

  help: {
    head: "~/opt.rem [tag]",
    desc: [
      "Removes option with tag `tag`.",
      "Get tags by listing options with `~/opts`", "",
      "**WARNING**",
      "Removing an option will also remove all user profile data associated with that option.", "",
      "{{ ~/opt.rem tag }}"
    ]
  },

  lang: {
    none: "Sorry, couldn't find option with tag `{tag}`.",
    done: "Removed profile option `{tag}`."
  },

  fire: async function (Anni, Msg) {
    let tag = Msg.args[0].toLowerCase()
    
    // attempt to remove the option, report on status
    let options = await Anni.$Options.get(Msg.auth.id, tag)
    if (!options) return Anni.Reply(Msg, this.lang.none, { tag }).clean()

    await Anni.$Options.del(Msg.auth.id, options)
    return Anni.Reply(Msg, this.lang.done, { tag }).clean()
  }
}