// test-ding.js - test the reminder system

module.exports = {
  name: 'test-ding',
  hide: true,
  nodm: true,
  args: 1,
  gate: 9,

  help: {
    head: "~/test-dings",
    desc: "Does a test for reminders."
  },

  fire: async function (Anni, Msg, Test) {
    let records = await Anni.$Records.get()
    let configs = await Anni.$Configs.get(Msg.auth.id)
    // can't test announcements if no channel is set
    if (!configs.birthday) return Anni.Reply(Msg, 'No Channel Set.').send()

    let date = Anni.Time.curr(), last = records.ran

    // set birthday to today, reset ran and check for it
    await Test.Run(Anni, Msg, 'bday', date.curr)
    await Anni.$Records.set({ ran: last - 1 })
    await Anni.Reminders.check()

    // set birthday to next week, reset ran and check for it
    await Test.Run(Anni, Msg, 'bday', date.next)
    await Anni.$Records.set({ ran: last - 1 })
    await Anni.Reminders.check()

    return true
  }
}