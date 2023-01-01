import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

const connection = mongoose.connect(
  `mongodb+srv://${process.env.usuario}:${process.env.senha}@cluster0.dnraogv.mongodb.net/?retryWrites=true&w=majority`
);

const db = mongoose.connection;

export { connection, db };
