// action-remove.js - For removing an image from an action

module.exports = {
  name: "action-remove",
  also: [ "action-rem" ],
  auth: true,
  hide: true,
  args: 2,
  gate: 2,

  help: {
    head: "~/ac.rem [command] [url]",
    desc: [
      "Removes an image/gif response from your action.",
      "`~/help action` for more information.",
      "{{ ~/action.remove hug https://i.imgur.com/r9aU2xv.gif }}"
    ]
  },

  lang: {
    none: "That action doesn't exist.",
    have: "Image is not attached to your action.",
    done: "Removed `{image}` from `{name}`."
  },

  fire: async function (Anni, Msg) {
    let [ name, image ] = Anni.Arr.pair(Msg.args)
    let updates = { name, image }

    // get the action that we're adding to, return if none
    let actions = await Anni.$Actions.get(Msg.auth.id, name)
    if (!actions) return Anni.Reply(Msg, this.lang.none).clean()

    // remove the URL from the action, return if not present
    let updated = await Anni.$Actions.pull(actions, image)
    let message = updated ? this.lang.done : this.lang.have
    return Anni.Reply(Msg, message, updates).clean()
  }
}