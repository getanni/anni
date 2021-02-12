// bday-remind.js - sets the birthday reminder message

module.exports = {
  name: "reminder",
  auth: true,
  args: 1,
  gate: 4,

  help: {
    head: "~/reminder [message]",
    desc: [
      "Sets the message for birthday reminders.",
      "Must include {/user} or {users} and optionally include {date}.",
      "You can also pass `off` to disable birthday reminders.", "",
      "{{ ~/reminder Hey listen, it's {users} birthday next week on {date} }}"
    ]
  },

  lang: {
    users: "Message must contain `{user}` or `{users}`.",
    done: "Set reminder message in {guild.name} to `{message}`."
  },

  fire: async function (Anni, Msg) {
    // check if disabling, set reminder
    let disabled = Anni.Str.isN(Msg.full)
    let reminder = disabled ? '' : Msg.full

    // ignore checks if turning it off
    if (!disabled) {
      // make sure the message has a ping
      let hasPing = reminder.indexOf('{user}') > -1
      hasPing = hasPing || reminder.indexOf('{users}') > -1
      if (!hasPing) return Anni.Reply(Msg, this.lang.users).clean()
    }

    let message = Anni.Escape(reminder || 'disabled')
    let configs = await Anni.$Configs.get(Msg.auth.id)
    configs.reminder = reminder

    await Anni.$Configs.set(configs)
    return Anni.Reply(Msg, this.lang.done, { message }).clean()
  }
}