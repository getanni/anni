// profile.js - list user information

module.exports = {
  name: 'profile',
  also: [ 'p' ],
  gate: 1,

  help: {
    head: "~/profile (user)",
    desc: [
      "Without `user`, returns your profile.",
      "Otherwise, returns the profile for `user`.",
      "",
      "`~/birthday` to set your birthday.",
      "`~/timezone` to set your timezone.",
      "",
      "{{ ~/profile }}",
      "{{ ~/profile @User }}",
      "{{ ~/profile setup }}"
    ]
  },

  lang: {
    noDMs: "Can't look up users in DMs.",
    user404: "Sorry, couldn't find that user.",
    private: "This profile is private.",
    setup: "~/profile setup",
    show: "~/profile show"
  },

  fire: async function (Anni, Msg) {
    // fire our subcommand if any, or return for misfire
    let sub = Anni.Commands.Sub(Anni, Msg, this.name)
    if (sub) return sub.fire ? sub.fire(Anni, Msg) : false

    let user = Msg.args.length ? Msg.args.join(' ') : false
    let auth = Msg.auth ? Msg.auth.id : false
    // we need a guild to look up a user
    if (user && !auth) return Anni.Reply(Msg, this.lang.noDMs).send()

    // either find the user or get the author, return if nothing
    let target = user ? Anni.Bot.User(Msg, user) : { user: Msg.author }
    if (!target || !target.user) return Anni.Reply(Msg, this.lang.user404).clean()
    let profile = await Anni.$Profile.get(target.user.id, auth)
    let allowed = Anni.Profile.show(profile, auth)

    let head  = target.nickname || target.user.username
    let foot  = allowed ? user ? target.full : this.lang.setup : this.lang.show
    let post  = { head, foot, thumb: Anni.Str.avatar(target.user), desc: [] }

    // if the profile is private say so
    if (!Anni.Profile.show(profile, auth)) {
      post.desc.push(this.lang.private)
    }
    // otherwise we can build out the profile
    else {
      profile = await Anni.Profile.data(profile, auth)
      if (profile.year) post.head += profile.year
      if (profile.bday) post.desc.push(profile.bday)
      if (profile.zone) post.desc.push(profile.zone)
      if (profile.star) post.desc.push(profile.star)
      if (profile.opts) post.desc.push(...profile.opts)
    }

    Anni.Commands.clear(Msg)
    return Anni.Reply(Msg, post).send()
  },

  test: async function (Anni, Msg, Test) {
    let bday = '08-28'
    let zone = 'denver'

    await Test.Run(Anni, Msg, this.name, 'hide')
    await Test.Run(Anni, Msg, this.name)
    await Test.Run(Anni, Msg, this.name, 'show')
    await Test.Run(Anni, Msg, this.name)
    await Test.Was('Hidden and visible profile.')

    await Test.Run(Anni, Msg, 'bday', bday)
    await Test.Run(Anni, Msg, 'zone', zone)
    await Test.Run(Anni, Msg, this.name)
    await Test.Was('Filled birthday and timezone.')

    return true
  }
}