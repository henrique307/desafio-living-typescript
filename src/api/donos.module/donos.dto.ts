import { IsEmail, Length } from "class-validator";
import bcrypt from "bcrypt";

class DonosDTO {
  constructor(obj: { nome: string; email: string; senha: string }) {
    this.nome = obj.nome;
    this.email = obj.email;
    this.senha = obj.senha;
  }

  @Length(5, 30, { message: "seu nome deve ter entre 5 e 30 caracteres" })
  readonly nome: string;

  @IsEmail({}, { message: "campo email Deve ser um email valido" })
  readonly email: string;

  @Length(10, 50, { message: "sua senha deve ter entre 10 e 50 caracteres" })
  private senha: string;

  // APENAS PARA AMBIENTE DE DESENVOLVIMENTO
  getSenha() {
    return this.senha;
  }

  encryptaSenha() {
    this.senha = bcrypt.hashSync(this.senha, 15);
  }
}

export { DonosDTO };
