// profile-anni.js - list base information (no extended profile)

module.exports = {
  name: "me",
  gate: 1,

  help: {
    head: "~/me",
    desc: [
      "Returns the general info from your profile. (No extended profile information will be shown).", "",
      "{{ ~/me }}"
    ]
  },

  lang: {
    private: "This profile is private.",
    setup: "~/profile setup",
    show: "~/profile show"
  },

  fire: async function (Anni, Msg) {
    let target = Msg.author, auth = Msg.auth ? Msg.auth.id : false
    let profile = await Anni.$Profile.get(target.id, auth)
    let allowed = Anni.Profile.show(profile, auth)

    if (auth) {
      let user = Anni.Bot.Member(Msg.auth, Msg.author.id)
      if (user.nickname) target.nickname = user.nickname
    }

    let head = target.nickname || target.username
    let foot = allowed ? this.lang.setup : this.lang.show
    let post = { head, foot, thumb: Anni.Str.avatar(target), desc: [] }

    if (!allowed) post.desc.push(this.lang.private)
    else {
      profile = await Anni.Profile.data(profile, auth)
      if (profile.year) post.head += profile.year
      if (profile.bday) post.desc.push(profile.bday)
      if (profile.zone) post.desc.push(profile.zone)
      if (profile.star) post.desc.push(profile.star)
    }

    Anni.Commands.clear(Msg)
    return Anni.Reply(Msg, post).send()
  }
}