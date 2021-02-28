// Reminder.js - initiate reminders for birthdays

module.exports = Anni => {
  Anni.Reminders = {
    check: async function () {
      let date = Anni.Time.curr(), data = await Anni.$Records.get()
      if (data.ran == date.day || parseInt(date.hours) < 4) return
      Anni.Log(`Checking Reminders...`)

      let reminder = await Anni.$Profile.bday(date.next)
      let announce = await Anni.$Profile.bday(date.curr)
      if (reminder) await this.fire(reminder, date.next, 'reminder')
      if (announce) await this.fire(announce, date.curr, 'announce')
      Anni.Log(`Fired ${reminder.length || 0} Reminders.`)
      Anni.Log(`Fired ${announce.length || 0} Announcements.`)

      await Anni.$Records.set({ ran: date.day })
    },
    fire: async function (list, date, type) {
      let dings = await this.sort(list)
      for (let id in dings) {
        let configs = dings[id]
        let message = configs[type]
        let members = configs.users

        message = message.split('{date}').join(date)
        message = message.split(`{users}'s`).join('{users}')
        message = message.split('{users}').join(`{users}'s`)
        message = message.split('{users}').join(members.join("'s, "))
        message = message.split('{user}').join(members.join(", "))

        let post = { text: members.join(" "), desc: message }
        let channel = Anni.channels.cache.get(configs.birthday)
        if (channel) await Anni.Reply({ channel }, post).send()
      }
    },
    sort: async function (list) {
      let data = {}; for (let profile of list) {
        let servers = Anni.$list(profile.list)
        for (let guild of servers) {
          let configs = await Anni.$Configs.get(guild) 
          if (configs.birthday) {
            if (data[guild]) data[guild].users.push(`<@${profile.user}>`)
            else data[guild] = { ...configs, users: [`<@${profile.user}>`]}
          }
        }
      } return data;
    }
  }
}