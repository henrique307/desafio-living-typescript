class MockPetDatabase {
  constructor(obj: Record<string, any>) {
    this._id = obj._id;
    this.nome = obj.nome;
    this.raca = obj.raca;
    this.idade = obj.idade;
    this.vacinas = obj.vacinas;
    this.createdAt = obj.createdAt;
    this.updatedAt = obj.updatedAt;
  }

  _id: string;
  nome: string;
  raca: string;
  idade: number;
  vacinas: Array<string>;
  createdAt: string;
  updatedAt: string;

  static listaPets: Array<any> = [
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
  ];

  static find = jest.fn(() => {
    return {
      populate: jest.fn(() => {
        return {
          exec: jest.fn(() => {
            return MockPetDatabase.listaPets;
          }),
        };
      }),
    };
  });

  static findById = jest.fn((id: Array<any>) => {
    return {
      populate: jest.fn(() => {
        return {
          exec: jest.fn(() => {
            return MockPetDatabase.listaPets.find((pet) => pet._id === id);
          }),
        };
      }),
    };
  });

  static findByIdAndUpdate = jest.fn((id: string, body) => {
    const index = MockPetDatabase.listaPets.findIndex(
      (pet: MockPetDatabase) => pet._id === id
    );

    return Object.assign(MockPetDatabase.listaPets[index], body);
  });

  static findByIdAndDelete = jest.fn((id: string) => {
    const index = MockPetDatabase.listaPets.findIndex(
      (pet: MockPetDatabase) => pet._id === id
    );

    MockPetDatabase.listaPets.splice(index, 1);
  });

  save = jest.fn(() => {
    delete this.save;
    MockPetDatabase.listaPets.push(this);
  });
}

export { MockPetDatabase };
