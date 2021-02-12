// msg-remove.js - More intricate removal of messages

module.exports = {
  name: "remove",
  also: [ "rem" ],
  auth: true,
  args: 1,
  gate: 2, 

  help: {
    head: "~/remove [amount] [user]",
    desc: [
      "Delete [amount] messages from the current channel. Optionally only delete [amount] messages from [user] sent the past 300 messages.",
      "{{ ~/remove 10 }}",
      "{{ ~/remove 10 @User }}"
    ]
  },

  lang: {
    limit: "Amount must be between 1 and 300.",
    perms: "I can't delete messages in this channel.",
    found: "Couldn't find the user: {user}",
    clear: "Successfully cleared {removed} messages.",
    check: "Searched {fetched} messages from {name}, deleted {removed}."
  },

  fire: async function (Anni, Msg) {
    let perms = Anni.Bot.Can.Clean(Msg)
    if (!perms) return Anni.Reply(Msg, this.lang.perms).flash()

    let [ amt, user ] = Anni.Arr.pair(Msg.args)
    let amount = parseInt(amt)
    let member = user ? Anni.Bot.User(Msg, user) : false

    let hasLimit = amount && amount <= 300
    let hasFound = !user || (user && member)
    if (!hasLimit) return Anni.Reply(Msg, this.lang.limit).flash()
    if (!hasFound) return Anni.Reply(Msg, this.lang.found, { user }).flash()
    // delete the trigger, put the guild in hold
    await Msg.channel.messages.delete(Msg.channel.lastMessageID)

    Msg.channel.startTyping()
    Anni.Cache.paused(Msg.auth.id, Msg.channel.id)
    // loop through, and delete the messages
    let removed = 0, fetched = 0
    while (removed < amount && fetched < 500) {
      let _left = amount - removed
      let limit = _left > 100 ? 100 : _left
      let batch = await Msg.channel.messages.fetch({ limit })
      if (!batch.size) break // don't delete nothing
      for (const message of batch) {
        fetched += 1
        let target = message[1]
        let remove = !member || member.id == target.author.id
        if (remove) {
          removed += 1
          await target.delete()
        }
      }
    }
    Msg.channel.stopTyping()
    Anni.Cache.delete(Msg.auth.id, 'paused')

    let data = { fetched, removed, member: member ? member.name : '' }
    let post = member ? this.lang.check : this.lang.clear
    return Anni.Reply(Msg, post, data).flash()
  }
}