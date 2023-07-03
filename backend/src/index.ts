import express from "express"
import helmet from "helmet"
import cors from "cors"
import cookieParser from "cookie-parser"
import { schoolRouter } from "./routes/school"
import { userRouter } from "./routes/user"
import { organiserRouter } from "./routes/organiser"
import { specialisationRouter } from "./routes/specialisation"
import { eventRouter } from "./routes/event"
import { participationRouter } from "./routes/participation"
import { errorHandler } from "./middlewares/errorHandler"
import { feedbackRouter } from "./routes/feedback"
import { statsRouter } from "./routes/stats"
import { downloadRouter } from "./routes/download"

const PORT = process.env.PORT || 3000
const app = express()

// TODO add deployment website later
// * Note: remember to comment cors when using ThunderClient, haven't figured out a way to add ThunderClient to CORS
const whitelist = ["http://localhost:5173", "http://127.0.0.1:5173"]
const corsOptions: cors.CorsOptions = {
	origin: (origin, callback) => {
		if (origin && whitelist.includes(origin)) {
			callback(null, true)
		} else {
			callback(new Error("Not allowed by CORS"))
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json())
// app.use(helmet())
// app.use(express.urlencoded());

// * Cookie parser middleware
// * Must be placed before the routes or else it doesn't work (not sure why)
app.use(cookieParser())

/**
 * Routes for retrieving data from tables
 * * Name of the router should be specified only once in the app.use() method, and not repeated in the router's definition
 * * DO: app.use('/api/school', schoolRouter)
 * ! DON'T: router.get('/school'), router.post('/school')...
 */
app.use("/api/school", schoolRouter)
app.use("/api/user", userRouter)
app.use("/api/organiser", organiserRouter)
app.use("/api/specialisation", specialisationRouter)
app.use("/api/event", eventRouter)
app.use("/api/participation", participationRouter)
app.use("/api/feedback", feedbackRouter)

// Route for retrieving statistical data from tables (group by statements)
app.use("/api/stats", statsRouter)

// Route for file transfer
app.use("/api/download", downloadRouter)

// * Error handling middleware
app.use(errorHandler)



app.listen(PORT, () => console.log(`Running on PORT ${PORT}`))
