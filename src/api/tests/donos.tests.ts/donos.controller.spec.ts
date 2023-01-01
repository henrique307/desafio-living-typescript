import request from "supertest";
import { app } from "src/api/app";

describe("testando os métodos da rota /donos", () => {
  test("Testes no método POST", async () => {
    request(app)
      .post("/donos")
      .send({
        nome: "henrique",
        senha: "senhaSegura",
        email: "email@email.com",
      })
      .expect(200, (res) => {
        console.log(res);
      });
  });
});
