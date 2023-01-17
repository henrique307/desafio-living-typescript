import express from "express";
import { retornaPetController } from "./pets.controller";
import { Pets } from "./pets.model";

const petsRouter = express.Router();

const PetsController = retornaPetController(Pets);

petsRouter
  .get("/pets", PetsController.GET_pets)
  .get("/pets/:id", PetsController.GET_pet)
  .post("/pets", PetsController.POST_pet)
  .put("/pets/:id", PetsController.PUT_pet)
  .delete("/pets/:id", PetsController.DELETE_pet)
  .delete("/pets", PetsController.DELETE_All);

export { petsRouter };
