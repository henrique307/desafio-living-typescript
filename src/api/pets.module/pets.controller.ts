import { validateSync, ValidationError } from "class-validator";
import { Request, Response } from "express";
import { PetDTO } from "./pet.dto";
import { Pets } from "./pets.model";

abstract class PetsController {
  static GET_Pets(req: Request, res: Response): void {
    Pets.find(req.query, "_id nome idade raca vacinas dono")
      .populate("dono", "_id nome email")
      .exec((erro: NativeError, pets: any[]) => {
        if (erro) {
          res.status(400).send(erro);
          return;
        }

        res.status(200).send(pets);
      });
  }

  static GET_Pet(req: Request, res: Response): void {
    Pets.findById(req.params.id, "-_id -__v")
      .populate("dono", "_id nome email")
      .exec((erro: NativeError, result: any) => {
        if (erro) {
          res.status(400).send(erro);
          return;
        }

        res.status(200).send(result);
      });
  }

  static POST_Pet(req: Request, res: Response): void {
    const pet: PetDTO = new PetDTO(req.body);

    const erros = validateSync(pet).map((erro: ValidationError) => {
      return {
        campo: erro.property,
        erros: erro.constraints,
      };
    });

    if (erros.length) {
      res.status(400).send(erros);
      return;
    }

    const petCriado = new Pets(pet);

    petCriado.save((erro: NativeError) => {
      if (erro) {
        res.status(400).send("Ocorreu um erro, tente novamente mais tarde!");
        return;
      }

      res.status(200).send("Pet criado com sucesso!");
    });
  }

  static PUT_pet(req: Request, res: Response): void {
    const pet: PetDTO = new PetDTO(req.body);

    let erros = validateSync(pet).map((erro: ValidationError) => {
      if (erro.value !== undefined) {
        return erro;
      }
    });

    erros = erros.filter((erro) => typeof erro === "object");

    if (erros.length) {
      res.status(400).send(erros);
      return;
    }

    Pets.findByIdAndUpdate(
      req.params.id,
      pet,
      (erro: NativeError, result: typeof Pets) => {
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

        res.status(204).send("Pet modificado com sucesso!");
      }
    );
  }

  static DELETE_pet(req: Request, res: Response): void {
    Pets.findByIdAndDelete(
      req.params.id,
      (erro: NativeError, result: typeof Pets) => {
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

export { PetsController };
