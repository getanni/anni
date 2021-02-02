// action.js - for custom response commands

module.exports = {
  name: 'action',
  also: [ 'ac', 'actions', 'rp', 'roleplay' ],
  gate: 0,
  auth: true,

  help: {
    user: {
      head: "~/actions",
      desc: [ "Lists the actions available in server." ]
    },
    mods: {
      head: "~/action.[option] [data]",
      desc: [
        "Setting up custom roleplay commands! These are unique server commands that return custom responses. For example, we'll be creating a `hug` command.",
        "",
        "If you include `{/msg}` when you create a new roleplay command, it will pass the message to your custom response. For example, if someone uses `~/hugs @user violently`, then the bot will respond with `@user hugs @user violently`.",
        "",
        "If you add more than one image/gif to a roleplay command, it will select one of the images at random for the response.",
        "",
        "`~/ac.new` to make a new roleplay command.",
        "`~/ac.add` to add an image/gif to the response.",
        "`~/ac.edit` to edit the text of an existing command.",
        "`~/ac.remove` to remove an image/gif from a command.",
        "`~/ac.delete` to delete an existing command.",
        "",
        "{{ ~/ac.new hugs *{/user} hugs {/msg}* }}",
        "{{ ~/ac.add hugs https://i.imgur.com/r9aU2xv.gif }}",
        "{{ ~/hugs }}",
        "{{ ~/hugs @User }}"
      ]
    }
  },

  lang: {
    title: '{guild.name} Actions',
    empty: 'No Actions Available Yet'
  },

  fire: async function (Anni, Msg) {
    // fire our sub commands or return for misfire
    let sub = Anni.Commands.Sub(Anni, Msg, this.name)
    if (sub) return sub.fire ? sub.fire(Anni, Msg) : false

    // define the post, get the list of actions
    let post = { head: this.lang.title, desc: [] }
    let list = await Anni.$Actions.all(Msg.auth.id)

    // add actions if any, otherwise add empty message
    if (list) for (let action of list) {
      let imgs = action.list ? Anni.$list(action.list).length : 0
      let line = `**${action.name}**: \`${Anni.Escape(action.text)}\``
      if (imgs > 0) line += ` *(${imgs} Images)*`
      post.desc.push(line)
    }
    else if (!list || !post.desc.length) post.desc.push(this.lang.empty)

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