import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequestPayload {
  name: string
  description: string
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequestPayload): void {
    const retrievedSpecification = this.specificationRepository.findByName(name)

    if (retrievedSpecification) {
      throw new Error('Specification already exists!')
    }

    this.specificationRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }
