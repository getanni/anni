// bot-staff.js - list and toggle staff roles

module.exports = {
  name: "mods",
  also: [ "staff" ],
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
    add: "Added <@&{role}> as a staff role.",
    rem: "Removed <@&{role}> as a staff role.",
    err: "Couldn't find the role `{msg}` in **{guild.name}**."
  },

  post: {
    head: "{guild.name} Mod Roles",
    foot: "Use ~/roles to see role IDs."
  },

  fire: async function (Anni, Msg) {
    if (!Msg.args.length) {
      // if no arguments, list current mod roles
      let basic = Anni.Access.$basic(Msg.auth)
      let staff = basic ? [ basic, ...Msg.employ ] : Msg.employ

      let post = { head: this.lang.head, desc: [] }
      post.desc = `<@&${staff.join('>, <@&')}>`

      return Anni.Reply(Msg, post).dm()
    } else {
      // else toggle the roles a staff role
      let role = Anni.Str.strip(Msg.full)
      let byID = role => role.id == role
      let data = Msg.auth.roles.cache.find(byID)
      // return if the role doesn't exist
      if (!data) return Anni.Reply(Msg, this.lang.err).send()
      let index = Msg.employ.indexOf(role)
      // add a non-staff role, remove a staff role
      if (index < 0) Msg.employ.push(role)
      else Msg.employ.splice(index, 1)
      let employ = JSON.stringify(Msg.employ)
      await Anni.$Configs.set(Msg.auth.id, { employ })
      
      let message = index < 0 ? this.lang.add : this.lang.rem
      return Anni.Reply(Msg, message, { role }).send()
    }
  }
}