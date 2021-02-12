// set-timezone.js - sets a timezone for a user

module.exports = {
  name: "timezone",
  also: [ "zone" ],
  args: 1,
  gate: 1,

  help: {
    head: "~/timezone [timezone]",
    desc: [
      "Sets your timezone to `timezone`.",
      "Timezone is the nearest *time city* to you. For the US, it's usually *Los Angeles*, *Denver*, *Chicago*, and *New York*. If you're unsure what to input, you can [visit this link]({timezone}) and click on yourself on the map.", "",
      "{{ ~/timezone Chicago }}",
      "{{ ~/timezone Sydney }}"
    ]
  },

  lang: {
    zone: "Sorry I couldn't find the timezone `{opts}`.",
    done: "Set your timezone to `{opts}`."
  },

  fire: async function (Anni, Msg) {
    // make sure the zone actually exists, set to name
    let zone = Anni.Time.zone(Msg.full)
    let guild = Msg.auth ? Msg.auth.id : false
    if (!zone) return Anni.Reply(Msg, this.lang.zone).clean()

    let profile = await Anni.$Profile.get(Msg.author.id, guild)
    profile.zone = zone.name

    await Anni.$Profile.set(profile)
    return Anni.Reply(Msg, this.lang.done).clean()
  }
}