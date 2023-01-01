import { DonosDTO } from "src/api/donos.module/donos.dto";
import bcrypt from "bcrypt";
import { validate, ValidationError } from "class-validator";

describe.skip("testando a DTO do modelo donos", () => {
  let donoTeste: DonosDTO;
  let validationErrors: ValidationError[];

  beforeAll(async () => {
    donoTeste = new DonosDTO({
      nome: "hen",
      email: "email.com",
      senha: "senha",
    });

    validationErrors = await validate(donoTeste);
  });

  test("se dono foi definido como uma instancia de DonosDTO", () => {
    expect(donoTeste).toBeInstanceOf(DonosDTO);
  });

  test("se possui todas as propriedades corretas", () => {
    expect(donoTeste).toEqual({
      nome: "hen",
      email: "email.com",
      senha: donoTeste.getSenha(),
    });
  });

  test("se senha foi encryptada", async () => {
    expect(donoTeste.getSenha()).not.toBe("senha");
    expect(await bcrypt.compare("senha", donoTeste.getSenha())).toBeTruthy();
  });

  test("se erros ocorrem como esperado", async () => {
    expect(validationErrors).toHaveLength(3);

    expect(validationErrors[0].constraints).toEqual({
      isLength: "seu nome deve ter entre 5 e 30 caracteres",
    });

    expect(validationErrors[1].constraints).toEqual({
      isEmail: "campo email Deve ser um email valido",
    });

    expect(validationErrors[2].constraints).toEqual({
      isLength: "sua senha deve ter entra 10 e 50 caracteres",
    });
  });
});
