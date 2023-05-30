import { Auth } from "../interfaces/db.interface";
import { User } from "../interfaces/db.interface";
import UserModel from "../models/users.model";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({ password, name }: User) => {
  const checkIs = await UserModel.findOne(name);
  if (checkIs.exists) return "ALREADY_USER";
  const passHash = await encrypt(password); //TODO 12345678
  const registerNewUser = await UserModel.createUser({
    password: passHash,
    name,
  });
  const token = generateToken(registerNewUser.id, registerNewUser.name);
  
  return {
    token,
    user: registerNewUser,
  };
};

const loginUser = async ({ name, password }: Auth) => {
  const checkIs = await UserModel.findOne(name);
  if (!checkIs.exists) return "NOT_FOUND_USER";

  //we compare the password with the hash

  const passwordHash = checkIs.user.password; //TODO el encriptado!
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return "PASSWORD_INCORRECT";

  const token = generateToken(checkIs.user.id, checkIs.user.name);
  const data = {
    token,
    user: checkIs.user,
  };
  return data;
};

export { registerNewUser, loginUser };
