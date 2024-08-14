import { createTransactionsUseCase } from '../useCases/createTransactionsUseCase'
import { deleteTransactionsUseCase } from '../useCases/deleteTransactionsUseCase'
import { editTransactionsUseCase } from '../useCases/editTransactionsUseCase'
import { getTransactionsUseCase } from '../useCases/getTransactionsUseCase'

export const create = async ({ body, params: { id } }, response, next) => {
  try {
    const created = await createTransactionsUseCase(body, id)
    response.status(201).json(created)
  } catch (error) {
    next(error)
  }
}

export const index = async ({ querymen: query }, response, next) => {
  try {
    const indexes = await getTransactionsUseCase(query)
    response.status(200).json(indexes)
  } catch (error) {
    next(error)
  }
}

export const update = async ({ body, params: { id } }, response, next) => {
  try {
    const updated = await editTransactionsUseCase(body, id)

    response.status(200).json(updated)
  } catch (error) {
    next(error)
  }
}

export const destroy = async ({ params: { id }, body }, response, next) => {
  try {
    await deleteTransactionsUseCase(id, body)
    response.status(204).json()
  } catch (error) {
    next(error)
  }
}
