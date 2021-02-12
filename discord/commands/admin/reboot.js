// reboot.js - check for updates and reboot

module.exports = {
  name: "reboot",
  also: [ "update" ],
  hide: true,
  gate: 9,

  help: {
    head: "~/reboot",
    desc: "Reboots the bot."
  },

  fire: async function (Anni, Msg) {
    Anni.Exec('git pull', async (err, yay) => {
      if (err || !yay) return Anni.Reply(Msg, 'Error Updating').send()
      // if we get an object back, we'll need to inspect it
      const inspect = data => require('util').inspect(data, { depth: 2 })
      if (typeof yay !== 'string') yay = inspect(yay)
      // print out the status of git pull
      await Anni.Reply(Msg, `{{ ${yay} }}`).send()
      // reboot to apply updates
      await Anni.Reply(Msg, '{{ Rebooting... }}').send()
      return Anni.Exec('pm2 restart 1')
    })
  }
}