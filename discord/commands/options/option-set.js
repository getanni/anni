// option-set.js - edits a server profile option

module.exports = {
  name: "option-set",
  auth: true,
  hide: true,
  args: 1,
  tags: 1,
  gate: 5,

  help: {
    head: "~/opt.set [tag] -[new label] -[new desc]",
    desc: [
      "Edits a profile option for your server. Pass the `tag` you find using `~/opt`, and pass new options. Be sure to check out the [dashboard]({website}/dashboard) for easier option management.",
      "Editing an option will not overwrite user's profile data for that option. This lets you update the label or description without forcing users to update. To replace an option and force an update, `~/option.rem [tag]` first.", "",
      "{{ ~/opt.set tag -Tagline -An Introduction }}",
    ]
  },

  lang: {
    none: "Sorry, couldn't find option with tag `{tag}`. Use `~/opt` to find tags.",
    done: "Edited option `{tag}` to: **{name}** _{desc}_"
  },

  fire: async function (Anni, Msg) {
    let [ name, desc ] = Msg.tags, tag = Msg.args[0].toLowerCase()
    let updates = { tag, name, desc: desc || '', guild: Msg.auth.id }

    let options = await Anni.$Options.get(Msg.auth.id, tag)
    if (!options) return Anni.Reply(Msg, this.lang.none, { tag }).clean()

    await Anni.$Options.set(Msg.auth.id, updates)
    return Anni.Reply(Msg, this.lang.done, updates).clean()
  }
}