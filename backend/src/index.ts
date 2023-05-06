import express, { Request, Response } from "express"
import helmet from "helmet"
import mssql from "mssql"
import { schoolRouter } from "./routes/school"
import { pool } from "./utils/dfConfig"

const PORT = process.env.PORT || 3000
const app = express()

// middleware
app.use(helmet())
app.use(express.json())
// app.use(express.urlencoded());

/**
 * Routes
 * * Name of the router should be specified only once in the app.use() method, and not repeated in the router's definition
 * * DO: app.use('/api/school', schoolRouter)
 * ! DON'T: router.get('/school'), router.post('school')...
 */
app.use("/api/school", schoolRouter)

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`))
