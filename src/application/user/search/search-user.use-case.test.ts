import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import { CreateUserUseCase } from '../create/create-user.use-case'
import { SearchUserUseCase } from './search-user.use-case'

describe('Search User use-case Test', () => {
  const repository = new UserRepository()
  const createUseCase = new CreateUserUseCase(repository)
  const searchUseCase = new SearchUserUseCase(repository)

  it('should search users with last name', async () => {
    const lastname = generateString()
    const user1 = {
      name: `${generateString()} ${lastname}`,
      email: `${generateString()}@user.com`,
      username: generateString(),
      password: generateString(),
      domain: `${generateString()}.com`
    }
    const user2 = {
      name: `${generateString()} ${lastname}`,
      email: `${generateString()}@user.com`,
      username: generateString(),
      password: generateString(),
      domain: `${generateString()}.com`
    }
    await createUseCase.execute(user1)
    await createUseCase.execute(user2)
    const output = await searchUseCase.byNamePart(lastname)

    expect(output).toHaveLength(2)
    expect(output).toEqual([
      {
        ...user1,
        password: undefined
      }, {
        ...user2,
        password: undefined
      }])
  })
})
