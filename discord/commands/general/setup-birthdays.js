// setup-birthdays.js - DMs info about setting up birthday announcements

module.exports = {
  name: "setup-birthdays",
  also: [ "setup-bdays" ],
  auth: true,
  gate: 5,

  help: {
    head: "~/setup birthdays",
    desc: "Returns info for setting up birthday announcements."
  },

  post: {
    head: "Anni Birthday Setup - v{ver}",
    desc: [
      "**Anni** tracks birthdays on the user profile. Using this, you can set up automatic reminders and announcements for birthdays! All you *need* to do is tell Anni which channel to send the messages in!"
    ],
    grid: [
      { name: "Set Your Birthday Channel - *Required*",
        text: "{{ ~/channel #general-chat }}" },
      { name: "Change Reminder Message - *Optional*",
        text: "{{ ~/reminder Hey, {/users} birthday is in a week! }}" },
      { name: "Change Announcement Message - *Optional*",
        text: "{{ ~/announce Happy Birthday, {/user}! }}" }
    ],
    foot: "You can respond to this DM with the above commands."
  },

  fire: async function (Anni, Msg) {
    return Anni.Reply(Msg, this.post).dm()
  }
}