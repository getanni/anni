// set-birthday.js - for setting a user's birthday

module.exports = {
  name: "birthday",
  also: [ "bday" ],
  args: 1,
  gate: 1,

  help: {
    head: "~/birthday [MM/DD][/YYYY]",
    desc: [
      "Set your birthday on your profile.",
      "Year is optional, providing it will also display your age.", "",
      "{{ ~/birthday 03/27 }}",
      "{{ ~/birthday 10/16/2000 }}"
    ]
  },

  lang: {
    date: "Sorry, `{msg}` wasn't a valid date. `~/help birthday`",
    done: "Set your birthday to `{msg}`."
  },

  fire: async function (Anni, Msg) {
    // handle - and / formats
    let data = Msg.full.split('-').join('/').split('/')
    let [ mon, day, year ] = data, guild = Msg.auth ? Msg.auth.id : false
    
    // we can't do anything without a month/day
    if (!mon || !day) return Anni.Reply(Msg, this.help).send()
    // if no year is set, get a fake one for date purposes
    if (!year) data.push(new Date().getFullYear())

    // fix missing leading 0's
    if (day.length == 1) day = `0${day}`
    if (mon.length == 1) mon = `0${mon}`

    // and make sure the date actually exists
    let val = Anni.Time.real(data.join('/'))
    if (!val) return Anni.Reply(Msg, this.lang.date).clean()

    let profile = await Anni.$Profile.get(Msg.author.id, guild)
    profile.year = year || ''; profile.bday = `${mon}/${day}`
    
    await Anni.$Profile.set(profile)
    return Anni.Reply(Msg, this.lang.done).clean()
  }
}