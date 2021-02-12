// setup-starboard.js - DMs info about setting up birthday announcements

module.exports = {
  name: "setup-starboard",
  also: [ "setup-star" ],
  auth: true,
  gate: 5,

  help: {
    head: "~/setup starboard",
    desc: "Returns info for setting up the starboard."
  },

  post: {
    head: "Anni Starboard Setup - v{ver}",
    desc: [
      "**Anni** can manage a starboard for your server. What bot can't? However, with the user profile Anni tracks combined starboard statistics. When a user gets a starred post in any server with Anni, the post and number of stars are recorded."
    ],
    grid: [
      { name: "Set Your Starboard Channel - *Required*",
        text: "{{ ~/board #starboard }}" },
      { name: "Change Reaction Emoji - *Optional*",
        text: "{{ ~/emoji :heart: }}" },
      { name: "Change Reaction Count - *Optional*",
        text: "{{ ~/count 2 }}" }
    ],
    foot: "You can respond to this DM with the above commands."
  },

  fire: async function (Anni, Msg) {
    return Anni.Reply(Msg, this.post).dm()
  }
}