import { parse as csvParse } from 'csv-parse'
import fs from 'node:fs'

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []

      const filePath = file.path

      const fileStream = fs.createReadStream(filePath)
      const fileParsed = csvParse()

      fileStream.pipe(fileParsed)

      fileParsed
        .on('data', async (fileChunck) => {
          const [name, description] = fileChunck

          categories.push({
            name,
            description,
          })
        })
        .on('end', () => {
          resolve(categories)
        })
        .on('error', (error) => {
          reject(error)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async (category) => {
      const { name, description } = category

      const retrievedCategory = this.categoryRepository.findByName(name)

      if (!retrievedCategory) {
        this.categoryRepository.create({
          name,
          description,
        })
      }
    })
  }
}

export { ImportCategoryUseCase }
