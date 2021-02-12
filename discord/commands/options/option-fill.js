// option-fill.js - sets a user's server profile option

module.exports = {
  name: "option-fill",
  also: [ "set", "fill" ],
  auth: true,
  hide: true,
  args: 2,
  gate: 1,

  help: {
    head: "~/set [tag] [your text]",
    desc: [
      "Sets a profile option for your server. Pass the `tag` you find using `~/profile setup` or `~set`, and pass new options. Be sure to check out the [dashboard]({website}/dashboard) for easier profile management.",
      "",
      "{{ ~/set tag I like to make things. }}",
    ]
  },

  lang: {
    none: "Sorry, couldn't find profile option `{tag}`. Use `~/set` to find tags.",
    done: "Successfully set **{tag}** to `{data}`"
  },

  fire: async function (Anni, Msg) {
    let [ tag, data ] = Anni.Arr.pair(Msg.args)
    let user = Msg.author.id, guild = Msg.auth.id

    // make sure the tag exists
    let current = await Anni.$Options.get(guild, tag)
    let  exists = Anni.$Good(current)
    if (!exists) return Anni.Reply(Msg, this.lang.none, { tag }).clean()

    let options = await Anni.$Options.get(guild, tag, user)
    if (options.id) current.id = options.id
    else delete current.id

    current.data = data
    current.user = user
    await Anni.$Options.fill(current)
    return Anni.Reply(Msg, this.lang.done, { tag, data }).clean()
  }
}