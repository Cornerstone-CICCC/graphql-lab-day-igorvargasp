import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
})

export const Customer = mongoose.model('Customer', customerSchema)
