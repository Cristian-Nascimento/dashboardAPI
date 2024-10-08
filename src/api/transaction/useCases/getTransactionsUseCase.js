import Transaction from '../schemas'
import User from '../../user/model'
import { checkIsValidDataQuery } from '../utils/checkIsValidDataQuery'

export const getTransactionsUseCase = async ({ query, select, cursor }) => {
  try {
    if (checkIsValidDataQuery(query)) {
      query.date = {
        $gte: query.start,
        $lte: query.end
      }
    }
    delete query.start
    delete query.end
    delete cursor.limit
    cursor.sort = { date: 1 }

    const user = await User.findById(query.userId)
    if (!user) throw new Error('User not found')

    const count = await Transaction.count(query)
    const rows = await Transaction.find(query, select, cursor)

    const sumInput = rows.reduce((sum, t) => t.type === 'Entrada' ? sum + t.amount : sum, 0)
    const sumOutput = rows.reduce((sum, t) => t.type === 'Saída' ? sum + t.amount : sum, 0)

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
