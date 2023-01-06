import { validate, ValidationError } from "class-validator";
import { PetDTO } from "src/api/pets.module/pet.dto";

describe("testando a DTO do modelo donos", () => {
  let petTeste: PetDTO;
  let validationErrors: ValidationError[];

  beforeAll(async () => {
    petTeste = new PetDTO({
      nome: "",
      idade: 1.5,
      raca: "neko raça",
    });

    validationErrors = await validate(petTeste);
  });

  test("se o pet foi definido como uma instancia de PetDTO", () => {
    expect(petTeste).toBeInstanceOf(PetDTO);
  });

  test("se possui todas as propriedades corretas", () => {
    expect(petTeste).toEqual({
      nome: "",
      idade: 1.5,
      raca: "neko raça",
      vacinas: [],
    });
  });

  test("se erros ocorrem como esperado", async () => {
    console.log(validationErrors);

    expect(validationErrors).toHaveLength(2);

    expect(validationErrors).toEqual([
      {
        children: [],
        constraints: {
          isLength: "o nome do pet pode conter ate 30 caracteres",
        },
        property: "nome",
        target: { idade: 1.5, nome: "", raca: "neko raça", vacinas: [] },
        value: "",
      },
      {
        children: [],
        constraints: {
          isNumber: "idade deve ser um numero positivo e inteiro",
        },
        property: "idade",
        target: { idade: 1.5, nome: "", raca: "neko raça", vacinas: [] },
        value: 1.5,
      },
    ]);
  });
});
