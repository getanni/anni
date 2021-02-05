// guildCreate.js - added to a server

module.exports = async (Anni, Guild) => {

  let Owner = await Anni.users.fetch(Guild.ownerID)

  let title = `Added to ${Guild.name}`
  let stats = [
    `Total Users: ${Guild.memberCount}`,
    `Server Owner: ${Owner.username}`,
    `*Now In ${Anni.Bot.Servers()} Servers.*`
  ]

  let hello = {
    title: `Thanks for adding me to ${Guild.name}!`,
    description: "Use `help` or `setup` to get started."
  }

  // send the "welcome" message
  // cache the owner as guild admin
  Owner.send({ embed: hello })
  Anni.Cache.server(Owner.id, Guild.id)

  // cache the server details
  let details = Anni.Bot.Details(Guild)
  await Anni.$Details.set(details)

  // cache the users for DM commands
  let members = await Guild.members.fetch()
  for (let user of members) Anni.Cache.server(user[1].user.id, Guild.id)

  return Anni.State(stats.join('\n'), title)
}