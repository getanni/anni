// list-times.js - returns current time in the server

module.exports = {
  name: "times",
  also: [ "time" ],
  auth: true,
  gate: 0,

  help: {
    head: "~/time (time)",
    desc: [
      "Displays the current time in the server.",
      "You can pass a `time` to get the time it would be.", "",
      "{{ ~/time }}",
      "{{ ~/time 9pm }}"
    ]
  },

  lang: {
    curr: "Current Time in {guild.name}",
    when: "Time in {guild.name} @ {opts} in {name}",
    none: "{guild.name} has no users with timezones set yet! `~/p setup`",
    zone: "You need to set your timezone before you can look up times!"
  },

  fire: async function (Anni, Msg) {
    let list = await Anni.$Profile.all(Msg.auth.id)
    let data = {}, temp = Msg.args.join(' ')

    if (!list || !list.length) return Anni.Reply(Msg, this.lang.none).flash()

    let profile = await Anni.$Profile.get(Msg.author.id)
    if (!profile.zone) return Anni.Reply(Msg, this.lang.zone).clean()

    // check if we're looking up a user or a time
    let user = await Anni.Bot.User(Msg, temp)
    let time = Anni.Time.check(temp, profile.zone)

    let name = profile.zone.split('/')[1]
    let post = { head: time ? this.lang.when : this.lang.curr, desc: [] }

    for (let item of list) {
      if (item.zone) {
        let curr = data[item.zone]
        let when = Anni.Time.time(item.zone, time)
        let ping = Msg.author.id == item.user ? item.user : false
        if (user) ping = user.id == item.user ? item.user : false

        if (curr) curr = { ...curr, ping, count: curr.count + 1 }
        else data[item.zone] = { ...when, ping, count: 1 }
      }
    }

    data = Object.values(data)
    data = Anni.Arr.sort(data, '_offset')

    for (let zone of data) {
      let str = `**${zone.time}** - ${zone.name} (${zone.count})`
      if (zone.ping) str += ` <@${zone.ping}>`
      post.desc.push(str)
    }

    return Anni.Reply(Msg, post, { name }).send()
  },

  test: async function (Anni, Msg, Test) {
    await Test.Run(Anni, Msg, this.name)
    await Test.Run(Anni, Msg, this.name, '9pm')
    await Test.Was('Current time, Time lookup')

    return true
  }
}