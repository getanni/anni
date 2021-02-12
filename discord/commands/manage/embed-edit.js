// embed-edit.js - for editing embeds posted  in the server

module.exports = {
  name: "edit",
  args: 2,
  gate: 2,

  help: {
    head: "~/edit [messageID] [content]",
    desc: [
      "Edits message with ID `messageID` to `content`",
      "Message must be a message posted by the bot, bots cannot edit another user's message. Message must be in the same channel as the command.",
      "`content` can be a text or an embed.",
      "[Embed Generator]({embeds}) - [Get Message IDs]({getids})", "",
      "{{ ~/edit 606874363089649684 { 'title': 'Message!' } }}"
    ]
  },

  lang: {
    edits: "Sorry, I can only edit my own messages.",
    embed: "Sorry, something went wrong with that embed.",
    found: "Sorry, I couldn't find message with ID `{id}`"
  },

  fire: async function (Anni, Msg) {
    let [ id, content ] = Anni.Arr.pair(Msg.args)
    let isEmbed = content.indexOf('{') === 0
    let isValid = id.length == 18

    // verify that what we have is an actual embed
    if (isEmbed) content = Anni.Post.Parse(content)
    if (!content) return Anni.Reply(Msg, this.lang.embed).send()

    // try and find the message, return if no message
    let found = isValid ? await Msg.channel.messages.fetch(id) : false
    if (!found) return Anni.Reply(Msg, this.lang.found, { id }).send()

    // return if the bot isn't the author
    let isAnni = found.author.id == Anni.user.id
    if (!isAnni) return Anni.Reply(Msg, this.lang.edits).send()

    // edit the message, embed or message
    if (!isEmbed) found.edit(content)
    else found.edit(found.content, content)

    // delete the trigger as pseudo clear
    await Anni.Commands.clear(Msg)
    return found
  },

  test: async function (Anni, Msg, Test) {
    let post = await Test.Run(Anni, Msg, 'post', '{ "title": "hello" }')

    await Test.Run(Anni, Msg, this.name, `${post.id} { "title": "goodbye" }`)
    await Test.Was('Title: Goodbye')

    await Test.Run(Anni, Msg, this.name, `${post.id} { "thing": "value" }`)
    await Test.Run(Anni, Msg, this.name, `${post.id} { thing }`)
    await Test.Was('Empty + Fail.')
    
    return true
  }
}