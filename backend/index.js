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
app.use(express.json());

app.get("/api", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM timer");
  response.send(rows);
});

app.post("/api", async (request, response) => {
  const { remaining_minutes } = request.body;
  const { rows } = await client.query(`
    UPDATE timer
    SET
      remaining_minutes = ${remaining_minutes}
    WHERE id = 1;
`);
  response.send(rows);
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(port, () => {
  console.log("Vårt backend är redo\n" + `http://localhost:${port}/`);
});
