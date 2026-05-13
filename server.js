import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js'

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})