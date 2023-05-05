import mssql from "mssql"
import { readFile, promises as fs } from "fs"
import { dbConfig } from "./dfConfig"

const sqlPath = (filename: string) => `./src/utils/schema/${filename}`

const pool = new mssql.ConnectionPool(dbConfig)

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
// setTimeout(createTables, 3000)
// setTimeout(alterTables, 5000)

// school
const school_names = [
	"School of Arts and Social Sciences",
	"School of Business",
	"School of Engineering",
	"School of Information Technology",
	"School of Pharmacy",
	"School of Science",
]

export const createSchool = async (schoolData: { school_name: any }) => {
	const connection = await pool.connect()
	try {
		const createSchoolSQL = await fs.readFile(
			sqlPath("create_school.sql"),
			"utf-8"
		)
		const create = await connection
			.request()
			.input("school_name", mssql.VarChar, schoolData.school_name)
			.query(createSchoolSQL)
		return create.recordset
	} catch (error) {
		console.log(error)
		throw new Error("Failed to create school.")
	}
}

// school_names.map(name => createSchool({school_name: name}));

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
