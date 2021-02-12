// bday-announce.js - sets the birthday announce message

module.exports = {
  name: "announce",
  auth: true,
  args: 1,
  gate: 4,

  help: {
    head: "~/announce [message]",
    desc: [
      "Sets the message for birthday announcements.",
      "Must include {/user} or {users} and optionally include {date}.",
      "You can also pass `off` to disable birthday announcements.", "",
      "{{ ~/announce Hey!!! Happy Birthday {user}! }}"
    ]
  },

  lang: {
    users: "Message must contain `{user}` or `{users}`.",
    done: "Set announcement message in **{guild.name}** to `{message}`."
  },

  fire: async function (Anni, Msg) {
    // check if disabling, set announce
    let disabled = Anni.Str.isN(Msg.full)
    let announce = disabled ? '' : Msg.full

    // ignore checks if turning it off
    if (!disabled) {
      // make sure the message has a ping
      let hasPing = announce.indexOf('{user}') > -1
      hasPing = hasPing || announce.indexOf('{users}') > -1
      if (!hasPing) return Anni.Reply(Msg, this.lang.users).clean()
    }

    let message = Anni.Escape(announce || 'disabled')
    let configs = await Anni.$Configs.get(Msg.auth.id)
    configs.announce = announce

    await Anni.$Configs.set(configs)
    return Anni.Reply(Msg, this.lang.done, { message }).clean()
  }
}