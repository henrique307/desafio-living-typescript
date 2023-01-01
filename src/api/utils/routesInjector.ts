import express, { Request, Response, Application } from "express";
import { petsRouter } from "../pets.module/pets.routes";
import { donosRouter } from "../donos.module/donos.routes";
import cors from "cors";

function routesInjector(app: Application) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Olá mundo =)");
  });

  app.use(cors(), express.json(), petsRouter, donosRouter);
}

export { routesInjector };
