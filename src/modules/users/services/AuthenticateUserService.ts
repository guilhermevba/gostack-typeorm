import { sign } from 'jsonwebtoken'
import User from '../infra/http/typeorm/entities/User'
import authConfig from '@config/auth'
import AppError from '@shared/errors/appError'
import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'
import IHashProvider from '@users/providers/HashProvider/models/IHashProvider'

interface Request {
  email: string;
  password: string;
}

interface Response{
  user: User
  token: string
}

@injectable()
export default class AuthenticateUserService{

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
    ) {}

  public async execute({email, password}: Request) : Promise<Response>{
    const user = await this.usersRepository.findByEmail(email)
    if (!user){
      throw new AppError('Wrong email/password combination', 401)
    }

    const passwordMatch = await this.hashProvider.compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Wrong email/password combination', 401)
    }

    const {secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })
    return {user, token}
  }
}
