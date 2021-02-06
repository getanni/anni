// setup-birthdays.js - DMs info on setting up the birthday announcements

module.exports = {
  name: 'setup-birthdays',
  also: [ 'setup-bdays' ],
  gate: 5,
  auth: true,

  help: {
    head: "~/setup birthdays",
    desc: [ "Returns info for setting up the birthday announcements." ]
  },

  info: {
    head: "Anni Birthday Setup - v{ver}",
    desc: [
      "**Anni** tracks birthdays on the user profile. Using this, you can set up automatic reminders and announcements for birthdays! All you *need* to do is tell Anni what channel to send the messages in!", "{_}"
    ],
    grid: [
      {
        name: "Set Your Birthday Channel - *Required*",
        text: "{{ ~/channel #general-chat }}{_}"
      },
      {
        name: "Change Reminder Message - *Optional*",
        text: "{{ ~/reminder Hey, {/users} birthday is in a week! }}{_}"
      },
      {
        name: "Change Announcement Message - *Optional*",
        text: "{{ ~/announce Happy Birthday {/user}! }}{_}"
      }
    ],
    foot: "You can respond to this DM with the above commands."
  },

  fire: async function (Anni, Msg) {
    return Anni.Reply(Msg, this.info).dm()
  }
}