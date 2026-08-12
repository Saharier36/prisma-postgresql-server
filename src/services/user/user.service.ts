import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import { generateToken } from "../../lib/jwt";
import { IRegisterPayload, ILoginPayload } from "./user.interface";

const SALT_ROUNDS = 10;

// ---------------- REGISTER ----------------
const registerUser = async (payload: IRegisterPayload) => {
  const { name, email, password } = payload;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken({
    userId: newUser.id,
    email: newUser.email,
    role: newUser.role,
  });

  const { password: _, ...userWithoutPassword } = newUser;

  return { user: userWithoutPassword, token };
};

// ---------------- LOGIN ----------------
const loginUser = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.isDeleted) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

export const UserService = {
  registerUser,
  loginUser,
};
