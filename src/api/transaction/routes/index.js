import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../../services/passport'
import { create, index, update, destroy } from '../controllers'
import { schema } from '../schemas'

const router = new Router()
const {
  description,
  descriptionText,
  amount,
  type,
  userId
} = schema.tree

/**
 * @api {post} /transactions Create transaction
 * @apiName CreateTransactions
 * @apiGroup Transactions
 * @apiParam {String} userId
 * @apiParam {String} description
 * @apiParam {String} descriptionText
 * @apiParam {Number} amount
 * @apiParam {String} type
 * @apiParamExample Payload example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "description": "Salário",
 *     "descriptionText": "Pix",
 *     "amount": 3700,
 *     "type": "Entrada"
 * }
 * @apiSuccessExample {JSON} Success response example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "description": "Salário",
 *     "descriptionText": "Pix",
 *     "amount": 3700,
 *     "type": "Entrada",
 *     "createdAt": "2024-08-10T19:53:54.800Z",
 *     "updatedAt": "2024-08-10T19:53:54.800Z",
 *     "__v": 0,
 *     "id": "66b7c552afdc807fd0f8af3d"
 * }
 * @apiSuccess {JSON} Transactions´s data.
 * @apiError 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.post('/:id',
  token({ required: true }),
  body({
    description,
    descriptionText,
    amount,
    type
  }),
  create
)

/**
 * @api {get} /transactions Retrieve transaction
 * @apiName RetrieveTransactions
 * @apiGroup Transactions
 * @apiParam {query} userId
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of transaction
 * @apiSuccess {Object[]} rows List of Transactions.
 * @apiSuccessExample {JSON} Success response example:
 * {
 *     "count": 1,
 *     "sumInput": 150.00,
 *     "sumOutput": 0,
 *     "balance": 150.00,
 *     "rows": [
 *         {
 *             "userId": "66b798cfc738bc7d90e5de3a",
 *             "description": "Salário",
 *             "descriptionText": "Pix",
 *             "amount": 3700,
 *             "type": "Entrada",
 *             "date": "2024-08-10T19:53:54.800Z"
 *             "createdAt": "2024-08-10T19:53:54.800Z",
 *             "updatedAt": "2024-08-10T19:53:54.800Z",
 *             "__v": 0,
 *             "id": "66b7c552afdc807fd0f8af3d"
 *         }
 *   ]
 * }
 * @apiError 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true }),
  query({
    page: {
      max: Infinity
    },
    userId: {
      type: String,
      paths: ['userId']
    },
    start: Date,
    end: Date
  }),
  index
)

/**
 * @api {put} /transactions/:id Update transaction
 * @apiGroup Transactions
 * @apiParam {path} id Id of target item to update.
 * @apiParam {String} name Transactions name.
 * @apiParamExample {URL} Request example:
 *  https://{localhost}/transactions/
 * @apiParamExample {JSON} Payload example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "amount": 600
 * }
 * @apiSuccessExample {JSON} Success response example:
 * {
 *     "userId": "66b798cfc738bc7d90e5de3a",
 *     "description": "Aluguel",
 *     "descriptionText": "Pix",
 *     "amount": 600,
 *     "type": "Saída",
 *     "createdAt": "2024-08-10T19:46:14.710Z",
 *     "updatedAt": "2024-08-10T19:59:13.366Z",
 *     "__v": 0,
 *     "id": "66b7c386573f97a7603a121f"
 * }
 * @apiError 400 Some parameters may contain invalid values.
 * @apiError 404 CR não encontrada.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true }),
  body({
    description,
    descriptionText,
    amount,
    type,
    userId
  }),
  update)

/**
 * @api {delete} /transactions/:id Delete transaction
 * @apiGroup Transactions
 * @apiParam {path} id Id of target item to delete.
 * @apiParamExample {URL} Request example:
 *  https://{localhost}/transactions/
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 CR não encontrada.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true }),
  body({
    userId
  }),
  destroy)

export default router
