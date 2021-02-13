module.exports = (Model, Types) => {

  Model.$Configs = {
    table: Model.$db.define('configs', {
      // general configs
      guild:  { type: Types.STRING, unique: true },
      prefix: { type: Types.STRING, defaultValue: Model.cfg.defaults.prefix },
      suffix: { type: Types.STRING },
      employ: { type: Types.TEXT,   defaultValue: '[]' },
      // discord data cache
      chans: { type: Types.TEXT, defaultValue: '[]' },
      roles: { type: Types.TEXT, defaultValue: '[]' },
      // birthday configs
      birthday: { type: Types.STRING },
      reminder: { type: Types.TEXT, defaultValue: Model.cfg.defaults.reminder },
      announce: { type: Types.TEXT, defaultValue: Model.cfg.defaults.announce },
      // starboard configs
      board: { type: Types.STRING },
      emoji: { type: Types.STRING,  defaultValue: Model.cfg.defaults.emoji },
      count: { type: Types.INTEGER, defaultValue: Model.cfg.defaults.amount }
    }),

    get: async function (guild, skip) {
      let _search = { where: { guild } }
      let configs = await this.table.findOne(_search)
      if (configs) return Model.$Send(configs)
      else if (skip) return Model.$Send(false)
      else return this.new(guild)
    },

    new: async function (guild) {
      return Model.$Send(await this.table.create({ guild }))
    },

    set: async function (configs) {
      let _search = { where: { id: configs.id } }
      let updated = await this.table.update(configs, _search)
      return Model.$Send(updated ? configs : false)
    }
  }

}