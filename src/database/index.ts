import { DataSource } from 'typeorm'

import { User } from '../modules/accounts/entities/User'
import { Category } from '../modules/cars/entities/Category'
import { Specification } from '../modules/cars/entities/Specification'

const connection = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  username: 'carrental',
  password: 'carrental',
  logging: true,
  synchronize: true,
  entities: [User, Category, Specification],
  migrations: [__dirname + '/src/database/migrations/*.ts'],
})

connection
  .initialize()
  .then(() => console.log('Data source has been initialized'))
  .catch((error) => console.error('Data source initialization error', error))

export { connection }
