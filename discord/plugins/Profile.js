// Profile.js - user profile utilities

module.exports = Anni => {
  Anni.Profile = {
    data: async function (profile, guild) {
      let _age = this.year(profile) || false
      let year = _age ? ` - (age ${_age})` : false
      let bday = `**Birthday:**  ${this.bday(profile.bday).text}`
      let zone = `**Timezone:**  ${this.zone(profile.zone).text}`
      let star = await this.star(profile, guild)
      let opts = await this.opts(profile.user, guild)
      return { bday, zone, opts, star, year }
    },

    bday: function (str) {
      if (!str) return { text: "Unknown" }
      // add current year for proper countdown
      let year = new Date().getFullYear(); str += `/${year}`
      let curr = Anni.Time.now()
      let bday = Anni.Time.date(str)
      let date = bday.format('MMM DD')
      let left = Anni.Time.diff(bday, curr)
      if (left < 0) bday.year(year + 1)
      if (left < 0) left = Anni.Time.diff(bday, curr)

      return { date, left, text: `${date} - **${left} days**` }
    },
    zone: function (str) {
      if (!str) return { text: "Unknown" }
      let zone  = Anni.Time.time(str)
      return { ...zone, text: `${zone.name} - **${zone.time}**` }
    },
    year: function (profile) {
      if (!profile.bday || !profile.year) return false
      let bday = `${profile.bday}/${profile.year}`
      let date = Anni.Time.date(bday, 'MM/DD/YYYY')
      return Anni.Time.now().diff(date, 'years')
    },
    
    star: async function (profile, guild) {
      if (!guild) return false
      let configs = await Anni.$Configs.get(guild)
      if (!configs.board) return false
      let posts = profile.posts || 0
      let stars = profile.stars || 0
      return `**Starboard:**  ${posts} posts - **${stars}** :star:`
    },
    opts: async function (user, guild) {
      let results = [], options = await Anni.$Options.all(guild, user)
      if (options) for (let opt of options) {
        // ignore any role gated options
        let server = Anni.Bot.Server(guild)
        let member = Anni.Bot.Member(server, user)
        let roles = Anni.$list(opt.roles), access = false
        for (let id of roles) if (member._roles.includes(id)) access = true

        if (access || !roles.length) results.push(`\n**${opt.name}**\n${opt.data}`)
      } return results
    },

    show: (profile, guild) => {
      if (!guild) return true // for DMs?
      let list = JSON.parse(profile.list)
      return list.includes ? list.includes(guild) : false
    }
  }
}