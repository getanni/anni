// action-new.js - creating a new server action

module.exports = {
  name: "action-new",
  auth: true,
  hide: true,
  args: 2,
  gate: 2,

  help: {
    head: "~/ac.new [command] [response]",
    desc: [
      "Makes a new action on your server.",
      "`~/help action` for more information.",
      "{{ ~/action.new hug *{user} hugs {/msg}* }}"
    ]
  },

  lang: {
    have: "The action `{name}` already exists. Try `~/ac edit` instead.",
    done: "Created action `{name}` with response `{text}`.",
    cmds: "The command `{name}` already exists."
  },

  fire: async function (Anni, Msg) {
    let [ name, text ] = Anni.Arr.pair(Msg.args)
    let updates = { name, text: Anni.Escape(text) }

    // make sure this action doesn't exist as action or command
    let actions = await Anni.$Actions.get(Msg.auth.id, name)
    if (actions) return Anni.Reply(Msg, this.lang.have, updates).clean()

    // if the action ahs the same name as a command, return error
    let command = Anni.Commands.find(name)
    if (command) return Anni.Reply(Msg, this.lang.cmds, updates).clean()

    // add the new action
    await Anni.$Actions.new({ name, text, guild: Msg.auth.id })
    return Anni.Reply(Msg, this.lang.done, updates).clean()
  }
}