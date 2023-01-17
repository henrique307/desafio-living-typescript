import { retornaPetController } from "src/api/pets.module/pets.controller";
import { MockPetDatabase } from "../__mocks__/PetsDataBase.mock";

describe.skip("testando a controller da rota /pets", () => {
  let PetsController: any;

  beforeAll(() => {
    PetsController = retornaPetController(MockPetDatabase);
  });

  it("should GET all the 'pets' info", async () => {
    const resultado = PetsController.GET_pets({}, {});

    expect(MockPetDatabase.find).toHaveBeenCalledTimes(1);

    expect(resultado).toEqual([
      {
        _id: "63bc4619eb32c18e0e5d6d5b",
        nome: "rengar",
        idade: 7,
        raca: "gato dengoso",
        vacinas: [],
        createdAt: "2023-01-09T16:51:37.976Z",
        updatedAt: "2023-01-09T16:51:37.976Z",
      },
      {
        _id: "63bc46faba0a6b136a7b9e2f",
        nome: "nekomamushi",
        idade: 7,
        raca: "gato perigoso",
        vacinas: [],
        createdAt: "2023-01-09T16:55:22.563Z",
        updatedAt: "2023-01-09T16:55:22.563Z",
      },
    ]);
  });

  it("should GET a 'pet' by the id", () => {
    const resultado = PetsController.GET_pet(
      { params: { id: "63bc46faba0a6b136a7b9e2f" } },
      {}
    );

    expect(MockPetDatabase.findById).toHaveBeenCalledTimes(1);

    expect(resultado).toEqual({
      _id: "63bc46faba0a6b136a7b9e2f",
      nome: "nekomamushi",
      idade: 7,
      raca: "gato perigoso",
      vacinas: [],
      createdAt: "2023-01-09T16:55:22.563Z",
      updatedAt: "2023-01-09T16:55:22.563Z",
    });
  });

  it("should POST a 'pet'", () => {
    const novoPet = new MockPetDatabase({
      _id: "idTeste",
      nome: "nomeTeste",
      raca: "racaTeste",
      idade: 7,
      vacinas: ["vacinaTeste"],
      createdAt: "dataTeste",
      updatedAt: "dataTeste",
    });

    PetsController.POST_pet({ body: novoPet });

    expect(MockPetDatabase.listaPets.length).toBe(3);
  });

  it("should change a specific 'pet'", () => {
    const modificacaoPet = {
      nome: "Rengar",
    };

    PetsController.PUT_pet({
      params: { _id: "63bc4619eb32c18e0e5d6d5b" },
      body: modificacaoPet,
    });

    const PetModificado: MockPetDatabase = MockPetDatabase.listaPets.find(
      (pet: MockPetDatabase) => pet.nome === modificacaoPet.nome
    );

    expect(PetModificado).not.toBeUndefined();

    expect(MockPetDatabase.findByIdAndUpdate).toBeCalledTimes(1);
  });

  it("should DELETE a object from the database", () => {
    PetsController.DELETE_pet({ params: { id: "63bc46faba0a6b136a7b9e2f" } });

    const petDeletado = MockPetDatabase.listaPets.find(
      (pet: MockPetDatabase) => pet._id === "63bc46faba0a6b136a7b9e2f"
    );

    expect(petDeletado).toBeUndefined();

    expect(MockPetDatabase.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });
});
