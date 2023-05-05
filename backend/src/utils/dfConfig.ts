import dotenv from "dotenv"
import mssql from "mssql"
dotenv.config({
	path: "development" === process.env.NODE_ENV ? ".env.dev" : ".env.prod",
})

export const dbConfig: mssql.config = {
	user: process.env.sa,
	password: process.env.password,
	server: process.env.server || "",
	database: process.env.database,
	options: {
		trustServerCertificate: true,
		trustedConnection: true,
		enableArithAbort: true,
	},
	port: Number(process.env.db_port) || 1433,
}
