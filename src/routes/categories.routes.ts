import { Router } from 'express'

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { createCategoryController } from '../modules/cars/useCases/createCategory'

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', async (request, response) => {
  return createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', async (req, res) => {
  const categories = categoriesRepository.list()

  return res.status(200).json({ categories })
})

export { categoriesRoutes }
