// roleDelete.js - remove roles for dashboard

module.exports = async (Anni, role) => {
  let details = role.guild ? Anni.Bot.Details(role.guild) : false
  return details ? await Anni.$Details.set(details) : false
}