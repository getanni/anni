// setup-profiles.js - DMs info on setting up the user profile

module.exports = {
  name: 'setup-profiles',
  also: [ 'setup-user', 'setup-profile' ],
  gate: 5,
  auth: true,

  help: {
    head: "~/setup profiles",
    desc: [ "Returns info for setting up the user profiles." ]
  },

  info: {
    head: "Anni Profile Setup - v{ver}",
    desc: [
      "**Anni** allows you to set server-specific profile fields for your users. This allows for a unique and catered profile experience unique to your server. ", "{_}"
    ],
    grid: [
      {
        name: "Creating A Text Option",
        text: "{{ ~/opt.new tag -Tagline -A Brief Intro }}{{ ~/opt.new about -About Me -Your User Bio }}{_}"
      },
      {
        name: "Editing A Text Option",
        text: "{{ ~/opt.set tag -Your Tagline -Introduce Yourself }}{{ ~/opt.set about -All About Me -Your Life Story }}{_}"
      },
      {
        name: "Removing A Text Option",
        text: "{{ ~/opt.rem tag }}{{ ~/opt.rem about }}{_}"
      }
    ],
    foot: "You can respond to this DM with the above commands."
  },

  fire: async function (Anni, Msg) {
    return Anni.Reply(Msg, this.info).dm()
  }
}