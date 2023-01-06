class MockDonoDatabase {
  constructor(obj: Record<string, string>) {
    this._id = obj._id;
    this.nome = obj.nome;
    this.email = obj.email;
    this.senha = obj.senha;
    this.createdAt = obj.createdAt;
    this.updatedAt = obj.updatedAt;
  }

  _id: string;
  nome: string;
  senha: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  static listaDonos: Array<any> = [
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
  ];

  static find = jest.fn().mockReturnValue(MockDonoDatabase.listaDonos);

  static findById = jest.fn((id: Array<any>) =>
    MockDonoDatabase.listaDonos.find((dono) => dono._id === id)
  );

  static findByIdAndUpdate = jest.fn((id: string, body) => {
    const donoEncontrado = MockDonoDatabase.listaDonos.find(
      (dono: MockDonoDatabase) => dono._id === id
    );

    return Object.assign(donoEncontrado, body);
  });

  static findByIdAndDelete = jest.fn((id: string) => {
    const index = MockDonoDatabase.listaDonos.findIndex(
      (dono: MockDonoDatabase) => dono._id === id
    );

    MockDonoDatabase.listaDonos.splice(index, 1);
  });

  save = jest.fn(() => {
    delete this.save;
    MockDonoDatabase.listaDonos.push(this);
  });
}

export { MockDonoDatabase };
