import { inject, injectable } from 'tsyringe'

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequestPayload {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequestPayload): Promise<void> {
    const retrievedSpecification =
      await this.specificationRepository.findByName(name)

    if (retrievedSpecification) {
      throw new Error('Specification already exists!')
    }

    await this.specificationRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }
