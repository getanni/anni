// list-birthdays.js - list birthdays in a guild

module.exports = {
  name: "birthdays",
  also: [ "bdays" ],
  auth: true,
  gate: 0,

  help: {
    head: "~/birthdays",
    desc: [
      "Lists all the public birthdays in the server.", "",
      "{{ ~/birthdays }}"
    ]
  },

  lang: {
    title: "Birthdays in {guild.name}",
    empty: "No birthdays set yet."
  },

  fire: async function (Anni, Msg) {
    let list = await Anni.$Profile.all(Msg.auth.id)
    let post = { head: this.lang.title, desc: [] }, data = []

    if (!list) post.desc.push(this.lang.empty)
    else for (let user of list) if (user.bday) {
      let bday = Anni.Profile.bday(user.bday)
      data.push({ ...bday, text: `<@${user.user}> - ${bday.text}`})
    }

    data = Anni.Arr.sort(data, 'left')
    if (data) for (let bday of data) post.desc.push(bday.text)

    return Anni.Reply(Msg, post).send()
  }
}