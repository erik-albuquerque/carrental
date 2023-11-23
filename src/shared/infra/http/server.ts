import 'reflect-metadata'

import express from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import '@shared/infra/typeorm'

import '@shared/container'

import { appErrorHandler } from '@shared/infra/http/middlewares/appErrorHandler'
import { routes } from '@shared/infra/http/routes'

import swaggerDocument from '../../../swagger.json'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(routes)

app.use(appErrorHandler)

app.listen(3333, () => console.log('Server is running!'))
