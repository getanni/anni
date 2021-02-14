// profile-role.js - list and toggle roles visible on user profile

module.exports = {
  name: "profile-role",
  auth: true,
  gate: 4,

  help: {
    head: "~/p.role (role)",
    desc: [
      "Lists all roles identified visible on the user profile.",
      "Passing a role (by mention or by ID - use `~/roles` to get IDs) will toggle that role on the user profile.",
      "{{ ~/p.role @bosses }}",
      "{{ ~/p.role 802938998284222484 }}"
    ]
  },

  lang: {
    add: "Added {role} as a profile role.",
    rem: "Removed {role} as a profile role.",
    err: "Couldn't find the role `{msg}` in **{guild.name}**."
  },

  post: {
    head: "{guild.name} Profile Roles",
    foot: "Use ~/roles to see role IDs.",
    desc: []
  },

  fire: async function (Anni, Msg) {
    let configs = await Anni.$Configs.get(Msg.auth.id)
    let roles = Anni.$list(configs.roles)

    if (!Msg.args.length) {
      // list current roles if no role passed
      let post = Anni.$Copy(this.post)
      await Msg.auth.roles.cache.each(role => {
        if (roles.includes(role.id)) post.desc.push(role.name)
      })
      if (!post.desc.length) post.desc.push(`No Profile Roles`)

      return Anni.Reply(Msg, post).dm()
    }

    else {
      // toggle the passed role as a profile role
      let data = Anni.Str.strip(Msg.full)
      let byID = r => r.id == data
      let role = Msg.auth.roles.cache.find(byID)
      if (!role) return Anni.Reply(Msg, this.lang.err).send()

      let index = roles.indexOf(data)
      if (index < 0) roles.push(data)
      else roles.splice(index, 1)

      configs.roles = JSON.stringify(roles)
      await Anni.$Configs.set(configs)
      Anni.Cache.config(Msg.auth.id, configs)

      let message = index < 0 ? this.lang.add : this.lang.rem
      return Anni.Reply(Msg, message, { role: role.name }).send()
    }
  }
}