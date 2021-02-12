// profile-show.js - make user visible on a server

module.exports = {
  name: "profile-show",
  auth: true,
  hide: true,
  gate: 1,

  help: {
    head: "~/profile show",
    desc: [
      "Makes your profile visible on a server.", "",
      "{{ ~/profile show }}"
    ]
  },

  lang: {
    show: "Your profile is not hidden on **{guild.name}**.",
    done: "Showing your profile on **{guild.name}**."
  },

  fire: async function (Anni, Msg) {
    let profile = await Anni.$Profile.get(Msg.author.id, Msg.auth.id)
    let updated = await Anni.$Profile.show(profile, Msg.auth.id)
    let message = updated ? this.lang.done : this.lang.show
    return Anni.Reply(Msg, message).clean()
  }
}