import PDFDocument from "pdfkit"
import path from "path"
import { UserWithFireId } from "../interfaces/user"
import { EventWithOrganiser } from "../interfaces/event"

export const generateCertificate = (data: {
	user: UserWithFireId
	event: EventWithOrganiser
}) => {
	return new Promise<Buffer>((resolve) => {
		const { user, event } = data
		const doc = new PDFDocument({
			size: "A4",
			info: {
				Title: "Certificate of Attendance",
				Author: event.organiser_name,
				Subject: `Certificate of Attendance of ${
					event.event_title
				} for ${user.user_fname + " " + user.user_lname}`,
			},
		})

		let buffers: Buffer[] = []
		doc.on("data", buffers.push.bind(buffers))
		doc.on("end", () => {
			resolve(Buffer.concat(buffers))
		})
		// register fonts
		doc.registerFont(
			"Arial",
			path.resolve(__dirname, "../../static/fonts/arial.TTF")
		)
		doc.registerFont(
			"Arial Bold",
			path.resolve(__dirname, "../../static/fonts/arial-bold.TTF")
		)
		doc.registerFont(
			"Arial Italic",
			path.resolve(__dirname, "../../static/fonts/arial-italic.TTF")
		)

		doc.image(path.resolve("static", "images", "cert_header.jpg"), 0, 0, {
			scale: 0.24,
		}).moveDown(12.6)

		doc.fontSize(24)
			.font("Arial")
			.text("Certificate of Participation", { align: "center" })
			.moveDown(0.875)

		doc.fontSize(16)
			.text("This certifies that", { align: "center" })
			.moveDown(0.875)

		doc.font("Arial Bold")
			.fontSize(20)
			.text(
				user.user_fname.toUpperCase() +
					" " +
					user.user_lname.toUpperCase(),
				{
					align: "center",
				}
			)
			.moveDown(0.7)

		doc.font("Arial")
			.fontSize(16)
			.text("has attended the", { align: "center" })
			.moveDown(0.875)

		doc.font("Arial Bold")
			.fontSize(20)
			.text(event.event_title, {
				align: "center",
			})
			.moveDown(0.7)

		doc.font("Arial")
			.fontSize(16)
			.text(
				`held on ${new Date(event.event_start_date).toLocaleDateString(
					"en-AU",
					{
						year: "numeric",
						month: "long",
						day: "numeric",
					}
				)}`,
				{ align: "center" }
			)
			.moveDown(0.875)

		doc.font("Arial")
			.fontSize(16)
			.text("organised by", {
				align: "center",
			})
			.moveDown(0.875)

		doc.font("Arial Bold")
			.fontSize(20)
			.text("Nazi Socalist Party, LGBTQ+ & The Jews", { align: "center" }) // todo: allow inputs from organiser
			.moveDown(2)

		const width = (doc.page.width - 2 * doc.x) / 3
		doc.image(
			path.resolve(__dirname, "../../static/images/sig.png"),
			(doc.page.width - width) / 2,
			doc.y,
			{
				width,
				align: "center",
			}
		).moveDown() // todo change to ms yeap signature

		doc.font("Arial Bold")
			.fontSize(12)
			.text("Yeap Lai Hoon", (doc.page.width - width) / 2, doc.y, {
				width,
				align: "center",
			})

		doc.font("Arial Italic")
			.fontSize(12)
			.text(
				"Manager\nStudent Experience and Engagement Monash University Malaysia",
				(doc.page.width - 300) / 2,
				doc.y,
				{ width: 300, continued: true, align: "center" }
			)

		doc.end()
	})
}
