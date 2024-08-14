import Transaction from '../schemas'

export const createTransactionsUseCase = async (body, id) => {
  try {
    body.userId = id
    const amountString = body.amount.replace(/[^\d,]/g, '').replace(',', '.')

    const amountNumber = parseFloat(amountString)
    if (isNaN(amountNumber)) {
      throw new Error('Invalid amount format')
    }
    body.amount = amountNumber

    return await Transaction.create(body)
  } catch (error) {
    throw new Error(error)
  }
}
