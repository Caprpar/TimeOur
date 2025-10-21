import { Client } from "pg";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const client = new Client({
  connectionString: procces.env.PGURI,
});

client.connect();

const app = express(),
  port = process.env.PORT || 3000;

const frontend = path.join(path.resolve(), "dist");

app.use(cors());

app.get("/api", (_request, response) => {
  response.send({ hello: "world" });
});

app.use(express.static(frontend));

app.listen(port, () => {
  console.log("Vårt backend är redo\n" + `http://localhost:${port}/`);
});
