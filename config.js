module.exports = {
    development: {
      port: process.env.PORT || 3000,
    },
    mysql: {
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "11avgust",
        port: 3306,
        database: "godrunk"
    }
  }