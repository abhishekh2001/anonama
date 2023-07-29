import mongoose from 'mongoose'

const connectDb = async () => {
    console.log('connecting to ', process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI as string)
}

export { connectDb }
