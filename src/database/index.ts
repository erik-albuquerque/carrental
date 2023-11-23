import { DataSource } from 'typeorm'

import { User } from '@modules/accounts/entities/User'
import { Category } from '@modules/cars/entities/Category'
import { Specification } from '@modules/cars/entities/Specification'

const DBDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  username: 'carrentalapi',
  password: 'carrentalapi',
  logging: true,
  synchronize: true,
  entities: [Category, Specification, User],
  migrations: ['src/database/migrations/*.ts'],
})

DBDataSource.initialize()
  .then(() => console.log('Data source has been initialized'))
  .catch((error) => console.error('Data source initialization error', error))

export { DBDataSource }
