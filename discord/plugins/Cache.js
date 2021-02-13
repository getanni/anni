// Cache.js - tracking common things for fewer database calls

module.exports = Anni => {
  Anni.Cache = {
    delete: function (id, val) {
      let store = '$' + val
      delete this[store][id]
    },

    config: async function (id, update) {
      if (id) return update || {}
      if (update || !this.$config[id]) {
        let config = await Anni.$Configs.get(id)
        this.$config[id] = {
          prefix: config.prefix,
          suffix: config.suffix,
          employ: Anni.$list(config.employ)
        }
      }
      return this.$config[id]
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