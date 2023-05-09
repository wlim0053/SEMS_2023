import mssql from "mssql"
import { readFile, promises as fs } from "fs"
import { pool } from "./dbConfig"

const sqlPath = (filename: string) => `./src/utils/schema/${filename}`
const sqlTable = (tableName: string) => `[sems_demo].[dbo].[${tableName}]`

const createDatabase = async () => {
	const connection = await pool.connect()
	await readFile(sqlPath("create_database.sql"), "utf-8", (err, data) => {
		if (err) console.log(err)
		connection.query(data, (err, res) => {
			if (err) console.log(err)
			console.log(res)
			connection.close()
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
				connection.close()
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
			connection.close()
		})
	})
}

// ! Use bulk insert when populating the initial db
export const createSchool = async () => {
	const schoolNames = [
		"School of Arts and Social Sciences",
		"School of Business",
		"School of Engineering",
		"School of Information Technology",
		"School of Medicine, Health Science and Psychology",
		"School of Pharmacy",
		"School of Science",
	]

	try {
		const connection = await pool.connect()
		const table = new mssql.Table(sqlTable("tbl_school"))
		table.create = false
		table.columns.add("school_uuid", mssql.UniqueIdentifier, {
			nullable: false,
			primary: true,
		})
		table.columns.add("school_name", mssql.VarChar, { nullable: false })
		schoolNames.forEach((school) => table.rows.add(null, school))
		await connection.request().bulk(table)
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

const createDisciplines = async () => {
	const engineeringDisciplines = [
		"Chemical Engineering",
		"Civil Engineering",
		"Common Year",
		"Electrical and Computer Systems Engineering",
		"Mechanical Engineering",
		"Robotics and Mechatronics Engineering",
		"Software Engineering",
	]

	try {
		const connection = await pool.connect()
		const engineering = await connection
			.request()
			.input("school_name", mssql.VarChar, "School of Engineering")
			.query(
				"SELECT [school_uuid] FROM [sems_demo].[dbo].[tbl_school] WHERE [school_name] = @school_name"
			)
		const engineeringUUID: string = engineering.recordset[0].school_uuid
		const table = new mssql.Table(sqlTable("tbl_discipline"))
		table.create = false
		table.columns.add("dis_uuid", mssql.UniqueIdentifier, {
			nullable: false,
			primary: true,
		})
		table.columns.add("dis_name", mssql.VarChar, { nullable: false })
		table.columns.add("school_uuid", mssql.UniqueIdentifier, {
			nullable: false,
		})
		engineeringDisciplines.forEach((discipline) =>
			table.rows.add(null, discipline, engineeringUUID)
		)
		await connection.request().bulk(table)
	} catch (error) {
		console.log(error)
	}
}

// createDatabase()
// setTimeout(createTables, 3000)
// setTimeout(alterTables, 5000)
// createSchool()
// createDisciplines()
