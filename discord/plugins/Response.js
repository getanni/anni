// Response.js - the over complicated response system

module.exports = Anni => {
  Anni.Escape = (str) => str.split('{').join('{/')
  Anni.Reply  = (Msg, data, values) => new Anni.Response(Msg, data, values)

  Anni.Response = function (Msg, data, values) {
    this.Msg = Msg
    // if string, convert to a simple post object to parse
    data = typeof data === 'string' ? { desc: data } : data
    // convert our post object into a discord embed
    this.response = Anni.Post.Build(Msg, data, values)
  }

  Anni.Response.prototype.send = function () { return this.reply() }

  Anni.Response.prototype.dm = function (pre) {
    if (!this.Msg.deleted) this.Msg.react('☑️')
    // quick and dirty prefix replacement for DMs
    let temp = JSON.stringify(this.response).split(this.Msg.prefix)
    if (!pre)  this.response = JSON.parse(temp.join(''))
    return this.reply(true) 
  }

  Anni.Response.prototype.flash = async function (long) {
    let flashed = await this.reply()
    if (this.Msg.guild && !this.Msg.tests) {
      await Anni.Wait(long ? 10000 : 5000)
      if (flashed && !flashed.deleted) flashed.delete()
    }
  }

  Anni.Response.prototype.clean = async function (long) {
    if (this.Msg.guild && !this.Msg.tests) {
      Anni.Commands.clear(this.Msg)
      return this.flash(long)
    } else return this.reply()
  }
  
  Anni.Response.prototype.reply = function (dm) {
    if (!Anni.Bot.Can.Reply(this.Msg)) return false
    for (let i = 0; i < this.response.length; i++) {
      let last = i == this.response.length - 1
      let auth = dm ? this.Msg.author : this.Msg.channel
      // return on last response
      let error = () => Anni.Log(`Couldn't Send Message.`)
      if (!last)  auth.send(...this.response[i]).catch(error)
      else return auth.send(...this.response[i]).catch(error)
    }
  }

}