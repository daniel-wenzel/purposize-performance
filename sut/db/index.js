const Sequelize = require("sequelize")
const purposize = require("purposize")
const config = require("config")

const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD
const useCache = process.env.USE_CACHE

if (!db_user || !db_password) {
  console.error(`Please specify db credentials using
    export DB_USER=...
    expert DB_PASSWORD=...`)
  process.exit(1)
}
/*
console.log(db_user)
console.log(db_password)
console.log(config.get("db.host"))
console.log(config.get("db.database"))
*/
const sequelize = new Sequelize(config.get("db.database"), db_user, db_password, {
  host: config.get("db.host"),
  dialect: 'mysql',
  logging: false
  //logging: console.log // Prevent sequelize from logging all SQL queries
});
if (process.env.USE_PURPOSIZE=="true") {
  console.log("USING PURPOSIZE")
  console.log("USING CACHE: "+useCache)
  purposize.init(sequelize, {
    cacheEnabled: useCache
  })
}
else {
  console.log("NOT USING PURPOSIZE")
}
const Poster = require("./Poster")(sequelize)


// syncing will take a second at startup, but as we only expose api methods that shouldnt be critical
async function init() {
  await sequelize.sync({
    force: true // drop tables at each restart
  })

  if (process.env.USE_PURPOSIZE=="true") {
    await purposize.loadPurposes('./purposes.yml')
  }
//  fakeSomeDate()
}
init()

module.exports = {
  poster: Poster
}
