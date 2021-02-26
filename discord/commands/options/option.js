// option.js - for profile option commands

module.exports = {
  name: "option",
  also: [ "opt", "options", "opts" ],
  auth: true,
  gate: 5,

  help: {
    head: "~/opt.[action] [options]",
    desc: [
      "Manages guild profile options. Returns current profile options if no action provided. Be sure to check out the [dashboard]({website}/dashboard) for easier option management.", "",
      "`~/opt.new` to create a new option.",
      "`~/opt.set` to edit a current option.",
      "`~/opt.rem` to delete a profile option."
    ]
  },

  lang: {
    title: "{guild.name} Options",
    empty: "No options set yet.",
    make: "Use `~/opt.new` to create an option.",
    edit: "Use `~/opt.set` to make edits.",
    rem: "Use `~/opt.rem` to delete.",
  },

  fire: async function (Anni, Msg) {
    // fire our subcommands or return for misfire
    let sub = Anni.Commands.Sub(Anni, Msg, this.name)
    if (sub) return sub.fire ? sub.fire(Anni, Msg) : false

    // define our post and get the list of options
    let post = { head: this.lang.title, desc: [] }
    let list = await Anni.$Options.all(Msg.auth.id)
    if (list) for (let opt of list) {
      let item = "`" + opt.tag + "`" + ` **${opt.name}**`
      if (opt.desc) item += ` - *${opt.desc}*`
      let list = Anni.$list(opt.roles)
      if (list.length) {
        item += `\n*Required:`
        for (let id of list) {
          let role = Anni.Bot.Role(Msg, id)
          item += ` ${role.name || id}`
        }
        item += `*\n`
      }
      post.desc.push(item, '')
    } else post.desc.push(this.lang.empty, '')
    if (list) post.desc.push(this.lang.rem, this.lang.edit)
    post.desc.push(this.lang.make)

    return Anni.Reply(Msg, post).send()
  },

  test: async function (Anni, Msg, Test) {
    let name = 'tagtest', data = 'my testing data.'
    let str1 = 'Test Field', str2 = 'Testing Field'
    let txt1 = 'Test Block', txt2 = 'Testing Block'

    await Test.Run(Anni, Msg, this.name)
    await Test.Run(Anni, Msg, this.name, `new ${name} -${str1} -${txt1}`)
    await Test.Run(Anni, Msg, this.name)
    await Test.Was(`New Option: ${name}`)

    await Test.Run(Anni, Msg, 'set', `${name} ${data}`)
    await Test.Run(Anni, Msg, 'profile')
    await Test.Run(Anni, Msg, 'wipe', `${name}`)
    await Test.Run(Anni, Msg, 'profile')
    await Test.Run(Anni, Msg, 'set', `${name} ${data}`)
    await Test.Run(Anni, Msg, 'profile')
    await Test.Was(`Filled profile: ${data}, Emptied, ReFilled`)

    await Test.Run(Anni, Msg, this.name, `set ${name} -${str2}`)
    await Test.Run(Anni, Msg, this.name)
    await Test.Run(Anni, Msg, 'profile')
    await Test.Was(`Name changed to ${str2}`)

    await Test.Run(Anni, Msg, this.name, `set ${name} -${str2} -${txt2}`)
    await Test.Run(Anni, Msg, this.name)
    await Test.Was(`Description changed to ${txt2}`)

    await Test.Run(Anni, Msg,  this.name, `rem ${name}`)
    await Test.Run(Anni, Msg,  this.name)
    await Test.Run(Anni, Msg,  'profile')
    await Test.Was(`Removed Option: ${name}`)

    return true
  }
}