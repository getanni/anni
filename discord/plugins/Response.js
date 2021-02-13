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

  Anni.Response.prototype.send = function (dm) {
    // return if we can't reply
    if (!Anni.Bot.Can.Reply(this.Msg)) {
      this.Msg.err = `Unable to send messages in channel.`
      return Anni.Commands.log(this.Msg)
    }
    // send out all the responses
    for (let i = 0;i < this.response.length;i++) {
      // log any errors sending a message
      let oops = () => Anni.Log(`Couldn't Send Message`)
      // return on the last response sent
      let last = i == this.response.length - 1
      // figure out if we're DMing or responding
      let auth = dm ? this.Msg.author : this.Msg.channel
      // send out the response
      if (!last)  auth.send(...this.response[i]).catch(oops)
      else return auth.send(...this.response[i]).catch(oops)
    }
  }

  Anni.Response.prototype.flash = async function (long) {
    let flashed = await this.send()
    // only delete if we're in a guild and not testing
    if (this.Msg.guild && !this.Msg.tests) {
      await Anni.Wait(long ? 10000 : 5000)
      if (flashed && !flashed.deleted) flashed.delete()
    }
  }

  Anni.Response.prototype.clean = async function (long) {
    // only delete if we're in a guild and not testing
    if (this.Msg.guild && !this.Msg.tests) {
      Anni.Commands.clear(this.Msg)
      return this.flash(long)
    } else return this.send()
  }

  Anni.Response.prototype.dm = function () {
    if (!this.Msg.deleted) this.Msg.react('☑️')
    return this.send(true) 
  }

}