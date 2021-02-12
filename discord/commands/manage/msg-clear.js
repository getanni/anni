// msg-clear.js - For batch removing messages in a channel

module.exports = {
  name: "clear",
  also: [ "clean" ],
  auth: true,
  args: 1,
  gate: 2, 

  help: {
    head: "~/clear [amount]",
    desc: [
      "Delete [amount] (up to 100) messages from the current channel.",
      "{{ ~/clear 10 }}"
    ]
  },

  lang: {
    limit: "Amount must be between 1 and 100.",
    perms: "I can't delete messages in this channel.",
    parts: "Cleared {done} of {total} messages, the rest were too old to clear - try using `~/remove` to remove them.",
    clear: "Successfully cleared {total} messages.",
    empty: "No messages to delete."
  },

  fire: async function (Anni, Msg) {
    let can = Anni.Bot.Can.Clean(Msg)
    if (!can) return Anni.Reply(Msg, this.lang.perms).flash()
    let limit = parseInt(Msg.args[0])

    let hasLimit = limit && limit <= 100
    if (!hasLimit) return Anni.Reply(Msg, this.lang.limit).flash()
    // delete the trigger
    await Msg.channel.messages.delete(Msg.channel.lastMessageID)

    let batch = await Msg.channel.messages.fetch({ limit })
    if (!batch.size) return Anni.Reply(Msg, this.lang.empty).flash()

    let bulk = await Msg.channel.bulkDelete(batch, true)
    let done = bulk.size, total = batch.size, data = { done, total }

    if (done < total) return Anni.Reply(Msg, this.lang.parts, data).flash()

    return Anni.Reply(Msg, this.lang.clear, data).flash()
  },

  test: async function (Anni, Msg, Test) {
    for (let i = 0;i < 15;i++) await Msg.channel.send(i + 1)
    
    await Test.Run(Anni, Msg, this.name, '15')
    await Test.Was(`No Messages.`)

    return true
  }
}