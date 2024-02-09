import { AppDataSource } from "../../data-source";
import { CreateUser, UserLogin } from "../Interface/IUser";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import generateJWT from "../middlewares/generateJWT";
const dotenv = require("dotenv");
dotenv.config();

class UserRepo {
  private userRepository = AppDataSource.getRepository(User);
  constructor() {}

  createUser = async (data: CreateUser) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    const getUserByEmail = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (getUserByEmail) {
      return false;
    }

    const getUserByUserName = await this.userRepository.findOne({
      where: { userName: data.userName },
    });

    if (getUserByUserName) {
      return false;
    }

    const user = Object.assign(new User(), {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      userName: data.userName,
      password: hashPassword,
      point: 100,
    });

    return this.userRepository.save(user);
  };

  Login = async (data: UserLogin) => {
    const getUserByUserName = await this.userRepository.findOne({
      where: { userName: data.userName },
    });
    const validPassword = await bcrypt.compare(
      data.password,
      getUserByUserName.password
    );

    if (validPassword) {
      const token = generateJWT(
        { id: getUserByUserName.id, userName: getUserByUserName.userName },
        process.env.JWT_SECRET!,
        "2 days"
      );
      delete getUserByUserName.password;

      return { ...getUserByUserName, token };
    }

    return false;
  };
}

export default new UserRepo();
