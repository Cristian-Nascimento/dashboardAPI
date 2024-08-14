import Transaction from '../schemas'

export const deleteTransactionsUseCase = async (_id, body) => {
  try {
    return await Transaction.deleteOne({ _id, userId: body.userId })
  } catch (error) {
    throw new Error(error)
  }
}
