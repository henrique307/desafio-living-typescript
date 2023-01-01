import { Stream } from "mongodb";
import { app } from "./api/app";
import { db } from "./api/config/mongoConfig";

db.on("error", () => {
  console.error("Houve um erro ao conectar-se ao banco de dados.");
}).once("open", () => {
  console.log("banco de dados conectado com sucesso!");
});

app.listen(8080, () =>
  console.log("app está em execução em http://localhost:8080")
);
