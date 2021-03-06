import User from '@users/infra/http/typeorm/entities/User'
import IUsersRepository from "@users/repositories/IUsersRepository";
import ICreateUserDTO from '@users/dto/ICreateUserDTO';
import {uuid} from 'uuidv4'
import { IFindAllUsersDTO } from '@users/dto/IFindAllUsersDTO';

export default class UsersRepository implements IUsersRepository {

  users: User[] = []

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(({email}) => email === email)
    return user
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = this.users.find(({id}) => id === user_id)
    return user
  }

  public async create({email, name, password}: ICreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, {id: uuid(), email, name, password})

    this.users.push(user)
    return user
  }
  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(({id}) => id === user.id)
    this.users[findIndex] = user
    return this.users[findIndex]
  }

  public async findAllUsers({except_user_id}: IFindAllUsersDTO): Promise<User[]> {
    return this.users.filter(user => user.id !== except_user_id)
  }

}
