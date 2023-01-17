import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from "class-validator";
import { DonoExiste } from "../utils/DonoExisteValidator";

class PetDTO {
  constructor(obj: {
    nome: any;
    idade: any;
    raca: any;
    dono: any;
    vacinas?: any[];
  }) {
    this.nome = obj.nome;
    this.idade = obj.idade;
    this.raca = obj.raca;
    this.dono = obj.dono;
    this.vacinas = obj.vacinas || [];
  }

  @IsString({ message: "nome deve ser do tipo string" })
  @Length(1, 30, { message: "o nome do pet pode conter ate 30 caracteres" })
  readonly nome;

  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: "idade deve ser um numero positivo e inteiro" }
  )
  readonly idade;

  @IsString({ message: "raca deve ser do tipo string" })
  readonly raca;

  @IsNotEmpty({ message: "cada pet deve ter um dono" })
  @IsString({ message: "O ID deve ser uma string" })
  @DonoExiste({
    message:
      "O ID '$value' não existe no banco de dados, por favor cadastre-se",
    always: true,
  })
  readonly dono;

  @IsString({ each: true, message: "vacinas deve ser um array de strings" })
  @IsArray({ message: "vacinas deve ser um array" })
  vacinas: Array<any>;
}

export { PetDTO };
