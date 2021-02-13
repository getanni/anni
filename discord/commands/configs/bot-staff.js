// bday-channel.js - sets the channel for birthday reminders

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
    err: "Couldn't find the role `{role}` in **{guild.name}**."
  },

  post: {
    head: "{guild.name} Mod Roles",
    foot: "Use ~/roles to see role IDs."
  },

  fire: async function (Anni, Msg) {
    // if no arguments, list current mod roles
    let basic = Anni.Access.$basic(Msg.auth)
    let staff = basic ? [ basic, ...Msg.employ ] : Msg.employ

    let post = { head: this.lang.head, desc: [] }
    post.desc = `<@&${staff.join('>, <@&')}>`

    return Anni.Reply(Msg, post).dm()
  }
}