// list-times.js - returns current time in the server

module.exports = {
  name: "roles",
  auth: true,
  gate: 4,

  help: {
    head: "~/roles",
    desc: "Lists the roles and IDs in the server."
  },

  post: { 
    head: "Roles in {guild.name}",
    desc: []
  },

  fire: async function (Anni, Msg) {
    let post = Anni.$Copy(this.post)
    await Msg.auth.roles.cache.each(role => {
      post.desc.push(`\`${role.id}\` ${role.name}`)
    })
    return Anni.Reply(Msg, post).dm()
  }
}