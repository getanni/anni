// respond.js - sending errors and data

module.exports = Api => {
  Api.Send  = (res, data, opts) => res.json(Api.clean(data, opts))
  Api.Throw = (res) => res.json({ error: true })

  Api.clean = (data, opts) => {
    let empty = true
    if (!data) return { empty }
    let isLoop = Array.isArray(data)
    if (isLoop) for (let item in data) item = item.dataValues

    let result = data.toJSON ? data.toJSON() : data || {}
    if (opts && !isLoop) result.opts = Api.clean(opts)

    return Api.$Good(result) ? result : { empty }
  }
}