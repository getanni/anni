/**********************************/
/**   Logger.js                  **/
/**------------------------------**/
/**   A custom logger intance.   **/
/**------------------------------**/
/**********************************/

const winston = require('winston')
const logbook = require('read-last-lines')
const { format, transports } = winston, { combine } = format

let level = 'anni', filename = 'anni.log', time = 'HH:mm:ss'

let levels = { warn: 0, info: 1, test: 2, anni: 3 }
let colors = { warn: 'red', info: 'blue', test: 'green', anni: 'magenta' }
let layout = log => `${log.timestamp} [${log.level}] ${log.message}`

let output = [ format.timestamp({ format: time }), format.printf(layout)]
let pretty = [ ...output, format.colorize({ all: true }) ]

winston.addColors(colors)
const Logger = winston.createLogger({
  level, levels, transports: [
    new transports.File({ filename, format: combine(...output) }),
    new transports.Console({ format: combine(...pretty) })
  ]
})

module.exports = Model => {
  Model.Log      = (text) => Logger.info(text)
  Model.LogTests = (text) => Logger.test(text)

  Model.State = (text, name) => Model.Print(text, name)
  Model.Error = (text, name) => Model.Print(text, name, true)

  Model.Print = function (text, name, err) {
    let desc = text.stack || text
    let head = typeof name === 'string' ? name : ''
    let post = { head, desc }, log = head || desc

    if (err) post.desc = "```" + desc + "```"
    if (err) { Logger.warn(log) } else { Logger.anni(log) }
    if (!this.ready) return

    if (err) post.text = `<@${this.bot.owners[0]}>`
    let channel = this.channels.cache.get(this.bot.logs)
    if (channel)  this.Reply({ channel }, post).send()
  }

  Model.Logs = async () => await logbook.read(filename, 30)
}