module.exports = (Api, App) => {
  App.get('/configs/get/:id', async (req, res) => {
    let [ guild ] = await Api.Auth.Admin(req)
    if (!guild) return Api.Throw(res)

    let configs = await Api.$Configs.get(guild, true)
    let details = await Api.$Details.get(guild)
    return Api.Send(res, configs, details)
  })

  App.get('/configs/set/:id', async (req, res) => {
    let [ guild, data ] = await Api.Auth.Admin(req)
    if (!guild) return Api.Throw(res)

    let updated = await Api.$Configs.set(data)
    return Api.Send(res, updated ? data : false)
  })
}