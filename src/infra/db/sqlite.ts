import { open } from 'sqlite'
import { Database, Statement } from 'sqlite3'
import database from './user/sqlite/database'

async function initDb () {
  return await open<Database, Statement>({
    filename: 'sqlite.db',
    driver: Database
  })
}

async function clearUserSqliteRepository () {
  const db = await database()
  await db.run('drop table if exists users')
  await db.close()
}

async function clearAboutPagesSqliteRepository () {
  const db = await database()
  await db.run('drop table if exists aboutPages')
  await db.close()
}

async function clearSkillsSqliteRepository () {
  const db = await database()
  await db.run('drop table if exists skills')
  await db.close()
}

export {
  initDb,
  clearUserSqliteRepository,
  clearAboutPagesSqliteRepository,
  clearSkillsSqliteRepository
}
