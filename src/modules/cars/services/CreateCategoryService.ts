import { ICategoriesRepository } from '../repositories/ICategoriesRepository'

interface IRequestPayload {
  name: string
  description: string
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequestPayload): void {
    const retrievedCategory = this.categoriesRepository.findByName(name)

    if (retrievedCategory) {
      throw new Error('Category already exists!')
    }

    this.categoriesRepository.create({
      name,
      description,
    })
  }
}

export { CreateCategoryService }
