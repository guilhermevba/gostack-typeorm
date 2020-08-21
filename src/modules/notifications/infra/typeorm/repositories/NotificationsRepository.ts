import INotificationsRepository from "@notifications/repositories/INotificationsRepository";
import ICreateNotificationDTO from "@notifications/dtos/ICreateNotificationDTO";
import Notification from "../schemas/notification"
import { MongoRepository, getMongoRepository } from "typeorm";

export default class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({content, recipient_id}: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id
    })
    await this.ormRepository.save(notification)
    return notification
  }

}
