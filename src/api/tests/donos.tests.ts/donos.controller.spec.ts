import { retornaDonoController } from "src/api/donos.module/donos.controller";
import { MockDonoDatabase } from "../__mocks__/DonosDatabase.mock";

describe.skip("testando a controller da rota /donos", () => {
  let DonosController: any;
  beforeAll(() => {
    DonosController = retornaDonoController(MockDonoDatabase);
  });

  it("should GET all the 'donos' info", async () => {
    const resultado = DonosController.GET_Donos({}, {});

    expect(MockDonoDatabase.find).toHaveBeenCalledTimes(1);

    expect(resultado).toEqual([
      {
        _id: "63b6ecae9984efe8a5669bfd",
        nome: "henrique",
        email: "email@email.com",
        senha: "$2b$15$xXl9w23KHqzzbJZ3UxOrWeuXzLSfuZhoh7kjwLSLQGpYzwLgcseTG",
        createdAt: "2023-01-05T15:28:46.999Z",
        updatedAt: "2023-01-05T15:28:46.999Z",
      },
      {
        _id: "63b6ed099984efe8a5669c03",
        nome: "henrique",
        email: "email2@email.com",
        senha: "$2b$15$jBuNnhqhmesLkPDANbQRc.Jmj8FfRrDbaOwfctV7MhnrpR5fs5i9q",
        createdAt: "2023-01-05T15:30:17.071Z",
        updatedAt: "2023-01-05T15:30:17.071Z",
      },
    ]);
  });

  it("should GET a 'dono' by the id", () => {
    const resultado = DonosController.GET_Dono(
      { params: { id: "63b6ed099984efe8a5669c03" } },
      {}
    );

    expect(MockDonoDatabase.findById).toHaveBeenCalledTimes(1);

    expect(resultado).toEqual({
      _id: "63b6ed099984efe8a5669c03",
      nome: "henrique",
      email: "email2@email.com",
      senha: "$2b$15$jBuNnhqhmesLkPDANbQRc.Jmj8FfRrDbaOwfctV7MhnrpR5fs5i9q",
      createdAt: "2023-01-05T15:30:17.071Z",
      updatedAt: "2023-01-05T15:30:17.071Z",
    });
  });

  it("should POST a 'dono'", () => {
    const novoDono = new MockDonoDatabase({
      _id: "idTeste",
      nome: "nomeTeste",
      email: "emailteste@email.com",
      senha: "senhaSegura",
      createdAt: "dataTeste",
      updatedAt: "dataTeste",
    });

    DonosController.POST_Dono({ body: novoDono }, {});

    expect(MockDonoDatabase.listaDonos.length).toBe(3);
  });

  it("should change a specific 'dono'", () => {
    const modificacaoDono = {
      nome: "Juliano",
    };

    DonosController.PUT_Dono({
      params: { id: "63b6ed099984efe8a5669c03" },
      body: modificacaoDono,
    });

    const donoModificado: MockDonoDatabase = MockDonoDatabase.listaDonos.find(
      (dono: MockDonoDatabase) => dono.nome === modificacaoDono.nome
    );

    expect(donoModificado).not.toBeUndefined();

    expect(MockDonoDatabase.findByIdAndUpdate).toBeCalledTimes(1);
  });

  it("should DELETE a object from the database", () => {
    DonosController.DELETE_Dono({ params: { id: "63b6ed099984efe8a5669c03" } });

    const donoDeletado = MockDonoDatabase.listaDonos.find(
      (dono: MockDonoDatabase) => dono._id === "63b6ed099984efe8a5669c03"
    );

    expect(donoDeletado).toBeUndefined();

    expect(MockDonoDatabase.findByIdAndDelete).toHaveBeenCalledTimes(1);
  });
});
