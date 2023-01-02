import request from "supertest";
import { app } from "src/api/app";
import http from "http";
import { retornaController } from "src/api/donos.module/donos.controller";
import { MockDonoDatabase } from "../__mocks__/DonosDatabase.mock";

describe("testando os métodos da rota /donos", () => {
  beforeAll((done) => {
    const DonosController = retornaController(MockDonoDatabase);
  });

  test("Testes no método POST correto", async () => {
    request(app).get("/donos");
  }, 30000);
});

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
