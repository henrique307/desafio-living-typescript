import express from "express";
import { routesInjector } from "./utils/routesInjector";

const app = express();

routesInjector(app);

export { app };
