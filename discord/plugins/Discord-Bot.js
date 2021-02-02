// Discord-Bot.js - discord specific helpers

module.exports = Anni => {
  Anni.Bot = {
    Servers: function () { return Anni.guilds.cache.keyArray().length },
    Members: function () { return Anni.guilds.cache.reduce(totals, 0) },

    Server: function (id) { return Anni.guilds.cache.get(id) },
    Member: function (guild, id) { return guild.members.cache.get(id) },

    Details: function (guild) {
      let parse = JSON.stringify
      let roles = [], rList = guild.roles.cache
      let chans = [], cList = guild.channels.cache.filter(byChan)
      
      for (let r of rList) roles.push(`${r[1].id}:${r[1].name}`)
      for (let c of cList) chans.push(`${c[1].id}:${c[1].name}`)

      return { guild: guild.id, chans: parse(chans), roles: parse(roles) }
    },

    User: async function (Msg, query) {
      if (!Msg.auth) return false

      if (query.indexOf('<') === 0) {
        let user = await Msg.auth.members.fetch(Anni.Str.strip(query))
        if (user) return user
      } else {
        let user = await Msg.auth.members.fetch({ query, limit: 1 })
        if (user.size) return user.entries().next().value[1]
      }

      return false
    },
    Channel: function (Msg, str, id) {
      let chan = Anni.Str.strip(str)
      let auth = id ? this.Server(id) : Msg.guild
      if (auth)  auth = auth.channels.cache
      if (auth)  chan = (auth.get(chan) || auth.find(byName(chan)))

      return auth ? chan : false
    },

    Can: {
      check(Msg, flag, channel) {
        let chan = channel || Msg.channel
        let auth = chan ? chan.guild : false
        return !auth || chan.permissionsFor(auth.me).has(flag, false)
      },
      Reply(Msg, chan) { return this.check(Msg, 'SEND_MESSAGES',   chan) },
      Roles(Msg, chan) { return this.check(Msg, 'MANAGE_ROLES',    chan) },
      Chans(Msg, chan) { return this.check(Msg, 'MANAGE_CHANNELS', chan) },
      Clean(Msg, chan) { return this.check(Msg, 'MANAGE_MESSAGES', chan) }
    }
  }

  const byChan = (channel) => channel.type == 'text'
  const totals = (count, guild) => count + guild.memberCount
  const byName = (str) => (data = {}) => Anni.Str.match(str, data.name)
}