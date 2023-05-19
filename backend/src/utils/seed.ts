import mssql from "mssql"
import { readFile } from "fs"
import { DbTables } from "./constant"
import { pool } from "./dbConfig"

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

// ! Use bulk insert when populating the initial db
export const populateTableSchool = async () => {
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
		const table = new mssql.Table(DbTables.SCHOOL)
		table.create = false
		table.columns.add("school_uuid", mssql.UniqueIdentifier, {
			nullable: false,
			primary: true,
		})
		table.columns.add("school_name", mssql.VarChar, { nullable: false })
		schoolNames.forEach((school) => table.rows.add(null, school))
		const res = await connection.request().bulk(table)
		console.log(res)
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

const populateTableSpecialisation = async () => {
	const engineeringSpecialisation = [
		{ name: "Chemical Engineering", level: "UG" },
		{ name: "Civil Engineering", level: "UG" },
		{ name: "Common Year", level: "UG" },
		{
			name: "Electrical and Computer Systems Engineering",
			level: "UG",
		},
		{ name: "Mechanical Engineering", level: "UG" },
		{ name: "Robotics and Mechatronics Engineering", level: "UG" },
		{ name: "Software Engineering", level: "UG" },
		{ name: "Postgraduate Programs", level: "PG" },
	]

	try {
		const connection = await pool.connect()
		const engineering = await connection
			.request()
			.input("school_name", mssql.VarChar, "School of Engineering")
			.query(
				`SELECT [school_uuid] FROM ${DbTables.SCHOOL} WHERE [school_name] = @school_name`
			)
		const engineeringUUID: string = engineering.recordset[0].school_uuid
		const table = new mssql.Table(DbTables.SPECIALISATION)
		table.create = false
		table.columns.add("spec_uuid", mssql.UniqueIdentifier, {
			nullable: false,
			primary: true,
		})
		table.columns.add("school_uuid", mssql.UniqueIdentifier, {
			nullable: false,
		})
		table.columns.add("spec_level", mssql.Char, { nullable: false })
		table.columns.add("spec_name", mssql.VarChar, { nullable: false })
		engineeringSpecialisation.forEach((spec) =>
			table.rows.add(null, engineeringUUID, spec.level, spec.name)
		)
		const res = await connection.request().bulk(table)
		console.log(res)
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

const populateTableStudent = async () => {
	try {
		const connection = await pool.connect()
		const softwareEngineering = await connection
			.request()
			.input("spec_name", mssql.VarChar, "Software Engineering")
			.query(
				`SELECT [spec_uuid] FROM ${DbTables.SPECIALISATION} where [spec_name]=@spec_name`
			)
		const softwareEngineeringUUID: string =
			softwareEngineering.recordset[0].spec_uuid

		const students = [
			{
				stu_fire_id: "L4zyHaha",
				stu_email: "lhah6969@student.monash.edu",
				stu_name: "Lazy Haha",
				stu_id: 34206969,
				enrolment_year: "2023",
				enrolment_intake: 2,
				stu_gender: 0,
				spec_uuid: softwareEngineeringUUID,
			},
			{
				stu_fire_id: "L1on3lP3ps1",
				stu_email: "lpep1030@student.monash.edu",
				stu_name: "Lionel Pepsi",
				stu_id: 30103010,
				enrolment_year: "2021",
				enrolment_intake: 7,
				stu_gender: 1,
				spec_uuid: softwareEngineeringUUID,
			},
		]

		const table = new mssql.Table(DbTables.STUDENT)
		table.create = false
		table.columns.add("stu_fire_id", mssql.VarChar, {
			nullable: false,
			primary: true,
		})
		table.columns.add("stu_email", mssql.VarChar, { nullable: false })
		table.columns.add("stu_name", mssql.VarChar, { nullable: false })
		table.columns.add("stu_id", mssql.Int)
		table.columns.add("enrolment_year", mssql.Date)
		table.columns.add("enrolment_intake", mssql.Int)
		table.columns.add("stu_gender", mssql.Int)
		table.columns.add("spec_uuid", mssql.UniqueIdentifier)
		students.forEach(
			({
				stu_fire_id,
				stu_email,
				stu_name,
				stu_id,
				enrolment_year,
				enrolment_intake,
				stu_gender,
				spec_uuid,
			}) =>
				table.rows.add(
					stu_fire_id,
					stu_email,
					stu_name,
					stu_id,
					enrolment_year,
					enrolment_intake,
					stu_gender,
					spec_uuid
				)
		)
		const result = await connection.request().bulk(table)
		console.log(result)
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

const populateTableOrganiser = async () => {
	try {
		const connection = await pool.connect()
		const stu_fire_id = "L1on3lP3ps1"
		const table = new mssql.Table(DbTables.ORGANISER)
		table.create = false
		table.columns.add("organiser_uuid", mssql.UniqueIdentifier, {
			nullable: false,
			primary: true,
		})
		table.columns.add("parent_uuid", mssql.UniqueIdentifier, {
			nullable: true,
		})
		table.columns.add("organiser_name", mssql.VarChar, { nullable: false })
		table.columns.add("stu_fire_id", mssql.VarChar)
		table.rows.add(null, null, "MUMTEC", stu_fire_id)
		const res = await connection.request().bulk(table)
		console.log(res)
	} catch (error) {
		console.log(error)
	}
}

const populateTableEvent = async () => {
	try {
		const connection = await pool.connect()
		const organiser = await connection
			.request()
			.input("organiser_name", mssql.VarChar, "MUMTEC").query(`
            SELECT * FROM ${DbTables.ORGANISER} WHERE organiser_name=@organiser_name
        `)
		const organiserUUID = organiser.recordset[0].organiser_uuid
		const table = new mssql.Table(DbTables.EVENT)
		table.columns.add("event_uuid", mssql.UniqueIdentifier, {
			nullable: false,
			primary: true,
		})
		table.columns.add("organiser_uuid", mssql.UniqueIdentifier, {
			nullable: false,
		})
		table.columns.add("event_ems_no", mssql.VarChar, { nullable: true })
		table.columns.add("event_start_date", mssql.SmallDateTime, {
			nullable: false,
		})
		table.columns.add("event_end_date", mssql.SmallDateTime, {
			nullable: false,
		})
		table.columns.add("event_title", mssql.VarChar, { nullable: false })
		table.columns.add("event_desc", mssql.VarChar, { nullable: false })
		table.columns.add("event_mode", mssql.Char, { nullable: false })
		table.columns.add("event_venue", mssql.VarChar, { nullable: false })
		table.columns.add("event_capacity", mssql.Int, { nullable: false })
		table.columns.add("event_status", mssql.VarChar, { nullable: false })
		table.columns.add("event_reg_start_date", mssql.SmallDateTime)
		table.columns.add("event_reg_end_date", mssql.SmallDateTime)
		table.columns.add("event_reg_google_form", mssql.VarChar)
		table.rows.add(
			null,
			organiserUUID,
			null,
			"2023-05-11 18:00",
			"2023-05-11 20:00",
			"Test event",
			"Test",
			"P",
			"Building 5",
			100,
			"D",
			"2023-04-01",
			"2023-05-10",
			"www.test-form.com"
		)
		const res = await connection.request().bulk(table)
		console.log(res)
	} catch (error) {
		console.log(error)
	}
}

const populateTableParticipation = async () => {
	try {
		const connection = await pool.connect()
		const stu_fire_id = "L4zyHaha"
		const event = await connection
			.request()
			.input("event_title", mssql.VarChar, "Test event")
			.query(
				`SELECT * FROM ${DbTables.EVENT} WHERE event_title=@event_title`
			)
		const eventUUID = event.recordset[0].event_uuid
		const res = await connection
			.request()
			.input("event_uuid", mssql.UniqueIdentifier, eventUUID)
			.input("stu_fire_id", mssql.VarChar, stu_fire_id)
			.query(
				`INSERT INTO ${DbTables.PARTICIPATION} (event_uuid, stu_fire_id) VALUES (@event_uuid, @stu_fire_id)`
			)
		console.log(res)
		connection.close()
	} catch (error) {
		console.log(error)
	}
}

let timer = 3000
const delay = 3000

// * 1. Run these 3 first, when success, comment them out
// createDatabase()
// setTimeout(createTables, timer)
// setTimeout(alterTables, (timer += delay))

// * 2. Run these individually 1 by 1
// populateTableSchool()
// populateTableSpecialisation()
// populateTableStudent()
// populateTableOrganiser()
// populateTableEvent()
// populateTableParticipation()
