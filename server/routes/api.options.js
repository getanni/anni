module.exports = (Api, App) => {
  App.get('/options/get/:id', async (req, res) => {
    let [ guild ] = await Api.Auth.Admin(req)
    if (!guild) return Api.Throw(res)

    let options = await Api.$Options.all(guild)
    return Api.Send(res, options)
  })

  App.get('/options/new/:id', async (req, res) => {
    let [ guild, data ] = await Api.Auth.Admin(req)
    if (!guild) return Api.Throw(res)
      
    let created = await Api.$Options.new(data)
    return Api.Send(res, created)
  })

  App.get('/options/set/:id', async (req, res) => {
    let [ guild, data ] = await Api.Auth.Admin(req)
    if (!guild) return Api.Throw(res)

    let updated = await Api.$Options.set(guild, data)
    return Api.Send(res, updated)
  })

  App.get('/options/rem/:id', async (req, res) => {
    let [ guild, data ] = await Api.Auth.Admin(req)
    if (!guild) return Api.Throw(res)

    let removed = await Api.$Options.del(guild, data)
    return Api.Send(res, removed)
  })
}