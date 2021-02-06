// setup-starboard.js - DMs info on setting up the starboard

module.exports = {
  name: 'setup-starboard',
  also: [ 'setup-star' ],
  gate: 5,
  auth: true,

  help: {
    head: "~/setup starboard",
    desc: [ "Returns info for setting up the starboard." ]
  },

  info: {
    head: "Anni Starboard Setup - v{ver}",
    desc: [
      "**Anni** can manage a starboard for your server. What bot can't? However, with the user profile Anni tracks combined starboard statistics. When a user gets a starred post in any server with Anni, the post and number of stars are recorded.", "{_}"
    ],
    grid: [
      {
        name: "Set Your Starboard Channel - *Required*",
        text: "{{ ~/board #starboard }}{_}"
      },
      {
        name: "Change Reaction Emoji - *Optional*",
        text: "{{ ~/emoji :heart: }}{_}"
      },
      {
        name: "Change Reaction Count - *Optional*",
        text: "{{ ~/amount 2 }}{_}"
      }
    ],
    foot: "You can respond to this DM with the above commands."
  },

  fire: async function (Anni, Msg) {
    return Anni.Reply(Msg, this.info).dm()
  }
}