import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number },
  raca: { type: String, required: true },
  vacinas: { type: Array<string>, default: [] },
  dono: { type: mongoose.Schema.Types.ObjectId },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Pets = mongoose.model("pets", PetSchema);

export { Pets, PetSchema };
