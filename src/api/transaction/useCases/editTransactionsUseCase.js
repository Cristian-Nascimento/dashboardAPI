import Transaction from '../schemas'

export const editTransactionsUseCase = async (body, id) => {
  try {
    console.log('body', body)
    console.log('id', id)
    const target = await Transaction.findById(id)

    return await Object.assign(target, body).save()
  } catch (error) {
    throw new Error(error)
  }
}
