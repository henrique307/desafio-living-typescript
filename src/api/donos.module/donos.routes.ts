import { Router } from "express";
import { retornaDonoController } from "./donos.controller";
import { Donos } from "./donos.model";

const donosRouter = Router();

const DonosController = retornaDonoController(Donos);

donosRouter
  .get("/donos", DonosController.GET_Donos)
  .get("/donos/:id", DonosController.GET_Dono)
  .post("/donos", DonosController.POST_Dono)
  .put("/donos/:id", DonosController.PUT_Dono)
  .delete("/donos/:id", DonosController.DELETE_Dono);

export { donosRouter };
