// bot-staff.js - list and toggle staff roles

module.exports = {
  name: "mods",
  also: [ "mod", "staff" ],
  auth: true,
  gate: 4,

  help: {
    head: "~/mods (role)",
    desc: [
      "Lists all roles identified as Mods by Anni.",
      "Passing a role (by mention or by ID - use `~/roles` to get IDs) will toggle that role as a mod role.",
      "{{ ~/mods @bosses }}",
      "{{ ~/mods 802938998284222484 }}"
    ]
  },

  lang: {
    add: "Added {role} as a staff role.",
    rem: "Removed {role} as a staff role.",
    err: "Couldn't find the role `{msg}` in **{guild.name}**."
  },

  post: {
    head: "{guild.name} Mod Roles",
    foot: "Use ~/roles to see role IDs.",
    desc: []
  },

  fire: async function (Anni, Msg) {
    let config = await Anni.$Configs.get(Msg.auth.id)
    let employ = Anni.$list(config.employ)

    if (!Msg.args.length) {
      // if no arguments, list current mod roles
      let basic = Anni.Access.$basic(Msg.auth)
      let staff = basic ? [ basic, ...employ ] : employ

      let post = Anni.$Copy(this.post)
      await Msg.auth.roles.cache.each(role => {
        if (staff.includes(role.id)) post.desc.push(role.name)
      })
      if (!post.desc.length) post.desc.push(`No Staff Roles`)

      return Anni.Reply(Msg, post).dm()
    } else {
      // else toggle the roles a staff role
      let role = Anni.Bot.Role(Msg, Msg.full)
      if (!role) return Anni.Reply(Msg, this.lang.err).send()

      // set the role based on already set
      let index = employ.indexOf(role.id)
      if (index < 0) employ.push(role.id)
      else employ.splice(index, 1)

      // set the new role in configs
      config.employ = JSON.stringify(employ)
      await Anni.$Configs.set(config)
      Anni.Cache.config(Msg.auth.id, config)

      let message = index < 0 ? this.lang.add : this.lang.rem
      return Anni.Reply(Msg, message, { role: role.name }).send()
    }
  }
}