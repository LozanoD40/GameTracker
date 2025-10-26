import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contrasenia: { type: String, required: true },
  logros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }],
})

export default mongoose.model('User', userSchema)
