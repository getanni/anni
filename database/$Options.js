module.exports = (Model, Types) => {

  Model.$Options = {
    table: Model.$db.define('options', {
      tag:   { type: Types.STRING },
      name:  { type: Types.STRING },
      desc:  { type: Types.STRING },
      data:  { type: Types.TEXT },
      user:  { type: Types.STRING },
      guild: { type: Types.STRING },
      roles: { type: Types.TEXT, defaultValue: '[]' }
    }),

    get: async function (guild, tag, user = '@everyone') {
      let _search = { where: { guild, tag, user } }
      return Model.$Send(await this.table.findOne(_search))
    },

    all: async function (guild, user = '@everyone') {
      let _search = { where: { guild, user } }
      return Model.$Send(await this.table.findAll(_search))
    },

    new: async function (options) {
      options.user = '@everyone'
      return Model.$Send(await this.table.create(options))
    },

    set: async function (guild, options) {
      if (options.id) delete options.id
      if (options.user) delete options.user
      if (options.data) delete options.data
      let _search = { where: { guild, tag: options.tag } }
      let updated = await this.table.update(options, _search)
      return Model.$Send(updated ? options : false)
    },

    del: async function (guild, options) {
      let _search = { where: { guild, tag: options.tag } }
      let deleted = await this.table.destroy(_search)
      return Model.$Send(deleted ? options : false)
    },

    fill: async function (options) {
      let _search = options.id ? { where: { id: options.id } } : false
      if (!_search) return Model.$Send(await this.table.create(options))
      else return Model.$Send(await this.table.update(options, _search))
    },

    wipe: async function (options) {
      let _search = options.id ? { where: { id: options.id } } : false
      let deleted = await this.table.destroy(_search)
      return Model.$Send(deleted ? options : false)
    }
  }

}