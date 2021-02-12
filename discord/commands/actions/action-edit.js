// action-edit.js - editing a server action response

module.exports = {
  name: "action-edit",
  auth: true,
  hide: true,
  args: 2,
  gate: 2,

  help: {
    head: "~/ac.edit [command] [new response]",
    desc: [
      "Edits an action message on your server.",
      "`~/help action` for more information.",
      "{{ ~/action.edit hug *hugs {/msg}* }}"
    ]
  },

  lang: {
    have: "Couldn't find `{name}`. Try `~/ac new`.",
    done: "Edited `{name}`'s response to `{text}`."
  },

  fire: async function (Anni, Msg) {
    let [ name, text ] = Anni.Arr.pair(Msg.args)
    let updates = { name, text: Anni.Escape(text) }

    // get the action we're editing, return if none
    let actions = await Anni.$Actions.get(Msg.auth.id, name)
    if (!actions) return Anni.Reply(Msg, this.lang.have, updates).clean()

    // edit said action
    actions.text = text
    await Anni.$Actions.set(actions)
    return Anni.Reply(Msg, this.lang.done, updates).clean()
  }
}