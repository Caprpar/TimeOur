import { Client } from "pg";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app = express(),
  port = process.env.PORT || 3000;

const frontend = path.join(path.resolve(), "dist");

app.use(cors());

app.get("/api", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM cities WHERE name = $1", ["Stockholm"]);
  response.send(rows);
});

app.use(express.static(frontend));

app.listen(port, () => {
  console.log("Vårt backend är redo\n" + `http://localhost:${port}/`);
});
