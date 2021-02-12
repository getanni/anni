// find-member.js - For removing messages in a channel

module.exports = {
  name: "find",
  gate: 2, 
  args: 1,
  auth: true,

  help: {
    head: "~/find [user]",
    desc: [
      "Attempts to find and display information regarding `user`.",
      "{{ ~/find @User }}"
    ]
  },

  lang: { none: "Hmm, couldn't find user with query: `{msg}`." },

  fire: async function (Anni, Msg) {
    let user = await Anni.Bot.User(Msg, Msg.full)
    if (!user) return Anni.Reply(Msg, this.lang.none).clean()

    let thumb = Anni.Str.avatar(user.user)
    let list = `<@&${user._roles.join(`> <@&`)}>`
    let copy = `{{ ${user.user.id} }}`
    let ping = `<@!${user.user.id}>`

    let post = { thumb, desc: [ ping, copy, list ] }

    return Anni.Reply(Msg, post).send()
  }
}