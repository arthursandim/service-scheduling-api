import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log('MongoDB conectado!');
  } catch (erro) {
    console.log('Erro ao conectar no MongoDB: ' + erro.message);
    process.exit(1);
  }
}

export default connectDB;