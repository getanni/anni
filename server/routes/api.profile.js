module.exports = (Api, App) => {
  App.get('/profile/get/:user/:guild?', async (req, res) => {
    let [ user ] = await Api.Auth.User(req, req.params.user)
    let [ guild ] = await Api.Auth.Guild(req, req.params.guild)
    if (!user) return Api.Throw(res)

    let profile = await Api.$Profile.get(user), options = {}

    if (guild) {
      let labels = await Api.$Options.all(guild)
      let values = await Api.$Options.all(guild, user)
      if (labels) for (let opt of labels) options[opt.tag] = opt
      if (values) for (let opt of values) options[opt.tag] = opt
      options = Object.values(options)
    }
    return Api.Send(res, profile, options)
  })

  App.get('/profile/set/:user/:guild?', async (req, res) => {
    let [ user, data ] = await Api.Auth.User(req, req.params.user)
    let [ guild ] = await Api.Auth.User(req, req.params.guild)
    let options = data.options ? JSON.parse(data.options) : []
    if (!user) return Api.Throw(res)

    if (data.id) await Api.$Profile.set(data)
    else if (guild && options) for (let tag in options) {
      let option = options[tag]
      let create = option.user == '@everyone'
      if (create)  delete option.id
      option.user = user

      if (!option.data) await Api.$Options.wipe(option)
      else await Api.$Options.fill(option)
    }

    return Api.Send(res, data.id ? data : {}, options)
  })
}