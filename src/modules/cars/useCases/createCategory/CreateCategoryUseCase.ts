import { inject, injectable } from 'tsyringe'

import { AppError } from '@errors/AppError'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface IRequestPayload {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequestPayload): Promise<void> {
    const retrievedCategory = await this.categoriesRepository.findByName(name)

    if (retrievedCategory) {
      throw new AppError('Category already exists!')
    }

    await this.categoriesRepository.create({
      name,
      description,
    })
  }
}

export { CreateCategoryUseCase }
