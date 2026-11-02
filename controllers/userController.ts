import { userModel } from "../models/userModel";
import { User } from "../interfaces";

const getUserByEmailIdAndPassword = (
  email: string,
  password: string
): User | null => {
  const user = userModel.findOne(email);

  if (isUserValid(user, password)) {
    return user;
  }

  return null;
};

const getUserById = (id: number): User | null => {
  const user = userModel.findById(id);

  if (user) {
    return user;
  }

  return null;
};

function isUserValid(
  user: User,
  password: string
): boolean {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};