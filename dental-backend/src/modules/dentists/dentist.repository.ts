/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Context } from '../../prisma/prisma.context';
import { Dentist } from '@prisma/client';
import { DentistDto } from 'src/dtos';

@Injectable()
export class DentistRepository {
  constructor(private readonly context: Context) {}

  async addDentist(data: DentistDto): Promise<Dentist> {
    return this.context.dentist.create({ data });
  }

  async assignAppointmentToDentist(appointmentId: number, dentistId: number): Promise<Dentist> {
    return this.context.dentist.update({
      where: { id: dentistId },
      data: {
        appointments: {
          connect: { id: appointmentId },
        },
      },
      include: { appointments: true },
    });
  }

  async getDentistById(id: number): Promise<any> {
    return this.context.dentist.findFirst({
      where: {
        id,
      },
      select: {
        user: true,
        fullname: true,
        notes: true,
        appointments: true
      },
    });
  }
  
  async getAllDentist(): Promise<Dentist[]> {
    return this.context.dentist.findMany({
      include: {
        appointments: true,
        user: true,
      },
    });
  }
}
