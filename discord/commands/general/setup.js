// setup.js - DMs info about setting up with Anni

module.exports = {
  name: "setup",
  gate: 0,

  help: {
    head: "~/setup",
    desc: "Returns info for setting up with Anni."
  },

  post: {
    head: "Anni Setup Menu - v{ver}",
    desc: [
      "`~/setup birthdays` - Birthday Announcements & Reminders",
      "`~/setup starboard` - Channel, Reaction Amount, and Emoji",
      "`~/setup options  ` - Server-Specific User Profile Options",
      "`~/setup profile  ` - Setting Up Your User Profile"
    ],
    grid: [{
      name: "Changing Your Server Prefix",
      text: "{{ ~/prefix a! }}"
    }],
    foot: "You can respond to this DM with the above commands."
  },

  fire: async function (Anni, Msg) {
    // if user, default to profile setup
    if (Msg.perm.level < 5) Msg.flag = 'user'
    // check and fire any subcommands
    let sub = Anni.Commands.Sub(Anni, Msg, this.name)
    if (sub) return sub.fire ? sub.fire(Anni, Msg) : false

    return Anni.Reply(Msg, this.post).dm()
  }
}