// profile-hide.js - make user hidden on a server

module.exports = {
  name: "profile-hide",
  auth: true,
  hide: true,
  gate: 1,

  help: {
    head: "~/profile hide",
    desc: [
      "Makes your profile visible on a server.", "",
      "{{ ~/profile hide }}"
    ]
  },

  lang: {
    hide: "Your profile is not visible on **{guild.name}**.",
    done: "Hiding your profile from **{guild.name}**."
  },

  fire: async function (Anni, Msg) {
    let profile = await Anni.$Profile.get(Msg.author.id, Msg.auth.id)
    let updated = await Anni.$Profile.hide(profile, Msg.auth.id)
    let message = updated ? this.lang.done : this.lang.hide
    return Anni.Reply(Msg, message).clean()
  }
}