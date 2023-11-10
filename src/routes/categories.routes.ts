import { Router } from 'express'

import { CategoriesRepository } from '../repositories/CategoriesRepository'

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', async (req, res) => {
  const { name, description } = req.body

  const retrievedCategory = categoriesRepository.findByName(name)

  if (retrievedCategory) {
    return res.status(400).json({ error: 'Category already exists!' })
  }

  categoriesRepository.create({
    name,
    description,
  })

  return res.status(201).send()
})

categoriesRoutes.get('/', async (req, res) => {
  const categories = categoriesRepository.list()

  return res.status(200).json({ categories })
})

export { categoriesRoutes }
