// option-role.js - adds required role to options

module.exports = {
  name: "option-role",
  auth: true,
  hide: true,
  args: 2,
  gate: 5,

  help: {
    head: "~/opt.role [tag] [@Role]",
    desc: [
      "Adds a role requirement for a profile options. Users must have a required role to fill out the field/have it visible on their profile. Be sure to check out the [dashboard]({website}/dashboard) for easier profile management.", "",
      "{{ ~/opt.role about @verified }}",
    ]
  },

  lang: {
    added:   "Added {role} requirement for **{tag}**.",
    removed: "Removed {role} requirement for **{tag}**.",
    option:  "Sorry, couldn't find the option `{tag}`. Use `~/set` to find tags.",
    role:    "Sorry, couldn't find the role `{data}`."
  },

  fire: async function (Anni, Msg) {
    // get the tag and the role we're toggling
    let [ tag, data ] = Anni.Arr.pair(Msg.args)

    // make sure the role and option exist
    let role = Anni.Bot.Role(Msg, data)
    if (!role) return Anni.Reply(Msg, this.lang.role, { data }).clean()

    let option = await Anni.$Options.get(Msg.auth.id, tag)
    if (!option.id) return Anni.Reply(Msg, this.lang.option, { tag }).clean()

    // get the current array of roles
    let roles = Anni.$list(option.roles)
    let index = roles.indexOf(role.id)
    // add or remove role based on index
    if (index < 0) roles.push(role.id)
    else roles.splice(index, 1)

    // set the new role list and save
    option.roles = JSON.stringify(roles)
    await Anni.$Options.set(Msg.auth.id, option)

    let success = index < 0 ? this.lang.added : this.lang.removed
    return Anni.Reply(Msg, success, { tag, role: role.name }).clean()
  }
}