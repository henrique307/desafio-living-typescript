import express from "express";
import { PetsController } from "./pets.controller";

const petsRouter = express.Router();

petsRouter
  .get("/pets", PetsController.GET_Pets)
  .get("/pets/:id", PetsController.GET_Pet)
  .post("/pets", PetsController.POST_Pet)
  .put("/pets/:id", PetsController.PUT_pet)
  .delete("/pets/:id", PetsController.DELETE_pet);

export { petsRouter };
