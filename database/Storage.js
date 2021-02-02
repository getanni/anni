/*************************************/
/**   Storage.js                    **/
/**---------------------------------**/
/**   Load our database toolkits.   **/
/**---------------------------------**/
/*************************************/

const { Sequelize, DataTypes, Op } = require('sequelize')

module.exports = Model => {
  Model.bot = require('../discord.json')
  Model.cfg = require('../configs.json')
  Model.pkg = require('../package.json')
  Model.$db = new Sequelize(Model.cfg.database)
  
  require('./$Records.js')(Model, DataTypes)
  require('./$Configs.js')(Model, DataTypes)
  require('./$Details.js')(Model, DataTypes)
  require('./$Starred.js')(Model, DataTypes)
  require('./$Actions.js')(Model, DataTypes)
  require('./$Profile.js')(Model, DataTypes)
  require('./$Options.js')(Model, DataTypes)

  // general data and query helpers
  Model.$Copy = data => JSON.parse(JSON.stringify(data))
  Model.$Good = data => typeof data !== 'undefined' && data != null
  Model.$Hold = data => { return { [Op.substring]: data } }

  // main data handling
  Model.$Sync = async () => {
    await Model.$Records.table.sync({ alter: true })
    await Model.$Configs.table.sync({ alter: true })
    await Model.$Details.table.sync({ alter: true })
    await Model.$Starred.table.sync({ alter: true })
    await Model.$Actions.table.sync({ alter: true })
    await Model.$Profile.table.sync({ alter: true })
    await Model.$Options.table.sync({ alter: true })
  }
  Model.$Send = data => {
    if (!data) return false
    if (!Array.isArray(data)) return Model.$Data(data)
    let list = []; for (let o of data) list.push(Model.$Data(o))
    return list.length ? list : false
  }
  Model.$Data = data => {
    if (data.toJSON)     data = data.toJSON()
    if (data.dataValues) data = data.dataValues
    if (data.updatedAt)  delete data.updatedAt
    if (data.createdAt)  delete data.createdAt
    return data
  }

  // array helpers
  Model.$list = (arr = []) => {
    if (Array.isArray(arr)) return arr
    try {
      let list = JSON.parse(arr)  
      return list.indexOf ? list : []
    } catch (e) {
      return []
    }
  }

  Model.$push = (arr, val) => {
    let list = Model.$list(arr)
    let find = list.indexOf(val)
    return find > -1 ? false : JSON.stringify([ ...list, val ])
  }
  Model.$pull = (arr, val) => {
    let list = Model.$list(arr)
    let find = list.indexOf(val)
    if (find < 0) return false
    list.splice(find, 1)
    return JSON.stringify(list)
  }
  Model.$rand = (arr) => {
    let list = Model.$list(arr)
    let rand = Math.floor(Math.random() * list.length)
    return list[rand]
  }
}