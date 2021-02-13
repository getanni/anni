// Cache.js - tracking common things for fewer database calls

module.exports = Anni => {
  Anni.Cache = {
    delete: function (id, val) {
      let store = '$' + val
      delete this[store][id]
    },

    config: async function (id, obj) {
      if (!id) return obj || {}
      let curr = this.$config[id] || {}
      if (obj) this.$config[id] = { ...curr, ...obj }
      if (this.$config[id]) return this.$config[id]

      let configs = await Anni.$Configs.get(id)
      let employs = Anni.$list(configs.employs)

      curr.prefix = configs.prefix
      curr.suffix = configs.prefix
      curr.employ = employs

      this.$config[id] = curr
      return curr
    },

    server: function (id, val) {
      if (val) this.$server[id] = val
      let server = val || this.$server[id]
      return Anni.guilds.cache.get(server)
    },
    paused: function (id, val) {
      if (val) this.$paused[id] = val
      return val || this.$paused[id]
    },

    $config: {},
    $server: {},
    $paused: {}
  }
}