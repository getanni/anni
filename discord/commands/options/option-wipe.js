// option-wipe.js - deletes a user's server profile option

module.exports = {
  name: "option-wipe",
  also: [ "wipe" ],
  auth: true,
  hide: true,
  args: 1,
  gate: 1,

  help: {
    head: "~/set [tag] [your text]",
    desc: [
      "Sets a profile option for your server. Pass the `tag` you find using `~/profile setup` or `~set`, and pass new options. Be sure to check out the [dashboard]({website}/dashboard) for easier profile management.", "",
      "{{ ~/set tag I like to make things. }}",
    ]
  },

  lang: {
    none: "Sorry, couldn't find profile option `{tag}`. Use `~/set` to find tags.",
    done: "Successfully cleared **{tag}**."
  },

  fire: async function (Anni, Msg) {
    let tag = Msg.args[0]
    let user = Msg.author.id
    let guild = Msg.auth.id

    // make sure the tag exists
    let option = await Anni.$Options.get(guild, tag, user)
    if (!option.id) return Anni.Reply(Msg, this.lang.none, { tag }).clean()

    await Anni.$Options.wipe(option)
    return Anni.Reply(Msg, this.lang.done, { tag }).clean()
  }
}