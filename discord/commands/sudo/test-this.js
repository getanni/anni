// test-this.js - for random impromptu tests

module.exports = {
  name: 'test-this',
  gate: 9,
  args: 1,
  hide: true,
  nodm: true,

  help: {
    head: "~/test-this",
    desc: [ "Does a test for .... ?" ]
  },

  fire: async function (Anni, Msg, Test) {
    console.log('no tests atm')
    return true
  }
}