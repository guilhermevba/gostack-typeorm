import IUserTokensRepository from "../IUserTokensRepository";
import UserToken from "../../infra/http/typeorm/entities/UserToken";
import { uuid } from "uuidv4";

export default class FakeUserTokensRepository implements IUserTokensRepository{
  private userTokens: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: Date.now(),
      updated_at: Date.now()
    })
    this.userTokens.push(userToken)
    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = this.userTokens.find(({token: userToken}) => userToken === token)

    return user
  }
}
