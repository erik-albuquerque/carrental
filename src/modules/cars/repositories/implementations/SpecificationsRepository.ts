import { Repository } from 'typeorm'

import { Specification } from '@modules/cars/entities/Specification'

import { DBDataSource } from '../../../../database'
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = DBDataSource.getRepository(Specification)
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      where: {
        name,
      },
    })

    return specification
  }
}

export { SpecificationsRepository }
