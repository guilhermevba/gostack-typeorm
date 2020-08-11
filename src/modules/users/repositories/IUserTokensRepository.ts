import UserToken from "@users/infra/http/typeorm/entities/UserToken";

export default interface IUserTokensRepository{
  generate(user_id: string): Promise<UserToken>
  findByToken(token: string): Promise<UserToken | undefined>
}
