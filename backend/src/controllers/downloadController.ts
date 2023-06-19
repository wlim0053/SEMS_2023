import { Request, Response, NextFunction } from "express"
import fs from "fs"
import path from "path"
import PDFDocument from "pdfkit"

export const downloadCertificateController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const titleFont = path.resolve(
			"static",
			"fonts",
			"EdwardianScriptITC.ttf"
		)
		const signatureFont = path.resolve(
			"static",
			"fonts",
			"LucidaHandwritingItalic.ttf"
		)

		// setting document metadata
		const doc = new PDFDocument({
			size: "A4",
			info: {
				Title: "Certificate of Attendance",
				Author: "MUMTEC",
				Subject: "Certificate of Attendance for Event/Program",
			},
		})

		// register font
		doc.registerFont("title", titleFont)
		doc.registerFont("signature", signatureFont)
		doc.pipe(res) // HTTP response
		// add stuff to PDF here
		doc.image(
			path.resolve("static", "images", "monash_malaysia.png"),
			35,
			doc.y,
			{
				scale: 0.75,
			}
		).moveDown(2)

		doc.fontSize(50)
			.font("title")
			.text("Certificate of Participation", {
				align: "center",
			})
			.moveDown(1)

		doc.font("Times-Roman")
			.fontSize(20)
			.text("This certifies that", { align: "center" })
			.moveDown(1)

		doc.fontSize(25)
			.text("Tunku Abdul Rahman ", {
				align: "center",
				underline: false,
			})
			.moveDown(1)

		doc.fontSize(20)
			.text("has attended the", { align: "center" })
			.moveDown(0.5)
		doc.text("Merdeka Parade", { align: "center" }).moveDown(0.5)
		doc.text("held on", { align: "center" }).moveDown(0.5)
		doc.text("31 August 1957", { align: "center" }).moveDown(5)

		let y = doc.y

		// left signature
		doc.font("signature")
			.fontSize(20)
			.text("Safeiya Musafa Hussein", { columns: 2, align: "center" })
		doc.font("Times-Roman")
			.fontSize(11)
			.text(
				"Safeiya Musafa Hussein\n President\n Monash University Malaysia Engineering Clubs (MUMEC)\n\n\n\n",
				{
					columns: 2,
					align: "center",
				}
			)

		doc.text("Yeap Lai Hoon", { columns: 2, align: "center" })

		// finalise the PDF and end the stream
		doc.end()
	} catch (error) {
		console.log(error)
		next(error)
	}
}
