// validate.js - handles authentication for the API

const Crypt = require('crypto')
const Fetch = require('node-fetch')
const Local = require('node-localstorage').LocalStorage
const Store = new Local('./endpoint/api-cache.store')

module.exports = Api => {
  Api.Auth = {
    User:  async function (req, id) { return await this.check(req, id) },
    Guild: async function (req, id) { return await this.check(req, id, true) },
    Admin: async function (req, id) {
      let [ auth, data, guild ] = await this.check(req, id, true)
      let admin = guild && (guild.permissions & 0x00000008) != 0
      return [ admin ? auth : false, data ]
    },

    hash: str => Crypt.createHash('sha256').update(str).digest('base64'),
    cache: (key, value) => {
      if (value) Store.setItem(key, JSON.stringify(value))
      return JSON.parse(Store.getItem(key))
    },
    check: async function (req, id, guild) {
      id = id || req.params.id
      if (!id || !req.query.token) return [ false ]

      let hash = this.hash(req.query.token)
      let curr = this.cache(hash) || {}
      if (curr[id]) return this.parse(curr[id], { ...req.query })
      
      let auth = await this.fetch(req.query.token, id, guild)
      if (!auth) return [ false ]

      curr[id] = auth; this.cache(hash, curr)
      return this.parse(auth, { ...req.query })
    },
    fetch: async (token, id, guild) => {
      let headers = { authorization: `Bearer ${token}` }
      let baseURL = 'https://discordapp.com/api/users/@me'
      let authURL = !guild ? baseURL : `${baseURL}/guilds`
      let rawData = await Fetch(authURL, { headers })
      let fetched = await rawData.json()
      if (fetched.message) console.info(fetched.message)

      if (guild) {
        let found = false
        if (!Array.isArray(fetched)) return false
        for (let g of fetched) if (g.id == id) found = g
        if (!found) return false
        else fetched = found
      } else if (fetched.id != id) return false

      return fetched
    },
    parse: (auth, data) => {
      if (data && data.token) delete data.token
      let id = auth ? auth.id : false
      return [ id, data, auth ]
    }
  }
}