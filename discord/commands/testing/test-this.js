// test-this.js - for random impromptu tests

module.exports = {
  name: 'test-this',
  hide: true,
  nodm: true,
  args: 1,
  gate: 9,

  help: {
    head: "~/test-this",
    desc: "Does a test for .... ?"
  },

  fire: async function (Anni, Msg, Test) {
    return Anni.Reply(Msg, 'No Tests To Run.').send(Test)
  }
}