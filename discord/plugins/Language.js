// Language.js - language and language replacement

module.exports = Anni => {
  Anni.Lang = {
    Parse: function (Msg, data, values) {
      let rules = this.$rules
      for (let r in rules)  data = this.swap(data, r, rules[r](Msg))
      for (let v in values) data = this.swap(data, v, values[v], true)
      return this.swap(data, '{/', '{') // unescape
    },

    swap: function(str, key, val, prop) {
      let find = prop ? `{${key}}` : key
      return str && str.split ? str.split(find).join(val) : str
    },

    $rules: {
      // formatting
      '{{ ':   () => '```js\n',
      '{{':    () => '```js\n',
      ' }}':   () => '\n```',
      '}}':    () => '\n```',
      ' || ':  () => '\n',
      '||':    () => '\n',
      '{_}':   () => '\u200b',
      '{nl}':  () => '\n\u200b',
      // static info and URLs
      '{ver}':      () => Anni.pkg.version,
      '{embeds}':   () => URLs.embeds,
      '{getids}':   () => URLs.getids,
      '{server}':   () => URLs.server,
      '{invite}':   () => URLs.invite,
      '{website}':  () => URLs.website,
      '{timezone}': () => URLs.timezone,
      // discord information
      '{bot}':      () => Anni.user ? `<@${Anni.user.id}>` : '',
      '{users}':    () => Anni.user ? Anni.Bot.Members() : '',
      '{guilds}':   () => Anni.user ? Anni.Bot.Servers() : '',
      '~/':      (Msg) => Anni.user ? Msg.prefix : 'anni.',
      // guild information
      '{guild.id}':    (Msg) => Msg.auth ? Msg.auth.id : '',
      '{guild.name}':  (Msg) => Msg.auth ? Msg.auth.name : 'Server',
      '{guild.count}': (Msg) => Msg.auth ? Msg.auth.memberCount : '',
      '{guild.owner}': (Msg) => Msg.auth ? `<@${Msg.auth.ownerID}>` : '',
      // author information
      '{user}':      (Msg) => Msg.author ? `<@${Msg.author.id}>` : '',
      '{user.id}':   (Msg) => Msg.author ? Msg.author.id : '',
      '{user.name}': (Msg) => Msg.author ? Msg.author.username : '',
      // message information
      '{msg}':  (Msg) => Msg.full ? Msg.full : '',
      '{opts}': (Msg) => Msg.args ? Msg.args.join(' ') : '',
      '{args}': (Msg) => Msg.args ? Msg.args.length : ''
    }
  }

  const URLs = {
    ...Anni.cfg.URLs,
    embeds:   'https://leovoel.github.io/embed-visualizer/',
    timezone: 'http://kevalbhatt.github.io/timezone-picker',
    getids:   'https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-'
  }
}