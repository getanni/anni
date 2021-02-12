module.exports = (Model, Types) => {

  Model.$Profile = {
    table: Model.$db.define('profile', {
      user: { type: Types.STRING, unique: true },
      zone: { type: Types.STRING },
      bday: { type: Types.STRING },
      year: { type: Types.STRING },
      // guild list
      list: { type: Types.TEXT, defaultValue: '[]' },
      // starboard data
      stars: { type: Types.INTEGER, defaultValue: 0 },
      posts: { type: Types.INTEGER, defaultValue: 0 }
    }),

    get: async function (user, guild) {
      let _search = { where: { user } }
      let profile = await this.table.findOne(_search)
      if (profile) return Model.$Send(profile)
      else return this.new(user, guild)
    },

    all: async function (guild) {
      let _search = { where: { list: Model.$Hold(guild) } }
      return Model.$Send(await this.table.findAll(_search))
    },

    new: async function (user, guild) {
      Model.Log(`Creating User Profile`)
      let profile = { user, list: guild ? `["${guild}"]` : `[]` }
      return Model.$Send(await this.table.create(profile))
    },

    set: async function (profile) {
      Model.Log(`Modifying User Profile`)
      let _search = { where: { id: profile.id } }
      let updated = await this.table.update(profile, _search)
      return Model.$Send(updated ? profile : false)
    },

    bday: async function (bday) {
      let _search = { where: { bday } }
      return Model.$Send(await this.table.findAll(_search))
    },

    hide: async function (profile, guild) {
      Model.Log(`Hiding User Profile`)
      profile.list = Model.$pull(profile.list, guild)
      if (!profile.list) Model.$Send(false)
      let _search = { where: { user: profile.user } }
      let updated = await this.table.update(profile, _search)
      return Model.$Send(updated ? profile : false)
    },

    show: async function (profile, guild) {
      Model.Log(`Showing User Profile`)
      profile.list = Model.$push(profile.list, guild)
      if (!profile.list) Model.$Send(false)
      let _search = { where: { user: profile.user } }
      let updated = await this.table.update(profile, _search)
      return Model.$Send(updated ? profile : false)
    },

    star: async function (user, count, current) {
      let profile = await this.get(user)
      profile.posts += current ? 0 : 1
      profile.stars += current ? (count - current) : count
      let _search = { where: { user } }
      let updated = await this.table.update(profile, _search)
      return Model.$Send(updated ? profile : false)
    }
  }

}