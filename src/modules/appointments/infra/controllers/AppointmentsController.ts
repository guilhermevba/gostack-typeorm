import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateAppointmentService from '@appointments/services/CreateAppointmentService'
import {parseISO} from 'date-fns'

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body
    const user_id = request.user.id
    const parsedDate = parseISO(date)
    const createAppointment = container.resolve(CreateAppointmentService)

    const appointment = await createAppointment.execute({provider_id, user_id, date: parsedDate})
    return response.send(appointment)
  }
}
