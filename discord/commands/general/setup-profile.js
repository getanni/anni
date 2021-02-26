// setup-profile.js - DMs info about setting up your profile

module.exports = {
  name: "setup-profile",
  also: [ "setup-user" ],
  gate: 0,

  help: {
    head: "~/setup profile",
    desc: "Returns info for setting up your profile."
  },

  post: {
    head: "Anni Profile Setup - v{ver}",
    desc: [
      "**Anni** is a profile bot! She keeps track of your *birthday* so she can remind people when it's coming up (and announce it on the day of!), as well as your *timezone* so people know what time it is for you. Each server with Anni also has the ability to create custom profile fields."
    ],
    grid: [
      { name: "Set Your Birthday",
        text: "Use the `~/birthday` command to set your birthday in the MM/DD/YYYY format. Year is optional, only needed to display your age." +
              "{{ ~/birthday 03/21 }}{{ ~/birthday 03/21/1998 }}" },
      { name: "Set Your Timezone",
        text: "Use `~/timezone` with the nearest 'time city' to you - for the US, this is usually Los Angeles, Denver, Chicago, or New York. [Use this link]({timezones}) if you're unsure of what timezone to use." +
              "{{ ~/timezone chicago }}{{ ~/timezone sydney }}" },
      { name: "Profile Visibility",
        text: "You can toggle your profile's visiblity (hidden in other servers by default) by using the `show` and `hide` flags in the desired server." +
              "{{ ~/profile show }}{{ ~/profile hide }}" }
    ],
    foot: "You can respond to this DM with some of the above commands."
  },

  lang: {
    head: "Extended Profile Setup: {guild.name}",
    desc: "Use the commands below to set up your extended *{guild.name}* profile. Your birthday and timezone are synced across servers (but private by default) - however the options below are only visible in **{guild.name}**. You can use `~/set` to set an option, and `~/wipe` to remove an option."
  },

  fire: async function (Anni, Msg) {
    // make sure they *have* a profile
    await Anni.$Profile.get(Msg.author.id)
    // send out the generic profile response
    Anni.Reply(Msg, this.post).dm()

    // check for any server profile options
    let post = { head: this.lang.head, desc: this.lang.desc, grid: [] }
    let list = await Anni.$Options.all(Msg.auth.id)
    if (!list) return false
    for (let opt of list) {
      // ignore any role gated options
      let member = Anni.Bot.Member(Msg.auth, Msg.author.id)
      let roles = Anni.$list(opt.roles), access = false
      for (let id of roles) if (member._roles.includes(id)) access = true

      if (access || !roles.length) {
        let info = `**${opt.name}** - *${opt.desc}*`
        let more = `{{ ~/set ${opt.tag} (your text) }}`
        let wipe = `{{ ~/wipe ${opt.tag} }}`
        post.grid.push({ text: `${info} ${more} ${wipe}`})
      }
    }
    return Anni.Reply(Msg, post).dm()
  }
}