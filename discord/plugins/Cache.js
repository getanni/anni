// Cache.js - tracking common things for fewer database calls

module.exports = Anni => {
  Anni.Cache = {
    delete: function (id, val) {
      let store = '$' + val
      delete this[store][id]
    },

    config: async function (id, config) {
      if (!id) return config || {}
      
      if (!this.$config[id]) {
        let configs = await Anni.$Configs.get(id)
        this.$config[id] = {
          prefix: configs.prefix,
          suffix: configs.suffix,
          employ: Anni.$list(configs.employ)
        }
      }

      if (config) {
        if (config.prefix) this.$config[id].prefix = config.prefix
        if (config.suffix) this.$config[id].suffix = config.suffix
        if (config.employ) this.$config[id].employ = config.employ
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