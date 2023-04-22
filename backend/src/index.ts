import express, { Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import mssql from "mssql";

dotenv.config({
  path: "development" === process.env.NODE_ENV ? ".env.dev" : ".env.prod",
});

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(helmet());
app.use(express.json());
// app.use(express.urlencoded());

// routes
// app.use("/api/");

const config: mssql.config = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server || "",
  database: process.env.database,
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: true,
  },
  port: Number(process.env.db_port) || 1433,
};

new mssql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    app.locals.database = pool;
    app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
  })
  .catch((error) => console.error(error));
