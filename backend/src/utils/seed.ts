import mssql from "mssql"
import { readFile, promises as fs } from "fs"
import { pool } from "./dfConfig"

const sqlPath = (filename: string) => `./src/utils/schema/${filename}`

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

// createDatabase()
// setTimeout(createTables, 3000)
// setTimeout(alterTables, 5000)

// ! Use bulk insert when populating the initial db
export const createSchool = async () => {
	const school_names = [
		"School of Arts and Social Sciences",
		"School of Business",
		"School of Engineering",
		"School of Information Technology",
		"School of Pharmacy",
		"School of Science",
	]
	const connection = await pool.connect()
	const table = new mssql.Table("[sems_demo].[dbo].[tbl_school]")
	table.create = false
	table.columns.add("school_uuid", mssql.UniqueIdentifier, {
		nullable: false,
		primary: true,
	})
	table.columns.add("school_name", mssql.VarChar, { nullable: false })
	school_names.forEach((school) => table.rows.add(null, school))

	try {
		await connection.request().bulk(table, (err, res) => {
			console.log(res)
		})
	} catch (error) {
		console.log(error)
	}
}

// TODO shift this to controller
export const updateSchool = async (
	school_uuid: any,
	schoolData: { school_name: any }
) => {
	const connection = await pool.connect()
	try {
		const updateSchoolSQL = await fs.readFile(
			sqlPath("update_school.sql"),
			"utf-8"
		)
		const update = await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, school_uuid)
			.input("school_name", mssql.VarChar, schoolData.school_name)
			.query(updateSchoolSQL)
		return update.recordset
	} catch (error) {
		console.log(error)
		throw new Error("Failed to update school.")
	}
}

// TODO shift to controller
export const deleteSchool = async (school_uuid: any) => {
	const connection = await pool.connect()
	try {
		const deleteSchoolSQL = await fs.readFile(
			sqlPath("delete_school.sql"),
			"utf-8"
		)
		await connection
			.request()
			.input("school_uuid", mssql.UniqueIdentifier, school_uuid)
			.query(deleteSchoolSQL)
	} catch (error) {
		console.log(error)
		throw new Error("Failed to delete school.")
	}
}
