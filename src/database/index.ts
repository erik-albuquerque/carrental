import { DataSource } from 'typeorm'

const connection = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'carrental',
  password: 'carrental',
  database: 'carrental',
  logging: true,
  synchronize: true,
  entities: [__dirname + '/src/modules/**/entities/*.ts'],
  migrations: [__dirname + '/src/database/migrations/*.ts'],
})

connection
  .initialize()
  .then(() => console.log('Data source has been initialized'))
  .catch((error) => console.error('Data source initialization error', error))

export { connection }
