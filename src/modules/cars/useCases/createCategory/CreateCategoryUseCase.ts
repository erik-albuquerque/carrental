import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequestPayload {
  name: string
  description: string
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequestPayload): Promise<void> {
    const retrievedCategory = await this.categoriesRepository.findByName(name)

    if (retrievedCategory) {
      throw new Error('Category already exists!')
    }

    await this.categoriesRepository.create({
      name,
      description,
    })
  }
}

export { CreateCategoryUseCase }
