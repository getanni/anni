// embed-post.js - for posting embeds in the server

module.exports = {
  name: "post",
  also: [ "bulletin", "embed" ],
  args: 1,
  gate: 2,

  help: {
    head: "~/post [embed]",
    desc: [
      "Print a 'bulletin' (embed) in the channel.",
      "You can use an embed generator [like this one]({embeds}) to help you quickly make your own bulletin/embed.", "",
      "{{ ~/post { 'title': 'Message!' } }}"
    ]
  },

  lang: { embed: "Sorry, that embed didn't parse properly." },

  fire: async function (Anni, Msg) {
    // make sure we can embed, return if no
    let embed = Anni.Post.Parse(Msg.full)
    if (!embed) return Anni.Reply(Msg, this.lang.embed).send()
      
    // otherwise send the embed and clean up
    let post = await Msg.channel.send(embed)
    await Anni.Commands.clear(Msg)
    return post
  },

  test: async function (Anni, Msg, Test) {
    await Test.Run(Anni, Msg, this.name, '{ "title": "hello" }')
    await Test.Was('Title: hello')

    await Test.Run(Anni, Msg, this.name, `{ "thing": "value" }`)
    await Test.Run(Anni, Msg, this.name, `{ thing }`)
    await Test.Was('Empty + Fail.')
    
    return true
  }
}