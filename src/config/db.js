import sql from 'mssql'
import '../config.js'

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

export const connectDB = async () => {
  return await sql.connect(sqlConfig)
}
/* sql.connect(sqlConfig, err => {
  if (err) {
    throw err
  }
  console.log('Connection Successful!')
}) */

// export default sql
