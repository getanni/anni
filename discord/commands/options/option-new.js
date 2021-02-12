// option-new.js - creates a new server profile option

module.exports = {
  name: "option-new",
  auth: true,
  hide: true,
  args: 1,
  tags: 1,
  gate: 5,

  help: {
    head: "~/opt.new  [tag] -[label] -[desc]",
    desc: [
      "Sets a custom profile option for your server. Set a tag (required), add a label (required) and then optionally add a description to explain the label. Be sure to check out the [dashboard]({website}/dashboard) for easier option management.",
      "The tag is used for setting the profile option. To use the example below, the set command would be `~/set tag [A Brief Intro]`", "",
      "{{ ~/opt.new tag -Tagline -A Brief Intro }}"
    ]
  },

  lang: {
    create: "Created profile option `{tag}`: **{name}** _{desc}_",
    exists: "Option with the tag `{tag}` already exists.",
    spaces: "Tags cannot contain spaces."
  },

  fire: async function (Anni, Msg) {
    let [ name, desc ] = Msg.tags, tag = Msg.args[0].toLowerCase()
    let guild = Msg.auth.id, user = '@everyone'
    let updates = { tag, name, user, guild, desc: desc || '' }

    // make sure the option doesn't exist
    let options = await Anni.$Options.get(Msg.auth.id, tag)
    if (options) return Anni.Reply(Msg, this.lang.exists, updates)

    await Anni.$Options.new(updates)
    return Anni.Reply(Msg, this.lang.create, updates).clean()
  }
}