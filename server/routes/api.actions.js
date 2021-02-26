module.exports = (Api, App) => {
  App.get('/actions/get/:id', async (req, res) => {
    let [ guild ] = await Api.Auth.Admin(req)
    if (!guild) return Api.Throw(res)

    let actions = await Api.$Actions.all(guild)
    return Api.Send(res, actions)
  })

  App.get('/actions/new/:id', async (req, res) => {
    let [ guild, data ] = await Api.Auth.Admin(req)
    if (!guild) return Api.Throw(res)

    let created = { ...data, guild }
    let actions = await Api.$Actions.new(created)
    return Api.Send(res, actions)
  })

  App.get('/actions/set/:id', async (req, res) => {
    let [ guild, data ] = await Api.Auth.Admin(req)
    if (!guild) return Api.Throw(res)

    let updated = await Api.$Actions.set(data)
    return Api.Send(res, updated)
  })

  App.get('/actions/rem/:id', async (req, res) => {
    let [ guild, data ] = await Api.Auth.Admin(req)
    if (!guild) return Api.Throw(res)

    let removed = await Api.$Actions.del(data)
    return Api.Send(res, removed)
  })
}