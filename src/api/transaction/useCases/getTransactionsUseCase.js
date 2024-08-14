import Transaction from '../schemas'
import User from '../../user/model'
import { checkIsValidDataQuery } from '../utils/checkIsValidDataQuery'

export const getTransactionsUseCase = async ({ query, select, cursor }) => {
  try {
    let sumInput, sumOutput

    if (checkIsValidDataQuery(query)) {
      query.date = {
        $gte: query.start,
        $lte: query.end
      }
    }
    delete query.start
    delete query.end

    const user = await User.findById(query.userId)
    if (!user) throw new Error('User not found')

    cursor.sort = { date: -1 }
    const count = await Transaction.count(query)
    const rows = await Transaction.find(query, select, cursor)

    if (rows.length > 0) {
      sumInput = rows.reduce((sum, t) => t.type === 'Entrada' ? sum + t.amount : sum, 0)
      sumOutput = rows.reduce((sum, t) => t.type === 'Saída' ? sum + t.amount : sum, 0)
    }

    return {
      count,
      sumInput,
      sumOutput,
      balance: sumInput - sumOutput,
      rows
    }
  } catch (error) {
    throw new Error(error)
  }
}
