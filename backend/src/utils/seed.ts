import mssql from "mssql"
import dotenv from "dotenv"
import { readFile } from "fs"
dotenv.config({
	path: "development" === process.env.NODE_ENV ? ".env.dev" : ".env.prod",
})

const sqlPath = (filename: string) => `./src/utils/schema/${filename}`

const config: mssql.config = {
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

const pool = new mssql.ConnectionPool(config)

const createDatabase = async () => {
	const connection = await pool.connect()
	await readFile(sqlPath("create_database.sql"), "utf-8", (err, data) => {
		if (err) console.log(err)
		connection.query(data, (err, res) => {
			if (err) console.log(err)
			console.log(res)
		})
	})
}

const createTables = async () => {
	const connection = await pool.connect()
	const a = await readFile(
		sqlPath("create_tables.sql"),
		"utf-8",
		(err, data) => {
			if (err) console.log(err)
			connection.query(data, (err, res) => {
				if (err) console.log(err)
				console.log(res)
			})
		}
	)
}

const alterTables = async () => {
	const connection = await pool.connect()
	await readFile(sqlPath("alter_tables.sql"), "utf-8", (err, data) => {
		if (err) console.log(err)
		connection.query(data, (err, res) => {
			if (err) console.log(err)
			console.log(res)
		})
	})
}

createDatabase()
setTimeout(createTables, 3000)
setTimeout(alterTables, 5000)
