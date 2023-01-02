import { validateSync, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { Pets } from "../pets.module/pets.model";
import { DonosDTO } from "./donos.dto";
import { Donos } from "./donos.model";

function retornaController(database: any) {
  abstract class DonosController {
    static GET_Donos(req: Request, res: Response): void {
      database.find(
        req.query,
        "-__v -pets",
        (error: Error, pets: typeof Donos[]) => {
          if (error) {
            res.status(400).send(error);
            return;
          }

          res.status(200).send(pets);
        }
      );
    }

    static GET_Dono(req: Request, res: Response): void {
      database.findById(
        req.params.id,
        "-_id -__v",
        (erro: NativeError, dono: any) => {
          if (erro) {
            res.status(400).send(erro);
            return;
          }

          Pets.find(
            { dono: dono._id },
            "nome idade raca",
            (erro: NativeError, result: any[]) => {
              dono.pets.push(...result);
            }
          );

          res.status(200).send(dono);
        }
      );
    }

    static POST_Dono(req: Request, res: Response): void {
      const dono: DonosDTO = new DonosDTO(req.body);

      const erros = validateSync(dono).map((erro: ValidationError) => {
        return {
          campo: erro.property,
          erros: erro.constraints,
        };
      });

      dono.encryptaSenha();

      if (erros.length) {
        res.status(400).send(erros);
        return;
      }

      const donoCriado = new database(dono);

      donoCriado.save((erro: NativeError) => {
        if (erro) {
          res.status(500).send(erro);
          return;
        }

        res.status(200).send("Dono criado com sucesso!");
      });
    }

    static PUT_Dono(req: Request, res: Response): void {
      const dono: DonosDTO = new DonosDTO(req.body);

      let erros = validateSync(dono).map((erro: ValidationError) => {
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
        dono,
        (erro: NativeError, result: typeof Donos) => {
          if (erro) {
            res.status(400).send(`ERRO: ${erro}`);
            return;
          }

          if (!result) {
            res.status(404).send(`ID não encontrado`);
            return;
          }

          /**
           * metodo put da um override nas vacinas
           * ve se tem como resolver isso, seria
           * bom so adicionar uma nova
           */

          res.status(204).send("Dono modificado com sucesso!");
        }
      );
    }

    static DELETE_Dono(req: Request, res: Response): void {
      database.findByIdAndDelete(
        req.params.id,
        (erro: NativeError, result: typeof Donos) => {
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
  }

  return DonosController;
}

export { retornaController };
