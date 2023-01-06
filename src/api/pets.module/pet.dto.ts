import { IsArray, IsNumber, IsString, Length } from "class-validator";

class PetDTO {
  constructor(obj: {
    nome: string;
    idade: number;
    raca: string;
    vacinas?: string[];
  }) {
    this.nome = obj.nome;
    this.idade = obj.idade;
    this.raca = obj.raca;
    this.vacinas = obj.vacinas || [];
  }

  @IsString({ message: "nome deve ser do tipo string" })
  @Length(1, 30, { message: "o nome do pet pode conter ate 30 caracteres" })
  readonly nome: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: "idade deve ser um numero positivo e inteiro" }
  )
  readonly idade: number;

  @IsString({ message: "raca deve ser do tipo string" })
  readonly raca: string;

  @IsString({ each: true, message: "vacinas deve ser um array de strings" })
  @IsArray({ message: "vacinas deve ser um array" })
  vacinas: string[];
}

export { PetDTO };
