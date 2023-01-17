import { validate, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { PetDTO } from "./pet.dto";

function retornaPetController(database: any) {
  abstract class PetsController {
    static GET_pets(req: Request, res: Response): void {
      return database
        .find(req.query, "-__v")
        .populate("dono", "_id nome email")
        .exec((erro: NativeError, pets: any[]) => {
          if (erro) {
            res.status(400).send(erro);
            return;
          }

          res.status(200).send(pets);
        });
    }

    static GET_pet(req: Request, res: Response): void {
      return database
        .findById(req.params.id, "-_id -__v")
        .populate("dono", "_id nome email")
        .exec((erro: NativeError, result: any) => {
          if (erro) {
            res.status(400).send(erro);
            return;
          }

          res.status(200).send(result);
        });
    }

    static async POST_pet(req: Request, res: Response): Promise<void> {
      const pet: PetDTO = new PetDTO(req.body);

      const erros = (await validate(pet)).map((erro: ValidationError) => {
        return {
          campo: erro.property,
          erros: erro.constraints,
        };
      });

      if (erros.length) {
        res.status(400).send(erros);
        return;
      }

      const petCriado = new database(pet);

      petCriado.save((erro: NativeError) => {
        if (erro) {
          res
            .status(400)
            .send("Ocorreu um erro, tente novamente mais tarde!" + erro);
          return;
        }

        res.status(200).send("Pet criado com sucesso!");
      });
    }

    static async PUT_pet(req: Request, res: Response): Promise<void> {
      const pet: PetDTO = new PetDTO(req.body);

      let erros = (await validate(pet)).map((erro: ValidationError) => {
        if (erro.value !== undefined) {
          return erro;
        }
      });

      erros = erros.filter((erro) => typeof erro === "object");

      if (erros.length) {
        res.status(400).send(erros);
        return;
      }

      database.findByIdAndUpdate(
        req.params.id,
        pet,
        (erro: NativeError, result: typeof database) => {
          if (erro) {
            res.status(400).send(`ERRO: ${erro}`);
            return;
          }

          if (!result) {
            res.status(404).send(`ID não encontrado`);
            return;
          }

          /**
           * metodo put sobrescreve o array de vacinas,
           * ve se tem como resolver isso, seria bom
           * so adicionar uma nova
           */

          res.status(204).send("Pet modificado com sucesso!");
        }
      );
    }

    static DELETE_pet(req: Request, res: Response): void {
      database.findByIdAndDelete(
        req.params.id,
        (erro: NativeError, result: typeof database) => {
          if (erro) {
            res.status(400).send(erro);
            return;
          }

          if (!result) {
            res.status(404).send(`ID não encontrado`);
            return;
          }

          res.status(200).send("Objeto deletado com sucesso!");
        }
      );
    }

    // remove isso depois

    static DELETE_All(req: Request, res: Response) {
      database.deleteMany({}, (erro: NativeError) => {
        if (erro) {
          res.send("nao deu");
        }

        res.send("pronto");
      });
    }
  }

  return PetsController;
}

export { retornaPetController };
