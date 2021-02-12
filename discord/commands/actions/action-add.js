// action-add.js - For adding an image to an action

module.exports = {
  name: "action-add", 
  auth: true,
  hide: true,
  args: 2,
  gate: 2,

  help: {
    head: "~/ac.add [command] [url]",
    desc: [
      "Adds an image/gif response to your action.",
      "`~/help action` for more information.",
      "{{ ~/action.add hug https://i.imgur.com/r9aU2xv.gif }}"
    ]
  },

  lang: {
    none: "That action doesn't exist.",
    have: "Image is already added to your action.",
    done: "Added `{image}` to `{name}`."
  },

  fire: async function (Anni, Msg) {
    let [ name, image ] = Anni.Arr.pair(Msg.args)
    let updates = { name, image }

    // get the action that we're adding to, return if none
    let actions = await Anni.$Actions.get(Msg.auth.id, name)
    if (!actions) return Anni.Reply(Msg, this.lang.none).clean()

    // add the new URL to the action, return if already in
    let updated = await Anni.$Actions.push(actions, image)
    let message = updated ? this.lang.done : this.lang.have
    return Anni.Reply(Msg, message, updates).clean()
  }
}