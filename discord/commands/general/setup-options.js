// setup-options.js - DMs info about setting up birthday announcements

module.exports = {
  name: "setup-options",
  also: [ "setup-opts" ],
  auth: true,
  gate: 5,

  help: {
    head: "~/setup options",
    desc: "Returns info for setting up profile options."
  },

  post: {
    head: "Anni Profile Setup - v{ver}",
    desc: [
      "**Anni** allows you to set server-specific profile fields for your users. This allows for a unique and catered profile experience unique to your server."
    ],
    grid: [
      { name: "Creating A Text Option",
        text: "{{ ~/opt.new tag -Tagline -A Brief Intro }}" +
              "{{ ~/opt.new about -About Me -Your User Bio }}" },
      { name: "Editing A Text Option",
        text: "{{ ~/opt.set tag -Your Tagline -Introduce Yourself }}" +
              "{{ ~/opt.set about -All About Me -Your Life Story }}" },
      { name: "Removing A Text Option",
        text: "{{ ~/opt.rem tag }}{{ ~/opt.rem about}}" }
    ],
    foot: "You can respond to this DM with the above commands."
  },

  fire: async function (Anni, Msg) {
    return Anni.Reply(Msg, this.post).dm()
  }
}