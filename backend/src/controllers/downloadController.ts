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
		// setting document metadata
		const doc = new PDFDocument({
			size: "A4",
			info: {
				Title: "Certificate of Attendance",
				Author: "MUMTEC",
				Subject: "Certificate of Attendance for Event/Program",
			},
		})

		doc.pipe(res) // HTTP response
		// add stuff to PDF here
		doc.registerFont("Arial", path.resolve("static", "fonts", "arial.TTF"))
		doc.registerFont(
			"Arial Bold",
			path.resolve("static", "fonts", "arial-bold.TTF")
		)
		doc.registerFont(
			"Arial Italic",
			path.resolve("static", "fonts", "arial-italic.TTF")
		)

		doc.image(path.resolve("static", "images", "cert_header.jpg"), 0, 0, {
			scale: 0.24,
		}).moveDown(14)

		doc.fontSize(24)
			.font("Arial")
			.text("Certificate of Participation", { align: "center" })
			.moveDown(1)

		doc.fontSize(16)
			.text("This certifies that", { align: "center" })
			.moveDown(1)

		doc.font("Arial Bold")
			.fontSize(20)
			.text("Tunku Abdul Rahman", {
				align: "center",
				// underline: true,
			})
			.moveDown(0.5)

		doc.font("Arial")
			.fontSize(16)
			.text("has attended the", { align: "center" })
			.moveDown(1)

		doc.font("Arial Bold")
			.fontSize(25)
			.text(
				`Career Talk By Vitrox "Resume VS Attitude" Sustainability, green walk + star walk + penang bridge 42km full marathan run`,
				{
					align: "center",
				}
			)
			.moveDown(0.5)

		doc.font("Arial")
			.fontSize(16)
			.text("held on 31 August 1957", { align: "center" })
			.moveDown(5)

		const signatureY = 614

		const width = (doc.page.width - 2 * doc.x) / 2 // (width - l & r margins) / 2
		doc.rect(doc.x, signatureY, width, 100).stroke()
		doc.rect(doc.page.width / 2, signatureY, width, 100).stroke()

		// left signature
		doc.font("Arial Bold")
			.fontSize(12)
			.text("Safeiya Mustafa Hussein", doc.x, signatureY + 100, {
				width,
				align: "center",
			})
		doc.font("Arial Italic")
			.fontSize(12)
			.text(
				"President\n Monash University Malaysia Engineering Clubs (MUMEC)",
				{ width, align: "center" }
			)

		// right signature
		doc.font("Arial Bold")
			.fontSize(12)
			.text("Yeap Lai Hoon", doc.page.width / 2, signatureY + 100, {
				width,
				align: "center",
			})
		doc.font("Arial Italic")
			.fontSize(12)
			.text(
				"Manager\n Student Experience and Engagement Monash University Malaysia",
				{
					width,
					align: "center",
				}
			)

		// finalise the PDF and end the stream
		doc.end()
	} catch (error) {
		console.log(error)
		next(error)
	}
}
