import mongoose, { Schema } from 'mongoose'

const transactionSchema = new Schema({
  description: {
    type: String
  },
  descriptionText: {
    type: String,
    enum: [
      'Pix',
      'Dinheiro',
      'Boleto',
      'Cartão de Crédito',
      'Cartão de Débito',
      'Cartão de Alimentação'
    ]
  },
  amount: {
    type: Number
  },
  type: {
    type: String,
    enum: ['Entrada', 'Saída']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_obj, ret) => { delete ret._id }
  }
})

transactionSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      description: this.description,
      descriptionText: this.descriptionText,
      amount: this.amount,
      type: this.type,
      date: this.date,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? { ...view } : view
  }
}

const model = mongoose.model('Transaction', transactionSchema)

export const schema = model.schema
export default model
