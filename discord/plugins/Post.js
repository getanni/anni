// Post.js - for embed management

module.exports = Anni => {
  Anni.Post = {
    Parse: function (data) {
      try { let embed = JSON.parse(data)
        return embed.embed ? embed : { embed }
      } catch(e) { return false }
    },
    Build: function (Msg, data, values) {
      // define parser helper to minimize text
      let parse = (str) => Anni.Lang.Parse(Msg, str, values)
      // quick helper to join arrays with new lines
      let joins = (arr) => Array.isArray(arr) ? arr.join('\n') : arr
      // extract text
      let text = data.text ? parse(data.text) : false;
      if (text) delete data.text
      // define our base embed
      let embed = { author: {}, fields: [], color: Msg.color || '0xD18FE8' }
      // join description arrays with new line
      data.desc = joins(data.desc)
      // add other properties
      for (let prop in data) {
        let val = data[prop]
        if (prop == 'grid') {
          for (let grid of val) {
            let name   = parse(grid.name || '\u200b')
            let value  = parse(joins(grid.text) || '\u200b')
            let inline = parse(grid.col ? true : false)
            embed.fields.push({ name, value, inline })
          }
        }
        else if (prop == 'head')  embed.title = parse(val)
        else if (prop == 'name')  embed.author.name = parse(val)
        else if (prop == 'icon')  embed.author.icon_url = parse(val)
        else if (prop == 'desc')  embed.description = parse(val)
        else if (prop == 'foot')  embed.footer = { text: parse(val) }
        else if (prop == 'image') embed.image = { url: parse(val) }
        else if (prop == 'thumb') embed.thumbnail = { url: parse(val) }
        else embed[prop] = parse(val)
      }
      // delete empty properties
      if (!embed.author.name && !embed.author.icon_url) delete embed.author
      for (let opt in embed) if (this.none(embed[opt])) delete embed[opt]

      // make sure the embed isn't too long, split it up
      let post = text ? [ text, { embed } ] : [ { embed } ]
      let long = JSON.stringify(embed)
      if (long.length < 1995) return [ post ]

      // split by description, preserve other elements
      let split = embed.description.match(/[\s\S]{1,1800}/g)

      let posts = []; for (let desc of split) {
        let copy = { ...embed, description: desc }
        if (posts.length) posts.push([ copy ])
        else if (text) posts.push([ text, copy ])
      } return posts
    },
    
    none: (obj) => Object.keys(obj).length < 1
  }
}