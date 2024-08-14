import dayjs from 'dayjs'

export const checkIsValidDataQuery = (query) => {
  const { start, end } = query

  const isValidStartQuery = start && dayjs(start).isValid()
  const isValidEndQuery = end && dayjs(end).isValid()

  return isValidStartQuery && isValidEndQuery
}
