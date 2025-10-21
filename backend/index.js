import express from "express";
import path from "path";
import cors from "cors";

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
