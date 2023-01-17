import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { isValidObjectId } from "mongoose";
import { Donos } from "../donos.module/donos.model";

@ValidatorConstraint({ name: "DonoInexistente", async: true })
class donoExisteConstraint implements ValidatorConstraintInterface {
  validate(donoObjectID: any): boolean | Promise<boolean> {
    if (typeof donoObjectID !== "string") {
      return false;
    }

    if (isValidObjectId(donoObjectID)) {
      return Donos.findById(donoObjectID).then((dono) => !!dono);
    }

    return false;
  }
}

function DonoExiste(validationOptions: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: donoExisteConstraint,
      options: validationOptions,
    });
  };
}

export { DonoExiste, donoExisteConstraint };
