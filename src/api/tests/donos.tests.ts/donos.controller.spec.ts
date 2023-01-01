import request from "supertest";
import { app } from "src/api/app";
import http from "http";

describe("testando os métodos da rota /donos", () => {
  // let server: http.Server, agent: request.SuperAgentTest;
  // beforeEach((done) => {
  //   server = app
  //     .listen(4000, () => {
  //       agent = request.agent(server);
  //       done();
  //     })
  //     .on("error", (error: Error) => done(error));
  // });

  // afterEach((done) => {
  //   return server && server.close(done);
  // });

  test("Testes no método POST correto", async () => {
    const resposta = await request(app).post("/donos").send({
      nome: "henrique",
      senha: "senhaSegura",
      email: "email@email.com",
    });

    console.log(resposta);
  }, 30000);

  test.skip("Testes no método POST errado", async () => {
    await request(app)
      .post("/donos")
      .send({
        nome: "ique",
        senha: "senh",
        email: "emaicom",
      })
      .expect(400, [
        {
          campo: "nome",
          erros: { isLength: "seu nome deve ter entre 5 e 30 caracteres" },
        },
        {
          campo: "email",
          erros: { isEmail: "campo email Deve ser um email valido" },
        },
        {
          campo: "senha",
          erros: { isLength: "sua senha deve ter entre 10 e 50 caracteres" },
        },
      ]);
  }, 30000);
});
