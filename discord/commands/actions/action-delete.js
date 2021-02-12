// action-delete.js - For removing an action

module.exports = {
  name: "action-delete",
  also: [ "action-del" ],
  auth: true,
  hide: true,
  args: 1,
  gate: 2,

  help: {
    head: "~/ac.del [command]",
    desc: [
      "Removes an action from your server.",
      "`~/help action` for more information.",
      "{{ ~/action.del hug }}"
    ]
  },

  lang: {
    none: "That action doesn't exist.",
    done: "Deleted action `{name}`."
  },

  fire: async function (Anni, Msg) {
    let name = Msg.args[0].toLowerCase()

    // get the action we're deleting, return if none
    let actions = await Anni.$Actions.get(Msg.auth.id, name)
    if (!actions) return Anni.Reply(Msg, this.lang.none).clean()

    // delete the action
    await Anni.$Actions.del(actions)
    return Anni.Reply(Msg, this.lang.done, { name }).clean()
  }
}