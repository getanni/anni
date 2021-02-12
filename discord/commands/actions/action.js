// action.js - Lists custom actions

module.exports = {
  name: "action",
  also: [ "actions", "ac" ],
  auth: true,
  gate: 0,

  help: {
    user: {
      head: "~/actions",
      desc: "Lists the actions available in the server."
    },
    mods: {
      head: "~/ac.[option] [data]",
      desc: [
        "Custom actions/roleplay commands are unique server commands that return custom responses.", "",
        "If you include `{/msg}` when you create a new action, it will pass the message to your response.", "",
        "If you add more than one image/gif, it will select one at random.", "",
        "`~/ac.new` to make a new action/roleplay command.",
        "`~/ac.add` to add an image/gif to the action.",
        "`~/ac.rem` to remove an image/gif from an action.", 
        "`~/ac.edit` to edit the text of an existing command.",
        "`~/ac.delete` to delete an action."
      ],
      grid:[{ text: 
        "{{ ~/ac.new hugs *{/user} hugs {/msg}* }}" +
        "{{ ~/ac.add hugs https://i.imgur.com/r9aU2xv.gif }}" +
        "{{ ~/hugs @user }}" +
        "{{ ~/ac.rem hugs https://i.imgur.com/r9aU2xv.gif }}" +
        "{{ ~/ac.edit hugs *{/user} violently hugs {/msg}* }}" +
        "{{ ~/ac.delete hugs }}"
      }]
    }
  },

  lang: {
    head: "{guild.name} Actions",
    none: "No Actions Available Yet."
  },

  fire: async function (Anni, Msg) {
    // check and fire any subcommands
    let sub = Anni.Commands.Sub(Anni, Msg, this.name)
    if (sub) return sub.fire ? sub.fire(Anni, Msg) : false

    // define the post, get the list of actions
    let post = { head: this.lang.head, desc: [] }
    let list = await Anni.$Actions.all(Msg.auth.id)

    // add actions or an empty message
    if (list) for (let action of list) {
      let imgs = action.list ? Anni.$list(action.list).length : 0
      let line = `**${action.name}**: \`${Anni.Escape(action.text)}\``
      if (imgs > 0) line += ` *(${imgs} Images)*`
      post.desc.push(line)
    } else post.desc.push(this.lang.none)

    return Anni.Reply(Msg, post).send()
  },

  test: async function (Anni, Msg, Test) {
    let name = 'actiontest'
    let link = Test.data.image
    let args = 'everybody here'
    let msg1 = '*{user} tests {msg}*'
    let msg2 = '*{user} REALLY tests {msg}*'

    await Test.Run(Anni, Msg, this.name)
    await Test.Run(Anni, Msg, this.name, `new ${name} ${msg1}`)
    await Test.Run(Anni, Msg, this.name)
    await Test.Was(`New Action: ${name}`)

    await Test.Run(Anni, Msg, name)
    await Test.Run(Anni, Msg, name, args)
    await Test.Was(`No Message vs Message`)

    await Test.Run(Anni, Msg, this.name, `edit ${name} ${msg2}`)
    await Test.Run(Anni, Msg, name)
    await Test.Was(`REALLY tests`)

    await Test.Run(Anni, Msg, this.name, `add ${name} ${link}`)
    await Test.Run(Anni, Msg, this.name)
    await Test.Run(Anni, Msg, name)
    await Test.Run(Anni, Msg, this.name, `rem ${name} ${link}`)
    await Test.Run(Anni, Msg, name)
    await Test.Was(`Image vs No Image`)

    await Test.Run(Anni, Msg, this.name, `del ${name}`)
    await Test.Run(Anni, Msg, this.name)
    await Test.Was(`Deleted Action: ${name}`)

    return true
  }
}