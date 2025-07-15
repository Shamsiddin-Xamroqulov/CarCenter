import bcrypt from "bcrypt";
import { serverConfig } from "../config.js";

const { bcryptSaltRounds } = serverConfig;

const hashService = {
  hash: async (plainPassword) => await bcrypt.hash(plainPassword, bcryptSaltRounds),
  compare: async (plainPassword, hashedPassword) => await bcrypt.compare(plainPassword, hashedPassword),
};

export default hashService;
