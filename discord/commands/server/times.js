// times.js - returns current time in the server

module.exports = {
  name: 'times',
  also: [ 'time' ],
  gate: 0,
  nodm: true,

  help: {
    head: "~/time (time)",
    desc: [
      "Displays the current time in the server.",
      "You can pass a `time` to get the time it would be.",
      "",
      "{{ ~/time }}",
      "{{ ~/time 9pm }}"
    ]
  },

  lang: {
    curr: "Current Time in {guild.name}",
    when: "Time in {guild.name} @ {opts} in {name}",
    zone: "You need to set your timezone before you can look up times!"
  },

  fire: async function (Anni, Msg) {
    let list = await Anni.$Profile.all(Msg.auth.id)
    let data = {}, time = Msg.args.join(' ')

    let profile = await Anni.$Profile.get(Msg.author.id)
    if (!profile.zone) return Anni.Reply(Msg, this.lang.zone).clean()

    if (time) time = Anni.Time.check(time, profile.zone)
    let name = profile.zone.split('/')[1]
    let post = { head: time ? this.lang.when : this.lang.curr, desc: [] }

    for (let user of list) {
      if (user.zone) {
        let when = Anni.Time.time(user.zone, time)
        if (data[user.zone]) data[user.zone].count += 1
        else data[user.zone] = { ...when, count: 1 }
      }
    }

    data = Object.values(data)
    data = Anni.Arr.sort(data, '_offset')

    for (let zone of data) {
      post.desc.push(`**${zone.time}** - ${zone.name} (${zone.count})`)
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